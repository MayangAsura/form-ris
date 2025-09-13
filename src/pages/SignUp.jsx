import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import Header from '../partials/Header';
import Banner from '../partials/Banner';
import supabase from '../client/supabase_client'
import { createClient } from '@supabase/supabase-js'
import { ScaleIcon } from '@heroicons/react/24/solid';
import Modal from '../utils/Modal';
// import {Toaster, Position} from  @blue
import Swal from '../utils/Swal'
// import { Spinner } from "flowbite-react";

import { useRegister } from '../features/hooks/use-register';

import wablas from '../api/wablas';
// import axios from '../api/local-server';
import axios from '../api/prod-server';
import { stringify } from 'postcss';
const SEND_MSG_URL ='/send-message'

function SignUp() {

  // Use a custom domain as the supabase URL
  // const supabase = createClient(process.env.VITE_SUPA_PROJECT_URL, process.env.VITE_SUPA_API_KEY_PUBLIC)
  // const supabase = createClient('https://cnpcpmdrblvjfzzeqoau.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNucGNwbWRyYmx2amZ6emVxb2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxMDc5MjgsImV4cCI6MjA0ODY4MzkyOH0.KDzEImvYqvh6kv9o5eMuWzWuYZIElWNtPyWDdLMi46w' )

  // console.log(process.env.SUPA_PROJECT_URL)

  const [applicants, setApplicants] = useState([])
  const [dataAppTemp, setDataAppTemp] = useState({})
  const [full_name, setFullName] = useState("")
  const [gender, setGender] = useState("")
  const [phone_number, setPhoneNumber] = useState("")
  const [_phone_number, set_PhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [school_id, setSchoolId] = useState("")
  const [school_name, setSchoolName] = useState("")
  const [subschool, setSubschool] = useState("")
  const [password, setPassword] = useState("")
  const [temp_password, setTempPassword] = useState("")
  const [confirm_password, setConfirmPassword] = useState("")
  const [media, setMedia] = useState("website")
  const [dob, setDob] = useState("")
  const [modal_show, setModalShow] = useState(false)
  const [modal_data, setModalData] = useState({
    type: "",
    title: "",
    message: "",
    text: "OK",
    url: "/login",
    // url: "https://wa.me/628123523434?text=Assalamu'alaikum%20warahmatullah%20wabarakatuh%2C%20ustadz%2Fustadzah.%20Alhamdulillah%20ananda%20telah%20menyelesaikan%20formulir%20pra%20pendaftaran.%20Jazaakumullahu%20khayran.",
    text2: "",
    url2: ""
  })

  const [is_validated, setIsValidated] = useState(false)
  const [is_loading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const { onSubmit, results, form, loading, error, notified } = useRegister()
  const { register, handleSubmit, formState: { errors }} = form;

  let code = useParams().code
    // const dataModal = () => {
  // const modal = {
    
    
  //   }
  //   return data
  // }
  // const [code, setCode] = useState(useParams())
  
  // code = useParams().code
  
  useEffect( () => {
    const allowed_codes = [
      'tkit-a',
      'tkit-b',
      'sdit',
      'smpi',
      'smai',
      'smp-pesantren',
      'sma-pesantren'
      // 'rabbaanii-ciwidey'
    ]

    if(!allowed_codes.includes(code)){
      modal_data.title = "Jenjang tidak ditemukan"
      modal_data.message = "Mohon periksa link pendaftaran"
      modal_data.url2 = "/"
      modal_data.text2 = "Halaman Utama"
      modal_data.type = "static"
      setModalShow(true)
    }
    // console.log('pass>', password)
    // console.log('temppass', temp_password)
    // console.log('cpass>', confirm_password)
    // console.log('results>', results)

    if(results?.f1){
      // console.log('masuk', results)
      handleResults(results)
    }

    if(code || !school_id || !subschool){
      setSchoolId(getSchoolIdSchoolName(code).substring(0,1))
      setSubschool(getSchoolIdSchoolName(code).split("-")[0].substring(1,2))

      form.setValue('school_id', school_id)
      form.setValue('subschool', subschool)
      console.log('id',school_id, subschool)
    }

    // getSchoolIdSchoolName()
    // getSchoolIdSchoolName()
  },[code, results, form, password, confirm_password, school_id, subschool])

  // const handleResults = () => {
  //   if(Object.values)
  // }
  // const [applicants, setApplicants] = useState({
  //   full_name: "",
  //   gender: "",
  //   phone_number
  // })
  // console.log(code)
  
  // const getSchoolIdSchoolName = () => {
    
    // let {code} = useParams()
    // switch (code) {
    //   case 'tkit-a': setSchoolId(1); setSchoolName('TKIT A Rabbaanii Islamic School'); 
    //   break;
    //   case 'tkit-b': setSchoolId(1); setSchoolName('TKIT B Rabbaanii Islamic School'); 
    //   break;
    //   case 'sdit': setSchoolId(2); setSchoolName('SDIT Rabbaanii Islamic School'); 
    //   break;
    //   case 'smpi': setSchoolId(3); setSchoolName('SMPI Rabbaanii Islamic School'); 
    //   break;
    //   case 'smai': setSchoolId(4); setSchoolName('SMAI Rabbaanii Islamic School'); 
    //   break;
    //   case 'smp-pesantren': setSchoolId(5); setSchoolName('SMP Pesantren Rabbaanii Islamic School'); 
    //   break;
    //   case 'sma-pesantren': setSchoolId(6); setSchoolName('SMA Pesantren  Rabbaanii Islamic School'); 
    //   break;
    //   case 'rabbaanii-ciwidey': setSchoolId(7); setSchoolName('Rabbaanii Ciwidey'); 
    //   break;
    //   default: setSchoolId(0); setSchoolName(''); 
    //     // break;
    // }
    //console.log(code, school_id, school_name)
  // // }
  
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

  const isObjectEmpty = async (objectName) => {
    return (
      objectName &&
      Object.keys(objectName).length === 0 &&
      objectName.constructor === Object
    );
  };
  const handleResults = async (_results) => {

    // const _full_name = full_name
    // const _gender = gender
    // const _phone_number = phone_number
    // const _email = email
    // const _school_id = parseInt(getSchoolIdSchoolName(code).substring(0,1)) 
    // const _subschool = getSchoolIdSchoolName(code).split("-")[0].substring(1,2)
    // const _password = password
    // const _media = media
    console.log('handl',results, error)
    if(error){
      console.log('not valid')
      // setIsValidated(true)
      // setIsLoading(false)
      setSuccess(false)
      modal_data.title = "Pendaftaran Gagal"
      modal_data.message = "Mohon periksa kembali data Anda"
      // modal_data.url2 = "/"
      // modal_data.text2 = "Halaman Utama"
      setModalShow(true)
    }


    if(results?.f1 === '01'){
      // setIsLoading(false)
      console.log('masuk', results  )
      // console.log(Object.values(results)[0] )
      setSuccess(false)
      modal_data.title = "Pendaftaran Gagal"
      modal_data.message = results?.f2
      // modal_data.url2 = "/"
      // modal_data.text2 = "Kembali"
      setModalShow(true)
      return
    }
    
    if(results && results?.f1 !== '01'){
      console.log('masuk', results)

      console.log('_phone_number', _phone_number)
      const new_phone_number = '62'+ _phone_number.slice(1)
      // console.log(data_appl)
      // _phone_number.replace()
      setFullName("")
      setGender("")
      setPhoneNumber("")
      setEmail("")
      setSchoolId("")
      setSchoolName("")
      setSubschool("")
      setPassword("")
      setConfirmPassword("")
      modal_data.type= "basic",
      modal_data.title= "Pendaftaran Berhasil",
      modal_data.message= "Alhamdulillah, tahap pra pendaftaran berhasil. Selanjutnya Ananda dapat melanjutkan pembayaran melalui aplikasi.",
      // modal_data.message= "Alhamdulillah, tahap pra pendaftaran berhasil. Selanjutnya Ananda dapat melakukan konfirmasi pendaftaran ke nomor CS melalui pesan masuk ke no WhatsApp terdaftar. Ananda juga dapat melanjutkan pembayaran langsung melalui website.",
      // tex.t: "Konfirmasi Pendaftaran ke CS",
      // url: "https://wa.me/628123523434?text=Assalamu'alaikum%20warahmatullah%20wabarakatuh%2C%20ustadz%2Fustadzah.%20Alhamdulillah%20ananda%20telah%20menyelesaikan%20formulir%20pra%20pendaftaran.%20Jazaakumullahu%20khayran.",
      modal_data.text2= "Lanjut Pembayaran",
      modal_data.url2= "/login"
      
      const type ='form-success'
      
      // console.log(new_phone_number)
      const data = [{
        "phone": new_phone_number,
        // "phone": "6285778650040",
        "message": `Assalamu'alaikum, Alhamdulillah Ananda ${full_name} telah terdaftar di Aplikasi PSB RIS TA. 26/27. 
        No. Pendaftaran: ${results?.f3}
        Login Aplikasi: https://psb.rabbaanii.sch.id/login
        
        Ananda dapat login dengan No. Pendaftaran atau No. WhatsApp terdaftar untuk melanjutkan pendaftaran.
        
        Jazaakumullahu khayran wa Baarakallaahu fiikum.
        
        -- PSB RABBAANII ISLAMIC SCHOOL - CS RABBAANII --
        - Mohon simpan nomor ini untuk mendapatkan update informasi -`
        // "message": "Assalamu'alaikum, Alhamdulillah ananda telah terdaftar di sistem kami dengan No. Registrasi . "

      }]
      // console.log(data)
      // Ayah/Bunda disilahkan bergabung ke tautan Grup WA Pendaftar https://bit.ly/GROUPWA-PPDBRIS2627 untuk informasi lebih lanjut.

      if(notified){

        setSuccess(true)
        setModalShow(true)
      }

      
          // try {
          //   const response = await axios.post("/api/auth/send-notif", {message: data , type: type, token: null},
          //   {
          //     headers: {'Content-Type': 'application/json' }
          //   }
          //   );
          //   // 
          //   console.log(JSON.stringify(response)); //console.log(JSON.stringify(response));
          //   if(response.status==200 || response.status==204){
              
          //     // persistor.purge();
          //     // // Reset to default state reset: async () => { useCart.persist.clearStorage(); set((state) => ({ ...initialState, })); },
          //     // localStorage.removeItem("persist:auth")
          //     // Cookies.remove("jwt")
          //     // dispatch(logout())
          //     // navigate('/login')
          //   }
          // } catch (error) {
          //   console.log(error)
          // } finally {
          //   // setIsLoading(false)
          // }
        }

  }


  const addApplicants = async (e) =>{
    // setIsLoading(true)
    e.preventDefault()
    // console.log('data', full_name, gender, phone_number, email, password, media, school_id)
    
    // console.log('media',media)
    const _full_name = full_name
    const _gender = gender
    const _phone_number = phone_number
    const _email = email
    const _school_id = parseInt(getSchoolIdSchoolName(code).substring(0,1)) 
    const _subschool = getSchoolIdSchoolName(code).split("-")[0].substring(1,2)
    const _password = password
    const _media = media
  
    // if(school_id)
    console.log(_full_name)
    console.log(_gender)
    console.log(_phone_number)
    console.log(_email)
    console.log(_password)
    console.log(_media)
    console.log(_school_id)
    console.log(_subschool)
    console.log(code)

    // handleSubmit(onSubmit(full_name,gender,phone_number, email, _school_id, _subschool, password, media))

    if(!_full_name || !_gender || !_phone_number || !_email || !_password || !_media || !_school_id || !confirm_password){
      console.log('not valid')
      // setIsValidated(true)
      setIsLoading(false)
      setSuccess(false)
      modal_data.title = "Pendaftaran Gagal"
      modal_data.message = "Mohon periksa kembali data Anda"
      // modal_data.url2 = "/"
      // modal_data.text2 = "Halaman Utama"
      setModalShow(true)
    }else{

      const { data: data_appl, error } = await supabase.rpc("add_new_applicant", {
        _email,
        _full_name,
        _gender,
        _media,
        _password,
        _phone_number,
        _school_id,
        _subschool
      });

    // console.log(data_appl)
    setDataAppTemp(data_appl)
    // console.log('dataAppTemp >', dataAppTemp)
    if(error || Object.values(data_appl)[0] === '01'){
      setIsLoading(false)
      console.log('masuk')
      console.log(Object.values(data_appl)[0] )
      setSuccess(false)
      modal_data.title = "Pendaftaran Gagal"
      modal_data.message = error??Object.values(data_appl)[1]
      // modal_data.url2 = "/"
      // modal_data.text2 = "Kembali"
      setModalShow(true)
      return
    }

//     curl --location 'https://jogja.wablas.com/api/v2/send-message' \
// --header 'Authorization: v00j9KTESxhSyuhnJe7K4Op0aMZMaBuBooBr0unnsUXBhlYZyU5SMLG.b405O85i' \
// --header 'Content-Type: application/json' \
// --data '{
//      "data": [
//         {
//             "phone": "085778650040",
//             "message": "Assalamualaikum testing ujicoba",
//             "source": "postman"
//         },
//         {
//             "phone": "085216527392",
//             "message": "Assalamualaikum testing ujicoba",
//             "source": "postman"
//         }
//     ]
// }'
console.log(Object.values(data_appl)[0] !== '01')
    if(Object.values(data_appl)[0] !== '01'){
      // console.log(data_appl)
      // _phone_number.replace()
      setFullName("")
      setGender("")
      setPhoneNumber("")
      setEmail("")
      setSchoolId("")
      setSchoolName("")
      setSubschool("")
      setPassword("")
      setConfirmPassword("")

      modal_data.type= "basic",
      modal_data.title= "Pendaftaran Berhasil",
      modal_data.message= "Alhamdulillah, tahap pra pendaftaran berhasil. Selanjutnya Ananda dapat melanjutkan pembayaran melalui aplikasi.",
      // modal_data.message= "Alhamdulillah, tahap pra pendaftaran berhasil. Selanjutnya Ananda dapat melakukan konfirmasi pendaftaran ke nomor CS melalui pesan masuk ke no WhatsApp terdaftar. Ananda juga dapat melanjutkan pembayaran langsung melalui website.",
      // tex.t: "Konfirmasi Pendaftaran ke CS",
      // url: "https://wa.me/628123523434?text=Assalamu'alaikum%20warahmatullah%20wabarakatuh%2C%20ustadz%2Fustadzah.%20Alhamdulillah%20ananda%20telah%20menyelesaikan%20formulir%20pra%20pendaftaran.%20Jazaakumullahu%20khayran.",
      modal_data.text2= "Lanjut Pembayaran",
      modal_data.url2= "/login"
      
      const type ='form-success'
      // console.log(phone_number)
      const new_phone_number = '62'+ _phone_number.slice(1)
      // console.log(new_phone_number)
      const data = [{
        "phone": new_phone_number,
        // "phone": "6285778650040",
        "message": `Assalamu'alaikum, Alhamdulillah Ananda telah terdaftar di sistem kami.
        No. Pendaftaran: ${data_appl.f3}
        Login Aplikasi: https://psb.rabbaanii.sch.id/login
        
        Mohon untuk menyimpan informasi ini. Ananda dapat login dengan No. Pendaftaran atau No. WhatsApp terdaftar untuk melanjutkan pendaftaran.
        Jazaakumullahu khayran wa Baarakallaahu fiikum.
        
        -- PSB RABBAANII ISLAMIC SCHOOL - CS RABBAANII --
        - Mohon simpan nomor ini untuk mendapatkan update informasi -`
        // "message": "Assalamu'alaikum, Alhamdulillah ananda telah terdaftar di sistem kami dengan No. Registrasi . "

      }]
      // console.log(data)

      setSuccess(true)
      setModalShow(true)

      
      try {
        const response = await axios.post("/api/auth/send-notif", {message: data , type: type, token: null},
        {
          headers: {'Content-Type': 'application/json' }
        }
        );
        // 
        console.log(JSON.stringify(response)); //console.log(JSON.stringify(response));
        if(response.status==200 || response.status==204){
          
          // persistor.purge();
          // // Reset to default state reset: async () => { useCart.persist.clearStorage(); set((state) => ({ ...initialState, })); },
          // localStorage.removeItem("persist:auth")
          // Cookies.remove("jwt")
          // dispatch(logout())
          // navigate('/login')
        }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
      
//       console.log(phone_number)
//       const new_phone_number = '62'+ _phone_number.slice(1)
//       console.log(new_phone_number)
//       const data = [{
//         "phone": new_phone_number,
//         // "phone": "6285778650040",
//         "message": `Assalamu'alaikum, Alhamdulillah Ananda telah terdaftar di sistem kami dengan -- No. Pendaftaran ${data_appl.f3} --. Mohon untuk menyimpan informasi ini. Ananda dapat login dengan No. Pendaftaran atau No. WhatsApp terdaftar untuk melanjutkan pendaftaran.

// Login Aplikasi: https://psb-formy.vercel.app/login

// Jazaakumullahu khayran wa Baarakallaahu fiikum.`
//         // "message": "Assalamu'alaikum, Alhamdulillah ananda telah terdaftar di sistem kami dengan No. Registrasi . "

//       }]
      // 'Authorization': 'TGlhnw6kS74RG3jOc7EOzjFkftiemqC7Og6GmseskfryC0RHI3ACfOWnH86Q6zEl.cM6lQGiu'
      // const response = await wablas.post(SEND_MSG_URL,
      //   JSON.stringify({ data }),
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': 'v00j9KTESxhSyuhnJe7K4Op0aMZMaBuBooBr0unnsUXBhlYZyU5SMLG.b405O85i'
      //      }, 
      //   }
      // );
      // // 
      // console.log('response', JSON.stringify(response)); //console.log(JSON.stringify(response));
      // const token = response?.token
    }
    

    }

    

    // console.log('validated>',is_validated)
    // if(!is_validated){ 
    //   setIsLoading(false)
    //   setSuccess(false)
    //   modal_data.title = "Pendaftaran Gagal"
    //   modal_data.message = "Mohon periksa kembali data Anda"
    //   // modal_data.url2 = "/"
    //   // modal_data.text2 = "Halaman Utama"
    //   setModalShow(true)

    //   return
    // }

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

      // const
    
    
    // console.log('data_applicant =>', data_appl)

    
  
    
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

  // setSchoolName('TKIT A Rabbaanii Islamic School');
  // ('TKIT B Rabbaanii Islamic School');
  // setSchoolName('SDIT Rabbaanii Islamic School'); 
  // setSchoolName('SMPI Rabbaanii Islamic School'); 
  // setSchoolName('SMAI Rabbaanii Islamic School'); 
  // setSchoolName('SMP Pesantren Rabbaanii Islamic School');
  const getSchoolIdSchoolName = (code) => {
    const allowed_codes = [
      'tkit-a',
      'tkit-b',
      'sdit',
      'smpi',
      'smai',
      'smp-pesantren',
      'rabbaanii-ciwidey'
    ]
    // if(!allowed_codes.includes(code)){
      
    // }
    switch (code) {
      case 'tkit-a': return `2A-TKIT A Rabbaanii Islamic School`;  
      break;
      case 'tkit-b': return `2A-TKIT B Rabbaanii Islamic School`;  
      break;
      case 'sdit': return `1-SDIT Rabbaanii Islamic School`;
      break;
      case 'smpi': return `3-SMPI Rabbaanii Islamic School`;
      break;
      case 'smp-pesantren': return `4-SMP Pesantren Rabbaanii Islamic School`; 
      break;
      case 'sma-pesantren': return `5-SMA Pesantren  Rabbaanii Islamic School`; 
      break;
      case 'smai': return `6-SMAI Rabbaanii Islamic School`; 
      break;
      case 'rabbaanii-ciwidey': return `100Rabbaanii Ciwidey`; 
      break;
      default: return `0Not Found`; 
        // break;
    }
  }

  const handleCloseModal = (value) => {
    if(value){
      setModalShow(!value)
    }
  }

 
  
  return (
    <div className="flex flex-col max-w-lg min-h-screen my-0 mx-auto shadow-lg overflow-hidden relative">
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
              {/* <Modal children={children} id={1} aria-label="ffgdfg" show={true} handleClose={handleClose}   /> */}
                {modal_show && (
                  <Swal dataModal={modal_data} setClose={handleCloseModal} />
                )}
                
              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="full_name">Nama Lengkap <span className="text-red-600">*</span></label>
                      <input id="full_name" name='full_name' onChange={(e) => setFullName(e.target.value)} {...register('full_name')} type="text" className="form-input w-full text-gray-800" placeholder="Masukkan Nama" required />
                      {/* pattern="^[A-Za-z0-9.']{3,50}$" */}
                      {errors.full_name && (
                        <p className="text-xs text-red-500"> {errors.full_name.message} </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="jenis_kelamin">Jenis Kelamin <span className="text-red-600">*</span></label>
                      <input name="gender" onChange={(e) => setGender(e.target.value)} value='male' {...register('gender')} type="radio" className="form-input text-gray-800" placeholder="" required /> <span className='text-gray-800 text-sm font-medium'>Laki-Laki</span>
                      <input name="gender" onChange={(e) => setGender(e.target.value)} value='female' {...register('gender')} type="radio" className="form-input text-gray-800 ml-3" placeholder="" required /> <span className='text-gray-800 text-sm font-medium'>Perempuan</span>
                      {errors.gender && (
                        <p className="text-xs text-red-500"> {errors.gender.message} </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="phone_number">No. WhatsApp <span className="text-red-600">*</span></label>
                      <input id="phone_number" name='phone_number' onChange={(e) => {setPhoneNumber(e.target.value), set_PhoneNumber(e.target.value)}} {...register('phone_number')}className="form-input w-full text-gray-800" placeholder="No. WhatsApp aktif" required />
                      {errors.phone_number && (
                        <p className="text-xs text-red-500"> {errors.phone_number.message} </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                      <input id="email" name='email' type="email" onChange={(e) => setEmail(e.target.value)} {...register('email')} className="form-input w-full text-gray-800" placeholder="Masukkan Email Aktif" />
                      {errors.email && (
                        <p className="text-xs text-red-500"> {errors.email.message} </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="email">Tanggal Lahir <span className="text-red-600">*</span></label>
                    <input id="dob" name="dob" onChange={(e) => setDob(e.target.value)} {...register('dob')} type="date" className="form-input w-full text-gray-800" required/>
                      {errors.dob && (
                        <p className="text-xs text-red-500"> {errors.dob.message} </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      {/* school:{code=='tkit-b'&&setSchoolId(1)&&setSchoolName('TKIT B Rabbaanii Islamic School') } */}
                      {/* {school_id. school_name} */}
                      {/* {code} */}
                      <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="school">Jenjang <span className="text-red-600">*</span></label>
                      {/* <input id="subschool" name='subschool' type="text" hidden disabled value={} onChange={e => (setSubschool(getSchoolIdSchoolName(code).split("-")[0].substring(1,2)))}  className="form-input w-full text-gray-800" placeholder="" required /> */}
                      <input id="school_id" name='school_id' type="text" hidden disabled onChange={(e) => setSchoolId(e.target.value)} {...register('school_id')} className="form-input w-full text-gray-800" placeholder="" required />
                      <input id="school_name" name='school_name' type="text" disabled value={getSchoolIdSchoolName(code).split("-")[1]} className="form-input w-full text-gray-800" placeholder="" required />
                      <input id="subschool" name='subschool' type="text" hidden disabled onChange={(e) => setSubschool(e.target.value)} {...register('subschool')} className="form-input w-full text-gray-800" placeholder="" required />
                      {errors.school_id &&(
                        <p className="text-xs text-red-500"> {errors.school_id.message} </p>
                      )}
                      {errors.subschool && (
                        <p className="text-xs text-red-500"> {errors.subschool.message} </p>
                      )}
                    </div>
                  </div>
                  <div className='h4 separator'>Informasi Akun</div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3 ">
                      {/* <div></div> */}
                      <label className="block text-gray-900 text-sm font-medium mb-1 tooltip tooltip-open tooltip-right" data-tip="Buatlah password yang mudah diingat" htmlFor="password">Password <span className="text-red-600">*</span></label>
                      <input id="password" name='password' onChange={(e) => {setPassword(e.target.value), setTempPassword(e.target.value)}} {...register('password')} type="password" className="form-input w-full text-gray-800" placeholder="Masukkan Password" required />
                      {errors.password && (
                        <p className="text-xs text-red-500"> {errors.password.message} </p>
                      )}
                      <div class="flex items-center p-4 mb-4 my-1 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                        <svg class="shrink-0 inline w-6 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        {/* Info alert! */}
                        <span class="sr-only">Info</span>
                        <div>
                          <span class="font-thin text-sm">Buatlah password yang sederhana dan mudah diingat.</span>
                        </div>
                      </div>
                      {/* <ul>
                        <li>lebih dari 8 karakter</li>
                        <li>kombinasi huruf besar dan kecil</li>
                        <li></li>
                      </ul> */}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="confirm_password">Konfimasi Password <span className="text-red-600">*</span></label>
                      <input id="confirm_password" name='confirm_password' onChange={(e) => setConfirmPassword(e.target.value)} {...register('confirm_password')} type="password" className="form-input w-full text-gray-800 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" placeholder="Masukkan Konfirmasi Password" required />
                      {errors.confirm_password && (
                        <p className="text-xs text-red-500"> {errors.confirm_password.message} </p>
                      )}
                      {/* <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                          Konfirmasi password tidak sama dengan password
                      </span> */}
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                      <label htmlFor="media" className="block text-sm font-medium text-gray-900">Darimana Bapak/Ibu Mendapatkan Informasi tentang Rabbaanii Islamic School?</label>
                      <div className="mt-2 grid grid-cols-1">
                          <select id="media" name="media" onChange={(e) => setMedia(e.target.value)} {...register('media')} autoComplete="media" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" required>
                          <option value="">-Pilih Media-</option>
                          <option value={media== 'website'? media:"website"}>Website Rabbaanii </option>
                          <option value={media== 'teman/saudara'? media:"teman/saudara"} >Teman / Saudara</option>
                          <option value={media== 'karyawan/guru'? media:"karyawan/guru"}>Karyawan/Guru </option>
                          <option value={media== 'kajian'? media:"kajian"}>Kajian</option>
                          <option value={media== 'spanduk'? media:"spanduk"}>Spanduk</option>
                          <option value={media== 'brosur'? media:"brosur"}>Brosur</option>
                          <option value={media== 'instagram'? media:"instagram"}>Instagram </option>
                          <option value={media== 'facebook'? media:"facebook"}>Facebook </option>
                          <option value={media== 'youtube'? media:"youtube"}>Youtube </option>
                          <option value={media== 'majalah'? media: "majalah"}>Majalah </option>
                          <option value={media== 'whatsapp'? media:"whatsapp"}>WhatsApp</option>
                          <option value={media== 'tiktok'? media:"tiktok"}>Tiktok</option>
                          <option value={media== 'mesin_pencari'? media:"mesin_pencari"}>Rekomendasi mesin pencarian internet</option>

                          </select>
                          {errors.media && (
                            <p className="text-xs text-red-500"> {errors.media.message} </p>
                          )}
                          {/* <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                          <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                          </svg> */}
                      </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-green-600 hover:bg-green-700 w-full" disabled={loading} 
                      // onClick={addApplicants}
                      >
                        {loading ? (
                          <>
                          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                {/* SVG path for your spinner */}
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
                            {/* <Spinner aria-label="Spinner button example" size="sm" light /> */}
                            <span className='pl-3'>Menyimpan...</span>
                          </>
                        )
                         : 'DAFTAR'}
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                    <Link to="/" className="btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full relative flex items-center">
                                          {/* <svg className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7.95 0C3.578 0 0 3.578 0 7.95c0 3.479 2.286 6.46 5.466 7.553.397.1.497-.199.497-.397v-1.392c-2.187.497-2.683-.993-2.683-.993-.398-.895-.895-1.193-.895-1.193-.696-.497.1-.497.1-.497.795.1 1.192.795 1.192.795.696 1.292 1.888.895 2.286.696.1-.497.298-.895.497-1.093-1.79-.2-3.578-.895-3.578-3.975 0-.895.298-1.59.795-2.087-.1-.2-.397-.994.1-2.087 0 0 .695-.2 2.186.795a6.408 6.408 0 011.987-.299c.696 0 1.392.1 1.988.299 1.49-.994 2.186-.795 2.186-.795.398 1.093.199 1.888.1 2.087.496.596.795 1.291.795 2.087 0 3.08-1.889 3.677-3.677 3.875.298.398.596.895.596 1.59v2.187c0 .198.1.497.596.397C13.714 14.41 16 11.43 16 7.95 15.9 3.578 12.323 0 7.95 0z" />
                                          </svg> */}
                                          <span className="">LAMAN PENDAFTARAN</span>
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