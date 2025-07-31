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
import PengukuranSeragam from './PengukuranSeragam';
// import { createClient } from '@supabase/supabase-js';

import SmallAlert from '../utils/SmallAlert';

const HorizontalStepper = (props) => {
  
  const stepperRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [inserted, setInserted] = useState(false);
  const [ isPending, startTransition ] = useTransition()

  const [participant, setParticipant] = useState({})
  const [dataAyah, setDataAyah] = useState({})
  const [dataIbu, setDataIbu] = useState({})
  const [dataWali, setDataWali] = useState({})
  const [dataBerkas, setDataBerkas] = useState([])
  const [dataVerifikasiKeluarga, setDataVerifikasiKeluarga] = useState({})
  const [dataMetodeUangPangkal, setDataMetodeUangPangkal] = useState({})
  const [dataStatus, setDataStatus] = useState({})
  const [berkasUrl, setBerkasUrl] = useState("")
  // const [berkasUrl, setBerkasUrl] = useState({a: "", b: "", c: "", d: "", e: "", f: "", g: ""})
  const [dataSeragam, setDataSeragam] = useState([])
  const [schoolUniformModel, setSchoolUniformModel] = useState([])
  const [applicant_id, setApplicantId] = useState("")
  const [participant_id, setParticipantId] = useState("")
  const [applicant, setApplicant] = useState({})
  const [applicantSchool, setApplicantSchool] = useState({})
  const [applicantOrder, setApplicantOrder] = useState({invoice_number: "", status: ""})
  const [applicantStudentCategory, setApplicantStudentCategory] = useState({})
  // const [applicantSchool, setApplicantSchool] = useState({})

  const [dataAlert, setDataAlert] = useState({message:""})
  const [dataAlertShow, setDataAlertShow] = useState(false)
  
  const scroll = (direction) => {
    console.log(direction)
    if (stepperRef.current) {
      const scrollAmount = 200; // Adjust scroll distance
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
        if(participant.is_complete && participant.submission_status!== 'accepted'){
          setCurrentStep(steps.length - 1 )
          // setComplete(true)
        }else if(participant.is_complete && participant.submission_status== 'accepted'){
          setCurrentStep(steps.length)
        }
        setEdit(props.applicant[0].participants[0].is_draft)
        if(props.applicant[0].participants[0].participant_father_data.length>0){
          setDataAyah(props.applicant[0].participants[0].participant_father_data[0])
        }
        if(props.applicant[0].participants[0].participant_mother_data.length>0){
          setDataIbu(props.applicant[0].participants[0].participant_mother_data[0])
        }
        if(props.applicant[0].participants[0].participant_wali_data.length>0){
          setDataWali(props.applicant[0].participants[0].participant_wali_data[0])
        }
        getFatherData(props.applicant[0].participants[0].id)
        getMotherData(props.applicant[0].participants[0].id)
        getWaliData(props.applicant[0].participants[0].id)
        getParticipantDocuments(props.applicant[0].participants[0].id)
        getSeragamData(props.applicant[0].participants[0].id)
        getSchoolUniformModel(props.applicant[0].applicant_schools[0].schools.school_id)
        
        const dataStudentCategory = {
          student_category : props.applicant[0].participants[0].student_category,
          updated_at : props.applicant[0].participants[0].updated_at
        }
        setApplicantStudentCategory(dataStudentCategory)
        
        const dataVerifikasiKeluarga = {
          student_category: props.applicant[0].participants[0].student_category,
          updated_at : props.applicant[0].participants[0].updated_at,
          photo_sampul_ijazah: dataBerkas.find(e => e.file_title == 'Photo-Sampul-Ijazah')?.file_url
        }
        setDataVerifikasiKeluarga(dataVerifikasiKeluarga)
        console.log('dataVerifikasiKeluarga', dataVerifikasiKeluarga)

        const dataMetodeUangPangkal = {
          metode_uang_pangkal: props.applicant[0]?.participants[0].metode_uang_pangkal
        }
        setDataMetodeUangPangkal(dataMetodeUangPangkal)
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
    
      

      

    }
  
    console.log('isPending > ',isPending)
    console.log('applicant >', applicant)
    console.log('edit >', edit)
  }, [props.applicant, participant, isPending]) 

  // console.log('from props > ', props)
  

  // const getPaymentData = (data) =>{
    
  // }

  const getSeragamData = async (id) => {

    const { data, err} = await supabase.from('participant_size_charts')
                        .select('uniform_model_id, size_chart, updated_at')
                        .eq('participant_id', id)
                        // .single()
    if(err){
      console.log(err)
      return
    }

    setDataSeragam(data)
    console.log('dataSeragam >', dataSeragam)

  }
  const getSchoolUniformModel = async (id) => {

    const { data, err} = await supabase.from('school_uniform_models') 
                        .select('model_name, model_size_charts, model_url, model_gender, id, model_code, school_id')
                        .eq('school_id', id)
                        // .single()
    if(err){
      console.log(err)
      return
    }

    setSchoolUniformModel(data)
    console.log('schoolUniformModel >' , schoolUniformModel)

  }

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
      // return
    }

    console.log('data', data)

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
    data.map(e => ({
      
    }))
    // const tempData = [
    //   {}
    // ]

    setDataBerkas(data)
    console.log('dataBerkas', dataBerkas)

  }


  const getIdentitas = async (data) => {
    console.log("Data Identitas >", data)
    // setTimeout(() => {
    startTransition(() => {
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
          if(!complete){
          console.log("masuk")
           if(!edit && applicant.participants.length == 0)
            {
              console.log("edit >, ", edit)
              console.log("participant >,", participant)

              saveData(newdatap, 'participants')}
           else 
            {updateData(newdatap, 'participants', participant.id?participant.id:participant_id, 'id')}
          
        // }else{
          
            updateData(data_applicant, "applicants", applicant.id, 'id')
        }
        // if(applicant.participants.length > 0){
      scroll('right')
      setCurrentStep(currentStep + 1)
    // }
      }
      
    })
    // }, 4000);
    
  }

  const getDataAyah =  (data) => {
    console.log("Data Ayah >", data)
    startTransition(() => {

      setTimeout(() => {
      if(data){
        console.log('participant dataAyah >', participant)
        console.log('participant dataAyah >', participant)
        const pid = participant_id?participant_id:participant.id
        data = {...data, participant_id:pid}
        
        console.log("Data Ayah >,", data)
        if(!complete){
          if(props.applicant[0].participants.length>0){
            if(!edit && props.applicant[0].participants[0].participant_father_data.length == 0 ){
              
              saveData(data, 'participant_father_data')
            }else{
              updateData(data, 'participant_father_data', pid, 'participant_id')
            }

          }
        }
        setDataAyah(data)
        
        
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
        const pid = participant_id?participant_id:participant.id
        data = {...data, participant_id:pid}
        
        if(!complete){
          if(props.applicant[0].participants.length>0){
            if(!edit && props.applicant[0].participants[0].participant_mother_data.length == 0){
              console.log("masuk")
              saveData(data, 'participant_mother_data')
            }else{
              updateData(data, 'participant_mother_data', pid, 'participant_id')
            }

          }
          
        }
          setDataIbu(data)
          getMotherData(pid)
        
          scroll('right')
          setCurrentStep(currentStep + 1)
        }
      }, 3000);
      
      console.log(dataIbu)
    })
  }
  const getDataWali = (data) => {
    console.log("DataWali >", data)
    startTransition(()=>{

      setTimeout(() => {
      if(data){
        console.log("DataWali >,", data)
        
        const pid = participant_id?participant_id:participant.id
        data = {...data, participant_id:pid}
        if(!complete){
          if(props.applicant[0].participants.length>0){
            if(!edit && props.applicant[0].participants[0].participant_wali_data.length == 0){
              console.log("masuk")
              saveData(data, 'participant_wali_data')
            }else{
              updateData(data, 'participant_wali_data', pid, 'participant_id')
            }

          }
        }
        setDataWali(data)
        getWaliData(pid)

        console.log('dataWali >', dataWali)
        
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
        if(data.length === 0 && !dataBerkas.length === 0) {
          dataAlert.message = "Data berkas tidak boleh kosong"
          setDataAlertShow(true) 
        }

        // if(data.length > 0){
          console.log("DataBerkas >,", data)
          // data = {...data, }
          if(!complete){
            if(!edit && dataBerkas.length === 0){
              saveData(data, 'participant_documents', 'file')
            }else{
              saveData(data, 'participant_documents', 'file')
              // updateData(data, 'participant_documents', applicant.participants[0]?.id)
            }
          }
          setDataBerkas(data)
          // saveData(data, 'participant_documents', 'file')
            scroll('right')
            setCurrentStep(currentStep + 1)
          // }
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
        const pid = participant.id?participant.id:participant_id
        if(!complete){
          
          updateData(newdata, 'participants', pid, 'id')

          // if(!edit && inserted && )
          
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
        const pid = participant.id?participant.id:participant_id
        console.log('pid > ', pid)
        updateData(data, 'participants', pid, 'id')
          scroll('right')
          setCurrentStep(currentStep + 1)
        }
        getComplete(true)
      }, 3000);
    })
  }

  const getPengukuranSeragam = (data) => {
 
    console.log("Data Pengukuran Seragam >", data)
    startTransition(() => {
      
      setTimeout(() => {
      if(data){
        const pid = participant.id?participant.id:participant_id
        console.log("Data Pengukuran Seragam >,", data)
        // data = {...data, participant_id:pid}
        // data = {participant_id:pid, uniform_model_id:data.id, size_chart:data.}
        // data.map((e) => {
        //   e.participant_id=pid
        // })
        // data.forEach(e => { e.participant_id = pid});
        
        console.log('data > ', data)
        if(complete){
          if(dataSeragam.length == 0){
            saveData(data, 'participant_size_charts')
          }else{
            updateData(data, 'participant_size_charts', pid, 'id')
            // updateData(data, 'participant_documents', applicant.participants[0]?.id)
          }
            updateData({is_uniform_sizing: true}, 'participants', pid, 'id')
        }
        
          // scroll('right')
          // setCurrentStep(currentStep + 1)
        }
      }, 3000);
      setComplete(true)
    })
  }

  const getStatus = (data) => {
    // console.log("Data Uang Pangkal >", data)
    startTransition( () => {

      setTimeout( async () => {
        const pid = participant.id?participant.id:participant_id
        const { data, error } = await supabase.from('participants')
                                .select('is_complete, status_submission')
                                .eq('id', pid)
                                .single()
        if(data){
          console.log("Complete >,", data)
          setComplete(data.is_complete)
          setDataStatus(data.status_submission)
          // scroll('right')
          //   setCurrentStep(currentStep + 1)
          }
      }, 3000);
    })
  }

  const upload = async (file, name ) => {
    const filepath = `${name}-${Date.now()}`
    const pid = participant.id?participant.id:participant_id
    const { data_, error_ } = await supabase
        .storage
        .from('participant-documents')
        .upload(pid + "/" + filepath, file,
          {cacheControl: '3600', upsert: true}
        )
    if (error_) {
      console.error("Gagal Upload Berkas", error_.message)
      return null
    }
    const { data } = await supabase.storage.from("participant-documents").getPublicUrl(pid+ "/" +filepath)
    const data_url = {
      path: data.publicUrl
    }
    console.log(data.publicUrl)
    setBerkasUrl(data.publicUrl)
    // setBerkasUrl((data.publicUrl).toString())
    // if(name == "Bird-Certificate"){
    //   berkasUrl.a = data.publicUrl.toString()
    // }
    // if(name == "KK"){
    //   berkasUrl.b = data.publicUrl.toString()
    // }
    // if(name == "Parent-KTP"){
    //   berkasUrl.c = data.publicUrl.toString()
    // }
    // if(name == "Pas-Photo"){
    //   berkasUrl.d = data.publicUrl.toString()
    // }
    // if(name == "Surat-Kesanggupan"){
    //   berkasUrl.e = data.publicUrl.toString()
    // }
    // if(name == "Syahadah"){
    //   berkasUrl.f = data.publicUrl.toString()
    // }
    // if(name == "Photo-Sampul-Ijazah"){
    //   berkasUrl.g = data.publicUrl.toString()
    // }
    // berkasUrl.a = data.publicUrl.toString()
    // console.log(berkasUrl)
    return data.publicUrl??null
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
      
      let path
      if(Array.isArray(dataInput)){
        
          for (let i = 0; i < dataInput.length; i++) {
            const d = dataInput[i];
            console.log(d)
            const url = await upload(d.file, d.name)
            
            // if(d.name == "Bird-Certificate"){
            //   path = berkasUrl.a 
            // }
            // if(d.name == "KK"){
            //   path = berkasUrl.b
            // }
            // if(d.name == "Parent-KTP"){
            //   path = berkasUrl.c
            // }
            // if(d.name == "Pas-Photo"){
            //   path = berkasUrl.d
            // }
            // if(d.name == "Surat-Kesanggupan"){
            //   path = berkasUrl.e
            // }
            // if(d.name == "Syahadah"){
            //   path = berkasUrl.f
            // }
            // if(d.name == "Photo-Sampul-Ijazah"){
            //   path = berkasUrl.g
            // }
            
            console.log('url >', path)
            // berkasUrl.a?(berkasUrl.b?(berkasUrl.c?berkasUrl.d:""):berkasUrl.e):berkasUrl.f
            console.log('url >', berkasUrl)
            console.log(participant.id)

            const pid = participant.id?participant.id:participant_id

            const dataItem = {
              participant_id: pid,
              file_url: berkasUrl?berkasUrl:url,
              file_name: participant_id+'/'+`${d.name}-${Date.now()}`,
              file_size: d.size.toString(),
              file_type: d.type.slice(d.type.indexOf("/")+1).toUpperCase(),
              file_title: d.name
            }
            console.log(dataItem)
            if(!edit && dataBerkas.length == 0){
              const { data, err} = await supabase.from(to)
                                .insert([dataItem])
                                .select()
              console.log('data>', data)
              console.log('err >', err)

            }else{
              dataItem.participant_id = participant.id?participant.id:participant_id
              const { data, err} = await supabase.from(to)
              .upsert([dataItem])
              // .eq('participant_id', participant_id)
              .select()
              console.log('data>', data)
              console.log('err >', err)
              
            }
      //       if(d.name == "Bird-Certificate"){
      // berkasUrl.a = data.publicUrl.toString()
      //   }
        
        
          // if(d.name == "Bird-Certificate"){
          //   berkasUrl.a = ""
          // }
          // if(d.name == "KK"){
          //   berkasUrl.b = ""
          // }
          // if(d.name == "Parent-KTP"){
          //   berkasUrl.c = ""
          // }
          // if(d.name == "Pas-Photo"){
          //   berkasUrl.d = ""
          // }
          // if(d.name == "Surat-Kesanggupan"){
          //   berkasUrl.e = ""
          // }
          // if(d.name == "Syahadah"){
          //   berkasUrl.f = ""
          // }
      }

          
        
      }else{
        const d = dataInput
        // console.logO
        console.log(participant_id)
          
          upload(d.file, d.name)

          const pid = participant.id?participant.id:participant_id
          // console.log(('url >', url.value('path')));
          const dataItem = {
            participant_id: pid,
            file_url: berkasUrl,
            file_name: participant_id+'/'+`${d.name}-${Date.now()}`,
            file_size: d.size.toString(),
            file_type: d.type.slice(d.type.indexOf("/")).toUpperCase(),
            file_title: d.name
          }
          console.log(dataItem)

          if(!edit && dataBerkas.length == 0){
              const { data, err} = await supabase.from(to)
                                .upsert([dataItem])
                                .select()
              console.log('data>', data)
              console.log('err >', err)

            }else{
              dataItem.participant_id = participant.id?participant.id:participant_id
              const { data, err} = await supabase.from(to)
              .upsert([dataItem])
              // .eq('participant_id', participant_id)
              .select()
              console.log('data>', data)
              console.log('err >', err)
            }

            // berkasUrl.g = ""
            
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
      
        let input = []
        Array.isArray(dataInput) ? input = dataInput : input.push(dataInput) 
        
        const { data, err} = await supabase.from(to)
                          .insert(input)
                          .select()
        
        console.log('data>', data)
        console.log('err >', err)
        if(dataInput.pob){
          setInserted(true)
          setParticipantId(data[0].id)
        }   
      
    }
    
    // getApplicantData()

  }

  const updateData = async (dataInput, to, bo, pk, type=null) => {
    
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
    // startTransition(async () => { 

      console.log('dataInput> ' ,dataInput)

      if(!Array.isArray(dataInput)){
        console.log('from input object')
        const { data, err} = await supabase.from(to)
                            .update({...dataInput, updated_at : new Date().toISOString()})
                            .eq(pk, bo)
                            .select()
        console.log('data>', data[0])
        console.log('err >', err)
      }else{
        console.log('from input array')
        dataInput.forEach( async (e) => {
          // const pk1 = pk
          // const pk2 = e.uniform_model_id
          console.log('element', e)
          const pk1 = Object.keys(e)[0]
          const pk2 = Object.keys(e)[1]
          const { data, err} = await supabase.from(to)
                              .update({...e, updated_at : new Date().toISOString()})
                              .eq(pk1, e[pk1])
                              .eq(pk2, e[pk2])
                              .select()
          console.log('data>', data[0])
          console.log('err >', err)
        });
      }

    // } )
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
                            .eq('id', participant.id?participant.id:participant_id)
                            .select()
                            console.log('data participant after klik edit >', data)
                            console.log(error)
  }
  const getComplete = async (value) => {
    // setComplete(value)
    const { data, error } = await supabase.from('participants')
                            .update({
                              is_complete: value,
                              updated_at: new Date().toISOString()
                            })
                            .eq('id', participant.id??participant_id)
                            .select()
    console.log('data participant after klik complete >', data)
    console.log(error)

  }

  const setDataAlertShow_ = (value) => {
    setDataAlertShow(value)
  }

  // const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6'];
    const steps = ["Pembayaran", "Identitas Calon Santri", "Data Ayah", "Data Ibu", "Data Wali", "Upload Berkas", "Verifikasi Keluarga", "Konfirmasi Uang Pangkal", "Status", "Pengukuran Seragam"];
    const form = [<Pembayaran scroll={scroll} applicantOrder={applicantOrder} /> , <IdentitasForm onSubmit={getIdentitas} dataApplicant={applicant} dataParticipant={participant} isPending={isPending} complete={complete} currentStep={currentStep} />, <DataAyahForm onSubmit={getDataAyah} dataAyah={dataAyah} isPending={isPending} complete={complete} currentStep={currentStep} setComplete={setComplete} />, <DataIbuForm onSubmit={getDataIbu} isPending={isPending} complete={complete} currentStep={currentStep} setCurrentStep={setCurrentStep} setComplete={setComplete} dataIbu={dataIbu} />, <DataWaliForm onSubmit={getDataWali} isPending={isPending} complete={complete} currentStep={currentStep} setCurrentStep={setCurrentStep} setComplete={setComplete} dataWali={dataWali} />,  <BerkasForm  onSubmit={getDataBerkas} dataBerkas={dataBerkas} school={applicantSchool.id} isPending={isPending} complete={complete} currentStep={currentStep} setComplete={setComplete} />, <VerifikasiKeluargaForm onSubmit={getDataVerifikasiKeluarga} dataVerifikasiKeluarga={dataVerifikasiKeluarga} isPending={isPending} complete={complete} currentStep={currentStep} setComplete={setComplete}/>, <MetodeUangPangkal onSubmit={getDataMetodeUangPangkal} dataApplicant={applicantSchool} dataMetodeUangPangkal={dataMetodeUangPangkal} dataApplicantCategory={applicantStudentCategory} isPending={isPending} complete={complete} currentStep={currentStep} setComplete={setComplete}/>,<Status onSubmit={getStatus} participant={participant} dataStatus={dataStatus} complete={complete} currentStep={currentStep} getCurrentStep={getCurrentStep} getEdit={getEdit} getComplete={getComplete}/>, <PengukuranSeragam onSubmit={getPengukuranSeragam} participant={participant.id} school={applicantSchool.id} gender={applicant.gender} dataSeragam={dataSeragam} schoolUniformModel={schoolUniformModel} isPending={isPending} complete={complete} currentStep={currentStep} getCurrentStep={getCurrentStep} getEdit={getEdit} getComplete={getComplete}/>];

  return (
    <>
    <div className="flex items-center justify-center shadow-md p-4 ">
      {dataAlertShow && (
        <SmallAlert dataAlert={dataAlert} setDataAlertShow={setDataAlertShow_} />
      )}

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
      <div zf
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


    {/* {isPending ? (
      <div
      className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-primary opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
      role="status">
      <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
      >Menyimpan...</span>
    </div>
    ) : (
      scroll('right')
    )} */}

    {steps.map((step, index) => (

      <div className={`flex justify-center ${currentStep !== index  + 1 && "hide"}`}>
          {form[currentStep-1]}
      </div>
    ))}
    

    <div className='flex-wrap justify-center px-5'>
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
              currentStep === steps.length ? "Selesai" : "Lanjut"
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
            {!edit && (
              <div className="w-full">
                <button
                  className={`btn w-full block btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3 ${currentStep==1 || currentStep==steps.length || currentStep==steps.length - 1?"invisible":''}`}
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

            )}
          </div>
         
      
        
         



        )}
        {
          edit && currentStep!=steps.length-1 && (
            <div className='flex flex-1 gap-3'>
              <button
                className={`btn w-full btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ${currentStep==1 || currentStep==steps.length?"invisible":''}`}
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
                className={`btn w-full btn-sm text-gray-200 bg-green-800 hover:bg-gray-700 ${currentStep==1 || currentStep==steps.length?"invisible":''}`}
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