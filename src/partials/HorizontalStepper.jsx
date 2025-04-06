import { useRef,useState } from 'react';
import { TiTick } from "react-icons/ti";
import IdentitasForm from './IdentitasForm';
import DataAyahForm from './DataAyahForm';
import DataIbuForm from './DataIbuForm';
// import DataWaliForm from '/DataWaliForm';
import BerkasForm from './BerkasForm';
import VerifikasiKeluargaForm from './VerifikasiKeluargaForm';
import Payment from '../pages/Payment';
import Status from './Status';
import MetodeUangPangkal from './MetodeUangPangkal';

const HorizontalStepper = () => {
  const stepperRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  const scroll = (direction) => {
    if (stepperRef.current) {
      const scrollAmount = 250; // Adjust scroll distance
      stepperRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getPaymentData = (data) =>{
    
  }

  const getIdentitas = (data) => {
    console.log(data)
  }
  const getDataAyah = (value) => {

  }
  const getDataIbu = (value) => {

  }
  const getDataWali = (value) => {

  }
  const getDataBerkas = (value) =>{

  }
  const getDataVerifikasiKeluarga = (value) => {

  }
  const getDataMetodeUangPangkal = (value) => {

  }

  // const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6'];
    const steps = ["Pembayaran", "Identitas Calon Santri", "Data Ayah", "Data Ibu", "Data Wali", "Upload Berkas", "Verifikasi Keluarga", "Konfirmasi Uang Pangkal", "Status"];
    const form = [<Payment /> , <IdentitasForm onSubmit={getIdentitas}/>, <DataAyahForm/>, <DataIbuForm/>, <BerkasForm/>, <VerifikasiKeluargaForm/>, <MetodeUangPangkal/>,<Status/>];

  return (
    <>
    <div className="flex items-center justify-center p-4">
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
        className="flex overflow-x-auto space-x-4 p-2 scrollbar-hide" // scrollbar-hide requires plugin
      >
        {steps.map((step, index) => (
          <div 
            key={index}
            className={`flex-shrink-0 w-64 p-6 bg-white rounded-lg shadow-md flex items-center justify-center ${currentStep === index + 1 && "active"} ${
                  (index + 1 < currentStep || complete) && "complete"
                } `}
          >
            {/* <div className="step">
              {index + 1 < currentStep || complete ? <TiTick size={24} /> : index + 1}
            </div> */}
            <div className="step">
              {index + 1 < currentStep || complete ? <TiTick size={24} /> : index + 1}
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

    {steps.map((step, index) => (
      <div className={`flex justify-center ${currentStep !== index  + 1 && "hide"}`}>
          {form[currentStep]}
      </div>
      ))}
      {!complete && (
        <button
          className={`btn w-full `}
          onClick={() => {
            // currentStep === steps.length
            //   ? setComplete(true)
            //   : setCurrentStep((prev) => prev + 1); 
            if(currentStep === steps.length){
              setComplete(true)
              handleSubmit
            }else{
              setCurrentStep((prev) => prev + 1);
              // callback(data)
            }
            scroll('right')
          }}
          
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      )}
    </>
  );
};

export default HorizontalStepper;