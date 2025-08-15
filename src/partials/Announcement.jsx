import React, { useEffect, useState } from 'react'
import { TiPinOutline} from 'react-icons/ti'
import supabase from '../client/supabase_client'
import { useSelector } from 'react-redux'
import axios from 'axios'
import EXAM_URL from '../api/exam-system'
import { useNavigate } from 'react-router-dom'
import AdmissionFlowShort from './AdmissionFlowShort'
import AdmissionFlow from './AdmissionFlow'
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react'

function Announcement(props) {

  const {userToken} = useSelector(state => state.auth)
  const [submission_status, setSubmissionStatus] = useState()
  const [participant, setParticipant] = useState({})
  const [open, setOpen] = useState(1)
  const [token, setToken] = useState("")
  const navigate = useNavigate()


  useEffect(()=>{
    // if(props.participant){
    //   // setSubmissionStatus(props.participant.submission_status)
    // }
    getSubmissionStatus('on_exam')
    if(props.participant.submission_status){
      console.log('masuk-',props.participant.submission_status)
      console.log('status sub in announce', submission_status)
    }else{
      getSubmissionStatus()

    }
    console.log('sub', submission_status)
    console.log('sub props', props.participant)
    if(submission_status=='on_exam'){
      getToken()
    }
  },[props.participant.submission_status])

  const handleOpen = (value) => {
    setOpen( open ===value ? 0 : value)
  }

  const loginExamWithParams = () => {
    const params = { token: token};
    navigate({
      pathname: `${EXAM_URL}/login`,
      search: `?${createSearchParams(params)}`,
    });
  };


  const getSubmissionStatus = async (value=null) => {
    console.log('value', value)
    // const { data: participants , error} = await supabase.from("participants")
    //                       .select("submission_status, applicants(full_name, refresh_token)")
    //                       .eq('applicants.refresh_token', userToken)
                          // .single()

    // getSubmissionStatusDesc
    // if(error)
    //   console.log(error)

    // if(participants.length > 0){
    //   setParticipant(participants[0])
    // }
    let text = "Pengisian Formulir" ;
    
    if(value){

      if((value)=="awaiting_processing"){
        text = "Formulir Diproses" 
        // setSubmissionStatus(text)
      }
      if((value)=="on_exam"){
        text = "Mengikuti Seleksi" 
        // setSubmissionStatus(text)
      }
      if((value)=="initial_submission"){
        text = "Pengisian Formulir" 
        // setSubmissionStatus(text)
      }
      if((value)??"initial_submission"){
        text = "Pengisian Formulir" 
        // setSubmissionStatus(text)
      }
      if((value)=="accepted"){
        text = "LULUS" 
        // setSubmissionStatus(text)
      }
      if((value)=="not_accepted"){
        text = "Tidak Lulus" 
        // setSubmissionStatus(text)
      }

      setSubmissionStatus(text)
    }else{
      setSubmissionStatus(text)
    }

    

    // return text
    // if(participants.submission_status=="awaiting_processing"){
    //   const text = "Formulir Diproses" 
    //   setSubmissionStatus(text)
    // }
    // if(participants.submission_status=="on_exam"){
    //   const text = "Mengikuti Seleksi" 
    //   setSubmissionStatus(text)
    // }
    // if(participants.submission_status=="initial_submission"){
    //   const text = "Pengisian Formulir" 
    //   setSubmissionStatus(text)
    // }
    // if(participants?.submission_status??"initial_submission"){
    //   const text = "Pengisian Formulir" 
    //   setSubmissionStatus(text)
    // }
    // if(participants?.submission_status=="accepted"){
    //   const text = "LULUS" 
    //   setSubmissionStatus(text)
    // }
    // if(participants?.submission_status=="not_accepted"){
    //   const text = "Tidak Lulus" 
    //   setSubmissionStatus(text)
    // }

  }

  const download = () => {
        fetch("https://cnpcpmdrblvjfzzeqoau.supabase.co/storage/v1/object/sign/uploads/student_submissions/Surat%20Orang%20Tua%20Siap%20Mengikuti%20Aturan%20RIS.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80MzczNjc5MC01MTU4LTQ5N2YtOTUwOS1mM2Y0NDU2NzBiYWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1cGxvYWRzL3N0dWRlbnRfc3VibWlzc2lvbnMvU3VyYXQgT3JhbmcgVHVhIFNpYXAgTWVuZ2lrdXRpIEF0dXJhbiBSSVMucGRmIiwiaWF0IjoxNzQ4OTQ4MTAyLCJleHAiOjE3ODA0ODQxMDJ9.3NiPzmZ-zD2PTvq3JNNU1DnQi3ciIs33ChwF5UNiDo8").then((response) => {
            response.blob().then((blob) => {
                const fileURL =
                    window.URL.createObjectURL(blob);
                let alink = document.createElement("a");
                alink.href = fileURL;
                alink.download = "Surat Orang Tua Siap Mengikuti Aturan RIS.pdf";
                alink.click();
            });
        });
    };
  const download_surat_kesanggupan = () => {
        fetch("https://cnpcpmdrblvjfzzeqoau.supabase.co/storage/v1/object/sign/uploads/student_submissions/SURAT%20KESANGGUPAN.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80MzczNjc5MC01MTU4LTQ5N2YtOTUwOS1mM2Y0NDU2NzBiYWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1cGxvYWRzL3N0dWRlbnRfc3VibWlzc2lvbnMvU1VSQVQgS0VTQU5HR1VQQU4ucGRmIiwiaWF0IjoxNzU0OTYwMzU2LCJleHAiOjE4MTgwMzIzNTZ9.SmB_bF7yoepPfs30sIimJJCGLceYfmC9ijCouQih-RA").then((response) => {
            response.blob().then((blob) => {
                const fileURL =
                    window.URL.createObjectURL(blob);
                let alink = document.createElement("a");
                alink.href = fileURL;
                alink.download = "Surat Kesanggupan.pdf";
                alink.click();
            });
        });
    };

  const getToken = () => {
    setToken(userToken)
  }

  const loginExam = () => {
    setSearchParams()
  }
  
  return (
   
        <section className="relative">
             {/* Section background (needs .relative class on parent and next sibling elements) */}
          {/* <div className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-900 pointer-events-none" aria-hidden="true"></div> */}
          {/* <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div> */}
    
          <div className="relative max-w-6xl mx-auto bg-gray-200 px-4 sm:px-6" >
              <div className="py-3 md:py-5">
                <div className="rounded-2xl relative bg-white p-5">
                  <h3 className="h3 mb-4 ">Info</h3>
                  <div className="rounded-2xl" style={{ height: '5px', backgroundColor: 'green', position: 'absolute',left: '+10px', top: '-1px', width: 'calc(97% - 10px)' }}></div>
                  <p className='text-gray-900 mt-2 text-center'>
                    <p>
                    Jazaakumullahu khayran telah mendaftar di Rabbaanii Islamic School, status pendaftaran saat ini:
                    </p>
                    {/* Status : */}
                    <br />
                    <span className="rounded-md w-24 bg-green-100 px-3 py-2 mt-15 text-base font-medium text-green-700 ring-1 ring-inset ring-green-600/10">
                        {submission_status}
                          
                    </span>

                    {/* <AdmissionFlowShort/> */}
                    {props.participant.submission_status === 'on_exam' && (
                      <div className='flex flex-col gap-2 my-2'>
                      <span className='my-5'>Ananda {participant.full_name} dinyatakan LULUS tahap administrasi dan berhak melanjutkan ke tahap Seleksi.
                      </span>
                      <p className='text-sm'>Silakan klik login untuk melaksanakan ujian.</p>
                      <button className='btn w-full block btn-sm text-sm text-gray-200 bg-orange-900 hover:bg-gray-800 my-5'
                      onClick={() => loginExamWithParams()}>
                        Login Ujian
                      </button>
                      </div>
                        )}
                  
                   
                    <div className='flex flex-grow px-2 mt-10'>
                      {/* {submission_status ==='' && } */}
                      <button onClick={download_surat_kesanggupan} className='btn w-full block btn-sm text-sm text-gray-200 bg-green-900 hover:bg-gray-800'
                      >Download Surat Kesanggupan</button> <br />
                      {/* <button onClick={download} className='btn w-full block btn-sm m-2 text-sm text-gray-200 bg-green-900 hover:bg-gray-800'
                                                  // onClick={() => {
                                                  //     // currentStep === steps.length
                                                  //     //   ? setComplete(true)
                                                  //     //   : setCurrentStep((prev) => prev + 1); 
                                                  //     if(props.currentStep === 9){
                                                  //     props.handledComplete(true)
                                                  //     }else{
                                                  //     // props.handledCurrentStep(props.currentStep + 1) ;
                                                  //     // props.setCurrentStep((prev) => prev + 1);
                                                  //     // callback(data)
                                                  //     }
                                                  //     // handleSubmit 
                                                  // }}
                                                  >Download Surat Pengumuman</button> <br /> */}
                      {props.participant.submission_status==='on_exam' && (
                      <button type="submit" className='btn w-full block btn-sm m-2 text-sm text-gray-200 bg-green-900 hover:bg-gray-800'
                      onClick={window.open("")}
                                                  >Download Undangan Seleksi</button>
                      )}
                      {submission_status == 'accepted' && (
                      <button type="submit" className='btn w-full block btn-sm m-2 text-sm text-gray-200 bg-green-900 hover:bg-gray-800'
                      onClick=""
                      >
                        Download Surat Pernyataan Wali Santri</button>
                        )}
                                              
                    </div>
                    {props.participant.submission_status == 'accepted' && (
                      <div className='flex flex-grow gap-4 px-2 mt-2'>
                        <button type="submit" className='btn w-full block btn-sm -p-2 text-sm text-gray-200 bg-orange-900 hover:bg-gray-800'
                                                    onClick={() => {
                                                        setCurrentStep(10)
                                                        // currentStep === steps.length
                                                        //   ? setComplete(true)
                                                        //   : setCurrentStep((prev) => prev + 1); 
                                                        // if(props.currentStep === 9){
                                                        // props.handledComplete(true)
                                                        // }else{
                                                        // // props.handledCurrentStep(props.currentStep + 1) ;
                                                        // // props.setCurrentStep((prev) => prev + 1);
                                                        // // callback(data)
                                                        // }
                                                        // handleSubmit 
                                                    }}
                                                    >Pengukuran Seragam</button>
                      </div>
                    )}
                    
                  </p>
                </div>
              </div>

              {/* <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
                <h2 id="accordion-flush-heading-1">
                  <button type="button" className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
                    <span>Peta Pendaftaran</span>
                    <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                    </svg>
                  </button>
                </h2>
                <div id="accordion-flush-body-1" className="hidden" aria-labelledby="accordion-flush-heading-1">
                  <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">sdsd
                      <AdmissionFlowShort/>
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">Check out this guide to learn how to <a href="/docs/getting-started/introduction/" className="text-blue-600 dark:text-blue-500 hover:underline">get started</a> and start developing websites even faster with components on top of Tailwind CSS.</p>
                  </div>
                </div>
              </div> */}

              {/* <AdmissionFlow/> */}
              <div className="relative max-w-6xl mx-auto bg-gray-200" >
                <div className="py-2 md:py-1">
                  {/* style={{ height: '320px', width:"465px", backgroundColor: 'white', padding: '10px', position: 'relative' }} */}
                  <div className="rounded-2xl relative bg-white p-5">
                    <Accordion open={open === 1}>
                    <AccordionHeader onClick={() => handleOpen(1)}>Peta Status Calon Santri</AccordionHeader>
                    <div className="border-b border-gray-900/10"></div>
                    
                    <AccordionBody>
                      <AdmissionFlow/>
                      {/* We&apos;re not always in the position that we want to be at. We&apos;re constantly
                      growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                      ourselves and actualize our dreams. */}
                    </AccordionBody>
                  </Accordion>

                  </div>
                </div>
              </div>
              <div className="relative max-w-6xl mx-auto bg-gray-200" >
                <div className="py-2 md:py-1">
                  <div className="rounded-2xl relative bg-white p-5">
                    <Accordion open={open === 2}>
                    <AccordionHeader onClick={() => handleOpen(2)}>Berkas Syarat Pendaftaran</AccordionHeader>
                    <div className="border-b border-gray-900/10"></div>
                    
                    <AccordionBody>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Akta Kelahiran (PDF).</li>
                      <li>Pasfoto Background Merah(3x4) (JPEG, JPG).</li>
                      {/* <li>KTP Orang Tua / Wali.</li> */}
                      <li>Kartu Keluarga (KK) (PDF).</li>
                      <li>Surat Kesanggupan (PDF).</li>
                      <li>Sertifikat / Syahadah Hafalan (Jika ada) (PDF).</li>
                      </ul>
                      {/* We&apos;re not always in the position that we want to be at. We&apos;re constantly
                      growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                      ourselves and actualize our dreams. */}
                    </AccordionBody>
                  </Accordion>
                  </div>
                </div>
              </div>
              <div className="relative max-w-6xl mx-auto bg-gray-200 mb-12">
                <div className="py-2 md:py-1">
                  <div className="rounded-2xl relative bg-white p-5">
                    <Accordion open={open === 3}>
                    <AccordionHeader onClick={() => handleOpen(3)}>Ketentuan Upload Berkas</AccordionHeader>
                    <div className="border-b border-gray-900/10"></div>
                    
                    <AccordionBody>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Berkas dapat dibaca dengan jelas.</li>
                      {/* <li>Ukuran berkas di bawah 5 MB.</li> */}
                      <li>Pasfoto ukuran 3 cm x 4 cm.</li>
                      <li>Pasfoto latar belakang polos berwarna merah.</li>
                      <li>File pasfoto bertipe JPG/JPEG.</li>
                      <li>Ukuran minimal file pasfoto adalah 40 KB.</li>
                      <li>Ukuran maksimal file pasfoto adalah 1 MB</li>
                      <li>File bertipe PDF, selain dari pasfoto.</li>
                      {/* <li>Orientasi pasfoto adalah vertikal/potrait</li>
                      <li>Posisi badan dan kepala tegak sejajar menghadap kamera.</li>
                      <li>Kualitas foto harus tajam dan fokus</li>
                      <li>Tidak ada bagian kepala yang terpotong dan wajah tidak boleh tertutupi ornamen</li>
                      <li>Kepala terletak di tengah secara horisontal (jarak kepala ke batas kiri kurang lebih sama dengan jarak kepala ke batas kanan)</li> */}
                      {/* dengan resolusi minimal 200pxx300px (+250 dpl) dan rasio aspek 2:3 */}
                  </ul>
                      {/* We&apos;re not always in the position that we want to be at. We&apos;re constantly
                      growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                      ourselves and actualize our dreams. */}
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