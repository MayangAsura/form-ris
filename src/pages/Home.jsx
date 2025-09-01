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

function Home() {
  // const {userToken} = useSelector(state => state.auth)
  const [applicantData, setApplicantData] = useState([])
  const [participantData, setParticipantData] = useState({full_name: "", submission_status:""})
  const [is_refresh, setIsRefresh] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get('step'); 

  const[currentStep, setCurrentStep] = useState("")
  // const pengSeragam = useRef(null)
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
    

         
  }, [step, currentStep])

  const getCurrentStep = (value) => {
    setCurrentStep(value)
  }
  
  // const toUniformClick = () => {
  //   console.log('masuk')
  //   setCurrentStep(10)
  //       if (pengSeragam.current) {
  //         pengSeragam.current.focus(); // Example: Focusing the input in the child
  //       }
  //     };
  
  return (
    <div className="flex flex-col max-w-lg my-0 mx-auto min-w-screen shadow-lg bg-white overflow-hidden">

      {/*  Site header */}
      <Header getDataApplicant={getDataApplicant} is_refresh={is_refresh} />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        {/* <Pro */}
        <ProfileCard applicant={applicantData} setIsRefresh={setIsRefresh} />
        <Announcement applicant={applicantData} participant={participantData} setCurrentStep={setCurrentStep}  />
        {/* toUniformClick={toUniformClick} */}
        <HorizontalStepper applicant={applicantData} setIsRefresh={setIsRefresh} currentStep={currentStep} />
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

      {/* <Banner /> */}

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Home;