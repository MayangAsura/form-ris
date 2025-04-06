import React from 'react';

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


function Home() {
  return (
    <div className="flex flex-col  max-w-lg my-0 mx-auto min-w-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        {/* <Pro */}
        <ProfileCard/>
        <HorizontalStepper/>
        <Jenjang/>
        {/* <HeroHome /> */}
        {/* <Stepper/> */}
        {/* <IdentitasForm/> */}
        {/* <DataAyahForm/> */}
        {/* <FeaturesHome /> */}
        {/* <FeaturesBlocks />
        <Testimonials /> */}
        {/* 
        
        <Newsletter /> */}

      </main>

      <Banner />

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Home;