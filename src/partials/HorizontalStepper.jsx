import { useEffect, useRef, useState, useTransition } from 'react';
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


const HorizontalStepper = (props) => {
  
  const stepperRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [ isPending, startTransition ] = useTransition()

  const [dataParticipant, setParticipant] = useState({})
  const [dataAyah, setDataAyah] = useState({})
  const [dataIbu, setDataIbu] = useState({})
  const [dataWali, setDataWali] = useState({})
  const [applicant_id, setApplicantId] = useState("")
  const [participant_id, setParticipantId] = useState("")
  const [applicantData, setApplicantData] = useState({})
  const [applicantSchool, setApplicantSchool] = useState({})
  const [applicantStudentCategory, setApplicantStudentCategory] = useState({})
  // const [applicantSchool, setApplicantSchool] = useState({})

  
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

  useEffect(() => {
    if(props.applicant.length > 0) {
    
      setApplicantData(props.applicant[0])
      console.log(applicantData)
      const dataSchool = {
        id : props.applicant[0]?.applicant_schools[0]?.schools?.school_id,
        name : props.applicant[0]?.applicant_schools[0]?.schools?.school_name 
      }
  
      setApplicantSchool(dataSchool)
      const dataStudentCategory = {
        student_category : props.applicant[0]?.student_category
      }
      setApplicantStudentCategory(dataStudentCategory)
    }
  
    console.log(applicantData.id)
  }, [props.applicant]) 

  // console.log('from props > ', props)
  

  // const getPaymentData = (data) =>{
    
  // }


  const getIdentitas = async (data) => {
    console.log("Data Identitas >", data)
    setTimeout(() => {
    if(data){
      console.log("Data Identitas >,", data)
      setParticipant(data)
      // setParticipant(d => ({...d, applicant_id: "04f84c3c-11e2-4154-8c88-df1e2f3a6c3a"})  )
      const newdata = (data) => ({...data, applicant_id: applicantData.id}) 
      console.log('dataParticipant ', dataParticipant)
      console.log('newdata ', newdata)
      data = {...data, applicant_id: applicantData.id}
      const data_applicant = {
        full_name: data.full_name, 
        gender: data.gender, 
        phone_number: data.phone_number, 
        email: data.email
      }
      const {full_name,gender,phone_number,email, ...newdatap } = data
      console.log(newdatap)
      
      if(!edit){
        saveData(newdatap, 'participants')
      }else{
        updateData(newdatap, 'participants', applicantData.participants[0]?.id)
      }
      updateData(data_applicant, "applicants", applicantData.id)
      scroll('right')
      setCurrentStep(currentStep + 1)
      }
    }, 3000);
  }

  const getDataAyah =  (data) => {
    console.log("Data Ayah >", data)
    setTimeout(() => {
    if(data){
      
      data = {...data, participant_id: participant_id}
      setDataAyah(data)

      console.log("Data Ayah >,", data)
      if(!edit){
        saveData(data, 'participant_father_data')
      }else{
        updateData(data, 'participant_father_data', applicantData.participants[0]?.id)
      }
      

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
      data = {...data, participant_id}
      saveData(data, 'participant_mother_data')
      if(!edit){
        saveData(data, 'participant_mother_data')
      }else{
        updateData(data, 'participant_mother_data', applicantData.participants[0]?.id)
      }
      
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
      data = {...data, participant_id}
      if(!edit){
        saveData(data, 'participant_wali_data')
      }else{
        updateData(data, 'participant_wali_data', applicantData.participants[0]?.id)
      }
      
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
      // data = {...data, }
      if(!edit){
        saveData(data, 'participant_documents', 'file')
      }else{
        saveData(data, 'participant_documents', 'file')
        // updateData(data, 'participant_documents', applicantData.participants[0]?.id)
      }
      // saveData(data, 'participant_documents', 'file')
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
      // const {photo_sampul_ijazah} = data.photo_sampul_ijazah
      const {photo_sampul_ijazah,...newdata} = data
      // setParticipant(d => ({...d, participant_id: "04f84c3c-11e2-4154-8c88-df1e2f3a6c3a"})  )
      // console.log(dataParticipant)
      updateData(newdata, 'participants', participant_id)
      saveData(photo_sampul_ijazah, 'participant_documents', 'file')
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
      data = {...data}
      updateData(data, 'participants', participant_id)
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

  const upload = async (file, name ) => {
    const filepath = `${name}-${Date.now()}`
    const { data_, error_ } = await supabase
        .storage
        .from('participant-documents')
        .upload(participant_id + "/" + filepath, file)
    if (error_) {
      console.error("Gagal Upload Berkas", error_.message)
      return null
    }
    // const { data } = await supabase.storage.from("participant_documents").getPublicUrl(filepath)
    // return data.publicUrl
    const { data, error } = await supabase.storage.from('participant-documents').createSignedUrl(participant_id+ "/" +filepath, 3600)

    if (data) {
      
      console.log('signedUrl > ', data.signedUrl)
      return data.signedUrl
    }
  }
  const saveData = async (dataInput, to, type=null) => {

    
    
    if (type=='file'){
      // const avatarFile = event.target.files[0]

      console.log('dataInput', dataInput)
      console.log(typeof dataInput)
     
      if(dataInput.length>1){
        startTransition(async () => {
          for (let i = 0; i < dataInput.length; i++) {
            const d = dataInput[i];
            console.log(d)
            const url = upload(d.file, d.name)
            console.log('url >', url)
            console.log(participant_id)
            const dataItem = {
              participant_id: participant_id,
              file_url: url,
              file_name: participant_id+'/'+`${d.name}-${Date.now()}`,
              file_size: d.size.toString(),
              file_type: d.type.slice(d.type.indexOf("/")).toUpperCase(),
              file_title: d.name
            }
            console.log(dataItem)
            if(!edit){
              const { data, err} = await supabase.from(to)
                                .insert([dataItem])
                                .select()
              console.log('data>', data)
              console.log('err >', err)

            }else{
              const { data, err} = await supabase.from(to)
              .update([dataItem])
              .eq('participant_id', applicantData.participants[0]?.id)
              .select()
console.log('data>', data)
console.log('err >', err)
            }
          }
        }
          
        )
        
      }else{
        const d = dataInput
        // console.logO
        console.log(participant_id)
        
        startTransition(async () => {
          
          const url = upload(d.file, d.name)
          console.log(('url >', url));
          const dataItem = {
            participant_id: participant_id,
            file_url: url,
            file_name: participant_id+'/'+`${d.name}-${Date.now()}`,
            file_size: d.size.toString(),
            file_type: d.type.slice(d.type.indexOf("/")).toUpperCase(),
            file_title: d.name
          }
          console.log(dataItem)

          if(!edit){
            const { data, err} = await supabase.from(to)
                              .insert([dataItem])
                              .select()
            console.log('data>', data)
            console.log('err >', err)

          }else{
            const { data, err} = await supabase.from(to)
            .update([dataItem])
            .eq('participant_id', applicantData.participants[0]?.id)
            .select()
            console.log('data>', data)
            console.log('err >', err)
          }
          // const { data, err} = await supabase.from(to)
          //                   .insert([dataItem])
          //                   .select()
          // console.log('data upladed>', data)
          // console.log('err >', err)
        })
      }
      // dataInput.map( d => {
        

      // })


      // const { data, error } = await supabase  
      //       .storage  
      //       .from('participant_documents')  
      //       .upload('public/avatar1.png', getDataBerkas, {    
      //         cacheControl: '3600',    
      //         upsert: false  
      //       })

    
      // let file = e.target.files[0];

      // const { data_, error_ } = await supabase
      //   .storage
      //   .from('uploads')
      //   .upload(userId + "/" + uuidv4(), file)
  
      // if (data) {
      //   getMedia();
  
      // } else {
      //   console.log(error);
      // }

    }else{

      console.log('dataInput> ', dataInput)
      startTransition(async () => {
        const { data, err} = await supabase.from(to)
                          .insert([dataInput])
                          .select()
        if(dataInput.pob){
          setParticipantId(data[0].id)
        }   
        console.log('data>', data)
        console.log('err >', err)
      })
      
    }
    console.log('isPending > ',isPending)

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
    startTransition(async () => { 

      console.log('dataInput> ' ,dataInput)
      const { data, err} = await supabase.from(to)
                          .update({...dataInput, updated_at : new Date()})
                          .eq('id', bo)
                          .select()
      console.log('data>', data[0])
      console.log('err >', err)

    } )
  }
  



  const getCurrentStep = (value) => {
    setCurrentStep(value)
  }
  const getEdit = (value) => {
    setEdit(value)
  }
  const getComplete = (value) => {
    setComplete(value)
  }

  // const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6'];
    const steps = ["Pembayaran", "Identitas Calon Santri", "Data Ayah", "Data Ibu", "Data Wali", "Upload Berkas", "Verifikasi Keluarga", "Konfirmasi Uang Pangkal", "Status"];
    const form = [<Pembayaran scroll={scroll}  /> , <IdentitasForm onSubmit={getIdentitas} complete={complete} currentStep={currentStep} />, <DataAyahForm onSubmit={getDataAyah} complete={complete} currentStep={currentStep} setComplete={setComplete} />, <DataIbuForm onSubmit={getDataIbu} complete={complete} currentStep={currentStep} setComplete={setComplete}/>, <DataWaliForm onSubmit={getDataWali} complete={complete} currentStep={currentStep} setComplete={setComplete}/>,  <BerkasForm  onSubmit={getDataBerkas} complete={complete} currentStep={currentStep} setComplete={setComplete}/>, <VerifikasiKeluargaForm onSubmit={getDataVerifikasiKeluarga} complete={complete} currentStep={currentStep} setComplete={setComplete}/>, <MetodeUangPangkal onSubmit={getDataMetodeUangPangkal} dataApplicant={applicantSchool} dataApplicantCategory={applicantStudentCategory} complete={complete} currentStep={currentStep} setComplete={setComplete}/>,<Status onSubmit={getStatus} complete={complete} currentStep={currentStep} getCurrentStep={getCurrentStep}  getEdit={getEdit} setComplete={setComplete}/>];

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

    {isPending ? (
      <div
      className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-primary opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
      role="status">
      <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Menyimpan...</span>
    </div>
    ) : (
      scroll('right')
    )}

    {steps.map((step, index) => (

      <div className={`flex justify-center ${currentStep !== index  + 1 && "hide"}`}>
          {form[currentStep-1]}
      </div>
    ))}

    <div className='flex justify-center px-10'>
      {isPending}
        {!complete && ( !isPending ? (
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
             // scroll('right')
           }}
           type='submit'
           
         >
           {currentStep === steps.length ? "Selesai" : "Simpan & Lanjut"}
         </button>
        ) : (
          <div
      className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-primary opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
      role="status">
      <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Menyimpan...</span>
    </div>
        )
         



        )}
        {/* { isPending ? 
        
        } */}
    </div>
    </>
  );
};

export default HorizontalStepper;