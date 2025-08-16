import React, {useState, useEffect} from 'react';
import supabase from '../client/supabase_client';
import { createClient } from '@supabase/supabase-js';
// import axios from '../api/local-server';
import axios from '../api/prod-server';

import Header from '../partials/Header';
import Banner from '../partials/Banner';
import { redirect, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import queryString from "query-string"
import { useSearchParams } from 'react-router-dom';

import Swal from '../utils/Swal';

// const CREATE_INVOICE_URL = "/api/create-invoice"
const CREATE_INVOICE_URL = "/api/create-form-invoice"

function Payment() {
  // const supabase = createClient('https://cnpcpmdrblvjfzzeqoau.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNucGNwbWRyYmx2amZ6emVxb2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxMDc5MjgsImV4cCI6MjA0ODY4MzkyOH0.KDzEImvYqvh6kv9o5eMuWzWuYZIElWNtPyWDdLMi46w' )
    const queryParams = queryString.parse(window.location.search)
    const [applicantData, setApplicantData] = useState({applicant_orders: [], applicant_schools: [], applicant_id: "",school_id: "", school_name:"", full_name: "",phone_number: "",email: "", order_id:"", order_status:""})
    const [applicantDataOrder, setApplicantDataOrder] = useState({item_id: "",foundation_id: "",description: "",total_amount: "",created_by: "",applicant_id:""} )
    const [applicantDataPayment, setApplicantDataPayment] = useState({started_at: "",expired_at: "",payment_url:"",status:"", amount: "", settlement_at: ""} )
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
    // const use
    // const o = '00'
    const [searchParams, setSearchParams] = useSearchParams();
    const o = searchParams.get('resultCode'); 
    const r = searchParams.get('merchantOrderId'); 


// const r = '73776e1b-2cdf-4348-90b7-49ae218d07dc'
    useEffect(() => {
      // console.log('masuk')

      // getApplicantData()
      // if(r && o){
      //   console.log('qp', o, r)
      //   getApplicantPayment()
      // }


      const getApplicantData = async () =>{
        // console.log('on applicantdata')
        // const tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjA4NTIxNjUyNzM5NyIsImlhdCI6MTc1NDE0ODg1NCwiZXhwIjoxNzU0MjM1MjU0fQ.eG-_ZkjYmzJqJuK1sAELeRiuYSDOnOr5NyAxAyQCqBA';
        // console.log('qp', o, r)
        const {data, error} = await supabase.from('applicants').select('applicant_schools(applicant_id, schools(school_name, school_id)), applicant_orders(id, status, invoice_number), full_name, gender, email, phone_number, regist_number, created_at, refresh_token, status, is_notif_sended)')
                            .eq('refresh_token', userToken)                 
                            .eq('status', 'active')
                            .single()
        if(error){
          console.log(error)
          // setApplicantData({})
        }else{
          setApplicantData(data)
          // console.log('applicantData> ', data)
  
          
          // applicantData.full_name = data.full_name
          // applicantData.phone_number = data.phone_number
  
          // if(data.applicant_orders.length>0){
          //   applicantData.order_id = data.applicant_orders[0].id
          //   applicantData.order_status = data.applicant_orders[0].status
          // }
  
          const {data: dataSchool, errorSchool} = await supabase.from('school_fees')
            .select('amount, fee_type_id')
            .eq('school_id', 7)
            .single() 
          // if(dataSchool){
          // console.log('school_fees > ', dataSchool)
          // setApplicantDataOrder({...applicantDataOrder, total_amount: dataSchool.amount})
          applicantDataOrder.total_amount = dataSchool.amount
          
          // if(data.applicant_orders.length > 0){
          applicantDataOrder.invoice_number = data.applicant_orders[0].invoice_number
          data.applicant_orders[0].status!== 'pending'?setInvoiceCreated(true):""
          // }
          // console.log('invoicecreated> ', invoicecreated)
          // if(applicantData.applicant_schools.length>0){
          applicantData.applicant_id = data.applicant_schools[0]?.applicant_id
          applicantData.school_id = data.applicant_schools[0]?.schools?.school_id
          applicantData.school_name = data.applicant_schools[0]?.schools?.school_name
            
            applicantDataOrder.item_id = data.applicant_schools[0]?.schools?.school_id
            applicantDataOrder.created_by = data.applicant_schools[0]?.applicant_id
            applicantDataOrder.applicant_id = data.applicant_schools[0]?.applicant_id
            // console.log('in applicantdataorder')
            // const dataOrder = {
            //   item_id: data.applicant_schools[0]?.schools?.school_id,
            //   created_by: data.applicant_schools[0]?.applicant_id,
            //   applicant_id: data.applicant_schools[0]?.applicant_id,
            //   invoice_number: data.applicant_orders[0].invoice_number,
            //   total_amount: dataSchool.amount
            // }
            // setApplicantDataOrder(dataOrder)
            // console.log('applicantDataOrder', applicantDataOrder)

            setApplicantData(data)
              // setSchoolName(applicantData?.applicant_schools[0]?.schools?.school_name)
              // setSchoolId(applicantData.applicant_schools[0]?.schools?.school_id) 
              
  
              // applicantDataOrder.total_amount = dataSchool.amount
              
              // const school_id = data.school_id
              // console.log('data >',data)
              // console.log('applicantDataOrder >',applicantDataOrder)
              // console.log('applicantData >',applicantData)
          }
         
          applicantDataOrder.item_id = applicantData.applicant_schools[0]?.schools?.school_id
          applicantDataOrder.created_by = applicantData.applicant_schools[0]?.applicant_id
          applicantDataOrder.applicant_id = applicantData.applicant_schools[0]?.applicant_id
              
                  
          // }
        }
      

      const getApplicantPayment = async () => {
        // console.log('on payment')
        // console.log(applicantData.order_status)
        // if(applicantData.applicant_orders.length!== 0 && applicantData.applicant_orders.length?.status!=='finished')
        
        // console.log('or in paymein',r)
        if(r )
          {
          // console.log("status !='' ")
          const {data: dataPayment, errorPayment} = await supabase.from('applicant_payments')
          .select('started_at, expired_at, payment_url, status, amount, settlement_at')
          .eq(`order_id`,r)
          .single()
          if(dataPayment.status =='paid'){
            navigate('/home')
          }
          // ,order_id.eq.${applicantData.applicant_orders.length!== 0 && applicantData.applicant_orders.length?.status!=='finished'?applicantData.applicant_orders[0].id:""}
          applicantDataPayment.started_at = dataPayment.started_at
          applicantDataPayment.expired_at = dataPayment.expired_at
          applicantDataPayment.payment_url = dataPayment.payment_url
          applicantDataPayment.status = dataPayment.status
          applicantDataPayment.amount = dataPayment.amount
          applicantDataPayment.settlement_at = dataPayment.settlement_at

          const dataPay = {
            started_at : dataPayment.started_at,
            expired_at : dataPayment.expired_at,
            payment_url : dataPayment.payment_url,
            status : dataPayment.status,
            amount : dataPayment.amount,
            settlement_at : dataPayment.settlement_at
          }
          setApplicantDataPayment(dataPay)
          // console.log('applicantDataPayment', applicantDataPayment)
          // setApplicantDataPayment(dataPayment)
          // getApplicantPayment()
          // invoicecreated && applicantData.order_status!==='finis'
          setInvoiceCreated(true)
                                            
                                          }

                                          
                                          
          if(applicantData.applicant_orders.length !==0 && applicantData.applicant_orders.length?.status!=='finished'){
            const {data: dataPayment, errorPayment} = await supabase.from('applicant_payments')
            .select('started_at, expired_at, payment_url, status, amount, settlement_at')
            .eq('order_id', applicantData.applicant_orders[0].id)
            .single()

            applicantDataPayment.started_at = dataPayment.started_at
          applicantDataPayment.expired_at = dataPayment.expired_at
          applicantDataPayment.payment_url = dataPayment.payment_url
          applicantDataPayment.status = dataPayment.status
          applicantDataPayment.amount = dataPayment.amount
          applicantDataPayment.settlement_at = dataPayment.settlement_at

          const dataPay = {
            started_at : dataPayment.started_at,
            expired_at : dataPayment.expired_at,
            payment_url : dataPayment.payment_url,
            status : dataPayment.status,
            amount : dataPayment.amount,
            settlement_at : dataPayment.settlement_at
          }
          setApplicantDataPayment(dataPay)
          // console.log('applicantDataPayment', applicantDataPayment)
          // setApplicantDataPayment(dataPayment)
          // getApplicantPayment()
          // invoicecreated && applicantData.order_status!==='finis'
          setInvoiceCreated(true)
                                            
          }
          // const {data: dataPayment, errorPayment} = await supabase.from('applicant_payments')
          //                                   .select('started_at, expired_at, payment_url, status, amount, settlement_at')
          //                                   .eq('reference_code', reference)
          //                                   .single()
  
          // applicantData.applicant_orders[0]?.status
        // } 
            
        // console.log('invoicecreated >', invoicecreated)
        // if(applicantData.order_status !== 'finished'){
          
        // }
      }
      


      getApplicantData()

      if(invoicecreated){

        getApplicantPayment()
      }

      // if(applicantData.applicant_orders[0]?.status === 'finished' && applicantData.is_notif_sended === true){
      //   // setTimeout(() => {
      //     navigate('/home')
      //   // }, 1200);
      //   }
      // if(applicantData.applicant_orders[0]?.status === 'finished' && applicantData.is_notif_sended === false){

      //   getApplicantData()
      //   getApplicantPayment()
      //   // }, 1200);

      //   // setTimeout(() => {
          
      //   send_notif_success()
      // }
      // if(invoicecreated){
      //   console.log(invoicecreated)
      // }

      
      
    }, [r, o])

    


    const send_notif_success = async () => {

      // setTimeout(() => {
        // getApplicantPayment()
      //   getApplicantData()
        
      // }, 1500);
      
      // console.log('paymentdata', applicantData, applicantDataOrder, applicantDataPayment)
      const new_phone_number = '62'+ applicantData.phone_number.slice(1)
      const no_form_pendaftaran = applicantData.applicant_orders[0].invoice_number
      const settlement_date = formatDate(applicantDataPayment.settlement_at)
      const amount = applicantDataPayment.amount
      const no_registrasi = applicantData.regist_number
      const PSB_URL = 'https://psb-formy.vercel.app/login'
      const type = 'payment'
      // console.log('', no_form_pendaftaran, settlement_date, amount)
      // No. Formulir Pendaftaran: ${no_form_pendaftaran}
      // Nominal                 : ${amount}
      //   Tanggal Bayar           : ${settlement_date}
      const data = [{
        "phone": new_phone_number,
        // "phone": "6285778650040",
        "message": `Assalamu'alaikum, Alhamdulillah Pembayaran terkonfirmasi berhasil. Ananda dapat melanjutkan proses pendaftaran.
        No. Formulir Pendaftaran: ${no_form_pendaftaran}
        Status Pembayaran       : Sukses
        
        No. Pendaftaran         : ${no_registrasi}
        Login Aplikasi          : ${PSB_URL}
        
        Jazaakumullahu khayran wa Baarakallaahu fiikum.
        
        -- PSB RABBAANII ISLAMIC SCHOOL - CS RABBAANII --
        - Mohon simpan nomor ini untuk mendapatkan update informasi -`
        // "message": "Assalamu'alaikum, Alhamdulillah ananda telah terdaftar di sistem kami dengan No. Registrasi . "
        
      }]
      
      try {
        const response = await axios.post("/api/auth/send-notif", {message: data , type: type, token: applicantData.refresh_token??null},
          {
            headers: {'Content-Type': 'application/json' }
          }
        );
        // 
        console.log(JSON.stringify(response)); //console.log(JSON.stringify(response));
        if(response.status==200 || response.status==204){
          // console.log('masuk notif', new_phone_number, no_form_pendaftaran, no_registrasi)
          
          // persistor.purge();
          // // Reset to default state reset: async () => { useCart.persist.clearStorage(); set((state) => ({ ...initialState, })); },
          // localStorage.removeItem("persist:auth")
          // Cookies.remove("jwt")
          // dispatch(logout())
          // navigate('/login')
        }
        navigate('/home')
      } catch (error) {
              console.log('error notif', error)
            }
    }

      // setTimeout(() => {
      //   getApplicantDataSchool()
      // }, 2000);
      // getApplicantPayment()
      // create()

      

    const getStatusOrderText = (status_code) => {
      switch (status_code) {
        case 'pending':
          return 'Pending'
        case 'processed':
          if(applicantDataPayment?.expired_at && (Date.now() > new Date(applicantDataPayment.expired_at).getTime())){
            return 'Pembayaran Kedaluwarsa'
          }else{
            return 'Menunggu Pembayaran' 

          }
        case 'finished':
          return 'Selesai'
        case 'canceled':
          return 'Transaksi Dibatalkan'
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
      
      // console.log(applicantDataPayment.expired_at)
      // console.log("enter")
      if(applicantDataPayment?.expired_at > new Date()){
        // console.log("in expired")

        return

       
      }else{
        
        if(applicantData.order_status=="proccesed"){
          // console.log("in proccessed")
          modal_data.title = "Gagal Membuat Pembayaran" 
          modal_data.message = "Ananda telah melakukan transaksi sebelumnya." 
          setModalShow(true)
        }
        navigate('/pay')
      }
      // console.log("in new order")
       const applicantDataX = {item_id: 1, foundation_id: 1, description: 'paying registration fee', total_amount: 125000, created_by: '04f84c3c-11e2-4154-8c88-df1e2f3a6c3a'}
        applicantDataOrder.description = 'Biaya Formulir Pendaftaran' + ' ' + applicantData.applicant_schools[0]?.schools.school_name??''
        // applicantDataOrder.description = 'invoice registration fee'
// applicantData.applicant_schools[0]?.schools?.school_id
        applicantDataOrder.item_id = 7
        applicantDataOrder.created_by = applicantData.applicant_schools[0]?.applicant_id
        applicantDataOrder.foundation_id = 1
        // console.log("applicantDataOrder ",  applicantDataOrder)
  
        // const { data : }
  
        const { data: order, error } = await supabase.rpc('add_new_order', {
                                        _created_by: applicantDataOrder.created_by, 
                                        _description: applicantDataOrder.description, 
                                        _foundation_id: applicantDataOrder.foundation_id, 
                                        _item_id: applicantDataOrder.item_id, 
                                        _refresh_token: userToken, 
                                        _total_amount: 11000
                                      })
                                      // applicantDataOrder.total_amount
        if (error) console.error('error > ', error)
        // else console.log(order)
  
        // const { data: order, error } = await supabase
        //                               .from('applicant_orders')
        //                               .insert(
        //                                 [applicantDataOrder]
        //                               ).select()
  
        // if(error){
        //   console.log(error)
        // }else{
        //   console.log('data >', order)
        // }
        // console.log('appli->',order)
        const data = {
          order_id : order
        }
  
        try {
          
          axios.post(CREATE_INVOICE_URL, data).then((res) => {
            console.log("in create invoice")
            console.log(res.status);
            console.log(res)
    
            
            checkout.process(res.data.reference_code, {
                  defaultLanguage: "id", //opsional pengaturan bahasa
                  // currency: "USD", //optional to set rate estimation
                  successEvent: function(result){
                  
                      setInvoiceCreated(true)
                      
                      console.log('success');
                      console.log(result)
                      getApplicantData()
                      getApplicantPayment()
                      redirect(res.data.payment_url)
                      // alert('Payment Success');
    
    
                  },
                  pendingEvent: function(result){
    
                      setInvoiceCreated(true)

                      console.log('pending');
                      getApplicantData()
                      getApplicantPayment()
                      console.log(result);
                      // alert('Payment Pending');
                  },
                  errorEvent: function(result){
                  
                      console.log('error');
                      console.log(result);
                      modal_data.title = "Pembayaran Gagal"
                      modal_data.message = "Error : ", result?? "Pembayaran tidak ditemukan."
                      setModalShow(true)
                      // merchantOrderId: "ed9936d0-ff04-4b9f-a5f4-2b4682d13f0d"
                      // reference: "D1818225BR6YN8ESXLU4D5X"
                      // resultCode: "02"
                      // alert('Payment Error');
                  },
  
                  closeEvent: function(result){
                  // tambahkan fungsi sesuai kebutuhan anda
                      // console.log('customer closed the popup without finishing the payment');
    
                      console.log(result);
                      getApplicantData()
                      getApplicantPayment()
                      navigate(-1, {fallback: '/pay'})
                      
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

// max-w-lg 
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
                <h1 className="h1 mb-4">Pembayaran <br />Biaya Formulir Pendaftaran</h1>
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
                      <h2 className='text-lg font-800 font-medium flex justify-start'> {applicantData?.applicant_schools[0]?.schools?.school_name??'-'}</h2>
                      {/* <h2>{applicantOrder.schools.school_name??'-'}</h2> */}
                      {/* <input id="kode" type="text" className="form-input w-full text-gray-800" placeholder="" required /> */}
                    </div>
                  </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block text-gray-800 text-sm font-medium mb-1" >Biaya Pendaftaran</label>
                    <h2 className='text-4xl font-900 font-medium flex justify-start'> { formatRupiah(12000)??'Tidak ditemukan'}</h2>
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
                      <h2 className='text-lg font-900 font-medium justify-start inline-flex items-center rounded-lg bg-yellow-100 px-2 py-1 text-yellow-900 ring-1 ring-gray-500/10 ring-inset'>{getStatusOrderText(applicantData?.applicant_orders[0]?.status)??'-'}</h2>
                    </div>
                  </div>
                { invoicecreated && (
                <div>
                  <div className='h5 right-separator'>Detail Pembayaran</div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Nomor Formulir Pendaftaran</label>
                        <h2 className='text-lg font-800 font-medium flex justify-start'> { applicantData?.order_status!=="finished"?applicantDataOrder?.invoice_number:'-'}</h2>
                      </div>
                    </div>
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
                      {(applicantData.applicant_orders.length===0 && applicantData.applicant_schools[0]?.applicant_id)? (
                          <button className="btn text-white bg-green-700 hover:bg-green-600 w-full"
                            onClick={create_order}
                          >Buat Transaksi
                          <svg className="w-3 h-3 fill-current text-white-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                      </svg></button>
                      ) : (
                        (applicantData.applicant_orders[0]?.status!=='' && applicantData.applicant_orders[0]?.status!=='finished') ? ( 
                          (Date.now() > new Date(applicantDataPayment?.expired_at).getTime()?(
                          <button className="btn text-white bg-green-700 hover:bg-green-600 w-full"
                              onClick={create_order}
                          >Buat Transaksi Baru
                          <svg className="w-3 h-3 fill-current text-white-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                          </svg></button>

                          ):(
                            <button className="btn text-white bg-green-700 hover:bg-green-600 w-full"
                              onClick={()=> window.location.href=applicantDataPayment.payment_url}
                          >Bayar
                          <svg className="w-3 h-3 fill-current text-white-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                          </svg></button>
                          ) )
                        ) : (
                          applicantData.applicant_orders[0]?.status === 'finished'? (
                            navigate('/home')
                            // <button className="btn text-white bg-green-700 hover:bg-green-600 w-full"
                            //       onClick={() => {navigate("/home")}}
                            //     >Lanjut
                            //     <svg className="w-3 h-3 fill-current text-white-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                            //   <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                            // </svg></button>
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