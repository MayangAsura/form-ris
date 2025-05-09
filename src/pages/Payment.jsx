import React, {useState, useEffect} from 'react';
import supabase from '../client/supabase_client';
import { createClient } from '@supabase/supabase-js';
import axios from '../api/local-server';

import Header from '../partials/Header';
import Banner from '../partials/Banner';
import { redirect, useNavigate } from 'react-router-dom';
// import { useState } from 'react';

import { useSelector } from 'react-redux'
import Swal from '../utils/Swal';

const CREATE_INVOICE_URL = "/api/create-form-invoice"


function Payment() {
  // const supabase = createClient('https://cnpcpmdrblvjfzzeqoau.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNucGNwbWRyYmx2amZ6emVxb2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxMDc5MjgsImV4cCI6MjA0ODY4MzkyOH0.KDzEImvYqvh6kv9o5eMuWzWuYZIElWNtPyWDdLMi46w' )
    const [applicantData, setApplicantData] = useState({applicant_id: "",school_id: "",full_name: "",phone_number: "",email: "", school_name:"", order_id:"", order_status:""})
    const [applicantDataOrder, setApplicantDataOrder] = useState({item_id: "",foundation_id: "",description: "",total_amount: "",created_by: "",applicant_id:""} )
    const [applicantDataPayment, setApplicantDataPayment] = useState({started_at: "",expired_at: "",payment_url:"",status:""} )
    // const [applicantData, setApplicantData] = useState({item_id: "",foundation_id: null,description: "",total_amount: "",created_by: ""})
    // const [applicantData, setApplicantData] = useState({item_id: "",foundation_id: null,description: "",total_amount: "",created_by: ""})
    const [school_id, setSchoolId] = useState("")
    const [school_name, setSchoolName] = useState("")
    const [applicant_id, setApplicantId] = useState("")
    const [amount, setAmount] = useState("")
    const [applicantPayment, setApplicantPayment] = useState({})
    const [invoicecreated, setInvoiceCreated] = useState(false)
    const [modal_data, setModalData] = useState({title: "", message: ""})
    const [modal_show, setModalShow] = useState(false)
    const [detail_tagihan_show, setDetailTagihanShow] = useState(false)

    const { userToken } = useSelector(state => state.auth)
    const navigate = useNavigate()
    
    useEffect( () => {

      getApplicantData()
      console.log(applicantData.order_status)
      if(applicantData.order_status){

        console.log("status !='' ")
        getApplicantPayment()
        // invoicecreated && applicantData.order_status!==='finis'
        setInvoiceCreated(true)

        applicantData.order_status
      } 
          
      console.log(invoicecreated)
      // setTimeout(() => {
      //   getApplicantDataSchool()
      // }, 2000);
      // getApplicantPayment()
      // create()
    }, [])

    const getApplicantData = async () =>{
      
      const {data, error} = await supabase.from('applicants').select('applicant_schools(applicant_id, schools(school_name, school_id)), applicant_orders(id, status), full_name, gender, email, phone_number, regist_number, created_at, refresh_token, status)')
                          .eq('refresh_token', userToken)                 
                          .eq('status', 'active')
                          .single()
      if(error){
        console.log(error)
        // setApplicantData({})
      }else{
        console.log('applicantData payment> ', data)
        applicantData.applicant_id = data.applicant_schools[0].applicant_id
        applicantData.full_name = data.full_name
        applicantData.school_id = data.applicant_schools[0].schools.school_id
        applicantData.school_name = data.applicant_schools[0].schools.school_name
        applicantData.phone_number = data.phone_number
        if(data.applicant_orders.length>0){
          applicantData.order_id = data.applicant_orders[0].id
          applicantData.order_status = data.applicant_orders[0].status
        }
        
        applicantDataOrder.item_id = data.applicant_schools[0].schools.school_id
        applicantDataOrder.created_by = data.applicant_schools[0].applicant_id
        applicantDataOrder.applicant_id = data.applicant_schools[0].applicant_id
        
        
      }

      const {data: dataSchool, errorSchool} = await supabase.from('school_fees')
                                        .select('amount, fee_type_id')
                                        .eq('school_id', applicantData.school_id)
                                        .single()
      // if(dataSchool){
        console.log('school_fees > ', dataSchool)
        applicantDataOrder.total_amount = dataSchool.amount
      
      // const school_id = data.school_id
      console.log('data >',data)
      console.log('school_id >',data.school_id)
      console.log('applicantDataOrder >',applicantDataOrder)
      console.log('applicantData >',applicantData)
    
    }

    const getApplicantPayment = async () => {
      if(applicantData.order_status !== 'finished'){
        const {data: dataPayment, errorPayment} = await supabase.from('applicant_payments')
                                          .select('started_at, expired_at, payment_url, status')
                                          .eq('order_id', applicantData.order_id)
                                          .single()
        applicantDataPayment.started_at = dataPayment.started_at
        applicantDataPayment.expired_at = dataPayment.expired_at
        applicantDataPayment.payment_url = dataPayment.payment_url
        applicantDataPayment.status = dataPayment.status
      }
    }

    const getStatusOrderText = (status_code) => {
      switch (status_code) {
        case 'pending':
          return 'Pending'
        case 'processed':
          return 'Belum Bayar' 
        case 'finished':
          return 'Selesai'
        case 'canceled':
          return 'Tagihan Dibatalkan'
        case 'failed':
          return 'Pembayaran Gagal'
      
        default:
          return 'Pending'
      }
    }

    const formatRupiah1 = (angka, prefix=null) => {
      // function formatRupiah(angka, prefix){
        var number_string = angka.toString().replace(/[^,\d]/g, '').toString()
        let split   		= number_string.split(',')
        let sisa     		= split[0].length % 3
        let rupiah     		= split[0].substr(0, sisa)
        let ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);
   
        // tambahkan titik jika yang di input sudah menjadi angka ribuan
        if(ribuan){
          const separator = sisa ? '.' : '';
          rupiah += separator + ribuan.join('.');
        }
   
        rupiah = split[1] != null ? rupiah + ',' + split[1] : rupiah;
        return prefix == null ? rupiah : (rupiah ? 'Rp.' + rupiah : '');
      // }
    }

    function formatRupiah(subject) {
      const rupiah = subject.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
      return `Rp${rupiah}`;
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

    const create_order = async (e) => {
      e.preventDefault()
      if(applicantData.order_status==""){
        setModalShow(true)
        modal_data.title = "Gagal Membuat Pembayaran" 
        modal_data.message = "Ananda telah memiliki tagihan sebelumnya." 
      }
      const applicantDataX = {item_id: 1, foundation_id: 1, description: 'paying registration fee', total_amount: 125000, created_by: '04f84c3c-11e2-4154-8c88-df1e2f3a6c3a'}
      applicantDataOrder.description = 'invoice registration fee'
      applicantDataOrder.foundation_id = 1
      console.log("applicantDataOrder ",  applicantDataOrder)

      const { data: order, error } = await supabase
                                    .from('applicant_orders')
                                    .insert(
                                      [applicantDataOrder]
                                    ).select()

      if(error){
        console.log(error)
      }else{
        console.log('data >', order[0])
      }
      console.log('appli->',order[0])
      const data = {
        order_id : order[0].id
      }

      try {
        
        axios.post(CREATE_INVOICE_URL, data).then((res) => {
  
          console.log(res.status);
          console.log(res)
  
          
          checkout.process(res.data.reference_code, {
                defaultLanguage: "id", //opsional pengaturan bahasa
                // currency: "USD", //optional to set rate estimation
                successEvent: function(result){
                
                    setInvoiceCreated(true)
                    
                    console.log('success');
                    console.log(result);
                    getApplicantData()
                    redirect(res.data.payment_url)
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
                    modal_data.title = "Pembayaran Gagal"
                    modal_data.message = "Error : ", result
                    setModalShow(true)
                    // alert('Payment Error');
                },

                closeEvent: function(result){
                // tambahkan fungsi sesuai kebutuhan anda
                    // console.log('customer closed the popup without finishing the payment');
  
                    console.log(result);
                    
                    // alert('customer closed the popup without finishing the payment');
                    
                }
            }); 
          });
      } catch (error) {
       console.log(Error) 
      }
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

              {modal_show && (
                <Swal dataModal={modal_data}/>
              )}

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-12">
                <h1 className="h1 mb-4">Pembayaran <br />Uang Masuk</h1>
                <p className=" text-gray-700">Silahkan melakukan pembayaran untuk melanjutkan Pengisian Formulir</p>
                {/* <p className=" text-gray-600">Masukkan No. WhatsApp terdaftar/No Pendaftaran untuk mereset password.</p> */}
              </div>

              {/* Form */}
              <div className="flex flex-col max-w-sm mx-auto bg-green-100 rounded-2xl px-4 md:px-8 md:py-5">
                <div className="flex flex-wrap -mx-3 mb-4 ">
                    <div className="w-full px-3">
                    {/* flex-wrap */}
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Nama</label>
                      <h2 className='text-lg font-800 font-medium flex justify-start'> {applicantData?.full_name??'Fulan'}</h2>
                      {/* <h2>{applicantOrder?.applicants?.full_name?? '-'}</h2> */}
                      {/* <input id="kode" type="text" className="form-input w-full text-gray-800" placeholder="" required /> */}
                    </div>
                  </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Jenjang</label>
                      <h2 className='text-lg font-800 font-medium flex justify-start'> {applicantData?.school_name??'-'}</h2>
                      {/* <h2>{applicantOrder.schools.school_name??'-'}</h2> */}
                      {/* <input id="kode" type="text" className="form-input w-full text-gray-800" placeholder="" required /> */}
                    </div>
                  </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-800 text-sm font-medium mb-1" >Biaya Pendaftaran</label>
                    <h2 className='text-4xl font-900 font-medium flex justify-start'> { formatRupiah(applicantDataOrder?.total_amount)??'Tidak ditemukan'}</h2>
                    {/* <input id="kode" type="text" className="form-input w-full text-gray-800" placeholder="" required /> */}
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-800 text-sm font-medium mb-1" >Diskon Pendaftaran</label>
                    <h2 className='text-2xl font-900 font-medium flex justify-start'> { '-'}</h2>
                    {/* <input id="kode" type="text" className="form-input w-full text-gray-800" placeholder="" required /> */}
                  </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Status</label>
                      <h2 className='text-lg font-900 font-medium justify-start inline-flex items-center rounded-lg bg-yellow-100 px-2 py-1 text-yellow-900 ring-1 ring-gray-500/10 ring-inset'>{getStatusOrderText(applicantData?.order_status)??'Belum Bayar'}</h2>
                    </div>
                  </div>
                { invoicecreated && (
                <div>
                  <div className='h5 right-separator'>Detail Tagihan</div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Waktu Transaksi</label>
                        <h2 className='text-lg font-800 font-medium flex justify-start'> { applicantData?.order_status!=="finished"?formatDate(applicantDataPayment?.started_at)??'15 April 2025 15.00WIB':'-'}</h2>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Waktu Tenggat</label>
                        <h2 className='text-lg font-800 font-medium flex justify-start'> { applicantData?.order_status!=="finished"?formatDate(applicantDataPayment?.expired_at)??'15 April 2025 15.00WIB':'-'}</h2>
                      </div>
                    </div>
                    {/* <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Status</label>
                        <h2 className='text-lg font-800 font-medium flex justify-start'> {applicantDataPayment.payment_code??'Virtual Akun BSI'}</h2>
                      </div>
                    </div> */}
                  </div>
                )}
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      {(applicantData.order_status=="" && applicantData.applicant_id)? (
                          <button className="btn text-white bg-green-700 hover:bg-green-600 w-full"
                            onClick={create_order}
                          >Bayar ce
                          <svg className="w-3 h-3 fill-current text-white-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                      </svg></button>
                      ) : (
                        (applicantData?.order_status!=='' && applicantData?.order_status!=='finished') ? ( 
                          <button className="btn text-white bg-green-700 hover:bg-green-600 w-full"
                              onClick={()=> window.location.href=applicantDataPayment.payment_url}
                          >Bayar ce
                          <svg className="w-3 h-3 fill-current text-white-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                          </svg></button>
                        ) : (
                          applicantData.order_status === 'finished' ? (
                            <button className="btn text-white bg-green-700 hover:bg-green-600 w-full"
                                  onClick={() => {navigate("/home")}}
                                >Lanjut
                                <svg className="w-3 h-3 fill-current text-white-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                            </svg></button>
                          ) : (
                        <button disabled className="btn text-white bg-green-700 hover:bg-green-600 w-full"
                        >  
                        <svg className="w-3 h-3 fill-current text-white-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                    </svg></button>
                          )
                        )


                      )}
                  {/* <TiArrowRightThick/> */}
                  {/* {
                    applicantData.order_status === 'finished' && (
                      <button className="btn text-white bg-green-700 hover:bg-green-600 w-full"
                            onClick={() => {navigate("/home")}}
                          >Lanjut
                          <svg className="w-3 h-3 fill-current text-white-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                      </svg></button>
                    )
                  } */}
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