import React, {useState, useEffect} from 'react';
// import supabase from '../client/supabase_client';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
// import 

import Header from '../partials/Header';
import Banner from '../partials/Banner';
import { redirect } from 'react-router-dom';
// import { useState } from 'react';




function Payment() {
  const supabase = createClient('https://cnpcpmdrblvjfzzeqoau.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNucGNwbWRyYmx2amZ6emVxb2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxMDc5MjgsImV4cCI6MjA0ODY4MzkyOH0.KDzEImvYqvh6kv9o5eMuWzWuYZIElWNtPyWDdLMi46w' )
    const [applicantData, setApplicantData] = useState({applicant_id: "",school_id: null,full_name: "",phone_number: "",email: "",school_id: "", school_name:""})
    const [applicantDataOrder, setApplicantDataOrder] = useState({item_id: "",foundation_id: null,description: "",total_amount: "",created_by: ""})
    // const [applicantData, setApplicantData] = useState({item_id: "",foundation_id: null,description: "",total_amount: "",created_by: ""})
    // const [applicantData, setApplicantData] = useState({item_id: "",foundation_id: null,description: "",total_amount: "",created_by: ""})
    const [school_id, setSchoolId] = useState("")
    const [school_name, setSchoolName] = useState("")
    const [applicant_id, setApplicantId] = useState("")
    const [amount, setAmount] = useState("")
    const [applicantPayment, setapplicantPayment] = useState({})
    
    useEffect( () => {
      getApplicantData()
      getApplicantPayment()
      create()
    }, [])
    const getApplicantData = async () =>{
      const {data, error} = await supabase.from('applicant_schools').select('applicant_id, school_id, schools(school_name), applicants(full_name, phone_number, email)').eq('applicant_id', '04f84c3c-11e2-4154-8c88-df1e2f3a6c3a').single()
      if(error){
        console.log(error)
        // setApplicantData({})
      }else{
        console.log(data)
        // setSchoolId(data.school_id)
        // setSchoolName(data.applicant_id)
        setApplicantData({
          applicant_id: data.applicant_id,
          full_name: data.applicants.full_name,
          school_id: data.school_id,
          school_name: data.schools.school_name,
          phone_number: data.applicants.phone_number,
        })
        setApplicantDataOrder({
          item_id: data.school_id,
          created_by: data.applicant_id
        })
        // console.log('appli->',applicantData)
      }
      const school_id = data.school_id
      console.log('data >',data)
      console.log('school_id >',data.school_id)
      console.log('applicantDataOrder >',applicantDataOrder)
      
      const {dataSchool, errorSchool} = await supabase.from('school_fees').select('amount, fee_type_id').eq('school_id', school_id).single()
      if(error){
        console.log(errorSchool)
        // setApplicantData({})
      }else{
        console.log('school > ', dataSchool)
        setApplicantDataOrder({ ...applicantDataOrder,
          total_amount: dataSchool.amount
        })
        // console.log('applischool->',applicantData)
      }
    }

    const getApplicantPayment = () => {

    }

    

    // useEffect(()=> {
      
    // }, [])
    const create = () => {

      // const { data, error } = supabase
      //   .from('applicant_orders')
      //   .insert()
      //   .single()

      //   if(error){
      //     console.log(error)
      //   }else{
      //     console.log('data >', data)
      //   }
    }

    const create_order = (e) => {
      e.preventDefault()

      const applicantDataX = {item_id: 1, foundation_id: 1, description: 'paying registration fee', total_amount: 125000, created_by: '04f84c3c-11e2-4154-8c88-df1e2f3a6c3a'}
      console.log("applicantData > ", applicantData)

      const { data, error } = supabase
      .from('applicant_orders')
      .insert(
        [applicantDataX]
      )
      .single()

      if(error){
        console.log(error)
      }else{
        console.log('data >', data)
      }
      console.log('appli->',data)
      const order = {
        order_id : "b5015274-0eb2-49ac-a30a-c4f2ae8b57aa"
      }
      axios.post("http://localhost:3000/api/create-form-invoice", order).then((res) => {

        console.log(res.status);
        console.log(res)

        
        checkout.process(res.data.reference_code, {
              defaultLanguage: "id", //opsional pengaturan bahasa
              // currency: "USD", //optional to set rate estimation
              successEvent: function(result){
              
                  console.log('success');
                  console.log(result);
                  redirect(res.payment_url)
                  // alert('Payment Success');


              },
              pendingEvent: function(result){
              
                  console.log('pending');
                  console.log(result);
                  alert('Payment Pending');
              },
              errorEvent: function(result){
              
                  console.log('error');
                  console.log(result);
                  alert('Payment Error');
              },
              closeEvent: function(result){
              // tambahkan fungsi sesuai kebutuhan anda
                  console.log('customer closed the popup without finishing the payment');
                  console.log(result);
                  alert('customer closed the popup without finishing the payment');
                  
              }
          }); 
      });
    }

    // const create_order = async (req, res) => {
    //   try {
    //     const {}
    //   } catch (error) {
        
    //   }

    // }


  return (
    <div className="flex flex-col max-w-lg min-h-screen my-0 mx-auto shadow-lg bg-white overflow-hidden">
    {/* <div className="flex flex-col max-w-lg min-h-screen mx-auto overflow-hidden"> */}
{/* flex flex-col max-w-lg min-h-screen my-0 mx-auto overflow-hidden relative */}
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
{/* rgb(243 244 246  */}
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-12">
                <h1 className="h1 mb-4">Konfirmasi Pembayaran</h1>
                <p className=" text-gray-700">Silahkan melakukan pembayaran untuk melanjutkan Pengisian Formulir</p>
                {/* <p className=" text-gray-600">Masukkan No. WhatsApp terdaftar/No Pendaftaran untuk mereset password.</p> */}
              </div>

              {/* Form */}
              <div className="flex flex-col max-w-sm mx-auto bg-green-100 rounded-2xl px-4 md:px-8 md:py-5">
                <div className="flex flex-wrap -mx-3 mb-4 ">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Nama</label>
                      <h2 className='text-lg font-800 flex justify-start'> {applicantData.full_name??'Fulan'}</h2>
                      {/* <h2>{applicantOrder?.applicants?.full_name?? '-'}</h2> */}
                      {/* <input id="kode" type="text" className="form-input w-full text-gray-800" placeholder="" required /> */}
                    </div>
                  </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Jenjang</label>
                      <h2 className='text-lg font-800 flex justify-start'> {applicantData.school_name??'Fulan'}</h2>
                      {/* <h2>{applicantOrder.schools.school_name??'-'}</h2> */}
                      {/* <input id="kode" type="text" className="form-input w-full text-gray-800" placeholder="" required /> */}
                    </div>
                  </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" >Biaya Pendaftaran</label>
                      <h2 className='text-lg font-800 flex justify-start'> {applicantData.school_price??'Rp.125000'}</h2>
                      {/* <input id="kode" type="text" className="form-input w-full text-gray-800" placeholder="" required /> */}
                    </div>
                  </div>

                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Status</label>
                      <h2 className='text-lg font-800 justify-start inline-flex items-center rounded-lg bg-yellow-50 px-2 py-1 font-medium text-yellow-800 ring-1 ring-gray-500/10 ring-inset'> {applicantPayment.status??'Belum Bayar'}</h2>
                      {/* <input id="kode" type="text" className="form-input w-full text-gray-800" placeholder="" required /> */}
                    </div>
                  </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Waktu Tenggat</label>
                      <h2 className='text-lg font-800 flex justify-start'> {applicantPayment.expired_at??'15 April 2025 15.00WIB'}</h2>
                      {/* <input id="kode" type="text" className="form-input w-full text-gray-800" placeholder="" required /> */}
                    </div>
                  </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Metode Pembayaran</label>
                      <h2 className='text-lg font-800 flex justify-start'> {applicantPayment.payment_code??'Virtual Akun BSI'}</h2>
                      {/* <input id="kode" type="text" className="form-input w-full text-gray-800" placeholder="" required /> */}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-green-700 hover:bg-green-600 w-full"
                              onClick={create_order}
                      >Bayar  
                      <svg className="w-3 h-3 fill-current text-white-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                  </svg></button>
                  {/* <TiArrowRightThick/> */}
                    </div>
                  </div>
                {/* <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">No. WhatsApp terdaftar/No. Pendaftaran<span className="text-red-600">*</span></label>
                      <input id="kode" type="text" className="form-input w-full text-gray-800" placeholder="" required />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Lanjutkan  <TiArrowRightThick/></button>
                    </div>
                  </div>
                </form> */}
              </div>

            </div>
          </div>
        </section>

      </main>

      <Banner />

    </div>
  );
}

export default Payment;