import React, { useEffect, useState } from 'react'

import { createClient } from '@supabase/supabase-js'


function ProfileCard() {

  const supabase = createClient('https://cnpcpmdrblvjfzzeqoau.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNucGNwbWRyYmx2amZ6emVxb2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxMDc5MjgsImV4cCI6MjA0ODY4MzkyOH0.KDzEImvYqvh6kv9o5eMuWzWuYZIElWNtPyWDdLMi46w' )
  const [profileData, setProfileData] = useState({})
  useEffect( () => {
    getProfileData()
  }, [])
  const getProfileData = async () =>{
    const {data, error} = await supabase.from('applicants').select('*').eq('id', '04f84c3c-11e2-4154-8c88-df1e2f3a6c3a')
    if(error){
      console.log(error)
      setProfileData({})
    }else{
      console.log(data)
      setProfileData(data)
    }
  }

  

  return (
    <section className="relative">
         {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-900 pointer-events-none" aria-hidden="true"></div>
      {/* <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div> */}

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4"></h2>
            {/* <p className="text-xl text-gray-600">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat.</p> */}
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto items-start md:max-w-2xl lg:max-w-2xl">
          {/* grid gap-6 md:grid-cols-2 lg:grid-cols-3 */}
            {/* 1st item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
                <div className='max-w-sm mx-auto grid md:grid-cols-2 lg:grid-cols-2 gap-6'>
                    <div className="relative flex flex-col w-2/3">
                    {/* https://psb.pesantrenalirsyad.org/berkas/pia-25-file_foto-3da552f88d5156d5053e1ffc55ac91bd.jpeg?v=264 */}
                        <img src="../src/images/image-formal.png" 
                            className="w-42 h-55  p-1 -mt-1 mb-2"
                            alt="" />
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
                        <h4 className="text-xl font-bold leading-snug tracking-tight mb-1 text-center">{profileData[0]?.full_name?profileData[0].full_name :'mayang'} | 16 Tahun</h4>
                        {/* <p className="text-gray-600 text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                        
                    </div>
                    {/* <span className='text-sm'>Mendaftar Pada :  Sabtu, 12 Maret 2024</span> */}
                    <div className="relative flex flex-col mx-auto my-5 w-full">
                        <span className='text-sm'>Mendaftar Pada : <br /> Sabtu, 12 Maret 2024</span>
                    </div>
    
                </div>
                <table className='table-auto w-full mt-15 '>
                            <tbody>
                                <tr >
                                    <td>No. Pendaftaran </td>
                                    <td>:</td>
                                    <td>ABCDEFG123</td>
                                </tr>
                                <tr>
                                    <td>Jenis Kelamin </td>
                                    <td>:</td>
                                    <td>{profileData[0]?.gender=='L'?'Laki-Laki': 'Perempuan'}</td>
                                </tr>
                                <tr>
                                    <td>No. WhatsApp </td>
                                    <td>:</td>
                                    <td>{profileData[0]?.phone_number}</td>
                                </tr>
                                <tr>
                                    <td>Mendaftar Jenjang </td>
                                    <td>:</td>
                                    <td>SDIT Rabbaanii Islamic School</td>
                                </tr>
                                <tr>
                                    <td>Cita - Cita </td>
                                    <td>:</td>
                                    <td>Pengusaha muslim professional </td>
                                </tr>
                            </tbody>
                        </table>
                
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ProfileCard