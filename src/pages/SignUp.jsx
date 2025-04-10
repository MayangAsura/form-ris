import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Header from '../partials/Header';
import Banner from '../partials/Banner';
import supabase from '../client/supabase_client'
import { createClient } from '@supabase/supabase-js'
// import {Toaster, Position} from  @blue

function SignUp() {

  // Use a custom domain as the supabase URL
  // const supabase = createClient(process.env.VITE_SUPA_PROJECT_URL, process.env.VITE_SUPA_API_KEY_PUBLIC)
  // const supabase = createClient('https://cnpcpmdrblvjfzzeqoau.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNucGNwbWRyYmx2amZ6emVxb2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxMDc5MjgsImV4cCI6MjA0ODY4MzkyOH0.KDzEImvYqvh6kv9o5eMuWzWuYZIElWNtPyWDdLMi46w' )

  // console.log(process.env.SUPA_PROJECT_URL)

  const [applicants, setApplicants] = useState([])
  const [full_name, setFullName] = useState("")
  const [gender, setGender] = useState("")
  const [phone_number, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [school_id, setSchoolId] = useState("")
  const [school_name, setSchoolName] = useState("")
  const [password, setPassword] = useState("")
  const [media, setMedia] = useState("")
  

  useEffect( () => {
    // getSchoolIdSchoolName()
  },[])
  // const [applicants, setApplicants] = useState({
  //   full_name: "",
  //   gender: "",
  //   phone_number
  // })
  let {code} = useParams()
  // console.log(code)
  
  switch (code) {
    case 'tkit-a': setSchoolId(1); setSchoolName('TKIT A Rabbaanii Islamic School'); 
    break;
    case 'tkit-b': setSchoolId(1); setSchoolName('TKIT B Rabbaanii Islamic School'); 
    break;
    case 'sdit': setSchoolId(2); setSchoolName('SDIT Rabbaanii Islamic School'); 
    break;
    case 'smpi': setSchoolId(3); setSchoolName('SMPI Rabbaanii Islamic School'); 
    break;
    case 'smai': setSchoolId(4); setSchoolName('SMAI Rabbaanii Islamic School'); 
    break;
    case 'smp-pesantren': setSchoolId(5); setSchoolName('SMP Pesantren Rabbaanii Islamic School'); 
    break;
    case 'sma-pesantren': setSchoolId(6); setSchoolName('SMA Pesantren  Rabbaanii Islamic School'); 
    break;
    case 'rabbaanii-ciwidey': setSchoolId(7); setSchoolName('Rabbaanii Ciwidey'); 
    break;
    default: setSchoolId(0); setSchoolName(''); 
      break;
  }
  console.log(code, school_id, school_name)
    
      // let code_jenjang = useParams()
      // console.log(code_jenjang)
      // if (code_jenjang==='tkit-a'){
      //   setSchoolId(1) 
      //   setSchoolName('TKIT A Rabbaanii Islamic School'); 
        
      // }
      // if (code_jenjang==='tkit-b'){
      //   setSchoolId(1)
      //   setSchoolName('TKIT B Rabbaanii Islamic School'); 
      // }
      // if (code_jenjang==='sdit'){
      //   setSchoolId(2)
      //   setSchoolName('SDIT Rabbaanii Islamic School'); 
      // }
      // if (code_jenjang==='smpi'){
      //   setSchoolId(3)
      //   setSchoolName('SMPI Rabbaanii Islamic School'); 
      // }
      // if (code_jenjang==='smai'){
      //   setSchoolId(4)
      //   setSchoolName('SMPI Rabbaanii Islamic School'); 
      // }
      // if (code_jenjang==='smp-pesantren'){
      //   setSchoolId(5)
      //   setSchoolName('SMPI Rabbaanii Islamic School'); 
      // }
      // if (code_jenjang==='sma-pesantren'){
      //   setSchoolId(6)
      //   setSchoolName('SMPI Rabbaanii Islamic School'); 
      // }
      // if (code_jenjang==='rabbaanii-ciwidey'){
      //   setSchoolId(7)
      //   setSchoolName('SMPI Rabbaanii Islamic School'); 
      // }

    
  console.log(school_id)
  console.log(school_name)
  console.log(password)
  // useEffect(() => {

  //   // fetch(process.env.SUPA_PROJECT_URL+"/rest/v1/applicants?select=*",{
  //   //   method: 'GET',
  //   //   headers: {
  //   //     'apikey': process.env.SUPA_API_KEY_PUBLIC,
  //   //     "Content-type" :  "application/json; charset =UTF-8",
  //   //     'Authorization' :  'Bearer '+ process.env.SUPA_API_KEY_PUBLIC
  //   //   }
  //   // })
  //   //   .then(response => response.json())
  //   //   .then(json => setApplicants(json))
  // }, [])


  const addApplicants = async (e) =>{
    e.preventDefault()
    // const full_name = setFull_name.trim()
    // const gender = newgender.trim()
    // const phone_number = newphone_number.trim()
    // const email = newemail.trim()
    // const school_id = newschool_id.trim()
    // const password = newpassword.trim()
    // console.log(full_name)
    // console.log(school_id)
    // console.log(gender)
    // console.log(email)
    // console.log(password)
    console.log(full_name)

    // const newapplicants =  {full_name, gender, phone_number, email, password}
  
    // console.log(newapplicants)
    
    // const { data, error } = await supabase
    //   .from('applicants')
    //   .insert([
    //     newapplicants
    //   ])
    //   .single()

    //   if(error){
    //     console.log(error)
    //   }else{
    //     console.log(data)
    //   }

    let { data_applicant, error_applicants } = await supabase.rpc("add_new_applicant", {
      _full_name: full_name,
      _gender: gender,
      _phone_number: phone_number,
      _email: email,
      _password: password,
      _school_id: parseInt(school_id),
      _media: media
    });

    console.log('data_applicant =>', data_applicant)
    
    // const user_id = data_applicants.f1.toISOString()
    // const created_at = data_applicants.f2.toISOString()

    // const { data_regist_num, error_regist_num } = await supabase.rpc("generate_registration_num", {
    //   _school_id: school_id,
    //   _user_id: user_id,
    //   _created_at: created_at
    // });


  
    // console.log('data_regist_num =>', data_regist_num)
    //   checkout.process("DXXXXS875LXXXX32IJZ7", {
    //     defaultLanguage: "id", //opsional pengaturan bahasa
    //     currency: "USD", //optional to set rate estimation
    //     successEvent: function(result){
    //     // tambahkan fungsi sesuai kebutuhan anda
    //         console.log('success');
    //         console.log(result);
    //         alert('Payment Success');
    //     },
    //     pendingEvent: function(result){
    //     // tambahkan fungsi sesuai kebutuhan anda
    //         console.log('pending');
    //         console.log(result);
    //         alert('Payment Pending');
    //     },
    //     errorEvent: function(result){
    //     // tambahkan fungsi sesuai kebutuhan anda
    //         console.log('error');
    //         console.log(result);
    //         alert('Payment Error');
    //     },
    //     closeEvent: function(result){
    //     // tambahkan fungsi sesuai kebutuhan anda
    //         console.log('customer closed the popup without finishing the payment');
    //         console.log(result);
    //         alert('customer closed the popup without finishing the payment');
    //     }
    // }); 
  
    
    // if(full_name && gender && phone_number && email && school_id && password){
    //   fetch("https://cnpcpmdrblvjfzzeqoau.supabase.co/rest/v1/applicants", {
    //     method: 'POST',
    //     body: JSON.stringify({full_name, gender, phone_number, email, school_id, password}), 
    //     headers: {
    //       "Content-type" :  "application/json; charset =UTF-8"
        
    //     }
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //     setApplicants([...applicants, data])
    //     setNewFull_name("")
    //     setNewGender("")
    //     setNewPhone_number("")
    //     setNewEmail("")
    //     setNewSchool_id("")
    //     setNewPassword("")
    //     console.log(data)
    //     // AppToaster.show({
    //     //   message: "User added successfully",
    //     //   intent: "success",
    //     //   timeout: 3000,
    //     // })

    //   })

    // }


  }

 
  
  return (
    <div className="flex flex-col max-w-lg min-h-screen my-0 mx-auto overflow-hidden relative">
{/* flex flex-col max-w-lg min-h-screen my-0 mx-auto overflow-hidden relative */}
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-12">
                <h1 className="h1">Pra Pendaftaran</h1>
                <p className="text-xl text-gray-600 inline-grid"> 
                  Silahkan melengkapi formulir pra pendaftaran dan informasi pembuatan akun. 
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24">
                <path d="M12 4v8.59l-3.29-3.29L7.41 11l5 5 5-5-1.29-1.29L12 12.59V4h-1.5z"/>
              </svg> */}
            </p>
              </div>
            
              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="full_name">Nama Lengkap <span className="text-red-600">*</span></label>
                      <input id="full_name" name='full_name' onChange={(e) => setFullName(e.target.value)} value={full_name} type="text" className="form-input w-full text-gray-800" placeholder="Enter your name" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="jenis_kelamin">Jenis Kelamin <span className="text-red-600">*</span></label>
                      <input name="gender" onChange={(e) => setGender(e.target.value)} value={gender?gender:'L'} type="radio" className="form-input text-gray-800" placeholder="Enter your email address" required /> <span className='text-gray-800 text-sm font-medium'>Laki-Laki</span>
                      <input name="gender" onChange={(e) => setGender(e.target.value)} value={gender?gender:'P'} type="radio" className="form-input text-gray-800" placeholder="Enter your email address" required /> <span className='text-gray-800 text-sm font-medium'>Perempuan</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="phone_number">No. WhatsApp <span className="text-red-600">*</span></label>
                      <input id="phone_number" name='phone_number' onChange={(e) => setPhoneNumber(e.target.value)} value={phone_number} className="form-input w-full text-gray-800" placeholder="No. WhatsApp aktif" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                      <input id="email" name='email' type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-input w-full text-gray-800" placeholder="Enter your email address" />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="school">Jenjang <span className="text-red-600">*</span></label>
                      <input id="school_id" name='school_id' type="number" hidden disabled onChange={(e) => setSchoolId(e.target.value)} value={school_id} className="form-input w-full text-gray-800" placeholder="" required />
                      <input id="school_name" name='school_name' type="text" disabled onChange={(e) => setSchoolName(e.target.value)} value={school_name} className="form-input w-full text-gray-800" placeholder="" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600">*</span></label>
                      <input id="password" name='password' onChange={(e) => setPassword(e.target.value)} value={password} type="password" className="form-input w-full text-gray-800" placeholder="Enter your password" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="confirm_password">Konfimasi Password <span className="text-red-600">*</span></label>
                      <input id="confirm_password" name='confirm_password' type="password" className="form-input w-full text-gray-800" placeholder="Enter your password" required />
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                      <label htmlFor="media" className="block text-sm font-medium text-gray-900">Darimana Bapak/Ibu Mendapatkan Informasi tentang Rabbaanii Islamic School?</label>
                      <div className="mt-2 grid grid-cols-1">
                          <select id="media" name="media" onChange={(e) => setMedia(e.target.value)} autoComplete="media" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                          <option value={media== 'website'? media:"website"}>Website Rabbaanii </option>
                          <option value="teman/saudara" >Teman / Saudara</option>
                          <option value="karyawan/guru">Karyawan/Guru </option>
                          <option value="kajian">Kajian</option>
                          <option value="spanduk">Spanduk</option>
                          <option value="brosur">Brosur</option>
                          <option value="instagram">Instagram </option>
                          <option value="facebook">Facebook </option>
                          <option value="youtube">Youtube </option>
                          <option value="majalah">Majalah </option>
                          <option value="whatsapp">WhatsApp</option>
                          <option value="koran/pemberitaan_online">Koran / pemberitaan online</option>
                          <option value="tiktok">Tiktok</option>
                          <option value="mesin_pencari">Rekomendasi mesin pencarian internet</option>

                          </select>
                          {/* <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                          <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                          </svg> */}
                      </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button onClick={addApplicants} className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Sign up</button>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                    <Link to="/" className="btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full relative flex items-center">
                                          {/* <svg className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.95 0C3.578 0 0 3.578 0 7.95c0 3.479 2.286 6.46 5.466 7.553.397.1.497-.199.497-.397v-1.392c-2.187.497-2.683-.993-2.683-.993-.398-.895-.895-1.193-.895-1.193-.696-.497.1-.497.1-.497.795.1 1.192.795 1.192.795.696 1.292 1.888.895 2.286.696.1-.497.298-.895.497-1.093-1.79-.2-3.578-.895-3.578-3.975 0-.895.298-1.59.795-2.087-.1-.2-.397-.994.1-2.087 0 0 .695-.2 2.186.795a6.408 6.408 0 011.987-.299c.696 0 1.392.1 1.988.299 1.49-.994 2.186-.795 2.186-.795.398 1.093.199 1.888.1 2.087.496.596.795 1.291.795 2.087 0 3.08-1.889 3.677-3.677 3.875.298.398.596.895.596 1.59v2.187c0 .198.1.497.596.397C13.714 14.41 16 11.43 16 7.95 15.9 3.578 12.323 0 7.95 0z" />
                                          </svg> */}
                                          <span className="">PENDAFTARAN</span>
                                          {/* <svg className="w-4 h-4 fill-current text-gray-400 " viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                                          </svg> */}
                                        </Link>
                    </div>
                  </div>  
                  <div className="text-sm text-gray-500 text-center mt-3">
                      *Pastikan data yang diisi sudah benar. Bila ada pertanyaan seputar Kami, silahkan dapat membuka halaman <a href="https://rabbaanii.sch.id/faq/" className='text-blue-300 underline'>FAQ</a> atau menghubungi CS yang tertera di Web. Baarakallahu fiikum.
                    {/* By creating an account, you agree to the <a className="underline" href="#0">terms & conditions</a>, and our <a className="underline" href="#0">privacy policy</a>. */}
                                </div>
                </form>
                {/* <div className="flex items-center my-6">
                  <div className="border-t border-gray-300 flex-grow mr-3" aria-hidden="true"></div>
                  <div className="text-gray-600 italic">Or</div>
                  <div className="border-t border-gray-300 flex-grow ml-3" aria-hidden="true"></div>
                </div>
                <form>
                  <div className="flex flex-wrap -mx-3 mb-3">
                    <div className="w-full px-3">
                      <button className="btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full relative flex items-center">
                        <svg className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.95 0C3.578 0 0 3.578 0 7.95c0 3.479 2.286 6.46 5.466 7.553.397.1.497-.199.497-.397v-1.392c-2.187.497-2.683-.993-2.683-.993-.398-.895-.895-1.193-.895-1.193-.696-.497.1-.497.1-.497.795.1 1.192.795 1.192.795.696 1.292 1.888.895 2.286.696.1-.497.298-.895.497-1.093-1.79-.2-3.578-.895-3.578-3.975 0-.895.298-1.59.795-2.087-.1-.2-.397-.994.1-2.087 0 0 .695-.2 2.186.795a6.408 6.408 0 011.987-.299c.696 0 1.392.1 1.988.299 1.49-.994 2.186-.795 2.186-.795.398 1.093.199 1.888.1 2.087.496.596.795 1.291.795 2.087 0 3.08-1.889 3.677-3.677 3.875.298.398.596.895.596 1.59v2.187c0 .198.1.497.596.397C13.714 14.41 16 11.43 16 7.95 15.9 3.578 12.323 0 7.95 0z" />
                        </svg>
                        <span className="flex-auto pl-16 pr-8 -ml-16">Continue with GitHub</span>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full px-3">
                      <button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
                        <svg className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                        </svg>
                        <span className="flex-auto pl-16 pr-8 -ml-16">Continue with Google</span>
                      </button>
                    </div>
                  </div>
                </form> */}
                {/* <div className="text-gray-600 text-center mt-6">
                  Already using Simple? <Link to="/signin" className="text-blue-600 hover:underline transition duration-150 ease-in-out">Sign in</Link>
                </div> */}
              </div>

            </div>
          </div>
        </section>

      </main>

      <Banner />

    </div>

    
  );
}

export default SignUp;