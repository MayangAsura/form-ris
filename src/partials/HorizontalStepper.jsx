import { useEffect, useRef,useState } from 'react';
import { TiTick } from "react-icons/ti";
import IdentitasForm from './IdentitasForm';
import DataAyahForm from './DataAyahForm';
import DataIbuForm from './DataIbuForm';
import DataWaliForm from './DataWaliForm';
import BerkasForm from './BerkasForm';
import VerifikasiKeluargaForm from './VerifikasiKeluargaForm';
import Payment from '../pages/Payment';
import Pembayaran from '../partials/Pembayaran';
import Status from './Status';
import MetodeUangPangkal from './MetodeUangPangkal';
import supabase from '../client/supabase_client';
// import { createClient } from '@supabase/supabase-js';

const HorizontalStepper = () => {
  // const supabase = createClient('https://cnpcpmdrblvjfzzeqoau.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNucGNwbWRyYmx2amZ6emVxb2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxMDc5MjgsImV4cCI6MjA0ODY4MzkyOH0.KDzEImvYqvh6kv9o5eMuWzWuYZIElWNtPyWDdLMi46w' )
  const stepperRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  const [dataParticipant, setParticipant] = useState([])

  const scroll = (direction) => {
    if (stepperRef.current) {
      const scrollAmount = 250; // Adjust scroll distance
      stepperRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // const getPaymentData = (data) =>{
    
  // }

  const getIdentitas = (data) => {
    console.log("Data Identitas >", data)
    setTimeout(() => {
    if(data){
      console.log("Data Identitas >,", data)
      saveData(data, 'participants')
      setParticipant(data)
      console.log(dataParticipant)
        scroll('right')
        setCurrentStep(currentStep + 1)

      }
    }, 3000);
  }

  const getDataAyah = (data) => {
    console.log("Data Ayah >", data)
    setTimeout(() => {
    if(data){
      console.log("Data Ayah >,", data)
      saveData(data, 'participant_father_data')
      setParticipant([...dataParticipant, data])
        scroll('right')
        setCurrentStep(currentStep + 1)
      }
    }, 3000);
  }
  const getDataIbu = (data) => {
    console.log("DataIbu >", data)
    setTimeout(() => {
    if(data){
      console.log("DataIbu >,", data)
      saveData(data, 'participant_mother_data')
      console.log(dataParticipant)
        scroll('right')
        setCurrentStep(currentStep + 1)
      }
    }, 3000);
  }
  const getDataWali = (data) => {
    console.log("DataWali >", data)
    setTimeout(() => {
    if(data){
      console.log("DataWali >,", data)
      saveData(data, 'participant_wali_data')
      setParticipant(data)
        scroll('right')
        setCurrentStep(currentStep + 1)
      }
    }, 3000);
  }
  const getDataBerkas = (data) =>{
    console.log("DataBerkas >", data)
    setTimeout(() => {
    if(data){
      console.log("DataBerkas >,", data)
      saveData(data, 'participant_documents', 'upload')
        scroll('right')
        setCurrentStep(currentStep + 1)
      }
    }, 3000);
  }
  const getDataVerifikasiKeluarga = (data) => {
    console.log("Data VerifikasiKeluarga >", data)
    setTimeout(() => {
    if(data){
      console.log("Data VerifikasiKeluarga >,", data)
      setParticipant(prev => [...prev, data])
      
        scroll('right')
        setCurrentStep(currentStep + 1)
      }
    }, 3000);
  }
  const getDataMetodeUangPangkal = (data) => {
 
    console.log("Data Uang Pangkal >", data)
    setTimeout(() => {
    if(data){
      console.log("Data Uang Pangkal >,", data)
      setParticipant(prev => [...prev, data])
      saveData()
        scroll('right')
        setCurrentStep(currentStep + 1)
      }
    }, 3000);
  }
  const getStatus = (value) => {
    // console.log("Data Uang Pangkal >", data)
    // setTimeout(() => {
    // if(data){
    //   console.log("Data Uang Pangkal >,", data)
    //     scroll('right')
    //     setCurrentStep(currentStep + 1)
    //   }
    // }, 3000);
  }

  const saveData = async (dataInput, to, type) => {
    
    const { data, err} = supabase.from(to)
                        .insert([dataInput])
                        .select()
    console.log('data>', data)
    console.log('err >', err)
  }

  







  const getCurrentStep = (value) => {
    setCurrentStep(value)
  }
  const getComplete = (value) => {
    setComplete(value)
  }

  // const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6'];
    const steps = ["Pembayaran", "Identitas Calon Santri", "Data Ayah", "Data Ibu", "Data Wali", "Upload Berkas", "Verifikasi Keluarga", "Konfirmasi Uang Pangkal", "Status"];
    const form = [<Pembayaran /> , <IdentitasForm onSubmit={getIdentitas} complete={complete} currentStep={currentStep} />, <DataAyahForm onSubmit={getDataAyah} complete={complete} currentStep={currentStep} setComplete={setComplete} />, <DataIbuForm onSubmit={getDataIbu} complete={complete} currentStep={currentStep} setComplete={setComplete}/>, <DataWaliForm onSubmit={getDataWali} complete={complete} currentStep={currentStep} setComplete={setComplete}/>,  <BerkasForm  onSubmit={getDataBerkas} complete={complete} currentStep={currentStep} setComplete={setComplete}/>, <VerifikasiKeluargaForm onSubmit={getDataVerifikasiKeluarga} complete={complete} currentStep={currentStep} setComplete={setComplete}/>, <MetodeUangPangkal onSubmit={getDataMetodeUangPangkal} complete={complete} currentStep={currentStep} setComplete={setComplete}/>,<Status onSubmit={getStatus} complete={complete} currentStep={currentStep} setComplete={setComplete}/>];

  return (
    <>
    <div className="flex items-center justify-center shadow-md p-4 ">

      {/* Left Scroll Button */}
      <button 
        onClick={() => scroll('left')}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 mr-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Stepper Container */}
      <div 
        ref={stepperRef}
        className="flex overflow-x-auto space-x-4 scrollbar-hide" // scrollbar-hide requires plugin
      >
        {steps.map((step, index) => (
          <div 
            key={index}
            className={`flex-shrink-0 w-64 p-6 bg-white rounded-lg shadow-md flex items-center justify-center ${currentStep === index + 1 && "active"} ${
                  ( index == 0 || index + 1 < currentStep || complete ) && "complete"
                } `}
          >
            {/* <div className="step">
              {index + 1 < currentStep || complete ? <TiTick size={24} /> : index + 1}
            </div> */}
            <div className="step">
              {index == 0 || index + 1 < currentStep || complete ? <TiTick size={24} /> : index + 1}
            </div>
            <span className="text-sm/6 font-medium ml-2">{step}</span>
          </div>
          
        ))}
        
      </div>
      
      {/* Right Scroll Button */}
      <button 
        onClick={() => scroll('right')}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 ml-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
    <div className="border-b border-gray-900/10 py-0"></div>

    {steps.map((step, index) => (
      <div className={`flex justify-center ${currentStep !== index  + 1 && "hide"}`}>
          {form[currentStep-1]}
      </div>
      ))}
      {!complete && (
        <button
          className={`btn w-full btn-sm text-gray-200 bg-green-900 hover:bg-gray-800 ml-3 ${steps.length==3?? 'hide'}`}
          onClick={() => {
            // currentStep === steps.length
            //   ? setComplete(true)
            //   : setCurrentStep((prev) => prev + 1); 
            if(currentStep === steps.length){
              setComplete(true)
            }else{
              setCurrentStep((prev) => prev + 1);
              // callback(data)
            }
            // handleSubmit
            scroll('right')
          }}
          type='submit'
          
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      )}
    </>
  );
};

export default HorizontalStepper;