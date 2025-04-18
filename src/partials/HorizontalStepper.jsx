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
  
  const stepperRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  const [dataParticipant, setParticipant] = useState({})
  const [dataAyah, setDataAyah] = useState({})
  const [dataIbu, setDataIbu] = useState({})
  const [dataWali, setDataWali] = useState({})
  const [applicant_id, setApplicantId] = useState("")

  const scroll = (direction) => {
    console.log(direction)
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


  const getIdentitas = async (data) => {
    console.log("Data Identitas >", data)
    setTimeout(() => {
    if(data){
      console.log("Data Identitas >,", data)
      setParticipant(data)
      // setParticipant(d => ({...d, applicant_id: "04f84c3c-11e2-4154-8c88-df1e2f3a6c3a"})  )
      const newdata = (data) => ({...data, applicant_id: "04f84c3c-11e2-4154-8c88-df1e2f3a6c3a"}) 
      console.log('dataParticipant ', dataParticipant)
      console.log('newdata ', newdata)
      // data = {...data, applicant_id: "04f84c3c-11e2-4154-8c88-df1e2f3a6c3a"}
      const data_applicant = {
        full_name: data.full_name, 
        gender: data.gender, 
        phone_number: data.phone_number, 
        email: data.email
      }
      const {full_name,gender,phone_number,email, ...newdatap } = data
      console.log(newdatap)
      // const participant = {
      //   // applicant_id "04f84c3c-11e2-4154-8c88-df1e2f3a6c3a",
      //   // nisn
      //   // {
      //     prev_school: "sdfsdf",
      //     prev_school_address: "sfsdf",
      //     kk_number: "1231231231231231",
      //     nik: "1231231231231231",
      //     pob: "dfsf",
      //     // dob: "2025-04-08",
      //     // medical_history: "",
      //     // sickness_history: "",
      //     home_address: "sdsdf",
      //     child_number: "2",
      //     // child_status: "",
      //     // live_with: "",
      //     parent_email: "mayang.asura123@gmail.com",
      //     parent_phone_number: "87424",
      //     // distance: "",
      //     nationality: "sdfdf",
      //     nisn:"1231231231",
      //     province: "sdfsdf",
      //     region: "sdfsdf",
      //     postal_code: "2424",
      //     aspiration: "sfsdf sfd",
      //     applicant_id: "04f84c3c-11e2-4154-8c88-df1e2f3a6c3a"
      // // }
      // }
      saveData(newdatap, 'participants')
      updateData(data_applicant, "applicants", "04f84c3c-11e2-4154-8c88-df1e2f3a6c3a")
        scroll('right')
        setCurrentStep(currentStep + 1)
      }
    }, 3000);
  }

  const getDataAyah =  (data) => {
    console.log("Data Ayah >", data)
    setTimeout(() => {
    if(data){
      setDataAyah(data)
      const newdata = (data) => ({...data, participant_id: "9de0c331-6206-4d40-8f6c-42997e428a4a"}) 
      // setDataAyah(d => ({...d, participant_id: "4f84c3c-11e2-4154-8c88-df1e2f3a6c3a"})  )
      // setParticipant([...data, {applicant_id:"04f84c3c-11e2-4154-8c88-df1e2f3a6c3a"}])
      console.log("Data Ayah >,", newdata)
      // const {d, e} = supabase.from('participant_fathers_data')
      //                     .insert([newdata])
      //                     .single()
      saveData(newdata, 'participant_fathers_data')

      console.log('dataAyah ', dataAyah)
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
      setDataIbu(data)
      setDataIbu(d => ({...d, participant_id: "04f84c3c-11e2-4154-8c88-df1e2f3a6c3a"})  )
      saveData(data, 'participant_mother_data')
      console.log(dataIbu)
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
      setDataWali(data)
      setDataWali(d => ({...d, participant_id: "04f84c3c-11e2-4154-8c88-df1e2f3a6c3a"})  )
      saveData(data, 'participant_wali_data')
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
      
      saveData(data, 'participant_documents', 'file')
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
      setParticipant({})
      setParticipant(data)
      setParticipant(d => ({...d, participant_id: "04f84c3c-11e2-4154-8c88-df1e2f3a6c3a"})  )
      updateData(data, 'participants')
      console.log(dataParticipant)
      
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
      setParticipant({})
      setParticipant(data)
      setParticipant(d => ({...d, participant_id: "04f84c3c-11e2-4154-8c88-df1e2f3a6c3a"})  )
      updateData(data, 'participants')
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

  const saveData = async (dataInput, to, type=null) => {
    
    if (type=='file'){
      // const avatarFile = event.target.files[0]
      const { data, error } = await supabase  
            .storage  
            .from('participant_documents')  
            .upload('public/avatar1.png', getDataBerkas, {    
              cacheControl: '3600',    
              upsert: false  
            })

    
      let file = e.target.files[0];

      const { data_, error_ } = await supabase
        .storage
        .from('uploads')
        .upload(userId + "/" + uuidv4(), file)
  
      if (data) {
        getMedia();
  
      } else {
        console.log(error);
      }

    }
    console.log('dataInput> ', dataInput)
    const { data, err} = await supabase.from(to)
                        .insert([dataInput])
                        .single()
    if(dataInput.pob){
      setApplicantId(data.id)
    }   

    console.log('data>', data)
    console.log('err >', err)
  }

  const updateData = async (dataInput, to, bo, type=null) => {
    
    // if (type=='file'){
    //   // const avatarFile = event.target.files[0]
    //   const { data, error } = await supabase  
    //         .storage  
    //         .from('participant_documents')  
    //         .upload('public/avatar1.png', avatarFile, {    
    //           cacheControl: '3600',    
    //           upsert: false  
    //         })
    // }

    console.log('dataInput> ' ,dataInput)
    const { data, err} = await supabase.from(to)
                        .update({...dataInput, updated_at : new Date()})
                        .eq('id', bo)
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
    const form = [<Pembayaran scroll={scroll}  /> , <IdentitasForm onSubmit={getIdentitas} complete={complete} currentStep={currentStep} />, <DataAyahForm onSubmit={getDataAyah} complete={complete} currentStep={currentStep} setComplete={setComplete} />, <DataIbuForm onSubmit={getDataIbu} complete={complete} currentStep={currentStep} setComplete={setComplete}/>, <DataWaliForm onSubmit={getDataWali} complete={complete} currentStep={currentStep} setComplete={setComplete}/>,  <BerkasForm  onSubmit={getDataBerkas} complete={complete} currentStep={currentStep} setComplete={setComplete}/>, <VerifikasiKeluargaForm onSubmit={getDataVerifikasiKeluarga} complete={complete} currentStep={currentStep} setComplete={setComplete}/>, <MetodeUangPangkal onSubmit={getDataMetodeUangPangkal} complete={complete} currentStep={currentStep} setComplete={setComplete}/>,<Status onSubmit={getStatus} complete={complete} currentStep={currentStep} setComplete={setComplete}/>];

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

    <div className='flex justify-center px-10'>

        {!complete && (
          <button
            className={`btn w-full btn-sm text-gray-200 bg-green-900 hover:bg-gray-800 ml-3 ${currentStep!==1?"invisible":''}`}
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
    </div>
    </>
  );
};

export default HorizontalStepper;