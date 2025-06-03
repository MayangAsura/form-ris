import React, { useEffect, useState } from 'react';

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

function Home() {
  const [applicantData, setApplicantData] = useState({})
  const [participantData, setParticipantData] = useState({submission_status:""})

  const getDataApplicant = async (data) => {
    setApplicantData(data)
  }

  useEffect(() => {
    if(applicantData){
      // if(applicantData[0].participants.length > 0){
      //   setParticipantData({submission_status: applicantData[0].participants[0].submission_status})
      // }
    }
  }, [applicantData])
  
  return (
    <div className="flex flex-col max-w-lg my-0 mx-auto min-w-screen shadow-lg bg-white overflow-hidden">

      {/*  Site header */}
      <Header getDataApplicant={getDataApplicant} />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        {/* <Pro */}
        <ProfileCard applicant={applicantData}/>
        <Announcement participant={participantData}/>
        <HorizontalStepper applicant={applicantData}/>
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