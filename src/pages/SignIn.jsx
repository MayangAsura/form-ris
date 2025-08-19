import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../features/auth/authActions'
import supabase from '../client/supabase_client';
// import { useMutation } from "@tanstack/react-query";
// import { AuthService } from "../services/auth";

import { TbEye, TbEyeOff } from "react-icons/tb";

import Cookies from 'js-cookie'

import Header from '../partials/Header';
import Banner from '../partials/Banner';
import Swal from '../utils/Swal';
import { data } from 'autoprefixer';
import useSignIn from 'react-auth-kit/hooks/useSignIn'
// import axios from 'axios';
import axios from '../api/prod-server'

// import { useLogin } from "../features/hooks/use-login";
const LOGIN_URL = 'api/auth/login'

function SignIn(props) {
  const {userInfo, userToken, errorMsg, userPayment, userSchool, userFormComplete, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {setAuth} = useContext(AuthContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [userData, setUserData] = useState({
    school_name: "",
    status: ""
  })
  // const { onSubmit, form, loading } = useLogin();
  const [modal_show, setModalShow] = useState(false)
  const [modal_data, setmodal_data] = useState({
    title: "Login Berhasil",
    message: "Mengarahkan ke halaman pengisian formulir.",
    text: "OK",
    url: "/home"
  })
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = form;

  const getUserInfo = async () =>{
    // setTimeout(() => {
      const token = userToken
      // console.log('token >', token)
        if (token) {
        const {data, error} = await supabase.from('applicants').select('applicant_schools(schools(school_name)), applicant_orders(status), full_name, gender, email, phone_number, regist_number, created_at, refresh_token, participants(dob, aspiration))').eq('refresh_token', token)
        if(error){
          console.log(error)
          return null
        //   setProfileData({})
        }else{
          // console.log('dataProf>', data)
          userData.school_name = data
          const full_name = data.full_name
          return data
          // setAuth({full_name})
          // setAuth({full_name: data.full_name,phone_number: data.phone_number, regist_number: data.regist_number,payment_status: data.payment_status})
          // return data
        //   setProfileData(data)
        }
      }
      
    // }, 900000);

  } 
  const getPaymentInfo = async () => {
    // const user, error = await
    const token = Cookies.jwt
    // console.log(token)
    // console.log('userToken > ', userToken)
    if(!userToken){
      return false
    }
    // const userId = JSON.parse(atob(token.split('.')[1])).id
    // const {data, error} = await supabase.from("applicant_orders")
    //                     .select("status, item_id, applicant_id, applicants(refresh_token)").eq('applicants.refresh_token', token)
    // const payment = data[0]
    // console.log('token from cookie >', state.userToken)
                    // console.log('token from cookie >', )
    const {payment, error} = await supabase.from('applicant_orders')
                      .select('status, item_id, applicant_id, applicants(refresh_token)')
                      .eq('applicants.refresh_token', userToken.toString())
                      // .eq('applicants.refresh_token', state.userToken)
                      // applicant_schools(schools(school_name))
                      // , applicants(refresh_token, participants(is_complete)
    // console.log(error)
    // console.log('payment > ', payment)
    // state.userPayment = payment.status
    // state.userSchool = payment.applicant_schools[0].school.school_name
    // state.userFormComplete = payment.applicants.participants.is_complete

    // console.log(payment)
    return payment?.status=='finished'?true:false


  }

  const hanledVisible = () => {
    setIsVisible(prevState => !prevState)
  }

  // const modal = {
  //   title: "Login Berhasil",
  //   message: "Alhamdulillah, tahap pra pendaftaran berhasil. Selanjutnya Ananda dapat melakukan konfirmasi pendaftaran ke nomor CS untuk mendapatkan informasi lebih lanjut atau dapat melanjutkan pembayaran melalui website.",
  //   text: "Konfirmasi Pendaftaran ke CS",
  //   url: "https://wa.me/628123523434?text=Assalamu'alaikum%20warahmatullah%20wabarakatuh%2C%20ustadz%2Fustadzah.%20Alhamdulillah%20ananda%20telah%20menyelesaikan%20formulir%20pra%20pendaftaran.%20Jazaakumullahu%20khayran.",
  //   text2: "Lanjut Pembayaran",
  //   url2: "/login"
    
  // }

  // const login = useSignIn()
  useEffect(() => {
    // const userPayment = getPaymentInfo()
    getPaymentInfo()
    getUserInfo()
    
    // const userPayment = getUserInfo().data[0].applicant_orders[0].status
    // console.log('userInfo > ', userInfo)
    // console.log('userPayment > ', getPaymentInfo())
    // // console.log('userPayment > ', userPayment)
    // console.log('userPayment > ', userFormComplete)

    // console.log('usertoken', userToken)
    // setAuth({username, password})
      // console.log('auth >', auth)
    if (userInfo && !userPayment) {
      modal_data.url = "/pay"
      navigate('/pay')
      
    }
    // if (userInfo && userPayment) {
    //   modal_data.url = "/home"
    //   navigate('/home')
    // }
  }, [userInfo, userPayment, userSchool, userFormComplete, modal_data, userToken])


  const handledSubmit = async (e) => {
    e.preventDefault()
    // console.log("Data submit >", username)
    // console.log("Data submit >", password)
    const data = {
      username: username,
      password: password
    }
    try {

      const token =  localStorage.getItem('token')
      const _token = Cookies.get('token')
      // // console.log('userInfo before',userInfo)
      // setTimeout(() => {
        if(!token || !_token || !userToken){
          dispatch(userLogin(data))
        }else{
          // console.log('userInfo', userInfo)
          setModalShow(true)
        }
        
      // }, 1000);
      
      
      // if(userInfo)
      // setTimeout(() => {

      // }, 000);
      

      // if(userInfo){
      // }
      // const response = await axios.post(LOGIN_URL,
      //   JSON.stringify({ username, password }),
      //   {
      //     headers: {'Content-Type': 'application/json' }, withCredentials: false
      //   }
      // );
      // // 
      // console.log(JSON.stringify(response)); //console.log(JSON.stringify(response));
      // const token = response?.token
      // // const roles = response?.data?.roles 
      // setAuth({username, password, token})
      // setUsername('');
      // setPassword('');
      // // success(true);
      // navigate('/pay')
      // const response = await axios.post("http://localhost:3000/auth/login", data)
      // login({                     
      //   auth: {
      //     token: response.data.token, 
      //     type: "Bearer"
      //   },
      //   expiresIn: 86400,
      //   // tokenType: "Bearer",
      //   userState: {username: username}
      // })
    } catch (error) {
      console.log("Error >", error )
      modal_data.title = "Login Gagal"
      modal_data.message = errorMsg

      setModalShow(true)
      // if (error && error instanceof AxiosError){
  
      // }
    }

    if(error){
          modal_data.title = "Login Gagal"
          modal_data.message = "Mohon Periksa kembali data yang dimasukkan."
          modal_data.text = "OK"
          modal_data.url = ""
          setModalShow(true)
          
          // navigate('/home')
        }else{
          // modal_data.title = ""
          // modal_data.message = "Mohon Periksa kembali data yang dimasukkan."
          // modal_data.text = "OK"
          // modal_data.url = ""
          
          setModalShow(true)
        }

  }

  // const destroyDataModal = () {
  //   set 
  // }
  
  return (
    <div className="flex flex-col max-w-lg min-w-screen my-0 mx-auto shadow-lg bg-white overflow-hidden relative">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">


        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Masuk Aplikasi </h1>
                <p>Aplikasi Penerimaan Santri Baru Rabbaanii Islamic School </p>
              </div>
              {modal_show && (
                <Swal dataModal={modal_data}  />
                // setDestroy={setDestroy}
              )}

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={handledSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="username">No. WhatsApp / No. Pendaftaran</label>
                      <input id="username" type="text" onChange={(e) => setUsername(e.target.value)} className="form-input w-full text-gray-800" placeholder="Masukkan No. WhatsApp terdaftar" required />
                      {/* {errors.username && (
                        <p className="text-xs text-red-500"> {errors.username.message} </p>
                      )} */}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Password</label>
                        <Link to="/reset-password" className="text-sm font-medium text-blue-600 hover:underline">Lupa Password?</Link>
                      </div>
                      <div className='flex mb-4'>
                        <input id="password" type={isVisible? "text" : "password"} onChange={(e) => setPassword(e.target.value)} className="form-input w-full text-gray-800 " placeholder="Masukkan password" required />
                        {/* {errors.password && (
                        <p className="text-xs text-red-500"> {errors.password.message} </p>
                      )} */}
                        <button type="button" onClick={hanledVisible} 
                        className="flex justify-around items-center">
                          {isVisible? (
                            <TbEyeOff size={20} className='absolute mr-10'></TbEyeOff>
                          ):(
                            <TbEye size={20} className='absolute mr-10'></TbEye>
                          ) }
                          
                        </button>
                        
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="flex items-center">
                          <input type="checkbox" className="form-checkbox" />
                          <span className="text-gray-600 ml-2">Keep me signed in</span>
                        </label>
                      </div>
                    </div>
                  </div> */}
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-green-600 hover:bg-green-700 w-full"
                              // onClick={handledSubmit}
                              // disabled={loading}
                              
                      >
                        Masuk
                        {/* {islo ? "Loading..." : "MASUK"} */}
                        </button>
                    </div>
                  </div>
                </form>
                <div className="flex items-center my-6">
                  <div className="border-t border-gray-300 flex-grow mr-3" aria-hidden="true"></div>
                  <div className="text-gray-600">Belum Mendaftar?</div>
                  <div className="border-t border-gray-300 flex-grow ml-3" aria-hidden="true"></div>
                </div>
                <form>
                  <div className="flex flex-wrap -mx-3 mb-3">
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
                  
                  {/* <Link to="/signin" className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">
                                    <span>Pembelian Formulir</span>
                                    <svg className="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                                    </svg>                  
                                  </Link>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full px-3">
                      <button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
                        <svg className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                        </svg>
                        <span className="flex-auto pl-16 pr-8 -ml-16">Continue with Google</span>
                      </button>
                    </div>
                  </div> */}
                </form>
                {/* <div className="text-gray-600 text-center mt-6">
                  Don’t you have an account? <Link to="/signup" className="text-blue-600 hover:underline transition duration-150 ease-in-out">Sign up</Link>
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

export default SignIn;