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

  const [participant, setParticipant] = useState({})
  const [dataAyah, setDataAyah] = useState({})
  const [dataIbu, setDataIbu] = useState({})
  const [dataWali, setDataWali] = useState({})
  const [dataBerkas, setDataBerkas] = useState({})
  const [dataVerifikasiKeluarga, setDataVerifikasiKeluarga] = useState({})
  const [dataMetodeUangPangkal, setDataMetodeUangPangkal] = useState({})
  const [dataStatus, setDataStatus] = useState({})
  const [berkasUrl, setBerkasUrl] = useState("")
  const [applicant_id, setApplicantId] = useState("")
  const [participant_id, setParticipantId] = useState("")
  const [applicant, setApplicant] = useState({})
  const [applicantSchool, setApplicantSchool] = useState({})
  const [applicantOrder, setApplicantOrder] = useState({invoice_number: "", status: ""})
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
    
      setApplicant(props.applicant[0])
      console.log('props.applicant[0] >', props.applicant[0])
      if(props.applicant[0].participants.length > 0){
        setParticipant(props.applicant[0].participants[0])
        // participant.is_complete??setCurrentStep(steps.length)
        if(participant.is_complete){
          setCurrentStep(steps.length)
          // setComplete(true)
        }
        setEdit(props.applicant[0].participants[0].is_draft)
        getFatherData(props.applicant[0].participants[0].id)
        
        getMotherData(props.applicant[0].participants[0].id)
        getWaliData(props.applicant[0].participants[0].id)
        getParticipantDocuments(props.applicant[0].participants[0].id)
      }

      console.log('participant >', participant)
      
      
      if(props.applicant[0].applicant_orders.length > 0) {
        // setApplicantOrder({ ...applicantOrder,
          applicantOrder.invoice_number= props.applicant[0].applicant_orders[0].invoice_number  
          applicantOrder.status= props.applicant[0].applicant_orders[0].status  
        // })
      }
      console.log('applicantOrder > ', applicantOrder) 

    
      const dataSchool = {
        id : props.applicant[0]?.applicant_schools[0]?.schools?.school_id,
        name : props.applicant[0]?.applicant_schools[0]?.schools?.school_name 
      }
      setApplicantSchool(dataSchool)

      const dataStudentCategory = {
        student_category : props.applicant[0]?.student_category
      }
      setApplicantStudentCategory(dataStudentCategory)
      
      const dataVerifikasiKeluarga = {
        student_category: props.applicant[0]?.student_category
      }
      setDataVerifikasiKeluarga(dataVerifikasiKeluarga)

      const dataMetodeUangPangkal = {
        metode_uang_pangkal: props.applicant[0]?.metode_uang_pangkal
      }
      setDataMetodeUangPangkal(dataMetodeUangPangkal)
    

      

    }
  
    console.log('isPending > ',isPending)
    console.log('applicant >', applicant)
    console.log('edit >', edit)
  }, [props.applicant, participant, isPending]) 

  // console.log('from props > ', props)
  

  // const getPaymentData = (data) =>{
    
  // }

  const getApplicantData = () => {
    
  }
  const getParticipantData = async () => {
    const { data, err} = await supabase.from('participants')
                        .select('*')
                        .eq('participant_id', id)
                        // .single()
    if(err){
      console.log(err)
      return
    }

    setDataAyah(data[0])
    console.log(dataAyah)
  }

  const getFatherData = async (id) => {
    const { data, err} = await supabase.from('participant_father_data')
                        .select('*')
                        .eq('participant_id', id)
                        // .single()
    if(err){
      console.log(err)
      return
    }

    setDataAyah(data[0])
    console.log(dataAyah)
  }
  const getMotherData = async (id) => {
    const { data, err} = await supabase.from('participant_mother_data')
                        .select('*')
                        .eq('participant_id', id)
                        // .single()
    if(err){
      console.log(err)
      return
    }

    setDataIbu(data[0])
    console.log(dataIbu)
  }
  const getWaliData = async (id) => {
    const { data, err} = await supabase.from('participant_wali_data')
                        .select('*')
                        .eq('participant_id', id)
                        // .single()
    if(err){
      console.log(err)
      return
    }

    setDataWali(data[0])
    console.log(dataWali)

  }

  const getParticipantDocuments = async (id) => {
    const { data, err} = await supabase.from('participant_documents')
                        .select('*')
                        .eq('participant_id', id)
                        // .single()
    if(err){
      console.log(err)
      return
    }

    setDataBerkas(data[0])
    console.log(dataBerkas)

  }


  const getIdentitas = async (data) => {
    console.log("Data Identitas >", data)
    startTransition(() => {
  console.log("masuk")
  if(data){
    setParticipant(data)
        console.log("Data Identitas cek >,", data)
        // setParticipant(d => ({...d, applicant_id: "04f84c3c-11e2-4154-8c88-df1e2f3a6c3a"})  )
        const newdata = (data) => ({...data, applicant_id: applicant.id}) 
        console.log('participant ', participant)
        console.log('newdata ', newdata)
        data = {...data, applicant_id: applicant.id}
        const data_applicant = {
          full_name: data.full_name, 
          gender: data.gender, 
          phone_number: data.phone_number, 
          email: data.email
        }
        const {full_name,gender,phone_number,email, ...newdatap } = data
        // console.log()
        // console.log('editc')
        setTimeout(() => {
        if(!complete){
           if(!edit && !participant)
            {saveData(newdatap, 'participants')}
           else 
            {updateData(newdatap, 'participants', participant.id)}
          
        // }else{
          
            updateData(data_applicant, "applicants", applicant.id)
        }
      }, 4000);
        scroll('right')
        setCurrentStep(currentStep + 1)
        }
    })
  }

  const getDataAyah =  (data) => {
    console.log("Data Ayah >", data)
    startTransition(() => {

      setTimeout(() => {
      if(data){
        
        data = {...data, participant_id: participant_id}
        setDataAyah(data)
    
        console.log("Data Ayah >,", data)
        if(!complete){

          if(!edit && !dataAyah){
            saveData(data, 'participant_father_data')
          }else{
            updateData(data, 'participant_father_data', applicant.participants[0]?.id)
          }
        }
        
    
        console.log('dataAyah ', dataAyah)
          scroll('right')
          setCurrentStep(currentStep + 1)
        }
      }, 3000);
    })
  }
  const getDataIbu = (data) => {
    console.log("DataIbu >", data)
    startTransition(() => {

      setTimeout(() => {
      if(data){
        console.log("DataIbu >,", data)
        setDataIbu(data)
        data = {...data, participant_id}
        saveData(data, 'participant_mother_data')
        if(!complete){
          if(!edit && !dataIbu){
            saveData(data, 'participant_mother_data')
          }else{
            updateData(data, 'participant_mother_data', applicant.participants[0]?.id)
          }

        }
        
        console.log(dataIbu)
          scroll('right')
          setCurrentStep(currentStep + 1)
        }
      }, 3000);
    })
  }
  const getDataWali = (data) => {
    console.log("DataWali >", data)
    startTransition(()=>{

      setTimeout(() => {
      if(data){
        console.log("DataWali >,", data)
        setDataWali(data)
        data = {...data, participant_id}
        if(!complete){
          if(!edit && !dataWali){
            saveData(data, 'participant_wali_data')
          }else{
            updateData(data, 'participant_wali_data', applicant.participants[0]?.id)
          }
        }
        
          scroll('right')
          setCurrentStep(currentStep + 1)
        }
      }, 3000);
    })
  }
  const getDataBerkas = (data) =>{
    console.log("DataBerkas >", data)
    startTransition(() => {

      setTimeout(() => {
      if(data){
        console.log("DataBerkas >,", data)
        // data = {...data, }
        if(!complete){
          if(!edit && !dataBerkas){
            saveData(data, 'participant_documents', 'file')
          }else{
            saveData(data, 'participant_documents', 'file')
            // updateData(data, 'participant_documents', applicant.participants[0]?.id)
          }
        }
        // saveData(data, 'participant_documents', 'file')
          scroll('right')
          setCurrentStep(currentStep + 1)
        }
      }, 3000);
    })
  }
  const getDataVerifikasiKeluarga = (data) => {
    console.log("Data VerifikasiKeluarga >", data)
    startTransition(()=> {
      setTimeout(() => {
      if(data){
        console.log("Data VerifikasiKeluarga >,", data)
        // const {photo_sampul_ijazah} = data.photo_sampul_ijazah
        const {photo_sampul_ijazah,...newdata} = data
        // setParticipant(d => ({...d, participant_id: "04f84c3c-11e2-4154-8c88-df1e2f3a6c3a"})  )
        // console.log(participant)
        if(!complete){
          
          updateData(newdata, 'participants', participant_id)
          
          saveData(photo_sampul_ijazah, 'participant_documents', 'file')
        }
          scroll('right')
          setCurrentStep(currentStep + 1)
        }
      }, 3000);

    })
  }
  const getDataMetodeUangPangkal = (data) => {
 
    console.log("Data Uang Pangkal >", data)
    startTransition(() => {
      
      setTimeout(() => {
      if(data){
        console.log("Data Uang Pangkal >,", data)
        data = {...data}
        updateData(data, 'participants', participant_id)
          scroll('right')
          setCurrentStep(currentStep + 1)
        }
      }, 3000);
    })
  }
  const getStatus = (data) => {
    // console.log("Data Uang Pangkal >", data)
    startTransition( () => {

      setTimeout( async () => {
        const { data, error } = await supabase.from('participants')
                                .select('is_complete')
                                .eq('id', participant.id)
                                .single()
        if(data){
          console.log("Complete >,", data)
          setComplete(data.is_complete)
          // scroll('right')
          //   setCurrentStep(currentStep + 1)
          }
      }, 3000);
    })
  }

  const upload = async (file, name ) => {
    const filepath = `${name}-${Date.now()}`
    const { data_, error_ } = await supabase
        .storage
        .from('participant-documents')
        .upload(participant_id + "/" + filepath, file,
          {cacheControl: '3600', upsert: true}
        )
    if (error_) {
      console.error("Gagal Upload Berkas", error_.message)
      return null
    }
    const { data } = await supabase.storage.from("participant-documents").getPublicUrl(participant_id+ "/" +filepath)
    const data_url = {
      path: data.publicUrl
    }
    console.log(data.publicUrl)
    setBerkasUrl((data.publicUrl).toString())
    // console.log(berkasUrl)
    return data.publicUrl
    // const { data, error } = await supabase.storage.from('participant-documents').createSignedUrl(participant_id+ "/" +filepath, 3600)

    const path = {
      signedUrl: data.signedUrl.toString()?? ""
    } 

    if (data) {
      console.log('signedUrl > ', data.signedUrl)
      console.log('data_ > ', data_)
      return path
    }
  }
  const saveData = async (dataInput, to, type=null) => {

    
    
    if (type=='file'){
      // const avatarFile = event.target.files[0]

      console.log('dataInput', dataInput)
      console.log(typeof dataInput)
     
      if(Array.isArray(dataInput)){
        
          for (let i = 0; i < dataInput.length; i++) {
            const d = dataInput[i];
            console.log(d)
            upload(d.file, d.name)
            // console.log('url >', url)
            console.log('url >', berkasUrl)
            console.log(participant_id)
            const dataItem = {
              participant_id: participant_id,
              file_url: berkasUrl,
              file_name: participant_id+'/'+`${d.name}-${Date.now()}`,
              file_size: d.size.toString(),
              file_type: d.type.slice(d.type.indexOf("/")).toUpperCase(),
              file_title: d.name
            }
            console.log(dataItem)
            if(!edit && !dataBerkas){
              const { data, err} = await supabase.from(to)
                                .insert([dataItem])
                                .select()
              console.log('data>', data)
              console.log('err >', err)

            }else{
              dataItem.participant_id = participant_id
              const { data, err} = await supabase.from(to)
              .upsert([dataItem])
              // .eq('participant_id', participant_id)
              .select()
              console.log('data>', data)
              console.log('err >', err)
            }
          }
        
      }else{
        const d = dataInput
        // console.logO
        console.log(participant_id)
          
          upload(d.file, d.name)
          // console.log(('url >', url.value('path')));
          const dataItem = {
            participant_id: participant_id,
            file_url: berkasUrl,
            file_name: participant_id+'/'+`${d.name}-${Date.now()}`,
            file_size: d.size.toString(),
            file_type: d.type.slice(d.type.indexOf("/")).toUpperCase(),
            file_title: d.name
          }
          console.log(dataItem)

          if(!edit && !dataBerkas){
              const { data, err} = await supabase.from(to)
                                .insert([dataItem])
                                .select()
              console.log('data>', data)
              console.log('err >', err)

            }else{
              dataItem.participant_id = participant_id
              const { data, err} = await supabase.from(to)
              .upsert([dataItem])
              // .eq('participant_id', participant_id)
              .select()
              console.log('data>', data)
              console.log('err >', err)
            }
          // const { data, err} = await supabase.from(to)
          //                   .insert([dataItem])
          //                   .select()
          // console.log('data upladed>', data)
          // console.log('err >', err)
        
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
      
        const { data, err} = await supabase.from(to)
                          .insert([dataInput])
                          .select()
        
        console.log('data>', data)
        console.log('err >', err)
        if(dataInput.pob){
          setParticipantId(data[0].id)
        }   
      
    }
    

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
                          .update({...dataInput, updated_at : new Date().toISOString()})
                          .eq('id', bo)
                          .select()
      console.log('data>', data[0])
      console.log('err >', err)

    } )
  }
  



  const getCurrentStep = (value) => {
    setCurrentStep(value)
  }
  const getEdit = async (value) => {
    setEdit(value)
    setComplete(false)
    const { data, error } = await supabase.from('participants')
                            .update({
                              is_complete: false,
                              updated_at: new Date().toISOString()
                              })
                            .eq('id', participant_id)
                            .select()
                            console.log('data participant after klik edit >', data)
                            console.log(error)
  }
  const getComplete = async (value) => {
    setComplete(value)
    const { data, error } = await supabase.from('participants')
                            .update({
                              is_complete: true,
                              updated_at: new Date().toISOString()
                            })
                            .eq('id', participant_id)
                            .select()
                            console.log('data participant after klik complete >', data)
                            console.log(error)

  }

  // const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6'];
    const steps = ["Pembayaran", "Identitas Calon Santri", "Data Ayah", "Data Ibu", "Data Wali", "Upload Berkas", "Verifikasi Keluarga", "Konfirmasi Uang Pangkal", "Status"];
    const form = [<Pembayaran scroll={scroll} applicantOrder={applicantOrder} /> , <IdentitasForm onSubmit={getIdentitas} dataApplicant={applicant} dataParticipant={participant} isPending={isPending} complete={complete} currentStep={currentStep} />, <DataAyahForm onSubmit={getDataAyah} dataAyah={dataAyah} isPending={isPending} complete={complete} currentStep={currentStep} setComplete={setComplete} />, <DataIbuForm onSubmit={getDataIbu} isPending={isPending} complete={complete} currentStep={currentStep} setComplete={setComplete} dataIbu={dataIbu} />, <DataWaliForm onSubmit={getDataWali} isPending={isPending} complete={complete} currentStep={currentStep} setComplete={setComplete} dataWali={dataWali} />,  <BerkasForm  onSubmit={getDataBerkas} dataBerkas={dataBerkas} isPending={isPending} complete={complete} currentStep={currentStep} setComplete={setComplete} />, <VerifikasiKeluargaForm onSubmit={getDataVerifikasiKeluarga} dataVerifikasiKeluarga={dataVerifikasiKeluarga} isPending={isPending} complete={complete} currentStep={currentStep} setComplete={setComplete}/>, <MetodeUangPangkal onSubmit={getDataMetodeUangPangkal} dataApplicant={applicantSchool} dataMetodeUangPangkal={dataMetodeUangPangkal} dataApplicantCategory={applicantStudentCategory} isPending={isPending} complete={complete} currentStep={currentStep} setComplete={setComplete}/>,<Status onSubmit={getStatus} participant={participant} dataStatus={dataStatus} complete={complete} currentStep={currentStep} getCurrentStep={getCurrentStep} getEdit={getEdit} getComplete={getComplete}/>];

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
    

    <div className='flex-wrap justify-center px-10'>
      {/* {isPending} */}
        {!complete &&  (
          <div className=''>
            {/* <div className="flex-wrap">
              
            </div> */}
            <div className=" w-full">
              <button
            className={`btn w-full block btn-sm text-gray-200 bg-green-900 hover:bg-gray-800 ml-3 ${currentStep!==1?"invisible":''}`}
            onClick={() => {
              // currentStep === steps.length
              //   ? setComplete(true)
              //   : setCurrentStep((prev) => prev + 1); 
              if(currentStep === steps.length){
                setComplete(true)

              }else if (currentStep == steps.length -1){
                getComplete(true)
                setCurrentStep((prev) => prev + 1);
              }
              else{
                setCurrentStep((prev) => prev + 1);
                // callback(data)
              }
              // handleSubmit
              scroll('right')
            }}
            type='submit'
            
          >
            {isPending? (
               <div
      className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-primary opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
      role="status">
      <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Menyimpan...</span>
    </div>
            ) : (
              currentStep === steps.length ? "Selesai" : "Simpan & Lanjut"
            )} 
            {/* {isPending?  
            (
              <div
      className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-primary opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
      role="status">
      <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Menyimpan...</span>
    </div>  
            )
            : ()
            } */}
              </button>
              
            </div>
            <div className="w-full">
              <button
                className={`btn w-full block btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3 ${currentStep==1 || currentStep==steps.length?"invisible":''}`}
                onClick={() => {
                  // currentStep === steps.length
                  //   ? setComplete(true)
                  //   : setCurrentStep((prev) => prev + 1); 
                  
                    setCurrentStep((prev) => prev - 1);
                    // callback(data)
                  
                  // handleSubmit
                  scroll('left')
                }}
                
                
              >
                Kembali
                {/* {currentStep === steps.length ? "Selesai" : "Simpan & Lanjut"} */}
              </button>
          
            </div>
          </div>
         
      
        
         



        )}
        {
          edit && (
            <div className='flex flex-1'>
              <button
                className={`btn w-full btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3 ${currentStep==1 || currentStep==steps.length?"invisible":''}`}
                onClick={() => {
                  // currentStep === steps.length
                  //   ? setComplete(true)
                  //   : setCurrentStep((prev) => prev + 1); 
                  
                    setCurrentStep((prev) => prev - 1);
                    // callback(data)
                  
                  // handleSubmit
                  scroll('left')
                }}
                type='submit'
                
              >
                Kembali
                {/* {currentStep === steps.length ? "Selesai" : "Simpan & Lanjut"} */}
              </button>
              <button
                className={`btn w-full btn-sm text-gray-200 bg-green-800 hover:bg-gray-700 ml-3 ${currentStep==1 || currentStep==steps.length?"invisible":''}`}
                onClick={() => {
                  // currentStep === steps.length
                  //   ? setComplete(true)
                 
                    setCurrentStep((prev) => prev + 1);
                    // callback(data)
                  // handleSubmit
                  scroll('right')
                }}
                type='submit'
                
              >
                Lanjut
                {/* {currentStep === steps.length ? "Selesai" : "Simpan & Lanjut"} */}
              </button>
            </div>
          )
          
        }
        {/* { isPending ? 
        
        } */}
    </div>
    </>
  );
};

export default HorizontalStepper;