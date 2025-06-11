import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {logout, setCredentials} from '../features/auth/authSlice'
import { useGetUserDetailsQuery } from '../app/services/auth/authService'
import { Button } from '@headlessui/react';
import supabase from '../client/supabase_client';
import { userLogout } from '../features/auth/authActions';
// import Cookies from 'js-cookie'
import Cookies from 'universal-cookie'

// import axios from '../api/local-server';
import axios from '../api/prod-server';


function Header(props) {

  const [top, setTop] = useState(true);
  const { userToken, userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const {setAuth} = useContext(AuthContext)
  const location = useLocation()
  const { hash, pathname, search } = location
  const navigate = useNavigate()
  // automatically authenticate user if token is found
  // const { d, isFetching } = useGetUserDetailsQuery('userDetails', {
  //   pollingInterval: 900000, // 15mins
  // })
  console.log('props >', props)
  // cons cookie = 

  const getProfileData = async () =>{
      // setTimeout(() => {
        const token = userToken
        console.log('token >', token)
          if (token) {
          const {data, error} = await supabase.from('applicants').select('applicant_schools(schools(school_id, school_name)), applicant_orders(status, invoice_number), id, full_name, gender, email, phone_number, regist_number, created_at, refresh_token, participants(id, dob, aspiration, nisn, prev_school_address, kk_number, pob, medical_history, sickness_history, home_address, child_status, child_number, live_with, parent_phone_number, distance, student_category, metode_uang_pangkal, prev_school, nationality, province, region, postal_code, aspiration, nik, parent_email, is_complete, submission_status, updated_at, is_uniform_sizing, participant_father_data(father_name,father_academic,father_job,father_salary, why_chooses),participant_mother_data(mother_name,mother_academic,mother_job,mother_salary),participant_wali_data(wali_name,wali_academic,wali_job,wali_salary) ))')
                              .eq('refresh_token', token)
                              .eq('status', 'active')
          if(error){
            console.log(error)
          //   setProfileData({})
          }else{
            console.log('dataProf>', data)
            props.getDataApplicant(data)
            // props.dataApplicant(data)
            const full_name = data.full_name
            // setAuth({full_name})
            // setAuth({full_name: data.full_name,phone_number: data.phone_number, regist_number: data.regist_number,payment_status: data.payment_status})
            // return data
          //   setProfileData(data)
          }
        }
        
      // }, 900000);
  
    }
   
  
  

  // detect whether user has scrolled the page down by 10px 
  useEffect(() => { 
    // setTimeout(() => {
      // timeou
      getProfileData()
    // }, 2000);
    console.log('userInfo>', userInfo) 
    // console.log('dataProfile>', auth)
    // if(auth) dispatch(setCredentials(auth))
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true)
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top, dispatch, userInfo]);  

  const handledLogout = async () => {
    try {
        const response = await axios.get("/api/auth/logout",
        {
          headers: {'Content-Type': 'application/json' }, withCredentials: true
        }
        );
        // 
        console.log(JSON.stringify(response)); //console.log(JSON.stringify(response));
        if(response.status==204){
          dispatch(logout())
          Cookies.remove("jwt")
          navigate('/login')
        }
    } catch (error) {
      
    }
  }
  
  return (
    <header className={`fixed w-full z-30 justify-between items-center max-w-lg min-w-screen my-0 md:bg-opacity-90 transition duration-300 mt-5 ease-in-out border-b ${!top && 'bg-white rounded-full backdrop-blur-sm shadow-lg'}`}>
     {/* <header className={`mx-auto fixed z-30 max-w-lg md:bg-opacity-90 transition duration-300 mt-5 ease-in-out border-b ${!top && 'bg-white rounded-full backdrop-blur-sm shadow-lg'}`}> */}
      {/* w-10/12 */}
      <div className="max-w-6xl mx-auto px-5 sm:px-6 relative">
        <div className="flex items-center justify-between gap-3 h-16 md:h-20">

          {/* Site branding */}
          <div className="flex flex-1 items-center">
          {/* flex-none mr-4 */}
            {/* Logo */}
            <Link to="/" className="block" aria-label="Cruip">
              <img src={"/images/rabbaanii-logo.png"} className="w-10 h-10"/>
            </Link>
          </div>

          {/* Site navigation */}
          {/* <nav className="shrink"> */}
            <ul className="flex flex-1 items-center justify-end gap-3 ">
            {/* flex flex-1 items-center justify-end gap-3 */} 
            {/* ml-5 */}
                {!userInfo && pathname!=='/login' && (
              <li>
                  <Link to="/login" className="font-medium -ml-5 text-gray-600 hover:text-gray-600 px-2 py-2 flex items-center transition duration-150 ease-in-out">PENGISIAN FORMULIR</Link>
              </li>
                )}
              <li>
                {userInfo ? (

                  <Button onClick={handledLogout} className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 flex flex-grow items-center">
                    <span>LOGOUT</span>
                    <svg className="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                    </svg>                  
                  </Button>
                  
                ):(
                  <Link to="/" className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 flex flex-grow items-center">
                    <span>PENDAFTARAN</span>
                    <svg className="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                    </svg>                  
                  </Link>
                )}          
              </li>
              {/* <li className='ml-24'>
                <span className='font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out'>DASHBOARD SISWA</span> 
              </li>
              <li className='mr-2'>
                <Link to="/logout" className="btn-sm text-gray-200  bg-gray-900 hover:bg-gray-800">
                  <span>KELUAR</span>
                  <svg className="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                  </svg>                  
                </Link>
              </li> */}
            </ul>

          {/* </nav> */}

        </div>
      </div>
    </header>
  );
}

export default Header;
