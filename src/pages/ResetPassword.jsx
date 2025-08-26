import React, { useState } from 'react';

import Header from '../partials/Header';
import Banner from '../partials/Banner';
import { TiArrowRightThick  } from "react-icons/ti";
import Swal from '../utils/Swal';

import axios from '../api/local-server';
// import axios from '../api/prod-server';
import { useNavigate } from 'react-router-dom';
import { data } from 'autoprefixer';
const USERCHECK_URL = '/api/auth/user-check'
const RESETPASSWORD_URL = '/api/auth/reset-password'
// const RESETPASSWORD_URL = 'auth/reset-password'

function ResetPassword() {

  const [token, setToken] = useState("")
  const [username, setUsername] = useState("")
  const [newpassword, setNewPassword] = useState("")
  const [success, setSuccess] = useState("")
  const [data_modal, setDataModal] = useState({})
  const [modal_show, setModalShow] = useState(false)
  const navigate = useNavigate()

  // console.log('token > ', token)
  const checkUser = async (e) => {
    e.preventDefault()
    const response = await axios.post(USERCHECK_URL,
        JSON.stringify({ username }),
        {
          headers: {'Content-Type': 'application/json' }, withCredentials: false
        }
      )
      // 
      // console.log(JSON.stringify(response)); //console.log(JSON.stringify(response));
      setToken(response.data.data.token)
      // console.log(token)
      const element = document.querySelector('.usernameField');
      const element1 = document.querySelector('.checkUserBtn');
      if (element) {
        element.remove();
        element1.remove();
      }
      // const  = response?.token
      // const roles = response?.data?.roles 
  }
  const resetPassword = async (e) => {
    e.preventDefault()
    const response = await axios.post(RESETPASSWORD_URL,
        JSON.stringify({ token, newpassword }),
        {
          headers: {'Content-Type': 'application/json' }, withCredentials: false
        }
      )
      // 
      // console.log(JSON.stringify(response)); //console.log(JSON.stringify(response));
      // setToken(response.data.data.token)
      if(response.status=200){
        setDataModal({
          title: "Reset Password Berhasil",
          message: "",
          text: "Masuk Aplikasi",
          url: "/login",
          // url: "https://wa.me/628123523434?text=Assalamu'alaikum%20warahmatullah%20wabarakatuh%2C%20ustadz%2Fustadzah.%20Alhamdulillah%20ananda%20telah%20menyelesaikan%20formulir%20pra%20pendaftaran.%20Jazaakumullahu%20khayran.",
          text2: "",
          url2: ""
        })
        setModalShow(true)
        // return <Swal dataModal={modal}/>
        // navigate('/login')
      }else{
        setDataModal({
          title: "Reset Password Gagal",
          message: ""
          // text: "Masuk Aplikasi",
          // url: "/login",
          // url: "https://wa.me/628123523434?text=Assalamu'alaikum%20warahmatullah%20wabarakatuh%2C%20ustadz%2Fustadzah.%20Alhamdulillah%20ananda%20telah%20menyelesaikan%20formulir%20pra%20pendaftaran.%20Jazaakumullahu%20khayran.",
          // text2: "",
          // url2: ""
        })
        setModalShow(true)
      }
      // console.log(token)
      // const  = response?.token
      // const roles = response?.data?.roles 
  }
  return (
    <div className="flex flex-col max-w-lg min-h-screen my-0 mx-auto overflow-hidden relative">
    {/* <div className="flex flex-col max-w-lg min-h-screen mx-auto overflow-hidden"> */}
{/* flex flex-col max-w-lg min-h-screen my-0 mx-auto overflow-hidden relative */}
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        {modal_show && (
          <Swal dataModal={data_modal}/>
        ) }

        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1 mb-4">Reset Password</h1>
                <p className=" text-gray-600">Masukkan No. WhatsApp terdaftar/No Pendaftaran untuk mereset password.</p>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form >
                  

                  <div className="flex flex-wrap -mx-3 mb-4 usernameField">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="username">No. WhatsApp terdaftar/No. Pendaftaran<span className="text-red-600">*</span></label>
                      <input id="username" name="username" onChange={(e) => setUsername(e.target.value)} type="text" className="form-input w-full text-gray-800" placeholder="" required />
                    </div>
                  </div>
                  
                  
                  {token && (
                    <div>
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Password Baru<span className="text-red-600">*</span></label>
                          <input id="newpassword" name="newpassword" onChange={(e) => setNewPassword(e.target.value)} type="password" className="form-input w-full text-gray-800" placeholder="Masukkan password baru" required />
                          <input id="token" disabled hidden name="token" value={token??""} type="text" className="form-input w-full text-gray-800" placeholder="" required />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Konfirmasi Password<span className="text-red-600">*</span></label>
                          <input id="confirm_password" name='confirm_password' pattern={newpassword} type="password" className="form-input w-full text-gray-800 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" placeholder="Masukkan konfirmasi password" required />
                          <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                              Konfirmasi password tidak sama dengan password
                          </span>
                        </div>
                      </div>
                      
                    </div>
                  )}
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button onClick={checkUser} className="btn checkUserBtn text-white bg-green-600 hover:bg-green-700 w-full">Lanjutkan  <TiArrowRightThick/></button>
                      {token && (
                        <button onClick={resetPassword} className="btn text-white bg-green-600 hover:bg-green-700 w-full">Ubah Password <TiArrowRightThick/></button>
                      )}
                    </div>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Banner />

    </div>
  );
}

export default ResetPassword;