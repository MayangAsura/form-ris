import React from 'react'
import { TiPinOutline } from 'react-icons/ti'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
// import Header from '../partials/Header';
import Banner from '../partials/Banner';

import '../css/additional-styles/card.css';

function Jenjang() {

  const jenjangData = [
    {img: "https://rabbaanii.sch.id/wp-content/uploads/2025/01/Gedung-Pesantre.jpg", title: "TKIT A Rabbaanii Islamic School", code:'tkit-a'},
    {img: "https://rabbaanii.sch.id/wp-content/uploads/2025/01/Gedung-Pesantre.jpg", title: "TKIT B Rabbaanii Islamic School", code:'tkit-b'},
    {img: "https://rabbaanii.sch.id/wp-content/uploads/2025/01/Gedung-Rabbaanii-Islamic-School-1.png", title: "SDIT Rabbaanii Islamic School", code:'sdit'},
    {img: "https://rabbaanii.sch.id/wp-content/uploads/2025/01/Gedung-Rabbaanii-Islamic-School-1.png", title: "SMPI Rabbaanii Islamic School", code:'smpi'},
    {img: "https://rabbaanii.sch.id/wp-content/uploads/2025/01/Gedung-Rabbaanii-Islamic-School-1.png", title: "SMAI Putri Rabbaanii Islamic School", code:'smai'},
    {img: "https://rabbaanii.sch.id/wp-content/uploads/2025/01/Gedung-Pesantre.jpg", title: "SMP Pesantren Rabbaanii Islamic School", code:'smp-pesantren'},
    {img: "https://rabbaanii.sch.id/wp-content/uploads/2025/01/Gedung-Pesantre.jpg", title: "SMA Pesantren Rabbaanii Islamic School", code:'sma-pesantrean'},
    {img: "https://rabbaanii.sch.id/wp-content/uploads/2025/01/hani-fildzah-14A6o9BGovo-unsplash.jpg", title: "Rabbaanii Ciwidey", code:'rabbaanii-ciwidey'}
  ] 
  console.log(jenjangData)

  return (
    // <div>Jenjang</div>
//     <div className="flex flex-col max-w-lg min-h-screen my-0 mx-auto overflow-hidden relative">
//     {/* <div className="flex flex-col max-w-lg min-h-screen mx-auto overflow-hidden"> */}
// {/* flex flex-col max-w-lg min-h-screen my-0 mx-auto overflow-hidden relative */}
//       {/*  Site header */}
//       <Header />

//       {/*  Page content */}
//       <main className="flex-grow">
      <section className="relative">
         {/* Section background (needs .relative class on parent and next sibling elements) */}
      {/* <div className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-900 pointer-events-none" aria-hidden="true"></div> */}
      {/* <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div> */}

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="displayCard">
            {/* {jenjangData[0].code} */}
          {/* {jenjangData.map(function(d) {
            return {tit}
          })}   */}
          {jenjangData.map(function(d) {
            return(
              <div className="card" key={d.code}>
                <div className="card-container">
                  <div className="image-container">
                    <img src={d.img} alt="" />
                  </div>
                  <div className="card-content">
                    <div className="title-container">
                      <h3>{d.title}</h3>
                    </div>
                    {/* <div className="body-container">
                      <p>{body}</p>
                    </div> */}
                  </div>
                  <div className="btn">


                    <Link to={`daftar/${d.code}`} className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">
                      <span>Lanjut Daftar</span>
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
      // </main>

      // </div>
    

 
  )
}

export default Jenjang