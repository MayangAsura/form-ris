import React, { useEffect, useState, useRef } from "react";
import "../css/additional-styles/stepper.css"
import { TiTick } from "react-icons/ti";
import IdentitasForm from "./IdentitasForm.jsx";
// import DataAyahForm from "./DataAyahForm.jsx";
import DataIbuForm from "./DataIbuForm.jsx";
import DataWaliForm from "./DataWaliForm.jsx";
import BerkasForm from "./BerkasForm.jsx";
import VerifikasiKeluargaForm from "./VerifikasiKeluargaForm.jsx";
import {Helmet} from "react-helmet";
// import { useEffect, useState } from 'react';




const Stepper = () => {
  const steps = ["Identitas Calon Santri", "Data Ayah", "Data Ibu", "Data Wali", "Upload Berkas", "Verifikasi Keluarga", "Konfirmasi Metode Pembayaran", "Status"];
  const form = [<IdentitasForm/>, <DataAyahForm/>, <DataIbuForm/>, <DataWaliForm/>, <BerkasForm/>, <VerifikasiKeluargaForm/>];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const {slide} = useSlide()
  const callbackForm = (value) =>{
    console.log(value)
  }
  const containerRef = useRef(null)
  const stepperRef = useRef(null)
  // const sliderTimerRef = useRef()

  // function slide(direction) {
  //   // clear any previously set intervals and reset scrollCompleted
  //   clearInterval(sliderTimerRef.current);
  //   let scrollCompleted = 0;
  
  //   sliderTimerRef.current = setInterval(function() {
  //     const container = containerRef.current; // <-- (3) access current ref value
  
  //     if (direction === 'left') {
  //       container.scrollLeft -= 20; // <-- (4)  Optional Chaining null check
  //     } else {
  //       container.scrollLeft += 20; // <-- (4)  Optional Chaining null check
  //     }
  //     scrollCompleted += 10;
  //     if (scrollCompleted >= 100) {
  //       clearInterval(sliderTimerRef.current);
  //     }
  //   }, 50);
  // }

  // useEffect(() => {
  //   return () => {
  //     // clear any running intervals on component unmount
  //     clearInterval(sliderTimerRef.current);
  //   };
  // }, []);

  const scroll = (direction) => {
     if(stepperRef.current){
        console.log('cek')
        const scrollAmount = 300
        stepperRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });
     }else{
      console.log('null')
     }
    // if (!containerRef.current) return;

    // if (direction === "left") {
    //   containerRef.current.scrollLeft -= 200;
    // } else if (direction === "right") {
    //   containerRef.current.scrollLeft += 200;
    // }
    // if(!containerRef.current) return

    // if(direction === 'left'){
    //   containerRef.current.scrollLeft -= 200
    // }else if(direction === 'right') {
    //   containerRef.current.scrollLeft += 200
    // }
    // if(direction == 'left') {
    //   // this.ref.scroller.scrollLeft +=200
    //   containerRef? (containerRef.current.scrollLeft -=200) : null
    // }else if (direction == 'right'){
    //   containerRef? (containerRef.current.scrollLeft +=200) : null
    // }
  }
  
  return (
    <>
      <div className="head-container">
        <button
            className="btn slideLeft"
            onClick={() => scroll("left")}
            id="slideLeft"
          >
          &gt;&gt;
        </button>
        
        <div id="wrapper-stepper">
          <div 
            // ref="scroller"
            // ref={containerRef}
            ref={stepperRef}
            className="flex flex-row gap-8 overflow-x-scroll justify-center scroll-container scroll-smooth" id="stepper-container" >
            {steps?.map((step, i) => (
              <div
                key={i}
                className={`step-item ${currentStep === i + 1 && "active"} ${
                  (i + 1 < currentStep || complete) && "complete"
                } `}
              >
                <div className="step">
                  {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
                </div>
                {/* <p className="text-gray-500">{step}</p> */}
                
                {/* { set} */}
                {/* {i==1?{
                    <IdentitasForm callback={callbackForm}/>
                }} */}
              </div>
            ))}
            
          </div>

        </div>

        {/* <ChevronLeftRegular fontSize={20} onClick={() => onScroll(-50)} /> */}
        <button
            className="btn slideRight" 
            id="slideRight"
            // onClick={handleNav('right')}
          >
            &gt;&gt;
          </button>
      </div>
      <div id="cek">
        <ul>
          <li>1</li>
          <li>2</li>
        </ul>
      </div>
     
      <div className="flex justify-center">
        {form[currentStep-1]}
      </div>
      {!complete && (
        <button
          className="btn"
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      )}
      
    </>
  );
};

export default Stepper;

export function useSlide(direction){
  const btnLeft = document.getElementById('slideLeft');
  // btnLeft.addEventListener('click', function() {
  //             // document.getElementById('wrapper-stepper').scrollLeft += 35
  //           })

  if (direction =='left'){
    

  }

  const getData = async (url) => {
    let response = await fetch(url)
    let res = response.json()
    // if (/* isInvalidStatus */) {
    //    // navigate to '/login'
    // }
    // return your data
  }

  return { getData }
}
