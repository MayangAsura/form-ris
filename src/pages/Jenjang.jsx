import React, {useEffect, useState} from 'react'
import { TiPinOutline } from 'react-icons/ti'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Header from '../partials/Header';
import Banner from '../partials/Banner';
import Footer from '../partials/Footer';
import supabase from '../client/supabase_client';
import { useSelector } from 'react-redux';
import { useLogin } from '../features/hooks/use-login';

import '../css/additional-styles/card.css';
import { TbExternalLink, TbCalendarTime, TbMapPin2, TbNotebook } from "react-icons/tb";
import { BiMoney } from "react-icons/bi";
import { MdOutlineLaunch } from 'react-icons/md'
import Swal from '../utils/Swal';
import SwalComponent from '../utils/SwalComponent';
import AdmissionFlowL from '../partials/AdmissionFlowL';

function Jenjang() {
  const id = "e63830b4-c751-4714-9279-fd57c4be5f10"
  const [admission_schools, setAdmissionSchools] = useState([])
  const { userToken, userInfo } = useSelector((state) => state.auth)
  const { onSubmit, form, results, loading } = useLogin();
  const auth_token = localStorage.getItem('token-refresh') || results.data?.token_refresh || userToken
  const navigate = useNavigate()
  const [modal_show, setModalShow] = useState(false)
  const [modal_flow_show, setModalFlowShow] = useState(false)
  const [modal_data, setmodal_data] = useState({
    title: "Persyaratan Umum Pendaftaran",
    message: <ul> 
              <li>Sehat jasmani dan rohani</li> 
              <li>Berusia min 4 tahun (TK A), 5 tahun (TK B), dan 6
tahun (SD) per 1 Juli 2025</li>
              <li>Memiliki NISN dan ijazah untuk jenjang SMP dan
SMA</li>
              <li>Mengikuti alur pendaftaran dan lulus tes observasi</li>
              <li>Siap mengikuti aturan dan kewajiban biaya yang
ditetapkan sekolah</li>
</ul>,
    text: "OK",
    url: "/"
  })

  useEffect(()=> {
    if(id){
      getAdmissionsAys(id)

    }
    if(auth_token){
      navigate('/home')
    }
    // console.log(id)
    // console.log(admission_schools)
  },[id, auth_token])

  const getAdmissionsAys = async (id) => {
    let { data: admission_schools, error } = await supabase
    .from('admission_schools')
    .select(`
      *,
      schools(school_name, address),
      admission_ays (
        academic_year,
        admission_id
      )
    `)
    .eq('admission_ays.admission_id', id)

    if(error){
      console.log(error)
    }else{
      setAdmissionSchools(admission_schools)
      // console.log(admission_schools)
      // setAdmissionSchools(admission_schools.map(prev => [...prev, {img}])
    }

    }

  const jenjangData = [
    {img: "./images/schools_thumbnails/TKIT-Modern-ImageCard.png", title: "TKIT A Rabbaanii Islamic School", code:'tkit-a', schedule:'15 Agustus 2025 - 31 Oktober 2025', address: 'Jl. Cisanggiri 2G, Jatireja, Kec. Cikarang Tim., Kabupaten Bekasi, Jawa Barat 17530', registration_requirements: 'Open ', registration_fee: 'Rp150.000'},
    {img: "./images/schools_thumbnails/TKIT-Modern-ImageCard.png", title: "TKIT B Rabbaanii Islamic School", code:'tkit-b', schedule:'15 Agustus 2025 - 31 Oktober 2025', address: 'Jl. Cisanggiri 2G, Jatireja, Kec. Cikarang Tim., Kabupaten Bekasi, Jawa Barat 17530', registration_requirements: 'Open ', registration_fee: 'Rp150.000'},
    {img: "./images/schools_thumbnails/Gedung-Rabbaanii-Islamic-School-1.png", title: "SDIT Rabbaanii Islamic School", code:'sdit', schedule:'15 Agustus 2025 - 31 Oktober 2025', address: 'Jl. Cimandiri 8 B RT 06/08 Graha Asri 17550, Jatireja, Kec. Cikarang Tim., Kabupaten Bekasi, Jawa Barat 17550', registration_requirements: 'Open ', registration_fee: 'Rp400.000'},
    {img: "./images/schools_thumbnails/Gedung-Rabbaanii-Islamic-School-1.png", title: "SMPI Rabbaanii Islamic School", code:'smpi', schedule:'15 Agustus 2025 - 31 Oktober 2025', address: 'Jl. Cimandiri 8 B RT 06/08 Graha Asri 17550, Jatireja, Kec. Cikarang Tim., Kabupaten Bekasi, Jawa Barat 17550', registration_requirements: 'Open ', registration_fee: 'Rp400.000'},
    {img: "./images/schools_thumbnails/Gedung-Rabbaanii-Islamic-School-1.png", title: "SMAI Putri Rabbaanii Islamic School", code:'smai', schedule:'15 Agustus 2025 - 31 Oktober 2025', address: 'JJl. Cimandiri 8 B RT 06/08 Graha Asri 17550, Jatireja, Kec. Cikarang Tim., Kabupaten Bekasi, Jawa Barat 17550 ', registration_requirements: 'Open ', registration_fee: 'Rp400.000'},
    {img: "./images/schools_thumbnails/Gedung-Pesantren.jpg", title: "SMP Pesantren Rabbaanii Islamic School", code:'smp-pesantren', schedule:'15 Agustus 2025 - 31 Oktober 2025', address: 'Kp. Pamahan Pesantren Rabbaanii Islamic School RT.001/006 Desa Jati Reja, Kec. Cikarang Timur, Kab. Bekasi, 17530.', registration_requirements: 'Open ', registration_fee: 'Rp500.000'},
    {img: "./images/schools_thumbnails/Gedung-Pesantren.jpg", title: "SMA Pesantren Rabbaanii Islamic School", code:'sma-pesantren', schedule:'15 Agustus 2025 - 31 Oktober 2025', address: 'Kp. Pamahan Pesantren Rabbaanii Islamic School RT.001/006 Desa Jati Reja, Kec. Cikarang Timur, Kab. Bekasi, 17530.', registration_requirements: 'Open ', registration_fee: 'Rp500.000'},
    // {img: "./images/schools_thumbnails/hani-fildzah-14A6o9BGovo-unsplash.jpg", title: "Rabbaanii Ciwidey", code:'rabbaanii-ciwidey', schedule:'15 Agustus 2025 - 31 Oktober 2025', address: 'Jl. Cilame Cibaga, No. 25 Sukawening, Kec. Ciwidey, Kab. Bandung Jawa Barat.', registration_requirements: 'Closed ', registration_fee: 'Rp0.000'}
  ] 
  // console.log(jenjangData)

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
  
      const indonesianFormat = `${day} ${monthName} ${year} ${hour}:${minute} WIB`;
      return indonesianFormat
    }

    const openFlow = () => {
      setModalFlowShow(true)
    }

    const setClose = (value) => {
      setModalFlowShow(!value)
    }


  return (
    // <div>Jenjang</div>
    <div className="flex flex-col max-w-lg min-h-screen my-0 mx-auto min-w-screen shadow-lg bg-white overflow-hidden">
      {/* flex flex-col max-w-lg my-0 mx-auto min-w-screen shadow-lg bg-white overflow-hidden */}
     {/* <div className="flex flex-col max-w-lg min-h-screen mx-auto overflow-hidden"> */}
 {/* flex flex-col max-w-lg min-h-screen my-0 mx-auto overflow-hidden relative */}
       {/*  Site header */}
       <Header />

       {/*  Page content */}
       <main className="flex-grow">
       {/* bg-gray-100 */}
       {/* bg-gradient-to-b from-gray-100 to-white */}
      <section className="relative">
         {/* Section background (needs .relative class on parent and next sibling elements) */}
      {/* <div className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-900 pointer-events-none" aria-hidden="true"></div> */}
      {/* <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div> */}
      <h3 className="text-3xl md:text-4xl text-center font-bold leading-tighter tracking-tighter mt-32 mb-5 px-1" data-aos="zoom-y-out">
              Ahlan wa Sahlan, <br /><span className="text-3xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-orange-400 ">Buku Tamu Penerimaan Santri Baru <br /> Rabbaanii Islamic School</span>
              
            </h3>
            <hr className='w-24 h-1 mx-auto my-4 text-transparent bg-gradient-to-l from-gray-100 to-green-400 border-0 rounded-sm md:my-8 '/>
            {/* <div className='flex flex-col w-10 align-middle border border-green-700 rounded border-opacity-50 border-x'></div> */}
            <div className='max-w-3xl mx-auto text-center items-center pt-5'>

              <p className='text-xl text-gray-600 inline-grid px-5'>Silahkan Ayah/Bunda memilih jenjang pendidikan terlebih dahulu untuk melanjutkan proses pendaftaran.</p>
              {/* <span className="rounded-md w-52 bg-green-100 px-2 py-1 mt-24 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Persyaratan Umum Pendaftaran <TbExternalLink />
                        </span> */}
            </div>
            {/* <div className=''></div> */}
            <div className='flex flex-row justify-center items-center my-3'>
              <button onClick={openFlow}>
                <span className="flex items-center gap-1 rounded-md w-42 bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                Lihat Peta Pendaftaran <MdOutlineLaunch/></span>
              </button>

            </div>
            {modal_flow_show && (
              <SwalComponent dataModal={{title: "Alur Pendaftaran PSB TA. 26/27", message: <AdmissionFlowL/>}} setClose={setClose} ></SwalComponent>
            )}
            {modal_show && (
              <Swal dataModal={modal_data}></Swal>
            )}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-12">
          <div className="displayCard">
           
          {jenjangData.map(function(d,k) {
            return(
              <div className="card rounded-sm"  key={d.code}>
                <div className="card-container">
                  <div className="image-container">
                    <div className="absolute scale-[0.2] h-0 -ml-20 p-2 pb-2/3 sm:pt-1/3 lg:pb-1/3 justify-start object-scale-down max " width={5} >
                    <img src={"/images/rabbaanii-logo.png"} width={5} className="w-5 h-5 "/>
                    
                    </div>
                    

                    <img src={d.img} alt="" className='object-cover' />
                    {/* </div> */}
                  </div>
                  <div className="card-content">
                    <div className="title-container">
                      {/* <div className="p-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"> */}
                      <h4 className='font-semibold'>{d.schools?.school_name??d.title}</h4>
                      {/* </div> */}
                    </div>
                    <div className="body-containe justify-between text-start ml-1">
                      <table>
                        <tbody>

                        <tr className='text-start leading-tight'>
                          <td><TbMapPin2 className='rounded-sm shadow-green-100 bg-green-200 '/>  </td>
                          <td className=''><small className='text-xs'>{d.schools?.address??d.address}</small></td>
                          {/* <td></td> */}
                        </tr>
                        <tr>
                          <td><TbCalendarTime className='rounded-sm shadow-green-100 bg-green-200'/>  </td>
                          <td><small className='text-xs'>{d.started_at?formatDate(d.started_at) -  formatDate(d.ended_at): d.schedule}</small></td>
                          {/* <td></td> */}
                        </tr>
                        {/* <tr>
                          <td><TbNotebook/>  </td>
                          <td><small className='text-xs'>{d.registration_requirements}</small></td>
                          <td></td>
                        </tr> */}
                        <tr>
                          <td><BiMoney className='rounded-sm shadow-green-100 bg-green-200'/>  </td>
                          <td><small className='text-xs'>{d.admission_fee??d.registration_fee}</small></td>
                          {/* <td></td> */}
                        </tr>
                        </tbody>
                      </table>
                      {/* <p className='flex flex-col'>
                        <div className='flex justify-between items-center gap-2'>
                          <div className="flex items-start gap-">
                          
                          </div>

                        </div>
                        <div className='flex justify-between items-center gap-2'>
                          <div className="flex items-start gap-1">
                            <TbCalendarTime/>  <small>{d.schedule}</small>

                          </div>
                          </div>
                        <TbNotebook /> <small>{d.registration_requirements}</small> 
                        <BiMoney/> <small>{d.registration_fee}</small>
                      </p> */}
                      {/* <p>{body}</p> */}
                    </div>
                  </div>
                  <div className="btn">
                    <Link to={`/${d.code}`} className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800">
                      <small className='text-xs'>Daftar</small>
                      <svg className="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                      </svg>                  
                    </Link>
                    {/* <button>
                      <a href="#">Lanjut Daftar 
                      <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                      </a>
                    </button> */}
                  </div>
                </div>
              </div>
            )
              
            })}
           
          </div>
          {/* <div className="max-w-sm bg-white shadow-2xl rounded-lg overflow-hidden">

            <img className="w-full h-48 object-cover" src="https://via.placeholder.com/400" alt="Card Image" />

            <div className="p-4">

                <div className='mx-auto flex items-center'><TiPinOutline size={48}className="justify-start mx-auto -mr-10"/><h2 className="text-xl font-bold text-gray-800 justify-start mx-auto">Pengumuman</h2></div>
                
                <p className="text-gray-600 mt-2">Ini adalah contoh kartu menggunakan Tailwind di React.</p>

                <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">

                Selengkapnya

                </button>

            </div>

          </div> */}
        </div>
      </div>
      </section>
      </main>
      <Footer/>

      </div>
    

 
  )
}

export default Jenjang