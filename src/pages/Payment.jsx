import React, {useState, useEffect} from 'react';
import supabase from '../client/supabase_client';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
// import 

import Header from '../partials/Header';
import Banner from '../partials/Banner';
import { TiArrowRightThick  } from "react-icons/ti";
// import { useState } from 'react';




function Payment() {
  // const supabase = createClient('https://cnpcpmdrblvjfzzeqoau.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNucGNwbWRyYmx2amZ6emVxb2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxMDc5MjgsImV4cCI6MjA0ODY4MzkyOH0.KDzEImvYqvh6kv9o5eMuWzWuYZIElWNtPyWDdLMi46w' )
    const [applicantOrder, setApplicantOrderData] = useState({})
    useEffect( () => {
      getApplicantData()

    }, [])
    const getApplicantData = async () =>{
      const {data, error} = await supabase.from('applicant_schools').select('applicant_id, school_id, applicants(full_name, phone_number, email )').eq('applicant_id', '04f84c3c-11e2-4154-8c88-df1e2f3a6c3a').single()
      if(error){
        console.log(error)
        setApplicantOrderData({})
      }else{
        console.log(data)
        setApplicantOrderData(data)
        console.log('appli->',applicantOrder)
      }
    }

    setApplicantOrderData ({item_id: 123123, description: 'paying registration fee', total_amount: 125000, created_by: '04f84c3c-11e2-4154-8c88-df1e2f3a6c3a'})

    const create_order = (e) => {
      e.preventDefault()

      const { data, error } = supabase
      .from('applicant_order')
      .insert([
        applicantOrder
        // reference_code:  
        // {item_id: data.school_id,
        // // foundation_id
        // description: 'uang masuk', 
        // total_amount: school_price,
        // status: 'pending',
        // // payment_url:
        // created_by: applicant_id}
      ])
      .single()

      if(error){
        console.log(error)
      }else{
        console.log(data)
      }
      console.log('appli->',applicantOrder)

      axios.post("http://localhost:3000/api/create-form-invoice", applicantOrder).then((res) => {

        console.log(res.status, res);

        
        // checkout.process(res.reference, {
        //       defaultLanguage: "id", //opsional pengaturan bahasa
        //       currency: "USD", //optional to set rate estimation
        //       successEvent: function(result){
        //       // tambahkan fungsi sesuai kebutuhan anda
        //           console.log('success');
        //           console.log(result);
        //           alert('Payment Success');

        //       },
        //       pendingEvent: function(result){
        //       // tambahkan fungsi sesuai kebutuhan anda
        //           console.log('pending');
        //           console.log(result);
        //           alert('Payment Pending');
        //       },
        //       errorEvent: function(result){
        //       // tambahkan fungsi sesuai kebutuhan anda
        //           console.log('error');
        //           console.log(result);
        //           alert('Payment Error');
        //       },
        //       closeEvent: function(result){
        //       // tambahkan fungsi sesuai kebutuhan anda
        //           console.log('customer closed the popup without finishing the payment');
        //           console.log(result);
        //           alert('customer closed the popup without finishing the payment');
        //       }
        //   }); 
      });
    }

    // const create_order = async (req, res) => {
    //   try {
    //     const {}
    //   } catch (error) {
        
    //   }

    // }


  return (
    <div className="flex flex-col max-w-lg min-h-screen my-0 mx-auto overflow-hidden relative">
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
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1 mb-4">Selesaikan Pembayaran</h1>
                <h4 className="h4 mb-4 text-gray-800">Untuk Melanjutkan Pengisian Formulir</h4>
                {/* <p className=" text-gray-600">Masukkan No. WhatsApp terdaftar/No Pendaftaran untuk mereset password.</p> */}
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Nama</label>
                      <h2>{applicantOrder?.applicants?.full_name?? '-'}</h2>
                      {/* <input id="kode" type="text" className="form-input w-full text-gray-800" placeholder="" required /> */}
                    </div>
                  </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Jenjang</label>
                      {/* <h2>{applicantOrder.schools.school_name??'-'}</h2> */}
                      {/* <input id="kode" type="text" className="form-input w-full text-gray-800" placeholder="" required /> */}
                    </div>
                  </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Diskon</label>
                      <h2>{applicantOrder.schools?.school_price?? '-'}</h2>
                      {/* <input id="kode" type="text" className="form-input w-full text-gray-800" placeholder="" required /> */}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
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