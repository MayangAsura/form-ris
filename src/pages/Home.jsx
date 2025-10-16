import React, { useEffect, useRef, useState } from 'react';

import Header from '../partials/Header';
import HeroHome from '../partials/HeroHome';
import FeaturesHome from '../partials/Features';
import FeaturesBlocks from '../partials/FeaturesBlocks';
import Testimonials from '../partials/Testimonials';
import Newsletter from '../partials/Newsletter';
import Footer from '../partials/Footer';
import Banner from '../partials/Banner';
import Stepper from '../partials/Stepper';
import IdentitasForm from '../partials/IdentitasForm';
import DataAyahForm from '../partials/DataAyahForm'
import ProfileCard from '../partials/ProfileCard';
import Jenjang from './Jenjang';
import HorizontalStepper from '../partials/HorizontalStepper'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import Announcement from '../partials/Announcement';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLogin } from '../features/hooks/use-login';
import supabase from '../client/supabase_client';

const FND_ID = process.env.FND_ID?? "25573656-ce58-4bd2-9b89-fadf4ebbea60"

function Home() {
  // const {userToken} = useSelector(state => state.auth)
  const [admissions, setAdmissions] = useState({})
  const [applicantData, setApplicantData] = useState([])
  const [participantData, setParticipantData] = useState({full_name: "", submission_status:""})
  const [is_refresh, setIsRefresh] = useState(false)
  const [complete, setComplete] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get('step'); 

  const[currentStep, setCurrentStep] = useState("")
  const pengSeragam = useRef(null)
  // const r = searchParams.get('merchantOrderId');

  const { userToken, userInfo } = useSelector((state) => state.auth)
  const { onSubmit, form, results, loading } = useLogin();
  const auth_token = localStorage.getItem('token-refresh') || results.data?.token_refresh || userToken
  const navigate = useNavigate()

  const getDataApplicant = async (data) => {
    setApplicantData(data)
    console.log(data)
    // console.log('sub', data[0].participants[0].submission_status)
    if(data[0].participants.length > 0){
      setParticipantData(data[0].participants[0])
      setComplete(data[0].participants[0].is_complete)
      const submission_status = data[0].participants[0].submission_status
      // setParticipantData({submission_status: submission_status})
      participantData.full_name = data[0].full_name
      participantData.submission_status = data[0].participants[0].submission_status
    }

    if(data[0].applicant_orders.length>0 && data[0].applicant_orders[0]?.status !== 'finished'){
      navigate('/pay')
    }
    if(data[0].applicant_orders.length===0){
      navigate('/pay')
    }
    // console.log('part data from h',participantData)
  }

  useEffect(() => {
    if(applicantData){
      console.log('from home', applicantData)
      // if(app)
      // if(applicantData.applicant_orders[0]?.status !== 'finished'){
      //   navigate("/pay")
      // }
      // if(applicantData[0].participants.length > 0){
      //   setParticipantData({submission_status: applicantData[0].participants[0].submission_status})
      // if(applicantData[0].participants.length > 0){
      //   setParticipantData(applicantData[0].participants[0].submission_status)
      // }
      // }
    }

    if(step){
      console.log('step', step)
      setCurrentStep(parseInt(step))
    }

    if(currentStep){

      console.log('current from home', currentStep)
    }
    
    if(auth_token){
      getUserInfo()
    }

    if(FND_ID){
      getAdmissions(FND_ID)
    }

         
  }, [step, currentStep, applicantData, complete])

  const getUserInfo = async () =>{
    // setTimeout(() => {
      const token = auth_token

      if(!verify_token(token)){
        return null
      }
      // console.log('token >', token)
        if (token) {
        const {data, error} = await supabase.from('applicants')
                              .select('applicant_schools(schools(school_name)), applicant_orders(status), full_name, gender, email, phone_number, regist_number, created_at, refresh_token, participants(dob, aspiration))')
                              .eq('refresh_token', token)
        if(error){
          console.log(error)
          return null
        
        }else{
          
          return data
        }
      }
      
    // }, 900000);

  }

  const getAdmissions = async (id) => {
    let { data: admissions, error } = await supabase
    .from('admissions')
    .select(`
      *
    `)
    .eq('foundation_id', id)
    .eq('is_active', true)
    .is('deleted_at', null)

    if(error){
      console.log(error)
    }else{
      setAdmissions(admissions[0])
      // console.log(admission_schools)
      // setAdmissionSchools(admission_schools.map(prev => [...prev, {img}])
    }

    }

  const verify_token = (token) => {
    try {
      const decoded = jwtDecode(token);
      
      const exp = new Date(decoded.exp * 1000).toISOString()
      console.log('exp', exp)
      if(exp < new Date().toISOString()){
        return false
      }else{
        return true
      }
    } catch (error) {
      console.error("Error decoding JWT:", error);
    }
  }

  const getCurrentStep = (value) => {
    setCurrentStep(value)
  }

  const getComplete = (value) => {
    console.log('home', value)
    setComplete(value)
  }
  
  const toUniformClick = () => {
    console.log('masuk toUniformClick');
  console.log('pengSeragam ref:', pengSeragam.current);
  
  setCurrentStep(10);
  
  // Add a timeout to ensure the component has rendered
  setTimeout(() => {
    if (pengSeragam.current && typeof pengSeragam.current.scrollTo === 'function') {
      console.log('Calling scrollTo()');
      pengSeragam.current.scrollTo();
    } else {
      console.log('Ref not ready or scrollTo not available');
      
      // Fallback: scroll to the section by ID
      const section = document.getElementById('pengukuran_seragam');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, 300); // Increased timeout to ensure rendering
  
  window.location.hash = 'pengukuran_seragam';
  };
  
  return (
    <div className="flex flex-col max-w-lg my-0 mx-auto min-w-screen shadow-lg bg-white overflow-hidden">

      {/*  Site header */}
      <Header getDataApplicant={getDataApplicant} is_refresh={is_refresh} />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        {/* <Pro */}
        <ProfileCard applicant={applicantData} setIsRefresh={setIsRefresh} />
        <Announcement applicant={applicantData} participant={participantData} admissions={admissions} complete={complete} setCurrentStep={setCurrentStep} toUniformClick={toUniformClick} />
        {/* toUniformClick={toUniformClick} */}
        <HorizontalStepper applicant={applicantData} admissions={admissions} setIsRefresh={setIsRefresh} getComplete={getComplete} currentStep={currentStep} ref={pengSeragam} />
        {/* <Jenjang/> */}
        {/* <HeroHome /> */}
        {/* <Stepper/> */}
        {/* <IdentitasForm/> */}
        {/* <DataAyahForm/> */}
        {/* <FeaturesHome />
        <FeaturesBlocks />
        <Testimonials /> */}
        
        
        {/* <Newsletter /> */}

      </main>

      <Banner admissions={admissions} />

      {/*  Site footer */}
      <Footer admissions={admissions} />

    </div>
  );
}

export default Home;