import React, { useEffect, useState } from 'react'
import { TiPinOutline} from 'react-icons/ti'
import supabase from '../client/supabase_client'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AdmissionFlowShort from './AdmissionFlowShort'
import AdmissionFlow from './AdmissionFlow'
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { useLogin } from '../features/hooks/use-login'
import ExamInvitationCard from './exam_invitation_doc/ExamInvitationCard'
import {
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { FiExternalLink } from 'react-icons/fi'
import { TbDownload } from 'react-icons/tb'

function Announcement(props) {
  const EXAM_URL = import.meta.env.EXAM_URL_PROD ?? "https://exam.rabbaanii.sch.id"
  const { userToken } = useSelector(state => state.auth)
  const { onSubmit, form, results, loading } = useLogin();
  
  // Get token from multiple possible sources
  const getAuthToken = () => {
    return localStorage.getItem('token-refresh') || 
           results.data?.token_refresh || 
           userToken ||
           localStorage.getItem('auth-token') ||
           sessionStorage.getItem('token-refresh');
  }

  const auth_token = getAuthToken()
  const [submission_status, setSubmissionStatus] = useState('')
  const [participant, setParticipant] = useState({})
  const [examData, setExamData] = useState([])
  const [examTestSeeds, setExamTestSeeds] = useState([])
  const [profileData, setProfileData] = useState({})
  const [applicantSchool, setApplicantSchool] = useState("")
  const [open, setOpen] = useState(1)
  const [token, setToken] = useState("")
  const [searchParams] = useSearchParams();
  const [isClient, setIsClient] = useState(false)
  const navigate = useNavigate()

  // Fix for SSR with PDFDownloadLink
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    console.log('props in Announcement:', props)
    console.log('Available auth token:', auth_token)
    
    // Always get token when component mounts
    getToken()
    
    if(props.participant?.submission_status === 'on_exam' || submission_status === 'on_exam'){
      // Ensure token is available for exam
      if (!token) {
        getToken()
      }
    }

    if(props.applicant?.[0]){
      const schoolId = props.applicant[0].applicant_schools?.[0]?.schools?.school_id
      setApplicantSchool(schoolId || "")
      
    }

    if(props.complete){
      getDataExam()
      getProfileData()
    }

    console.log('examData', examData)
    
  }, [props.participant?.submission_status, props.applicant, auth_token, props.complete])

  const getProfileData = async () => {
    if (!props.applicant?.[0]?.participants?.[0]?.id) return
    
    const {data: docs, error} = await supabase
      .from('participant_documents')
      .select('file_url, file_title')
      .eq('file_title', 'Pas-Photo')
      .eq('participant_id', props.applicant[0].participants[0].id)
      
    if(docs && docs.length > 0){
      setProfileData(docs[0])
    }
  }

  const getDataExam = async () => {
    if (!props.applicant?.[0]?.id || !props.complete) return

    try {
      // Check if exam data already exists
      let { data: exam_tests, error } = await supabase
        .from('exam_test_participants')
        .select('*, exam_tests(*)')
        .eq('appl_id', props.applicant[0]?.id)
        .is('deleted_at', null)

      if (exam_tests && exam_tests.length > 0) {
        console.log('Found existing exam data:', exam_tests)
        setExamData(exam_tests)
        await ensureExamProfileExists()
      } else {
        await ensureExamParticipantNotExists()
        // Create new exam data
        await createExamData()
      }
    } catch (error) {
      console.error('Error getting exam data:', error)
    }
  }

  const ensureExamProfileExists = async () => {
    const { data: profile, error } = await supabase
      .from('exam_profiles')
      .select('*')
      .eq('appl_id', props.applicant[0]?.id)
      .is('deleted_at', null)

    if (!profile || profile.length === 0) {
      console.log('Creating new exam profile')
      const { data: newProfile, error } = await supabase
        .from('exam_profiles')
        .insert([{
          appl_id: props.applicant[0]?.id,
          phone_number: props.applicant[0]?.phone_number,
          school_id: applicantSchool || props.applicant[0].applicant_schools?.[0]?.schools?.school_id,
          regist_number: props.applicant[0].regist_number,
          full_name: props.applicant[0].full_name,
          refresh_token: auth_token, // Use the current auth token
          completion_status: "ongoing",
        }])
        .select()
      
      if (newProfile) {
        console.log('Exam profile created:', newProfile)
      }
    } else {
      console.log('Exam profile already exists:', profile)
      // Update refresh token if needed
      if (profile[0].refresh_token !== auth_token) {
        await supabase
          .from('exam_profiles')
          .update({ refresh_token: auth_token })
          .eq('id', profile[0].id)
      }
    }
  }

  const ensureExamParticipantNotExists = async () => {
    const { data: profile, error } = await supabase
      .from('exam_test_participants')
      .select('*')
      .eq('appl_id', props.applicant[0]?.id)
      .is('deleted_at', null)

    if (profile && profile.length > 0) {
      console.log('Removing existing exam participants')
      const { error } = await supabase
        .from('exam_test_participants')
        .delete()
        .eq('appl_id', props.applicant[0]?.id)
    }
  }

  const createExamData = async () => {
    try {
      const { data: exam_schedules, error } = await supabase
        .from('exam_schedule_tests')
        .select('*, exam_schedules!inner(admission_ays(status), exam_schedule_schools!inner(school_id))')
        .eq('exam_schedules.admission_ays.status', 'active')
        .eq('exam_schedules.exam_schedule_schools.school_id', 
          applicantSchool || props.applicant[0].applicant_schools[0]?.schools?.school_id
        )
        .is('deleted_at', null)

      if (exam_schedules && exam_schedules.length > 0) {
        const seeds = exam_schedules.map(value => ({
          exam_test_id: value.exam_test_id,
          appl_id: props.applicant[0].id,
          schedule_id: value.exam_schedule_id,
        }))
        
        setExamTestSeeds(seeds)
        
        // Ensure profile exists first
        await ensureExamProfileExists()
        
        // Then create exam test participants
        const { data, error } = await supabase
          .from('exam_test_participants')
          .insert(seeds)
          .select()
          
        if (data) {
          console.log('Exam participants created:', data)
          let { data: exam_tests, error } = await supabase
            .from('exam_test_participants')
            .select('*, exam_tests(*)')
            .eq('appl_id', props.applicant[0]?.id)
            .is('deleted_at', null)
          if(exam_tests)
            setExamData(exam_tests)
        } else {
          console.error('Error creating exam participants:', error)
        }
      } else {
        console.log('No exam schedules found for this school')
      }
    } catch (error) {
      console.error('Error creating exam data:', error)
    }
  }

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value)
  }

  const loginExamWithParams = () => {
    console.log('Attempting login with token:', token)
    console.log('Token length:', token?.length)
    
    if (!token) {
      console.error('No token available for exam login')
      alert('Token tidak tersedia. Silakan refresh halaman atau login ulang.')
      return
    }

    // Store token in multiple places for redundancy
    sessionStorage.setItem('token-auth', token)
    localStorage.setItem('exam-auth-token', token)
    
    const params = { auth: token };
    const url = `${EXAM_URL}/login?${createSearchParams(params)}`
    
    console.log('Redirecting to:', url)
    
    // Use window.location.href for complete redirect
    window.location.href = url
  }

  const getSubmissionStatus = (value = null) => {
    let text = "Pengisian Formulir";
    
    if (value) {
      switch (value) {
        case "on_exam":
          text = "Mengikuti Seleksi";
          break;
        case "initial_submission":
          text = "Pengisian Formulir";
          break;
        case "accepted":
          text = "LULUS";
          break;
        case "not_accepted":
          text = "Tidak Lulus";
          break;
        case "on_measurement":
          text = "Pengukuran Seragam";
          break;
        case "awaiting_processing":
          text = "Formulir Diproses";
          break;
        default:
          text = "Pengisian Formulir";
      }
    }
    
    return text;
  }

  const download_surat_kesanggupan = () => {
    const isFullday = [1, 2, 3, 6].includes(parseInt(applicantSchool))
    const url = isFullday 
      ? "https://cnpcpmdrblvjfzzeqoau.supabase.co/storage/v1/object/sign/uploads/student_submissions/SURAT%20KESANGGUPAN-FULLDAY.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80MzczNjc5MC01MTU4LTQ5N2YtOTUwOS1mM2Y0NDU2NzBiYWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1cGxvYWRzL3N0dWRlbnRfc3VibWlzc2lvbnMvU1VSQVQgS0VTQU5HR1VQQU4tRlVMTERBWS5wZGYiLCJpYXQiOjE3NTc2NDgwNjQsImV4cCI6MTc4OTE4NDA2NH0.mCRdS-e9Q_dIUCTGj67KPl6MLYYPP-3cSoDqVxuNuCU"
      : "https://cnpcpmdrblvjfzzeqoau.supabase.co/storage/v1/object/sign/uploads/student_submissions/Surat%20Orang%20Tua%20Siap%20Mengikuti%20Aturan%20RIS.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80MzczNjc5MC01MTU4LTQ5N2YtOTUwOS1mM2Y0NDU2NzBiYWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1cGxvYWRzL3N0dWRlbnRfc3VibWlzc2lvbnMvU3VyYXQgT3JhbmcgVHVhIFNpYXAgTWVuZ2lrdXRpIEF0dXJhbiBSSVMucGRmIiwiaWF0IjoxNzQ4OTQ4MTAyLCJleHAiOjE3ODA0ODQxMDJ9.3NiPzmZ-zD2PTvq3JNNU1DnQi3ciIs33ChwF5UNiDo8"
    
    fetch(url).then((response) => {
      response.blob().then((blob) => {
        const fileURL = window.URL.createObjectURL(blob)
        let alink = document.createElement("a")
        alink.href = fileURL
        alink.download = "Surat Kesanggupan.pdf"
        alink.click()
      })
    })
  }

  const download_kartu_seleksi = () => {
    fetch("https://cnpcpmdrblvjfzzeqoau.supabase.co/storage/v1/object/public/exams/uploads/templates/Kartu-Seleksi-Sample.pdf")
      .then((response) => {
        response.blob().then((blob) => {
          const fileURL = window.URL.createObjectURL(blob)
          let alink = document.createElement("a")
          alink.href = fileURL
          alink.download = "Kartu Seleksi.pdf"
          alink.click()
        })
      })
  }

  const getToken = () => {
    const currentToken = getAuthToken()
    console.log('Retrieved token:', currentToken)
    setToken(currentToken)
    return currentToken
  }

  // Fixed date comparison functions
  const isExamActive = (examDateString) => {
    if (!examDateString) return false
    
    try {
      const today = new Date()
      const examStart = new Date(examDateString)
      
      console.log('Today:', today)
      console.log('Exam Start:', examStart)
      
      // Compare dates (ignore time for date comparison)
      const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
      const examDate = new Date(examStart.getFullYear(), examStart.getMonth(), examStart.getDate())
      
      return examDate <= todayDate
    } catch (error) {
      console.error('Error comparing dates:', error)
      return false
    }
  }

  const isExamToday = (examDateString) => {
    if (!examDateString) return false
    
    try {
      const today = new Date()
      const examStart = new Date(examDateString)
      
      // Compare only the date part (year, month, day)
      const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
      const examDate = new Date(examStart.getFullYear(), examStart.getMonth(), examStart.getDate())
      
      return todayDate.getTime() === examDate.getTime()
    } catch (error) {
      console.error('Error checking if exam is today:', error)
      return false
    }
  }

  const getCurrentExamData = () => {
    if (examData && examData.length > 0) {
      console.log('examData found:', examData)
      return examData[0] // Return the first exam
    }
    return null
  }

  const currentExam = getCurrentExamData()
  const examStartedAt = currentExam?.exam_tests?.started_at
  const isExamCurrentlyActive = isExamActive(examStartedAt)
  const isExamTodayActive = isExamToday(examStartedAt)

  console.log('Exam debug info:', {
    examStartedAt,
    isExamCurrentlyActive,
    isExamTodayActive,
    currentExam,
    tokenAvailable: !!token,
    tokenLength: token?.length
  })

  return (
    <section className="relative">
      <div className="relative max-w-6xl mx-auto bg-gray-200 px-4 sm:px-6">
        <div className="py-3 md:py-5">
          <div className="rounded-2xl relative bg-white p-5">
            <div className="rounded-2xl" style={{ 
              height: '5px', 
              backgroundColor: 'green', 
              position: 'absolute',
              left: '10px', 
              top: '-1px', 
              width: 'calc(100% - 20px)' 
            }}></div>
            
            <h3 className="h3 mb-4">Pengumuman</h3>
            
            <div className='text-gray-900 mt-2 text-center'>
              <p>Jazaakumullahu khayran telah mendaftar di Rabbaanii Islamic School, status pendaftaran saat ini:</p>
              <br />
              <span className="rounded-md w-24 bg-green-100 px-3 py-2 mt-15 text-base font-medium text-green-700 ring-1 ring-inset ring-green-600/10">
                {getSubmissionStatus(props.participant?.submission_status) || 'Pengisian Formulir'}
              </span>

              <div className='flex flex-col gap-1 px-2 mt-10'>
                {/* Debug token info - remove in production */}
                {/* {process.env.NODE_ENV === 'development' && (
                  <div className="bg-yellow-100 p-2 rounded mb-2 text-xs">
                    <p>Token Debug: {token ? `Available (${token.length} chars)` : 'NOT AVAILABLE'}</p>
                    <p>Exam Active: {isExamCurrentlyActive ? 'Yes' : 'No'}</p>
                    <p>Exam Today: {isExamTodayActive ? 'Yes' : 'No'}</p>
                  </div>
                )} */}

                {/* Surat Kesanggupan Download */}
                {props.participant?.submission_status === 'initial_submission' && (
                  <button 
                    onClick={download_surat_kesanggupan} 
                    className='btn w-full block btn-sm text-sm text-gray-200 bg-green-900 hover:bg-gray-800'
                  >
                    Download Surat Kesanggupan <TbDownload className='ml-2'/>
                  </button>
                )}

                {/* Kartu Seleksi - PDF Download */}
                {(props.participant?.submission_status === 'on_exam' || props.participant?.submission_status === 'initial_submission') && 
                 props.participant?.is_complete && currentExam && (
                  <div className="my-5">
                    {isClient && (
                      <PDFDownloadLink 
                        document={
                          <ExamInvitationCard 
                            examData={examData} 
                            profileData={profileData} 
                            dataApplicant={props.applicant?.[0]} 
                          />
                        } 
                        fileName={`Kartu-Seleksi-${props.applicant?.[0]?.regist_number || 'unknown'}.pdf`}
                      >
                        {({ loading, error }) => (
                          <button 
                            className='btn w-full btn-sm text-center text-gray-200 bg-green-900 hover:bg-gray-800 disabled:opacity-50'
                            disabled={loading}
                          >
                            {loading ? 'Mempersiapkan PDF...' : 'Cetak Kartu Seleksi'}
                            <TbDownload className='ml-2'/>
                          </button>
                        )}
                      </PDFDownloadLink>
                    )}
                  </div>
                )}

                {/* Fallback Kartu Seleksi */}
                {/* {(props.participant?.submission_status === 'on_exam' || props.participant?.submission_status === 'initial_submission') && 
                 props.participant?.is_complete && (!currentExam || examData.length === 0) && (
                  <button 
                    onClick={download_kartu_seleksi}
                    className='btn w-full block btn-sm text-sm text-gray-200 bg-blue-900 hover:bg-gray-800'
                  >
                    Cetak Kartu Seleksi <TbDownload className='ml-2'/>
                  </button>
                )} */}

                {/* Login Ujian Button - FIXED CONDITION */}
                {isExamCurrentlyActive && isExamTodayActive && token && (
                  <div className='flex flex-col gap-2 my-2'>
                    <span className='my-5'>
                      Ananda {props.applicant?.[0]?.full_name || 'peserta'} disilahkan melanjutkan ke tahap Seleksi.
                    </span>
                    <p className='text-sm'>Silakan klik login untuk melaksanakan ujian.</p>
                    <button 
                      className='btn w-full block btn-sm text-sm text-gray-200 bg-orange-700 hover:bg-gray-700 my-5'
                      onClick={loginExamWithParams}
                      disabled={!token}
                    >
                      {token ? 'Login Ujian' : 'Token Tidak Tersedia'}
                      <FiExternalLink className='ml-1'/>
                    </button>
                  </div>
                )}

                {/* Show message if token is missing */}
                {isExamCurrentlyActive && isExamTodayActive && !token && (
                  <div className='flex flex-col gap-2 my-2 p-4 bg-red-50 rounded-lg'>
                    <span className='text-red-800'>
                      Token tidak tersedia. Silakan refresh halaman atau login ulang.
                    </span>
                  </div>
                )}

                {/* Show message if exam is scheduled for future */}
                {(isExamCurrentlyActive && !isExamTodayActive && examStartedAt) && (
                  <div className='flex flex-col gap-2 my-2 p-4 bg-yellow-50 rounded-lg'>
                    <span className='text-yellow-800'>
                      Ujian akan dilaksanakan pada: {new Date(examStartedAt).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <p className='text-sm text-yellow-600'>Tombol login akan muncul pada hari ujian.</p>
                  </div>
                )}

                {/* Pengukuran Seragam Button */}
                {(props.participant?.submission_status === 'on_measurement' || props.participant?.submission_status === 'accepted') && (
                  <div className='flex flex-grow gap-4 px-2 mt-2'>
                    <button 
                      type="button"
                      className='btn w-full block btn-sm -p-2 text-sm text-gray-200 bg-orange-900 hover:bg-gray-800'
                      onClick={() => {
                        props.setCurrentStep?.(10)
                        props.toUniformClick?.()
                      }}
                    >
                      Pengukuran Seragam
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Accordion Sections */}
        <div className="relative max-w-6xl mx-auto bg-gray-200">
          <div className="py-2 md:py-1">
            <div className="rounded-2xl relative bg-white p-5">
              <Accordion open={open === 1}>
                <AccordionHeader onClick={() => handleOpen(1)} className='flex justify-between items-center'>
                  <p className='flex-1'>Peta Status Calon Santri</p> 
                  <svg className={`w-3 h-3 shrink-0 transform ${open === 1 ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                  </svg>
                </AccordionHeader>
                <div className="border-b border-gray-900/10"></div>
                <AccordionBody>
                  <AdmissionFlow submission_status={props.participant?.submission_status}/>
                </AccordionBody>
              </Accordion>
            </div>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto bg-gray-200">
          <div className="py-2 md:py-1">
            <div className="rounded-2xl relative bg-white p-5">
              <Accordion open={open === 2}>
                <AccordionHeader onClick={() => handleOpen(2)} className='flex justify-between items-center'>
                  <p className="flex-1">Berkas Syarat Pendaftaran</p>
                  <svg className={`w-3 h-3 shrink-0 transform ${open === 2 ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                  </svg>
                </AccordionHeader>
                <div className="border-b border-gray-900/10"></div>
                <AccordionBody>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Akta Kelahiran (PDF).</li>
                    <li>Pasfoto Background Merah(3x4) maksimal 1MB (JPEG, JPG, PNG).</li>
                    <li>Kartu Keluarga (KK) (PDF).</li>
                    <li>Surat Kesanggupan (PDF).</li>
                    <li>Sertifikat / Syahadah Hafalan (Jika ada) (PDF).</li>
                  </ul>
                </AccordionBody>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Announcement

// import React, { useEffect, useState } from 'react'
// import { TiPinOutline} from 'react-icons/ti'
// import supabase from '../client/supabase_client'
// import { useSelector } from 'react-redux'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import AdmissionFlowShort from './AdmissionFlowShort'
// import AdmissionFlow from './AdmissionFlow'
// import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react'
// import { createSearchParams } from 'react-router-dom'
// import { useSearchParams } from 'react-router-dom'
// import { useLogin } from '../features/hooks/use-login'
// import ExamInvitationCard from './exam_invitation_doc/ExamInvitationCard'
// import {
//   PDFDownloadLink,
// } from "@react-pdf/renderer";
// import { FiExternalLink } from 'react-icons/fi'
// import { TbDownload } from 'react-icons/tb'

// function Announcement(props) {
//   const EXAM_URL = import.meta.env.EXAM_URL_PROD ?? "https://exam.rabbaanii.sch.id"
//   const {userToken} = useSelector(state => state.auth)
//   const { onSubmit, form, results, loading } = useLogin();
//   const auth_token = localStorage.getItem('token-refresh') || results.data?.token_refresh || userToken
//   const [submission_status, setSubmissionStatus] = useState('')
//   const [participant, setParticipant] = useState({})
//   const [examData, setExamData] = useState([])
//   const [examTestSeeds, setExamTestSeeds] = useState([])
//   const [profileData, setProfileData] = useState({})
//   const [applicantSchool, setApplicantSchool] = useState("")
//   const [open, setOpen] = useState(1)
//   const [token, setToken] = useState("")
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [isClient, setIsClient] = useState(false)
//   const navigate = useNavigate()

//   // Fix for SSR with PDFDownloadLink
//   useEffect(() => {
//     setIsClient(true)
//   }, [])

//   useEffect(() => {
//     console.log('props in Announcement:', props)
    
//     if(props.participant?.submission_status === 'on_exam' || submission_status === 'on_exam'){
//       getToken()
//     }

//     if(props.applicant?.[0]){
//       const schoolId = props.applicant[0].applicant_schools?.[0]?.schools?.school_id
//       setApplicantSchool(schoolId || "")
//       getDataExam()
//       getProfileData()
//     }
//     // getDataExam()
//     if(props.applicant && (props.participant?.submission_status === 'on_exam' || props.participant?.submission_status === 'initial_submission')){
//       // getDataExam()
//       // getProfileData()
//     }
    

//     console.log('examData', examData)
    
//   }, [props.participant?.submission_status, props.applicant, auth_token])

//   const getProfileData = async () => {
//     if (!props.applicant?.[0]?.participants?.[0]?.id) return
    
//     const {data: docs, error} = await supabase
//       .from('participant_documents')
//       .select('file_url, file_title')
//       .eq('file_title', 'Pas-Photo')
//       .eq('participant_id', props.applicant[0].participants[0].id)
      
//     if(docs && docs.length > 0){
//       setProfileData(docs[0])
//     }
//   }

//   const getDataExam = async () => {
//     if (!props.applicant?.[0]?.id || !props.complete) return

//     try {
//       // Check if exam data already exists
//       let { data: exam_tests, error } = await supabase
//         .from('exam_test_participants')
//         .select('*, exam_tests(*)')
//         .eq('appl_id', props.applicant[0]?.id)
//         .is('deleted_at', null)

//       if (exam_tests && exam_tests.length > 0) {
        
//         setExamData(exam_tests)
//         await ensureExamProfileExists()
//       } else {
//         await ensureExamParticipantNotExists()
//         // Create new exam data
//         await createExamData()
//       }
//     } catch (error) {
//       console.error('Error getting exam data:', error)
//     }
//   }

//   const ensureExamProfileExists = async () => {
//     const { data: profile, error } = await supabase
//       .from('exam_profiles')
//       .select('*')
//       .eq('appl_id', props.applicant[0]?.id)
//       .is('deleted_at', null)

//     if (!profile || profile.length === 0) {
//       await supabase
//         .from('exam_profiles')
//         .insert([{
//           appl_id: props.applicant[0]?.id,
//           phone_number: props.applicant[0]?.phone_number,
//           school_id: applicantSchool || props.applicant[0].applicant_schools?.[0]?.schools?.school_id,
//           regist_number: props.applicant[0].regist_number,
//           full_name: props.applicant[0].full_name,
//           refresh_token: props.applicant[0].refresh_token,
//           completion_status: "ongoing",
//         }])
//     }
//   }
//   const ensureExamParticipantNotExists = async () => {
//     const { data: profile, error } = await supabase
//       .from('exam_test_participants')
//       .select('*')
//       .eq('appl_id', props.applicant[0]?.id)
//       .is('deleted_at', null)

//     if (profile && profile.length > 0) {
      
//       const { error } = await supabase
//         .from('exam_test_participants')
//         .delete()
//         .eq('appl_id', props.applicant[0]?.id)
          
//     } return

//   }

//   const createExamData = async () => {
//     try {
//       const { data: exam_schedules, error } = await supabase
//         .from('exam_schedule_tests')
//         .select('*, exam_schedules!inner(admission_ays(status), exam_schedule_schools!inner(school_id))')
//         .eq('exam_schedules.admission_ays.status', 'active')
//         .eq('exam_schedules.exam_schedule_schools.school_id', 
//           applicantSchool || props.applicant[0].applicant_schools[0]?.schools?.school_id
//         )
//         .is('deleted_at', null)

//       if (exam_schedules && exam_schedules.length > 0) {
//         const seeds = exam_schedules.map(value => ({
//           exam_test_id: value.exam_test_id,
//           appl_id: props.applicant[0].id,
//           schedule_id: value.exam_schedule_id,
//         }))
        
//         setExamTestSeeds(seeds)
        
//         // Ensure profile exists first
//         await ensureExamProfileExists()
        
//         // Then create exam test participants
//         const { data, error } = await supabase
//           .from('exam_test_participants')
//           .insert(seeds)
//           .select()
          
//         if (data) {
//           setExamData(data)
//         }
//       }
//     } catch (error) {
//       console.error('Error creating exam data:', error)
//     }
//   }

//   const handleOpen = (value) => {
//     setOpen(open === value ? 0 : value)
//   }

//   const loginExamWithParams = () => {
//     console.log('Logging in with token:', token)
//     const params = { auth: token };
//     sessionStorage.setItem('token-auth', token)
//     window.location.href = `${EXAM_URL}/login?${createSearchParams(params)}`
//   }

//   const getSubmissionStatus = (value = null) => {
//     let text = "Pengisian Formulir";
    
//     if (value) {
//       switch (value) {
//         case "on_exam":
//           text = "Mengikuti Seleksi";
//           break;
//         case "initial_submission":
//           text = "Pengisian Formulir";
//           break;
//         case "accepted":
//           text = "LULUS";
//           break;
//         case "not_accepted":
//           text = "Tidak Lulus";
//           break;
//         case "on_measurement":
//           text = "Pengukuran Seragam";
//           break;
//         case "awaiting_processing":
//           text = "Formulir Diproses";
//           break;
//         default:
//           text = "Pengisian Formulir";
//       }
//     }
    
//     return text;
//   }

//   const download_surat_kesanggupan = () => {
//     const isFullday = [1, 2, 3, 6].includes(parseInt(applicantSchool))
//     const url = isFullday 
//       ? "https://cnpcpmdrblvjfzzeqoau.supabase.co/storage/v1/object/sign/uploads/student_submissions/SURAT%20KESANGGUPAN-FULLDAY.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80MzczNjc5MC01MTU4LTQ5N2YtOTUwOS1mM2Y0NDU2NzBiYWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1cGxvYWRzL3N0dWRlbnRfc3VibWlzc2lvbnMvU1VSQVQgS0VTQU5HR1VQQU4tRlVMTERBWS5wZGYiLCJpYXQiOjE3NTc2NDgwNjQsImV4cCI6MTc4OTE4NDA2NH0.mCRdS-e9Q_dIUCTGj67KPl6MLYYPP-3cSoDqVxuNuCU"
//       : "https://cnpcpmdrblvjfzzeqoau.supabase.co/storage/v1/object/sign/uploads/student_submissions/Surat%20Orang%20Tua%20Siap%20Mengikuti%20Aturan%20RIS.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80MzczNjc5MC01MTU4LTQ5N2YtOTUwOS1mM2Y0NDU2NzBiYWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1cGxvYWRzL3N0dWRlbnRfc3VibWlzc2lvbnMvU3VyYXQgT3JhbmcgVHVhIFNpYXAgTWVuZ2lrdXRpIEF0dXJhbiBSSVMucGRmIiwiaWF0IjoxNzQ4OTQ4MTAyLCJleHAiOjE3ODA0ODQxMDJ9.3NiPzmZ-zD2PTvq3JNNU1DnQi3ciIs33ChwF5UNiDo8"
    
//     fetch(url).then((response) => {
//       response.blob().then((blob) => {
//         const fileURL = window.URL.createObjectURL(blob)
//         let alink = document.createElement("a")
//         alink.href = fileURL
//         alink.download = "Surat Kesanggupan.pdf"
//         alink.click()
//       })
//     })
//   }

//   const download_kartu_seleksi = () => {
//     fetch("https://cnpcpmdrblvjfzzeqoau.supabase.co/storage/v1/object/public/exams/uploads/templates/Kartu-Seleksi-Sample.pdf")
//       .then((response) => {
//         response.blob().then((blob) => {
//           const fileURL = window.URL.createObjectURL(blob)
//           let alink = document.createElement("a")
//           alink.href = fileURL
//           alink.download = "Kartu Seleksi.pdf"
//           alink.click()
//         })
//       })
//   }

//   const getToken = () => {
//     setToken(auth_token)
//   }

//   // Fixed date comparison functions
//   const isExamActive = (examDateString) => {
//     if (!examDateString) return false
    
//     try {
//       const today = new Date()
//       const examStart = new Date(examDateString)
      
//       console.log('Today:', today)
//       console.log('Exam Start:', examStart)
//       console.log('Comparison:', examStart >= today)
      
//       // Compare dates (ignore time for date comparison)
//       const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
//       const examDate = new Date(examStart.getFullYear(), examStart.getMonth(), examStart.getDate())
      
//       return examDate <= todayDate
//     } catch (error) {
//       console.error('Error comparing dates:', error)
//       return false
//     }
//   }

//   const isExamToday = (examDateString) => {
//     if (!examDateString) return false
    
//     try {
//       const today = new Date()
//       const examStart = new Date(examDateString)
      
//       // Compare only the date part (year, month, day)
//       const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
//       const examDate = new Date(examStart.getFullYear(), examStart.getMonth(), examStart.getDate())
      
//       return todayDate.getTime() === examDate.getTime()
//     } catch (error) {
//       console.error('Error checking if exam is today:', error)
//       return false
//     }
//   }

//   const getCurrentExamData = () => {
//     if (examData && examData.length > 0) {
//       console.log('examData found:', examData)
//       return examData[0] // Return the first exam
//     }
//     return null
//   }

//   const currentExam = getCurrentExamData()
//   const examStartedAt = currentExam?.exam_tests?.started_at
//   const isExamCurrentlyActive = isExamActive(examStartedAt)
//   const isExamTodayActive = isExamToday(examStartedAt)

//   console.log('Exam debug info:', {
//     examStartedAt,
//     isExamCurrentlyActive,
//     isExamTodayActive,
//     currentExam
//   })

//   return (
//     <section className="relative">
//       <div className="relative max-w-6xl mx-auto bg-gray-200 px-4 sm:px-6">
//         <div className="py-3 md:py-5">
//           <div className="rounded-2xl relative bg-white p-5">
//             <div className="rounded-2xl" style={{ 
//               height: '5px', 
//               backgroundColor: 'green', 
//               position: 'absolute',
//               left: '10px', 
//               top: '-1px', 
//               width: 'calc(100% - 20px)' 
//             }}></div>
            
//             <h3 className="h3 mb-4">Pengumuman</h3>
            
//             <div className='text-gray-900 mt-2 text-center'>
//               <p>Jazaakumullahu khayran telah mendaftar di Rabbaanii Islamic School, status pendaftaran saat ini:</p>
//               <br />
//               <span className="rounded-md w-24 bg-green-100 px-3 py-2 mt-15 text-base font-medium text-green-700 ring-1 ring-inset ring-green-600/10">
//                 {getSubmissionStatus(props.participant?.submission_status) || 'Pengisian Formulir'}
//               </span>

//               <div className='flex flex-col gap-1 px-2 mt-10'>
//                 {/* Surat Kesanggupan Download */}
//                 {props.participant?.submission_status === 'initial_submission' && (
//                   <button 
//                     onClick={download_surat_kesanggupan} 
//                     className='btn w-full block btn-sm text-sm text-gray-200 bg-green-900 hover:bg-gray-800'
//                   >
//                     Download Surat Kesanggupan <TbDownload className='ml-2'/>
//                   </button>
//                 )}

//                 {/* Kartu Seleksi - PDF Download */}
//                 {(props.participant?.submission_status === 'on_exam' || props.participant?.submission_status === 'initial_submission') && 
//                  props.participant?.is_complete && currentExam && (
//                   <div className="my-5">
//                     {isClient && (
//                       <PDFDownloadLink 
//                         document={
//                           <ExamInvitationCard 
//                             examData={examData} 
//                             profileData={profileData} 
//                             dataApplicant={props.applicant?.[0]} 
//                           />
//                         } 
//                         fileName={`Kartu-Seleksi-${props.applicant?.[0]?.regist_number || 'unknown'}.pdf`}
//                       >
//                         {({ loading, error }) => (
//                           <button 
//                             className='btn w-full btn-sm text-center text-gray-200 bg-green-900 hover:bg-gray-800 disabled:opacity-50'
//                             disabled={loading}
//                           >
//                             {loading ? 'Mempersiapkan PDF...' : 'Cetak Kartu Seleksi'}
//                             <TbDownload className='ml-2'/>
//                           </button>
//                         )}
//                       </PDFDownloadLink>
//                     )}
//                   </div>
//                 )}

//                 {/* Fallback Kartu Seleksi */}
//                 {(props.participant?.submission_status === 'on_exam' || props.participant?.submission_status === 'initial_submission') && 
//                  props.participant?.is_complete && (!currentExam || examData.length === 0) && (
//                   <button 
//                     onClick={download_kartu_seleksi}
//                     className='btn w-full block btn-sm text-sm text-gray-200 bg-blue-900 hover:bg-gray-800'
//                   >
//                     Cetak Kartu Seleksi <TbDownload className='ml-2'/>
//                   </button>
//                 )}

//                 {/* Login Ujian Button - FIXED CONDITION */}
//                 {isExamCurrentlyActive && isExamTodayActive && (
//                   <div className='flex flex-col gap-2 my-2'>
//                     <span className='my-5'>
//                       Ananda {props.applicant?.[0]?.full_name || 'peserta'} disilahkan melanjutkan ke tahap Seleksi.
//                     </span>
//                     <p className='text-sm'>Silakan klik login untuk melaksanakan ujian.</p>
//                     <button 
//                       className='btn w-full block btn-sm text-sm text-gray-200 bg-orange-700 hover:bg-gray-700 my-5'
//                       onClick={loginExamWithParams}
//                     >
//                       Login Ujian
//                       <FiExternalLink className='ml-1'/>
//                     </button>
//                   </div>
//                 )}

//                 {/* Show message if exam is scheduled for future */}
//                 {(isExamCurrentlyActive && !isExamTodayActive && examStartedAt)  && (
//                   <div className='flex flex-col gap-2 my-2 p-4 bg-yellow-50 rounded-lg'>
//                     <span className='text-yellow-800'>
//                       Ujian akan dilaksanakan pada: {new Date(examStartedAt).toLocaleDateString('id-ID', {
//                         weekday: 'long',
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric'
//                       })}
//                     </span>
//                     <p className='text-sm text-yellow-600'>Tombol login akan muncul pada hari ujian.</p>
//                   </div>
//                 )}

//                 {/* Pengukuran Seragam Button */}
//                 {(props.participant?.submission_status === 'on_measurement' || props.participant?.submission_status === 'accepted') && (
//                   <div className='flex flex-grow gap-4 px-2 mt-2'>
//                     <button 
//                       type="button"
//                       className='btn w-full block btn-sm -p-2 text-sm text-gray-200 bg-orange-900 hover:bg-gray-800'
//                       onClick={() => {
//                         props.setCurrentStep?.(10)
//                         props.toUniformClick?.()
//                       }}
//                     >
//                       Pengukuran Seragam
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Accordion Sections */}
//         <div className="relative max-w-6xl mx-auto bg-gray-200">
//           <div className="py-2 md:py-1">
//             <div className="rounded-2xl relative bg-white p-5">
//               <Accordion open={open === 1}>
//                 <AccordionHeader onClick={() => handleOpen(1)} className='flex justify-between items-center'>
//                   <p className='flex-1'>Peta Status Calon Santri</p> 
//                   <svg className={`w-3 h-3 shrink-0 transform ${open === 1 ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
//                   </svg>
//                 </AccordionHeader>
//                 <div className="border-b border-gray-900/10"></div>
//                 <AccordionBody>
//                   <AdmissionFlow submission_status={props.participant?.submission_status}/>
//                 </AccordionBody>
//               </Accordion>
//             </div>
//           </div>
//         </div>

//         <div className="relative max-w-6xl mx-auto bg-gray-200">
//           <div className="py-2 md:py-1">
//             <div className="rounded-2xl relative bg-white p-5">
//               <Accordion open={open === 2}>
//                 <AccordionHeader onClick={() => handleOpen(2)} className='flex justify-between items-center'>
//                   <p className="flex-1">Berkas Syarat Pendaftaran</p>
//                   <svg className={`w-3 h-3 shrink-0 transform ${open === 2 ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
//                   </svg>
//                 </AccordionHeader>
//                 <div className="border-b border-gray-900/10"></div>
//                 <AccordionBody>
//                   <ul className="list-disc pl-5 space-y-2 text-gray-700">
//                     <li>Akta Kelahiran (PDF).</li>
//                     <li>Pasfoto Background Merah(3x4) maksimal 1MB (JPEG, JPG, PNG).</li>
//                     <li>Kartu Keluarga (KK) (PDF).</li>
//                     <li>Surat Kesanggupan (PDF).</li>
//                     <li>Sertifikat / Syahadah Hafalan (Jika ada) (PDF).</li>
//                   </ul>
//                 </AccordionBody>
//               </Accordion>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Announcement
// // import React, { useEffect, useState } from 'react'
// // import { TiPinOutline} from 'react-icons/ti'
// // import supabase from '../client/supabase_client'
// // import { useSelector } from 'react-redux'
// // import axios from 'axios'
// // import { useNavigate } from 'react-router-dom'
// // import AdmissionFlowShort from './AdmissionFlowShort'
// // import AdmissionFlow from './AdmissionFlow'
// // import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react'
// // import { createSearchParams } from 'react-router-dom'
// // import { useSearchParams } from 'react-router-dom'
// // import { useLogin } from '../features/hooks/use-login'
// // import ExamInvitationCard from './exam_invitation_doc/ExamInvitationCard'
// // import {
// //   PDFDownloadLink,
// // } from "@react-pdf/renderer";
// // import { FiExternalLink } from 'react-icons/fi'
// // import { TbDownload } from 'react-icons/tb'

// // function Announcement(props) {
// //   const EXAM_URL = import.meta.env.EXAM_URL_PROD ?? "https://exam.rabbaanii.sch.id"
// //   const {userToken} = useSelector(state => state.auth)
// //   const { onSubmit, form, results, loading } = useLogin();
// //   const auth_token = localStorage.getItem('token-refresh') || results.data?.token_refresh || userToken
// //   const [submission_status, setSubmissionStatus] = useState('')
// //   const [participant, setParticipant] = useState({})
// //   const [examData, setExamData] = useState([])
// //   const [examTestSeeds, setExamTestSeeds] = useState([])
// //   const [profileData, setProfileData] = useState({})
// //   const [applicantSchool, setApplicantSchool] = useState("")
// //   const [open, setOpen] = useState(1)
// //   const [token, setToken] = useState("")
// //   const [searchParams, setSearchParams] = useSearchParams();
// //   const [isClient, setIsClient] = useState(false)
// //   const navigate = useNavigate()

// //   // Fix for SSR with PDFDownloadLink
// //   useEffect(() => {
// //     setIsClient(true)
// //   }, [])

// //   useEffect(() => {
// //     console.log('props in Announcement:', props)
    
// //     if(props.participant?.submission_status === 'on_exam' || submission_status === 'on_exam'){
// //       getToken()
// //     }

// //     if(props.applicant && props.participant?.submission_status === 'on_exam'){
// //       getDataExam()
// //       getProfileData()
// //     }
    
// //     if(props.applicant?.[0]){
// //       const schoolId = props.applicant[0].applicant_schools?.[0]?.schools?.school_id
// //       setApplicantSchool(schoolId || "")
// //       getDataExam()
// //     }
    
// //   }, [props.participant?.submission_status, props.applicant, auth_token])

// //   const getProfileData = async () => {
// //     if (!props.applicant?.[0]?.participants?.[0]?.id) return
    
// //     const {data: docs, error} = await supabase
// //       .from('participant_documents')
// //       .select('file_url, file_title')
// //       .eq('file_title', 'Pas-Photo')
// //       .eq('participant_id', props.applicant[0].participants[0].id)
      
// //     if(docs && docs.length > 0){
// //       setProfileData(docs[0])
// //     }
// //   }

// //   const getDataExam = async () => {
// //     if (!props.applicant?.[0]?.id || !props.complete) return

// //     try {
// //       // Check if exam data already exists
// //       let { data: exam_tests, error } = await supabase
// //         .from('exam_test_participants')
// //         .select('*, exam_tests!inner(*)')
// //         .eq('appl_id', props.applicant[0]?.id)
// //         .is('deleted_at', null)

// //       if (exam_tests && exam_tests.length > 0) {
// //         setExamData(exam_tests)
// //         await ensureExamProfileExists()
// //       } else {
// //         // Create new exam data
// //         await createExamData()
// //       }
// //     } catch (error) {
// //       console.error('Error getting exam data:', error)
// //     }
// //   }

// //   const ensureExamProfileExists = async () => {
// //     const { data: profile, error } = await supabase
// //       .from('exam_profiles')
// //       .select('*')
// //       .eq('appl_id', props.applicant[0]?.id)
// //       .is('deleted_at', null)

// //     if (!profile || profile.length === 0) {
// //       await supabase
// //         .from('exam_profiles')
// //         .insert([{
// //           appl_id: props.applicant[0]?.id,
// //           phone_number: props.applicant[0]?.phone_number,
// //           school_id: applicantSchool || props.applicant[0].applicant_schools?.[0]?.schools?.school_id,
// //           regist_number: props.applicant[0].regist_number,
// //           full_name: props.applicant[0].full_name,
// //           refresh_token: props.applicant[0].refresh_token,
// //           completion_status: "ongoing",
// //         }])
// //     }
// //   }

// //   const createExamData = async () => {
// //     try {
// //       const { data: exam_schedules, error } = await supabase
// //         .from('exam_schedule_tests')
// //         .select('*, exam_schedules(admission_ays(status), exam_schedule_schools(school_id))')
// //         .eq('exam_schedules.admission_ays.status', 'active')
// //         .eq('exam_schedules.exam_schedule_schools.school_id', 
// //           applicantSchool || props.applicant[0].applicant_schools?.[0]?.schools?.school_id
// //         )
// //         .is('deleted_at', null)

// //       if (exam_schedules && exam_schedules.length > 0) {
// //         const seeds = exam_schedules.map(value => ({
// //           exam_test_id: value.exam_test_id,
// //           appl_id: props.applicant[0].id,
// //           schedule_id: value.exam_schedule_id,
// //         }))
        
// //         setExamTestSeeds(seeds)
        
// //         // Ensure profile exists first
// //         await ensureExamProfileExists()
        
// //         // Then create exam test participants
// //         const { data, error } = await supabase
// //           .from('exam_test_participants')
// //           .insert(seeds)
// //           .select()
          
// //         if (data) {
// //           setExamData(data)
// //         }
// //       }
// //     } catch (error) {
// //       console.error('Error creating exam data:', error)
// //     }
// //   }

// //   const handleOpen = (value) => {
// //     setOpen(open === value ? 0 : value)
// //   }

// //   const loginExamWithParams = () => {
// //     console.log('Logging in with token:', token)
// //     const params = { auth: token };
// //     sessionStorage.setItem('token-auth', token)
// //     window.location.href = `${EXAM_URL}/login?${createSearchParams(params)}`
// //   }

// //   const getSubmissionStatus = (value = null) => {
// //     let text = "Pengisian Formulir";
    
// //     if (value) {
// //       switch (value) {
// //         case "on_exam":
// //           text = "Mengikuti Seleksi";
// //           break;
// //         case "initial_submission":
// //           text = "Pengisian Formulir";
// //           break;
// //         case "accepted":
// //           text = "LULUS";
// //           break;
// //         case "not_accepted":
// //           text = "Tidak Lulus";
// //           break;
// //         case "on_measurement":
// //           text = "Pengukuran Seragam";
// //           break;
// //         case "awaiting_processing":
// //           text = "Formulir Diproses";
// //           break;
// //         default:
// //           text = "Pengisian Formulir";
// //       }
// //     }
    
// //     return text;
// //   }

// //   const download_surat_kesanggupan = () => {
// //     const isFullday = [1, 2, 3, 6].includes(parseInt(applicantSchool))
// //     const url = isFullday 
// //       ? "https://cnpcpmdrblvjfzzeqoau.supabase.co/storage/v1/object/sign/uploads/student_submissions/SURAT%20KESANGGUPAN-FULLDAY.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80MzczNjc5MC01MTU4LTQ5N2YtOTUwOS1mM2Y0NDU2NzBiYWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1cGxvYWRzL3N0dWRlbnRfc3VibWlzc2lvbnMvU1VSQVQgS0VTQU5HR1VQQU4tRlVMTERBWS5wZGYiLCJpYXQiOjE3NTc2NDgwNjQsImV4cCI6MTc4OTE4NDA2NH0.mCRdS-e9Q_dIUCTGj67KPl6MLYYPP-3cSoDqVxuNuCU"
// //       : "https://cnpcpmdrblvjfzzeqoau.supabase.co/storage/v1/object/sign/uploads/student_submissions/Surat%20Orang%20Tua%20Siap%20Mengikuti%20Aturan%20RIS.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80MzczNjc5MC01MTU4LTQ5N2YtOTUwOS1mM2Y0NDU2NzBiYWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1cGxvYWRzL3N0dWRlbnRfc3VibWlzc2lvbnMvU3VyYXQgT3JhbmcgVHVhIFNpYXAgTWVuZ2lrdXRpIEF0dXJhbiBSSVMucGRmIiwiaWF0IjoxNzQ4OTQ4MTAyLCJleHAiOjE3ODA0ODQxMDJ9.3NiPzmZ-zD2PTvq3JNNU1DnQi3ciIs33ChwF5UNiDo8"
    
// //     fetch(url).then((response) => {
// //       response.blob().then((blob) => {
// //         const fileURL = window.URL.createObjectURL(blob)
// //         let alink = document.createElement("a")
// //         alink.href = fileURL
// //         alink.download = "Surat Kesanggupan.pdf"
// //         alink.click()
// //       })
// //     })
// //   }

// //   const download_kartu_seleksi = () => {
// //     fetch("https://cnpcpmdrblvjfzzeqoau.supabase.co/storage/v1/object/public/exams/uploads/templates/Kartu-Seleksi-Sample.pdf")
// //       .then((response) => {
// //         response.blob().then((blob) => {
// //           const fileURL = window.URL.createObjectURL(blob)
// //           let alink = document.createElement("a")
// //           alink.href = fileURL
// //           alink.download = "Kartu Seleksi.pdf"
// //           alink.click()
// //         })
// //       })
// //   }

// //   const getToken = () => {
// //     setToken(auth_token)
// //   }

// //   // Check if exam date is today or in the future
// //   const isExamActive = (examDate) => {
// //     if (!examDate) return false
// //     const today = new Date()
// //     const examStart = new Date(examDate)
// //     console.log('examStart', examStart)
// //     return examStart >= today
// //   }

// //   const getCurrentExamData = () => {
// //     if (examData && examData.length > 0) {
// //       console.log('examData', examData)
// //       return examData // Return the first exam
// //     }
// //     return null
// //   }

// //   const currentExam = getCurrentExamData()

// //   return (
// //     <section className="relative">
// //       <div className="relative max-w-6xl mx-auto bg-gray-200 px-4 sm:px-6">
// //         <div className="py-3 md:py-5">
// //           <div className="rounded-2xl relative bg-white p-5">
// //             <div className="rounded-2xl" style={{ 
// //               height: '5px', 
// //               backgroundColor: 'green', 
// //               position: 'absolute',
// //               left: '10px', 
// //               top: '-1px', 
// //               width: 'calc(100% - 20px)' 
// //             }}></div>
            
// //             <h3 className="h3 mb-4">Pengumuman</h3>
            
// //             <div className='text-gray-900 mt-2 text-center'>
// //               <p>Jazaakumullahu khayran telah mendaftar di Rabbaanii Islamic School, status pendaftaran saat ini:</p>
// //               <br />
// //               <span className="rounded-md w-24 bg-green-100 px-3 py-2 mt-15 text-base font-medium text-green-700 ring-1 ring-inset ring-green-600/10">
// //                 {getSubmissionStatus(props.participant?.submission_status) || 'Pengisian Formulir'}
// //               </span>

// //               <div className='flex flex-col gap-1 px-2 mt-10'>
// //                 {/* Surat Kesanggupan Download */}
// //                 {props.participant?.submission_status === 'initial_submission' && (
// //                   <button 
// //                     onClick={download_surat_kesanggupan} 
// //                     className='btn w-full block btn-sm text-sm text-gray-200 bg-green-900 hover:bg-gray-800'
// //                   >
// //                     Download Surat Kesanggupan <TbDownload className='ml-2'/>
// //                   </button>
// //                 )}

// //                 {/* Kartu Seleksi - PDF Download */}
// //                 {(props.participant?.submission_status === 'on_exam' || props.participant?.submission_status === 'initial_submission') && 
// //                  props.participant?.is_complete && currentExam && (
// //                   <div className="my-5">
// //                     {isClient && (
// //                       <PDFDownloadLink 
// //                         document={
// //                           <ExamInvitationCard 
// //                             examData={currentExam} 
// //                             profileData={profileData} 
// //                             dataApplicant={props.applicant?.[0]} 
// //                           />
// //                         } 
// //                         fileName={`Kartu-Seleksi-${props.applicant?.[0]?.regist_number || 'unknown'}.pdf`}
// //                       >
// //                         {({ loading, error }) => (
// //                           <button 
// //                             className='btn w-full btn-sm text-center text-gray-200 bg-green-900 hover:bg-gray-800 disabled:opacity-50'
// //                             disabled={loading}
// //                           >
// //                             {loading ? 'Mempersiapkan PDF...' : 'Cetak Kartu Seleksi'}
// //                             <TbDownload className='ml-2'/>
// //                           </button>
// //                         )}
// //                       </PDFDownloadLink>
// //                     )}
// //                     {/* {error && (
// //                       <button 
// //                         onClick={download_kartu_seleksi}
// //                         className='btn w-full block btn-sm text-sm text-gray-200 bg-blue-900 hover:bg-gray-800 mt-2'
// //                       >
// //                         Download Template Kartu Seleksi <TbDownload className='ml-2'/>
// //                       </button>
// //                     )} */}
// //                   </div>
// //                 )}

// //                 {/* {(props.participant?.submission_status === 'on_exam' || props.participant?.submission_status === 'initial_submission') && 
// //                  props.participant?.is_complete && (currentExam && examData.length > 0)  && (
// //                   <button 
// //                     onClick={download_kartu_seleksi}
// //                     className='btn w-full block btn-sm text-sm text-gray-200 bg-green-900 hover:bg-gray-800'
// //                   >
// //                     Cetak Kartu Seleksi <TbDownload className='ml-2'/>
// //                   </button>
// //                 )} */}

// //                 {(props.participant?.submission_status === 'on_exam' || props.participant?.submission_status === 'initial_submission') && 
// //                  props.participant?.is_complete && currentExam && currentExam?.exam_tests?.started_at == new Date() && (
// //                   <div className='flex flex-col gap-2 my-2'>
// //                     <span className='my-5'>
// //                       Ananda {props.applicant?.[0]?.full_name || 'peserta'} disilahkan melanjutkan ke tahap Seleksi.
// //                     </span>
// //                     <p className='text-sm'>Silakan klik login untuk melaksanakan ujian.</p>
// //                     <button 
// //                       className='btn w-full block btn-sm text-sm text-gray-200 bg-orange-700 hover:bg-gray-700 my-5'
// //                       onClick={loginExamWithParams}
// //                     >
// //                       Login Ujian
// //                       <FiExternalLink className='ml-1'/>
// //                     </button>
// //                   </div>
// //                 )}

// //                 {(props.participant?.submission_status === 'on_measurement' || props.participant?.submission_status === 'accepted') && (
// //                   <div className='flex flex-grow gap-4 px-2 mt-2'>
// //                     <button 
// //                       type="button"
// //                       className='btn w-full block btn-sm -p-2 text-sm text-gray-200 bg-orange-900 hover:bg-gray-800'
// //                       onClick={() => {
// //                         props.setCurrentStep?.(10)
// //                         props.toUniformClick?.()
// //                       }}
// //                     >
// //                       Pengukuran Seragam
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="relative max-w-6xl mx-auto bg-gray-200">
// //           <div className="py-2 md:py-1">
// //             <div className="rounded-2xl relative bg-white p-5">
// //               <Accordion open={open === 1}>
// //                 <AccordionHeader onClick={() => handleOpen(1)} className='flex justify-between items-center'>
// //                   <p className='flex-1'>Peta Status Calon Santri</p> 
// //                   <svg className={`w-3 h-3 shrink-0 transform ${open === 1 ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
// //                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
// //                   </svg>
// //                 </AccordionHeader>
// //                 <div className="border-b border-gray-900/10"></div>
// //                 <AccordionBody>
// //                   <AdmissionFlow submission_status={props.participant?.submission_status}/>
// //                 </AccordionBody>
// //               </Accordion>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="relative max-w-6xl mx-auto bg-gray-200">
// //           <div className="py-2 md:py-1">
// //             <div className="rounded-2xl relative bg-white p-5">
// //               <Accordion open={open === 2}>
// //                 <AccordionHeader onClick={() => handleOpen(2)} className='flex justify-between items-center'>
// //                   <p className="flex-1">Berkas Syarat Pendaftaran</p>
// //                   <svg className={`w-3 h-3 shrink-0 transform ${open === 2 ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
// //                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
// //                   </svg>
// //                 </AccordionHeader>
// //                 <div className="border-b border-gray-900/10"></div>
// //                 <AccordionBody>
// //                   <ul className="list-disc pl-5 space-y-2 text-gray-700">
// //                     <li>Akta Kelahiran (PDF).</li>
// //                     <li>Pasfoto Background Merah(3x4) maksimal 1MB (JPEG, JPG, PNG).</li>
// //                     <li>Kartu Keluarga (KK) (PDF).</li>
// //                     <li>Surat Kesanggupan (PDF).</li>
// //                     <li>Sertifikat / Syahadah Hafalan (Jika ada) (PDF).</li>
// //                   </ul>
// //                 </AccordionBody>
// //               </Accordion>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   )
// // }

// // export default Announcement
// // // import React, { useEffect, useState } from 'react'
// // // import { TiPinOutline} from 'react-icons/ti'
// // // import supabase from '../client/supabase_client'
// // // import { useSelector } from 'react-redux'
// // // import axios from 'axios'
// // // // import EXAM_URL from '../api/exam-system'
// // // import { useNavigate } from 'react-router-dom'
// // // import AdmissionFlowShort from './AdmissionFlowShort'
// // // import AdmissionFlow from './AdmissionFlow'
// // // import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react'
// // // import { createSearchParams } from 'react-router-dom'
// // // import { useSearchParams } from 'react-router-dom'
// // // import { useLogin } from '../features/hooks/use-login'
// // // import ExamInvitationCard from './exam_invitation_doc/ExamInvitationCard'
// // // import {
// // //   Page,
// // //   Text,
// // //   View,
// // //   Document,
// // //   PDFViewer,
// // //   PDFDownloadLink,
// // // } from "@react-pdf/renderer";
// // // import { FiExternalLink } from 'react-icons/fi'
// // // import { TbDownload } from 'react-icons/tb'



// // // function Announcement(props) {
  
// // //   // const EXAM_URL = import.meta.env.EXAM_URL_LOCAL??"http://localhost:3002"
// // //   const EXAM_URL = import.meta.env.EXAM_URL_PROD??"https://exam.rabbaanii.sch.id"
// // //   const {userToken} = useSelector(state => state.auth)
// // //   const { onSubmit, form, results, loading } = useLogin();
// // //   const auth_token = localStorage.getItem('token-refresh') || results.data?.token_refresh || userToken
// // //   const [submission_status, setSubmissionStatus] = useState()
// // //   const [participant, setParticipant] = useState({})
// // //   const [examData, setExamData] = useState([])
// // //   const [examTestSeeds, setExamTestSeeds] = useState([])
// // //   const [profileData, setProfileData] = useState({})
// // //   const [applicantSchool, setApplicantSchool] = useState("")
// // //   const [open, setOpen] = useState(1)
// // //   const [token, setToken] = useState("")
// // //   const [searchParams, setSearchParams] = useSearchParams();
// // //   const navigate = useNavigate()


// // //   useEffect(()=>{
// // //     // if(props.participant){
// // //     //   // setSubmissionStatus(props.participant.submission_status)
// // //     // }
// // //     // getSubmissionStatus()
// // //     // if(props.participant){
// // //     //   // setParticipant(props.participant)
// // //     //   // getSubmissionStatus(props.participant.submission_status)
// // //     //     console.log('masuk-',props.participant.submission_status)
// // //     // }
// // //     // if(props.participant.submission_status){
// // //     //   // console.log('status sub in announce', submission_status)
// // //     //   getSubmissionStatus()
// // //     // }else{
// // //     //   getSubmissionStatus()

// // //     // }
// // //     console.log('sub', submission_status)
// // //     console.log('sub props', props.participant)
// // //     if(props.participant.submission_status =='on_exam' || submission_status=='on_exam'){
// // //       getToken()
// // //     }
// // //     console.log(auth_token)
// // //     // getSubmissionStatus()
// // //     if(token){
      
// // //       // navigate('')
// // //     }
// // //     console.log('props.applicant', props.applicant)
// // //     if(props.applicant && props.participant.submission_status=='on_exam'){
// // //       // dataExam.regist_number
// // //       getDataExam()
// // //       getProfileData()
// // //       console.log('examData', examData)
// // //     }
// // //     console.log('props.participant', props.participant.is_complete)
    
// // //     if(props.applicant[0]){
// // //       console.log('props.applicant', props.applicant)
// // //       console.log('school', props.applicant[0].applicant_schools[0]?.schools?.school_id)
// // //       setApplicantSchool(props.applicant[0].applicant_schools[0]?.schools?.school_id)
// // //       console.log('applicantSchool', applicantSchool)
// // //       getDataExam()
// // //       console.log('examData', examData)
// // //     }
    
// // //   },[props.participant.submission_status, props.applicant, auth_token])

// // //   const getProfileData = async () => {
// // //     const {data: docs, error} = await supabase.from('participant_documents').select('file_url, file_title')
// // //                                 .eq('file_title', 'Pas-Photo',)
// // //                                 .eq('participant_id', props.applicant[0].participants[0].id)
// // //                                 if(docs){
// // //                                   setProfileData(docs[0])
// // //                                   // setPasPhoto(docs[0].map(value => ({
// // //                                     //   file_title: value.file_title,
// // //                                     //   file_url: value.file_url
// // //                                     // })))
// // //                                   }
// // //                                   console.log('pas_photo', profileData)
// // //   }

// // //   const getDataExam_ = async () => {
    
// // //     if(props.applicant[0]?.id){

// // //       let { data: exam_tests, error } = await supabase
// // //         .from('exam_test_participants')
// // //         .select('*, exam_tests!inner(*) ')
// // //         .eq('appl_id', props.applicant[0]?.id)
// // //         .is('deleted_at', null)
// // //         if(exam_tests){
// // //           setExamData(exam_tests)
// // //         }
// // //     }
          
// // //       console.log('examData', examData)
// // //   }

// // //   const getDataExam = async () => {
// // //     if (props.applicant[0]?.id && props.complete) {
      
// // //       let { data: exam_tests, error } = await supabase
// // //         .from("exam_test_participants")
// // //         .select("*, exam_tests!inner(*) ")
// // //         .eq("appl_id", props.applicant[0]?.id)
// // //         .is("deleted_at", null);
// // //       if (exam_tests && exam_tests.length > 0) {
// // //         setExamData(exam_tests);

// // //         const { data: profile, error } = await supabase
// // //           .from("exam_profiles")
// // //           .select("*")
// // //           // .eq('refresh_token', token)
// // //           .eq("appl_id", props.applicant[0]?.id)
// // //           .is("deleted_at", null);
// // //         if (profile && profile.length > 0) {
// // //           // const {data: profile1, error} = await supabase.from('exam_profiles')
// // //           //                             .update([
// // //           //                               {updated_at: new Date().toISOString(), refresh_token: token}
// // //           //                             ])
// // //           //                             // .eq('refresh_token', token)
// // //           //                             .eq('phone_number', decodedToken.username)
// // //           //                             .is('deleted_at', null)
// // //           //                             .select()
// // //           //                             return profile1[0].appl_id
// // //         } else {
// // //           const { data: profile2, error } = await supabase
// // //             .from("exam_profiles")
// // //             .insert([
// // //               {
// // //                 appl_id: props.applicant[0]?.id,
// // //                 phone_number: props.applicant[0]?.phone_number,
// // //                 school_id: applicantSchool || props.applicant[0].applicant_schools[0]?.schools?.school_id,
// // //                 regist_number: props.applicant[0].regist_number,
// // //                 full_name: props.applicant[0].full_name,
// // //                 refresh_token: props.applicant[0].refresh_token,
// // //                 completion_status: "ongoing",
// // //               },
// // //             ])
// // //             // .eq('refresh_token', token)
// // //             // .eq('phone_number', decodedToken.username)
// // //             // .is('deleted_at', null)
// // //             .select();
// // //         }
// // //         if (error) return null;
// // //       } else {
// // //         // console.log("in no");
// // //         // setTimeout( async() => {
// // //         // Simulate a delay of 2 seconds
// // //         // await new Promise(resolve => setTimeout(resolve, 2000));
// // //         const { data: exam_tests, error1 } = await supabase
// // //           .from("exam_schedule_tests")
// // //           .select(
// // //             "*, exam_schedules(admission_ays(status), exam_schedule_schools(school_id)) "
// // //           )
// // //           .eq("exam_schedules.admission_ays.status", "active")
// // //           .eq(
// // //             "exam_schedules.exam_schedule_schools.school_id",
// // //             applicantSchool||props.applicant[0].applicant_schools[0]?.schools?.school_id
// // //           )
// // //           // .eq('id', props.applicant[0]?.id)
// // //           .is("deleted_at", null);
// // //         if (exam_tests && exam_tests.length > 0) {
// // //           setExamTestSeeds(
// // //             exam_tests.map((value) => {
// // //               return {
// // //                 exam_test_id: value.exam_test_id,
// // //                 appl_id: props.applicant[0].id,
// // //                 schedule_id: value.exam_schedule_id,
// // //               };
// // //             })
// // //           );
// // //           // Simulate a delay of 2 seconds
// // //         await new Promise(resolve => setTimeout(resolve, 2000));
// // //         console.log('examTestSeeds', examTestSeeds)
// // //         const { data: profile, error } = await supabase
// // //                 .from("exam_profiles")
// // //                 .select("*")
// // //                 // .eq('refresh_token', token)
// // //                 .eq("appl_id", props.applicant[0]?.id)
// // //                 .is("deleted_at", null);
// // //               if (profile && profile.length > 0) {
// // //                 console.log('examTestSeeds', examTestSeeds)
// // //           const { data, error2 } = await supabase
// // //             .from("exam_test_participants")
// // //             .insert(examTestSeeds)
// // //             .select();
// // //                 // const {data: profile1, error} = await supabase.from('exam_profiles')
// // //                 //                             .update([
// // //                 //                               {updated_at: new Date().toISOString(), refresh_token: token}
// // //                 //                             ])
// // //                 //                             // .eq('refresh_token', token)
// // //                 //                             .eq('phone_number', decodedToken.username)
// // //                 //                             .is('deleted_at', null)
// // //                 //                             .select()
// // //                 //                             return profile1[0].appl_id
// // //               } else {
// // //                 const { data: profile2, error } = await supabase
// // //                   .from("exam_profiles")
// // //                   .insert([
// // //                     {
// // //                       appl_id: props.applicant[0].id,
// // //                       phone_number: props.applicant[0].phone_number,
// // //                       school_id: applicantSchool||props.applicant[0].applicant_schools[0]?.schools?.school_id,
// // //                       regist_number: props.applicant[0].regist_number,
// // //                       full_name: props.applicant[0].full_name,
// // //                       refresh_token: props.applicant[0].refresh_token,
// // //                       completion_status: "ongoing", 
// // //                     },
// // //                   ])
// // //                   // .eq('refresh_token', token)
// // //                   // .eq('phone_number', decodedToken.username)
// // //                   // .is('deleted_at', null)
// // //                   .select();

// // //                   if(profile2) {
                    
// // //           const { data, error2 } = await supabase
// // //             .from("exam_test_participants")
// // //             .insert(examTestSeeds)
// // //             .select();
// // //                   }
// // //               }
        
// // //           // }, 1000);

          
// // //           }
// // //         }
// // //         // { exam_test_id: 'ef98fdc4-c363-4f5e-a84d-f488ccfff00a', appl_id: props.applicant[0].appl_id, schedule_id: 'fc67ba46-699b-464b-af15-c7e2aa3ad5a6' },
// // //         //     { exam_test_id: '697f3013-89a1-4f89-86bd-5ffb2bb5ad0d', appl_id: props.applicant[0].appl_id, schedule_id: 'fc67ba46-699b-464b-af15-c7e2aa3ad5a6' }
        
// // //     }

// // //     // console.log('examData', examData)
// // //   };


// // //   const handleOpen = (value) => {
// // //     setOpen( open ===value ? 0 : value)
// // //   }

// // //   const loginExamWithParams = () => {
// // //     console.log(token)
// // //     const params = { auth: token};
// // //     window.location.href=`${EXAM_URL}/login?${createSearchParams(params)}`
// // //     sessionStorage.setItem('token-auth', token)
// // //     // navigate({
// // //     //   pathname: `${EXAM_URL}/login`,
// // //     //   search: `?${createSearchParams(params)}`,
// // //     // });
// // //   };


// // //   const getSubmissionStatus = (value=null) => {
// // //     console.log('value', value)
// // //     // const { data: participants , error} = await supabase.from("participants")
// // //     //                       .select("submission_status, applicants(full_name, refresh_token)")
// // //     //                       .eq('applicants.refresh_token', userToken)
// // //                           // .single()

// // //     // getSubmissionStatusDesc
// // //     // if(error)
// // //     //   console.log(error)

// // //     // if(participants.length > 0){
// // //     //   setParticipant(participants[0])
// // //     // }
// // //     let text = "Pengisian Formulir" ;
    
// // //     if(value){

// // //       // if(value=="awaiting_processing"){
// // //       //   text = "Formulir Diproses" 
// // //       //   // setSubmissionStatus(text)
// // //       // }
// // //       if(value=="on_exam"){
// // //         text = "Mengikuti Seleksi" 
// // //         // setSubmissionStatus(text)
// // //       }
// // //       if(value=="initial_submission"){
// // //         text = "Pengisian Formulir" 
// // //         // setSubmissionStatus(text)
// // //       }
// // //       // if(value??"initial_submission"){
// // //       //   text = "Pengisian Formulir" 
// // //       //   // setSubmissionStatus(text)
// // //       // }
// // //       if(value=="accepted"){
// // //         text = "LULUS" 
// // //         // setSubmissionStatus(text)
// // //       }
// // //       if(value=="not_accepted"){
// // //         text = "Tidak Lulus" 
// // //         // setSubmissionStatus(text)
// // //       }
// // //       if(value=="on_measurement"){
// // //         text = "Pengukuran Seragam" 
// // //         // setSubmissionStatus(text)
// // //       }

// // //       // setSubmissionStatus(text)
// // //       // return text
// // //     }else{
// // //       // setSubmissionStatus(text)
// // //     }

    
// // // console.log(text, value)
// // //     return text
// // //     // if(participants.submission_status=="awaiting_processing"){
// // //     //   const text = "Formulir Diproses" 
// // //     //   setSubmissionStatus(text)
// // //     // }
// // //     // if(participants.submission_status=="on_exam"){
// // //     //   const text = "Mengikuti Seleksi" 
// // //     //   setSubmissionStatus(text)
// // //     // }
// // //     // if(participants.submission_status=="initial_submission"){
// // //     //   const text = "Pengisian Formulir" 
// // //     //   setSubmissionStatus(text)
// // //     // }
// // //     // if(participants?.submission_status??"initial_submission"){
// // //     //   const text = "Pengisian Formulir" 
// // //     //   setSubmissionStatus(text)
// // //     // }
// // //     // if(participants?.submission_status=="accepted"){
// // //     //   const text = "LULUS" 
// // //     //   setSubmissionStatus(text)
// // //     // }
// // //     // if(participants?.submission_status=="not_accepted"){
// // //     //   const text = "Tidak Lulus" 
// // //     //   setSubmissionStatus(text)
// // //     // }

// // //   }

// // //   const download = () => {
// // //         fetch("https://cnpcpmdrblvjfzzeqoau.supabase.co/storage/v1/object/sign/uploads/student_submissions/Surat%20Orang%20Tua%20Siap%20Mengikuti%20Aturan%20RIS.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80MzczNjc5MC01MTU4LTQ5N2YtOTUwOS1mM2Y0NDU2NzBiYWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1cGxvYWRzL3N0dWRlbnRfc3VibWlzc2lvbnMvU3VyYXQgT3JhbmcgVHVhIFNpYXAgTWVuZ2lrdXRpIEF0dXJhbiBSSVMucGRmIiwiaWF0IjoxNzQ4OTQ4MTAyLCJleHAiOjE3ODA0ODQxMDJ9.3NiPzmZ-zD2PTvq3JNNU1DnQi3ciIs33ChwF5UNiDo8").then((response) => {
// // //             response.blob().then((blob) => {
// // //                 const fileURL =
// // //                     window.URL.createObjectURL(blob);
// // //                 let alink = document.createElement("a");
// // //                 alink.href = fileURL;
// // //                 alink.download = "Surat Orang Tua Siap Mengikuti Aturan RIS.pdf";
// // //                 alink.click();
// // //             });
// // //         });
// // //     };
// // //   const download_surat_kesanggupan = () => {
// // //         fetch((applicantSchool===1 || applicantSchool == 2 || applicantSchool == 3 || applicantSchool == 6)? "https://cnpcpmdrblvjfzzeqoau.supabase.co/storage/v1/object/sign/uploads/student_submissions/SURAT%20KESANGGUPAN-FULLDAY.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80MzczNjc5MC01MTU4LTQ5N2YtOTUwOS1mM2Y0NDU2NzBiYWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1cGxvYWRzL3N0dWRlbnRfc3VibWlzc2lvbnMvU1VSQVQgS0VTQU5HR1VQQU4tRlVMTERBWS5wZGYiLCJpYXQiOjE3NTc2NDgwNjQsImV4cCI6MTc4OTE4NDA2NH0.mCRdS-e9Q_dIUCTGj67KPl6MLYYPP-3cSoDqVxuNuCU": "https://cnpcpmdrblvjfzzeqoau.supabase.co/storage/v1/object/sign/uploads/student_submissions/Surat%20Orang%20Tua%20Siap%20Mengikuti%20Aturan%20RIS.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80MzczNjc5MC01MTU4LTQ5N2YtOTUwOS1mM2Y0NDU2NzBiYWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1cGxvYWRzL3N0dWRlbnRfc3VibWlzc2lvbnMvU3VyYXQgT3JhbmcgVHVhIFNpYXAgTWVuZ2lrdXRpIEF0dXJhbiBSSVMucGRmIiwiaWF0IjoxNzQ4OTQ4MTAyLCJleHAiOjE3ODA0ODQxMDJ9.3NiPzmZ-zD2PTvq3JNNU1DnQi3ciIs33ChwF5UNiDo8").then((response) => {
// // //             response.blob().then((blob) => {
// // //                 const fileURL =
// // //                     window.URL.createObjectURL(blob);
// // //                 let alink = document.createElement("a");
// // //                 alink.href = fileURL;
// // //                 alink.download = "Surat Kesanggupan.pdf";
// // //                 alink.click();
// // //             });
// // //         });
// // //     };
// // //   const download_kartu_seleksi = () => {
// // //         fetch("https://cnpcpmdrblvjfzzeqoau.supabase.co/storage/v1/object/public/exams/uploads/templates/Kartu-Seleksi-Sample.pdf").then((response) => {
// // //             response.blob().then((blob) => {
// // //                 const fileURL =
// // //                     window.URL.createObjectURL(blob);
// // //                 let alink = document.createElement("a");
// // //                 alink.href = fileURL;
// // //                 alink.download = "Kartu Seleksi.pdf";
// // //                 alink.click();
// // //             });
// // //         });
// // //     };

// // //   const getToken = () => {
// // //     console.log('auth_token', auth_token)
// // //     setToken(auth_token)
// // //   }

// // //   const loginExam = () => {
// // //     setSearchParams()
// // //   }
  
// // //   return (
   
// // //         <section className="relative">
// // //              {/* Section background (needs .relative class on parent and next sibling elements) */}
// // //           {/* <div className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-900 pointer-events-none" aria-hidden="true"></div> */}
// // //           {/* <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div> */}
    
// // //           <div className="relative max-w-6xl mx-auto bg-gray-200 px-4 sm:px-6" >
// // //               <div className="py-3 md:py-5">
// // //                 <div className="rounded-2xl relative bg-white p-5">
// // //                   <h3 className="h3 mb-4 ">Pengumuman</h3>
// // //                   <div className="rounded-2xl" style={{ height: '5px', backgroundColor: 'green', position: 'absolute',left: '+10px', top: '-1px', width: 'calc(97% - 10px)' }}></div>
// // //                   <div className='text-gray-900 mt-2 text-center'>
// // //                     <p>
// // //                     Jazaakumullahu khayran telah mendaftar di Rabbaanii Islamic School, status pendaftaran saat ini:
// // //                     </p>
// // //                     {/* Status : */}
// // //                     <br />
// // //                     <span className="rounded-md w-24 bg-green-100 px-3 py-2 mt-15 text-base font-medium text-green-700 ring-1 ring-inset ring-green-600/10">
// // //                         {getSubmissionStatus(props.participant.submission_status)??'Pengisian Formulir-]'}
                          
// // //                     </span>

// // //                     {/* <AdmissionFlowShort/> */}
                    
                  
                   
// // //                     <div className='flex flex-col gap-1 px-2 mt-10'>
// // //                       {props.participant.submission_status ==='initial_submission' && 
// // //                       <>
// // //                       <button onClick={download_surat_kesanggupan} className='btn w-full block btn-sm text-sm text-gray-200 bg-green-900 hover:bg-gray-800'
// // //                       >Download Surat Kesanggupan <TbDownload className='ml-2'/>
// // //                       </button> <br />
// // //                       </>
// // //                       }
// // //                       {/* <button onClick={download} className='btn w-full block btn-sm m-2 text-sm text-gray-200 bg-green-900 hover:bg-gray-800'
// // //                                                   // onClick={() => {
// // //                                                   //     // currentStep === steps.length
// // //                                                   //     //   ? setComplete(true)
// // //                                                   //     //   : setCurrentStep((prev) => prev + 1); 
// // //                                                   //     if(props.currentStep === 9){
// // //                                                   //     props.handledComplete(true)
// // //                                                   //     }else{
// // //                                                   //     // props.handledCurrentStep(props.currentStep + 1) ;
// // //                                                   //     // props.setCurrentStep((prev) => prev + 1);
// // //                                                   //     // callback(data)
// // //                                                   //     }
// // //                                                   //     // handleSubmit 
// // //                                                   // }}
// // //                                                   >Download Surat Pengumuman</button> <br /> */}
                                                  
// // //                       {(props.participant.submission_status==='on_exam' || props.participant.submission_status==='initial_submission') && props.participant.is_complete && new Date() == new Date(examData?.exam_tests?.started_at) && (
// // //                         <PDFDownloadLink document={<ExamInvitationCard examData={examData} profileData={profileData} dataApplicant={props.applicant[0]} />} fileName="Kartu-Seleksi.pdf">
// // //                           {/* <div className="flex flex-col justify-between item-center"> */}
// // //                                                   <button  className='btn w-full btn-sm my-5 text-center text-gray-200 bg-green-900 hover:bg-gray-800'
// // //                                                                           onClick={() => {
                                                                              
// // //                                                                           }}
// // //                                                                           >Cetak Kartu Seleksi 
// // //                                                                           <TbDownload className='ml-2'/>
// // //                                                                           </button>

// // //                           {/* </div> */}
// // //                                                             {/* <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
// // //                                                               Download PDF
// // //                                                             </button> */}
// // //                                                           </PDFDownloadLink>
// // //                       // <button type="submit" className='btn w-full block btn-sm m-2 text-sm text-gray-200 bg-green-900 hover:bg-gray-800'
// // //                       // onClick={window.open("")}
// // //                       //                             >Download Undangan Seleksi</button>
// // //                       )}
// // //                       {(props.participant.submission_status==='on_exam' || props.participant.submission_status==='initial_submission') && props.participant.is_complete && examData?.length==0 && (
// // // <button onClick={download_kartu_seleksi} className='btn w-full block btn-sm text-sm text-gray-200 bg-green-900 hover:bg-gray-800'
// // //                       >Cetak Kartu Seleksi<TbDownload className='ml-2'/>
// // //                       </button> 
// // //                         // <PDFDownloadLink document={<ExamInvitationCard examData={examData} profileData={profileData} dataApplicant={props.applicant[0]} />} fileName="Kartu-Seleksi.pdf">
// // //                           // {/* <div className="flex flex-col justify-between item-center"> */}
// // //                                                   // <button  className='btn w-full btn-sm my-5 text-center text-gray-200 bg-green-900 hover:bg-gray-800'
// // //                                                   //                         onClick={() => {
                                                                              
// // //                                                   //                         }}
// // //                                                   //                         >Cetak Kartu Seleksi 
// // //                                                   //                         <TbDownload className='ml-2'/>
// // //                                                   //                         </button>

// // //                           // {/* </div> */}
// // //                                                             // {/* <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
// // //                                                             //   Download PDF
// // //                                                             // </button> */}
// // //                                                           // </PDFDownloadLink>
// // //                       // <button type="submit" className='btn w-full block btn-sm m-2 text-sm text-gray-200 bg-green-900 hover:bg-gray-800'
// // //                       // onClick={window.open("")}
// // //                       //                             >Download Undangan Seleksi</button>
// // //                       )}

// // //                       {(examData?.exam_tests?.started_at == new Date()) && (
// // //                       <div className='flex flex-col gap-2 my-2'>
// // //                       <span className='my-5'>Ananda {participant.full_name} disilahkan melanjutkan ke tahap Seleksi.
// // //                       </span>
// // //                       <p className='text-sm'>Silakan klik login untuk melaksanakan ujian.</p>
// // //                       <button className='btn w-full block btn-sm text-sm text-gray-200 bg-orange-700 hover:bg-gray-700 my-5'
// // //                       onClick={() => loginExamWithParams()}>
// // //                         Login Ujian
// // //                         <FiExternalLink className='ml-1'/>
// // //                       </button>
// // //                       </div>
// // //                         )}

// // //                       {/* {submission_status == 'accepted' && (
// // //                       <button type="submit" className='btn w-full block btn-sm m-2 text-sm text-gray-200 bg-green-900 hover:bg-gray-800'
// // //                       onClick=""
// // //                       >
// // //                         Download Surat Pernyataan Wali Santri</button>
// // //                         )} */}
                                              
// // //                     </div>
// // //                     {props.participant.submission_status === 'on_measurement' || props.participant.submission_status === 'accepted' && (
// // //                       <div className='flex flex-grow gap-4 px-2 mt-2'>
// // //                         <button type="submit" className='btn w-full block btn-sm -p-2 text-sm text-gray-200 bg-orange-900 hover:bg-gray-800'
// // //                                                     onClick={() => {
// // //                                                         props.setCurrentStep(10)
// // //                                                         props.toUniformClick()
// // //                                                         // currentStep === steps.length
// // //                                                         //   ? setComplete(true)
// // //                                                         //   : setCurrentStep((prev) => prev + 1); 
// // //                                                         // if(props.currentStep === 9){
// // //                                                         // props.handledComplete(true)
// // //                                                         // }else{
// // //                                                         // // props.handledCurrentStep(props.currentStep + 1) ;
// // //                                                         // // props.setCurrentStep((prev) => prev + 1);
// // //                                                         // // callback(data)
// // //                                                         // }
// // //                                                         // handleSubmit 
// // //                                                     }}
// // //                                                     >Pengukuran Seragam</button>
// // //                       </div>
// // //                     )}
                    
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               {/* <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
// // //                 <h2 id="accordion-flush-heading-1">
// // //                   <button type="button" className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
// // //                     <span>Peta Pendaftaran</span>
// // //                     <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
// // //                       <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
// // //                     </svg>
// // //                   </button>
// // //                 </h2>
// // //                 <div id="accordion-flush-body-1" className="hidden" aria-labelledby="accordion-flush-heading-1">
// // //                   <div className="py-5 border-b border-gray-200 dark:border-gray-700">
// // //                     <p className="mb-2 text-gray-500 dark:text-gray-400">sdsd
// // //                       <AdmissionFlowShort/>
// // //                     </p>
// // //                     <p className="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" className="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
// // //                   </div>
// // //                 </div>
// // //               </div> */}

// // //               {/* <AdmissionFlow/> */}
// // //               <div className="relative max-w-6xl mx-auto bg-gray-200" >
// // //                 <div className="py-2 md:py-1">
// // //                   {/* style={{ height: '320px', width:"465px", backgroundColor: 'white', padding: '10px', position: 'relative' }} */}
// // //                   <div className="rounded-2xl relative bg-white p-5">
// // //                     <Accordion open={open === 1}>
// // //                     <AccordionHeader onClick={() => handleOpen(1)} className='flex justify-between items-center '>
// // //                       <p className='flex-1'>
// // //                         Peta Status Calon Santri
// // //                       </p> 
// // //                       <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
// // //                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
// // //                       </svg>
// // //                     </AccordionHeader>
// // //                     <div className="border-b border-gray-900/10"></div>
                    
// // //                     <AccordionBody>
// // //                       <AdmissionFlow submission_status={props.participant.submission_status}/>
// // //                       {/* We&apos;re not always in the position that we want to be at. We&apos;re constantly
// // //                       growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
// // //                       ourselves and actualize our dreams. */}
// // //                     </AccordionBody>
// // //                   </Accordion>

// // //                   </div>
// // //                 </div>
// // //               </div>
// // //               <div className="relative max-w-6xl mx-auto bg-gray-200" >
// // //                 <div className="py-2 md:py-1">
// // //                   <div className="rounded-2xl relative bg-white p-5">
// // //                     <Accordion open={open === 2}>
// // //                     <AccordionHeader onClick={() => handleOpen(2)} className='flex justify-between items-center '>
// // //                       <p className="flex-1">
// // //                         Berkas Syarat Pendaftaran
// // //                       </p>
// // //                       <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
// // //                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
// // //                       </svg>
// // //                       </AccordionHeader>
// // //                     <div className="border-b border-gray-900/10"></div>
                    
// // //                     <AccordionBody>
// // //                       <ul className="list-disc pl-5 space-y-2 text-gray-700">
// // //                       <li>Akta Kelahiran (PDF).</li>
// // //                       <li>Pasfoto Background Merah(3x4) maksimal 1MB (JPEG, JPG, PNG).</li>
// // //                       {/* <li>KTP Orang Tua / Wali.</li> */}
// // //                       <li>Kartu Keluarga (KK) (PDF).</li>
// // //                       <li>Surat Kesanggupan (PDF).</li>
// // //                       <li>Sertifikat / Syahadah Hafalan (Jika ada) (PDF).</li>
// // //                       </ul>
// // //                       {/* We&apos;re not always in the position that we want to be at. We&apos;re constantly
// // //                       growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
// // //                       ourselves and actualize our dreams. */}
// // //                     </AccordionBody>
// // //                   </Accordion>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             {/* <div className="relative max-w-6xl mx-auto bg-gray-200 mb-12">
// // //               <div className="py-2 md:py-1">
// // //                 <div className="rounded-2xl relative bg-white p-5">
// // //                   <Accordion open={open === 3}>
// // //                   <AccordionHeader onClick={() => handleOpen(3)} className='flex justify-between items-center '>
// // //                     <p className="flex-1">
// // //                       Ketentuan Upload Berkas
// // //                     </p>
// // //                     <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
// // //                       <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
// // //                     </svg>
// // //                   </AccordionHeader>
// // //                   <div className="border-b border-gray-900/10"></div>
                  
// // //                   <AccordionBody>
// // //                     <ul className="list-disc pl-5 space-y-2 text-gray-700">
// // //                     <li>Berkas dapat dibaca dengan jelas.</li>
// // //                     <li>Ukuran berkas di bawah 5 MB.</li>
// // //                     <li>Pasfoto ukuran 3 cm x 4 cm.</li>
// // //                     <li>Pasfoto latar belakang polos berwarna merah.</li>
// // //                     <li>File pasfoto bertipe JPG/JPEG.</li>
// // //                     <li>Ukuran minimal file pasfoto adalah 40 KB.</li>
// // //                     <li>Ukuran maksimal file pasfoto adalah 1 MB</li>
// // //                     <li>File bertipe PDF, selain dari pasfoto.</li>
// // //                     <li>Orientasi pasfoto adalah vertikal/potrait</li>
// // //                     <li>Posisi badan dan kepala tegak sejajar menghadap kamera.</li>
// // //                     <li>Kualitas foto harus tajam dan fokus</li>
// // //                     <li>Tidak ada bagian kepala yang terpotong dan wajah tidak boleh tertutupi ornamen</li>
// // //                     <li>Kepala terletak di tengah secara horisontal (jarak kepala ke batas kiri kurang lebih sama dengan jarak kepala ke batas kanan)</li>
// // //                     dengan resolusi minimal 200pxx300px (+250 dpl) dan rasio aspek 2:3
// // //                 </ul>
// // //                     We&apos;re not always in the position that we want to be at. We&apos;re constantly
// // //                     growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
// // //                     ourselves and actualize our dreams.
// // //                   </AccordionBody>
// // //                 </Accordion>
// // //                 </div>
// // //               </div>
// // //             </div> */}

// // //             </div>
// // //           </section>
        
    
     
// // //   )
// // // }

// // // export default Announcement