import React, { useEffect, useState } from 'react'
import supabase from '../client/supabase_client'

import { useSelector } from 'react-redux'
import InvoicePDF from '../partials/registration_doc/RegistrationCard'
import RegistrationCard from '../partials/registration_doc/RegistrationCard'
// import { createClient } from '@supabase/supabase-js'

import {
  Page,
  Text,
  View,
  Document,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";

function ProfileCard(props) {

  console.log('> ',props.applicant)

  console.log(supabase)
  // const supabase = createClient('https://cnpcpmdrblvjfzzeqoau.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNucGNwbWRyYmx2amZ6emVxb2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxMDc5MjgsImV4cCI6MjA0ODY4MzkyOH0.KDzEImvYqvh6kv9o5eMuWzWuYZIElWNtPyWDdLMi46w' )
  const { userToken, userInfo } = useSelector((state) => state.auth)
  const [profileData, setProfileData] = useState({  school_name:"", full_name:"", gender: "", email:"", phone_number:"", regist_number:"", regist_date:"", dob:"", aspiration:"", is_complete: ""})
  const [age, setAge] = useState("")

  const [dataSummary, setDataSummary] = useState({identitas: {}, sekolahAsal: {}, jenjangTujuan: {}, dataAyah : {}, dataIbu: {}, dataWali: {}, verifikasiKeluarga: {}, pilihan_metode_uangpangkal: {}})
  
  useEffect( () => {
    // getProfileData()

    if(props.applicant.length > 0) {
      console.log('masuk')
      // setProfileData(props.applicant[0])
      
      profileData.school_name = props.applicant[0].applicant_schools[0].schools.school_name
      profileData.full_name = props.applicant[0].full_name
      profileData.gender = props.applicant[0].gender
      profileData.phone_number = props.applicant[0].phone_number
      profileData.regist_number = props.applicant[0].regist_number
      profileData.regist_date = props.applicant[0].created_at

      console.log('profileData>', profileData)

      if(props.applicant[0].participants.length > 0) {
        setProfileData({
          ...profileData, 
          dob: props.applicant[0].participants[0].dob,
          aspiration: props.applicant[0].participants[0].aspiration,
          is_complete: props.applicant[0].participants[0].is_complete
        })

        getDataSummary()
        calculateAge()
        getUsia()
      }
    }

    console.log('DS> ', dataSummary) 
  }, [props.applicant])

  const getDataSummary = () => {
    // full_name: "", gender: "", phone_number: "", email: "", regist_number: "", pob: "", dob: "", child_number:"", child_status: "", distance: "", nationality: "", province:"", region: "", postal_code: "", aspiration: "", nisn: "", kk: ""
    const jenjangTujuan = {
      school_name : props.applicant[0].applicant_schools[0].schools.school_name,
      class : props.applicant[0].applicant_schools[0].schools.class??null
    }
    dataSummary.jenjangTujuan = jenjangTujuan
    const sekolahAsal = {
      prev_school : props.applicant[0].participants[0].prev_school,
      prev_school_address : props.applicant[0].participants[0].prev_school_address
    }
    dataSummary.sekolahAsal = sekolahAsal
    const identitas = {
      full_name: props.applicant[0].full_name,
      gender: props.applicant[0].gender,
      phone_number: props.applicant[0].phone_number,
      email: props.applicant[0].email,
      regist_number: props.applicant[0].regist_number,
      pob: props.applicant[0].participants[0].pob,
      dob: props.applicant[0].participants[0].dob,
      address: props.applicant[0].participants[0].address,
      child_number: props.applicant[0].participants[0].child_number,
      child_status: props.applicant[0].participants[0].child_status,
      distance: props.applicant[0].participants[0].distance,
      nationality: props.applicant[0].participants[0].nationality,
      province: props.applicant[0].participants[0].province,
      region: props.applicant[0].participants[0].region,
      postal_code: props.applicant[0].participants[0].postal_code,
      aspiration: props.applicant[0].participants[0].aspiration,
      nisn: props.applicant[0].participants[0].nisn,
      nik: props.applicant[0].participants[0].nik,
      kk: props.applicant[0].participants[0].kk_number
      
    }
    dataSummary.identitas = identitas

    if(props.applicant[0].participants[0].participant_father_data.length > 0){
      const dataAyah = {
        father_name : props.applicant[0].participants[0].participant_father_data[0].father_name,
        father_academic : props.applicant[0].participants[0].participant_father_data[0].father_academic,
        father_job : props.applicant[0].participants[0].participant_father_data[0].father_job,
        father_salary : props.applicant[0].participants[0].participant_father_data[0].father_salary,
        why_chooses : props.applicant[0].participants[0].participant_father_data[0].why_chooses
      }
      dataSummary.dataAyah = dataAyah

    }
    if(props.applicant[0].participants[0].participant_mother_data.length > 0){
      const dataIbu = {
        mother_name : props.applicant[0].participants[0].participant_mother_data[0].mother_name,
        mother_academic : props.applicant[0].participants[0].participant_mother_data[0].mother_academic,
        mother_job : props.applicant[0].participants[0].participant_mother_data[0].mother_job,
        mother_salary : props.applicant[0].participants[0].participant_mother_data[0].mother_salary
      }
      dataSummary.dataIbu = dataIbu

    }
    if(props.applicant[0].participants[0].participant_wali_data.length > 0){
      const dataWali = {
        wali_name : props.applicant[0].participants[0].participant_wali_data[0].wali_name,
        wali_academic : props.applicant[0].participants[0].participant_wali_data[0].wali_academic,
        wali_job : props.applicant[0].participants[0].participant_wali_data[0].wali_job,
        wali_salary : props.applicant[0].participants[0].participant_wali_data[0].wali_salary
      }
      dataSummary.dataWali = dataWali

    }
    const verifikasiKeluarga = {
      student_category: props.applicant[0].participants[0].student_category
    }
    dataSummary.verifikasiKeluarga = verifikasiKeluarga
    const pilihan_metode_uangpangkal = {
      metode_uang_pangkal: props.applicant[0].participants[0].metode_uang_pangkal
    }
    dataSummary.pilihan_metode_uangpangkal = pilihan_metode_uangpangkal
  }

  
  const getProfileData = async () =>{
    const {data, error} = await supabase.from('applicants').select('applicant_schools(schools(school_name)), full_name, gender, email, phone_number, regist_number, created_at, participants(dob, aspiration))')
                          .eq('refresh_token', userToken)                 
                          .eq('status', 'active')
                          .single()
    // .eq('id', '04f84c3c-11e2-4154-8c88-df1e2f3a6c3a').single()
    if(error){
      console.log(error)
      setProfileData({})
    }else{
      console.log(data.applicant_schools[0].schools.school_name)
      // setProfileData( data => {
      //   profileData.full_name = data.full_name
      //   profileData.gender = data.gender
      // })
      console.log('data > ', data)
      profileData.school_name = data.applicant_schools[0].schools.school_name
      profileData.full_name = data.full_name
      profileData.gender = data.gender
      profileData.email = data.email
      profileData.phone_number = data.phone_number
      profileData.regist_number = data.regist_number
      profileData.regist_date = data.created_at
      profileData.dob = data.participants[0]?.dob
      profileData.aspiration = data.participants[0]?.aspiration
      console.log('prof > ', profileData)
      
    }
  }

  const formatDate = (date) => {
    const dayNames = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    date = new Date(date);
    const dayName = dayNames[date.getDay()];
    const day = date.getDate();
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    const indonesianFormat = `${dayName}, ${day} ${monthName} ${year} ${hour}:${minute} WIB`;
    return indonesianFormat
  }

  const calculateAge = async () => {
    if (profileData.dob){
      const today= new Date()
      const dob = new Date(profileData?.dob)
      console.log(dob.getFullYear())
      let calculatedAge = today.getFullYear() - dob.getFullYear()
      console.log('age>',today.getFullYear())
      const monthDiff = today.getMonth() - dob.getMonth()
      
      if(monthDiff <0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        calculatedAge--
      }
      setAge(calculatedAge)
      console.log(age)
    }
  }

  const getUsia = async () => {
    const now = new Date().getTime()
    // console.log
    const dob = new Date(profileData.dob).getTime() 
    console.log('dob>', profileData.dob)
    // const dob = p.dob
    // .map(d => (d.dob.getTime())) 
    // ?.dob.getTime()
    // const dob2 = dob[0].dob.getTime()
    let timeDiff = Math.abs(now - dob);
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    let usia = Math.round(diffDays/365)
    setAge(usia)
    console.log(age)
    // setUsia(usia)
  }

  

  return (
    <section className="relative">
         {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-green-900 pointer-events-none" aria-hidden="true"></div>
      {/* <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div> */}

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-start items-center pb-12 md:pb-20 pt-10">
            {/* <h3 className="h3 mb-4">Ahlan wa Sahlan, {profileData[0]?.full_name?profileData[0].full_name :'mayang2'}</h3> */}
            <h3 className="h3 mb-4">Ahlan wa Sahlan, Santri Baru Rabbaanii Islamic School.
            </h3>
            <p className="text-xl text-gray-600 inline-grid"> 
              Silahkan melanjutkan proses pendaftaran dengan melengkapi data dan berkas sesuai ketentuan pendaftaran. 
              {/* Petunjuk dan Ketentuan Berkas Pendaftaran dapat dibuka disini.  */}
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24">
                <path d="M12 4v8.59l-3.29-3.29L7.41 11l5 5 5-5-1.29-1.29L12 12.59V4h-1.5z"/>
              </svg> */}
            </p>
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto md:max-w-2xl lg:max-w-2xl">
          {/* grid gap-6 md:grid-cols-2 lg:grid-cols-3 */}
            {/* 1st item */}
            <div className="relative flex flex-col justify-center p-6 bg-white rounded-r-2xl rounded-l-2xl shadow-xl">
                <div className='max-w-lg mx-auto'>
                    <div className="relative flex flex-col w-full">
                    {/* https://psb.pesantrenalirsyad.org/berkas/pia-25-file_foto-3da552f88d5156d5053e1ffc55ac91bd.jpeg?v=264 */}
                        
                        {/* <svg className="w-16 h-16 p-1 -mt-1 mb-2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fillRule="evenodd">
                            <rect className="fill-current text-blue-600" width="64" height="64" rx="32" />
                            <g strokeWidth="2">
                                <path className="stroke-current text-blue-300" d="M34.514 35.429l2.057 2.285h8M20.571 26.286h5.715l2.057 2.285" />
                                <path className="stroke-current text-white" d="M20.571 37.714h5.715L36.57 26.286h8" />
                                <path className="stroke-current text-blue-300" strokeLinecap="square" d="M41.143 34.286l3.428 3.428-3.428 3.429" />
                                <path className="stroke-current text-white" strokeLinecap="square" d="M41.143 29.714l3.428-3.428-3.428-3.429" />
                            </g>
                            </g>
                        </svg> */}
                        {/* <p className="text-gray-600 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                        
                    <img src="/images/image-formal.png" className="text-center object-center" width={180} alt="" />
                    </div>
                    {/* <span className='text-sm'>Mendaftar Pada :  Sabtu, 12 Maret 2024</span> */}
                    
    
                </div>  
                    <h4 className="text-xl font-bold leading-snug tracking-tight my-2 text-center">{profileData.full_name??'-'} | {`${age>0?age:'-'} Tahun`}</h4>
                <table className='table-auto border-separate border-spacing-3 w-full my-15 profile-table'>
                            <tbody>
                                <tr>
                                  <td>
                                  {/* Mendaftar Pada : Sabtu, 12 Maret 2024 */}
                                    {/* <div className="relative flex flex-col mx-auto my-5 justify-end">
                                      <span className='text-sm'>Mendaftar Pada : Sabtu, 12 Maret 2024</span>
                                  </div> */}
                                  </td>
                                </tr>
                                <tr>
                                    <td>No. Pendaftaran </td>
                                    <td>:</td>
                                    <td>{profileData?.regist_number??'-'} </td>
                                </tr>
                                <tr>
                                    <td>Jenis Kelamin </td>
                                    <td>:</td>
                                    <td>{profileData?.gender=='male'?'Laki-Laki': 'Perempuan'}</td>
                                </tr>
                                <tr>
                                    <td>No. WhatsApp </td>
                                    <td>:</td>
                                    <td>{profileData?.phone_number??'-'}</td>
                                </tr>
                                <tr>
                                    <td>Mendaftar Jenjang </td>
                                    <td>:</td>
                                    <td>{profileData?.school_name??'-'}</td>
                                </tr>
                                <tr>
                                    <td>Tanggal Pendaftaran </td>
                                    <td>:</td>
                                    <td>{
                                    formatDate(profileData?.regist_date)
                                    }</td>
                                </tr>
                                <tr className='flex flex-grow w-full justify-center items-center'>
                                  <td>
                                    
                                      {/* </td> */}
                                  </td>
                                  
                                    {/* <td className=''> */}

                                    {/* </td> */}
                                    {/* <td>:</td> */}
                                    {/* <td> */}
                                </tr><tr>
                                  <td className='col'>
                                    
                                  </td>
                                </tr>
                            </tbody>
                        </table>
                        {/* <div className='flex justify-center'> */}
                          <div className="flex justify-center items-center text-center">

                          <blockquote class="text-xl italic font-semibold text-gray-900 dark:text-dark text-center">
                                        <svg class="w-8 h-8 text-gray-400 dark:text-gray-600 mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
                                            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
                                        </svg>
                                        <p>"{profileData?.aspiration??'-'}"</p>
                                    </blockquote>
                          </div>
                          <div className="flex justify-center ">
                                      <div className="border-t-2 border-gray-900/10 pb-12"></div>
                                      <p>Cita - Cita</p>

                          </div>

                                      {/* {profileData?.aspiration??'-'} */}
                        {/* </div> */}
                        {/* <div className=''>
                          <div className="max-w-2xl max-auto my-10">
                            <div className="w-full h-[500px]">
                              <PDFViewer width="100%" height="100%">
                                <RegistrationCard dataSummary={dataSummary} />
                              </PDFViewer>
                            </div>
                          </div>
                        </div> */}
                        {profileData.is_complete && (
                          <PDFDownloadLink document={<RegistrationCard dataSummary={dataSummary}/>} fileName="Kartu-Pendaftaran.pdf">
                          <button  className='btn w-full py-3 btn-sm my-5  text-gray-200 bg-green-900 hover:bg-gray-800'
                                                  onClick={() => {
                                                      
                                                  }}
                                                  >Cetak Kartu Pendaftaran</button>
                                    {/* <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                                      Download PDF
                                    </button> */}
                                  </PDFDownloadLink>

                        )}
                        <div className='my-3'>
                          
                        </div>
                
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ProfileCard