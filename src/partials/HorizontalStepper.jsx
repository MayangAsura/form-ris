import { useEffect, useRef, useState, useTransition, forwardRef } from 'react';
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
// import CompressorComp from "../components/compressor";
// import { createClient } from '@supabase/supabase-js';

import SmallAlert from '../utils/SmallAlert';
import Swal from '../utils/Swal';
import { setActive } from '@material-tailwind/react/components/Tabs/TabsContext';
import { useNavigate } from 'react-router-dom';
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { step } from '@material-tailwind/react';
import { G } from '@react-pdf/renderer';
import { da } from 'zod/v4/locales';

const PATH_URL = import.meta.env.URL_LOCAL

const HorizontalStepper = forwardRef((props, ref) => {

  // const [searchParams, setSearchParams] = useSearchParams();
  // const step = parseInt(searchParams.get('step') || '1');

  
  const stepperRef = useRef(null);
  // const [currentStep, setCurrentStep] = useState(1);
  // Initialize currentStep with priority: URL param > localStorage > default
  
  const [complete, setComplete] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [edit, setEdit] = useState(false);
  const [inserted, setInserted] = useState(false);
  const [ isPending, startTransition ] = useTransition()
  const [ loading, setLoading ] = useState(false)
  const pengSeragam = useRef()
  const [searchParams] = useSearchParams();
  const nstep = searchParams.get('step');
  const [last_step, setLastStep] = useState("")
  const [currentStep, setCurrentStep] = useState(1);
  // const [ pengSeragam, setPengSeragam ] = useRef()

  const [participant, setParticipant] = useState({})
  const [dataAyah, setDataAyah] = useState({})
  const [dataIbu, setDataIbu] = useState({})
  const [dataWali, setDataWali] = useState({})
  const [dataBerkas, setDataBerkas] = useState([])
  const [dataVerifikasiKeluarga, setDataVerifikasiKeluarga] = useState({})
  const [dataMetodeUangPangkal, setDataMetodeUangPangkal] = useState({})
  const [dataStatus, setDataStatus] = useState({})
  const [berkasUrl, setBerkasUrl] = useState("")
  const [dataSeragam, setDataSeragam] = useState([])
  const [schoolUniformModel, setSchoolUniformModel] = useState([])
  const [applicant_id, setApplicantId] = useState("")
  const [participant_id, setParticipantId] = useState("")
  const [applicant, setApplicant] = useState({})
  const [applicantSchool, setApplicantSchool] = useState({})
  const [applicantOrder, setApplicantOrder] = useState({invoice_number: "", status: ""})
  const [applicantStudentCategory, setApplicantStudentCategory] = useState({})
  // const [applicantSchool, setApplicantSchool] = useState({})

  const [dataAlert, setDataAlert] = useState({title:"", message:"Data Berhasil Disimpan"})
  const [dataAlertShow, setDataAlertShow] = useState(false)
  const [modal_show, setModalShow] = useState(false)
    const [modal_data, setModalData] = useState({
      type: "",
      title: "",
      message: "",
      text: "OK",
      url: "",
      // url: "https://wa.me/628123523434?text=Assalamu'alaikum%20warahmatullah%20wabarakatuh%2C%20ustadz%2Fustadzah.%20Alhamdulillah%20ananda%20telah%20menyelesaikan%20formulir%20pra%20pendaftaran.%20Jazaakumullahu%20khayran.",
      text2: "",
      url2: ""
    })
  const navigate = useNavigate()
  // const { applicant, setIsRefresh, currentStep} = props

  const scroll = (direction) => {
    ////console.log(direction)
    if (stepperRef.current) {
      const scrollAmount = 200; // Adjust scroll distance
      stepperRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };
    
  // Save current step whenever it changes
  useEffect(() => {
    
    // const savedStep = localStorage.getItem('lastActiveStep');
    // if (savedStep) return setCurrentStep(parseInt(savedStep));
    
    localStorage.setItem('lastActiveStep', currentStep.toString());
    
    // Update URL parameter
    const params = { step: currentStep };
    navigate({
      search: `?${createSearchParams(params)}`,
    }, { replace: true }); // Use replace to avoid adding to history
    if (nstep){ return setCurrentStep(parseInt(nstep))};

    
    const savedStep_ = localStorage.getItem('lastActiveStep');
    if (savedStep_) return setCurrentStep(parseInt(savedStep_));
    // return 
    // if(nstep > savedStep){
    //   return setCurrentStep(parseInt(nstep))
    // }
  
    
    
  }, []);

  // Clear saved step when form is completed
  useEffect(() => {
    if (complete) {
      localStorage.removeItem('lastActiveStep');
    }
  }, [complete]);

  useEffect(() => {
    // console.log('ref', ref)
    if(props.applicant.length > 0) {
    console.log('applicant',props.applicant[0].participants[0])
      setApplicant(props.applicant[0])
      ////console.log('props.applicant[0] >', props.applicant[0])
      if(props.applicant[0].participants.length > 0){
        setParticipant(props.applicant[0].participants[0])
        // participant.is_complete??setCurrentStep(steps.length)
        if(participant.is_complete && (participant.submission_status!== 'accepted' || participant.submission_status!== 'on_measurement' )){
          if(!dataSeragam || dataSeragam.length ==0 ){
            console.log(participant.is_complete)
            setIsComplete(true)
            setCurrentStep(steps.length - 1 )
            localStorage.setItem('lastActiveStep', (steps.length - 1).toString());

          }
          // setComplete(true)
        }else if(participant.is_complete && (participant.submission_status== 'accepted' || participant.submission_status== 'on_measurement') && dataSeragam && dataSeragam.length>0 ){
          // setIsComplete(false)
          // setCurrentStep(steps.length)
          // localStorage.setItem('lastActiveStep', (steps.length).toString());
          // if(ref){
            
          // }
        } 
        else if(participant.is_complete && (participant.submission_status!== 'accepted' || participant.submission_status!== 'on_measurement') && par ){
          // setIsComplete(true)
          setCurrentStep(steps.length)
          localStorage.setItem('lastActiveStep', (steps.length).toString());
          // if(ref){
            
          // }
        } 
        // if(participant.is_complete && (participant.submission_status!== 'accepted' || participant.submission_status!== 'on_measurement' )){

        // }
        getStatus()
        setEdit(props.applicant[0].participants[0].is_draft)
        if(props.applicant[0].participants[0].participant_father_data.length>0){
          setDataAyah(props.applicant[0].participants[0].participant_father_data[0])
        }
        if(props.applicant[0].participants[0].participant_mother_data || Array.isArray(props.applicant[0].participants[0].participant_mother_data)?props.applicant[0].participants[0].participant_mother_data.length > 0 : ""){
           
          setDataIbu(props.applicant[0].participants[0].participant_mother_data)
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
        ////console.log('dataVerifikasiKeluarga', dataVerifikasiKeluarga)

        const dataMetodeUangPangkal = {
          metode_uang_pangkal: props.applicant[0]?.participants[0].metode_uang_pangkal
        }
        setDataMetodeUangPangkal(dataMetodeUangPangkal)

        const dataSchool = {
          id : props.applicant[0]?.applicant_schools[0]?.schools?.school_id,
          name : props.applicant[0]?.applicant_schools[0]?.schools?.school_name, 
          subschool : props.applicant[0]?.applicant_schools[0]?.subschool || "", 
          class_id : props.applicant[0]?.applicant_schools[0]?.class_id || 0
        }
        setApplicantSchool(dataSchool)

        if(nstep==2){
            // getApplicantData(props.applicant[0].id)
            getParticipantData(props.applicant[0].participants[0].id)
          }
          if(nstep==3){
            getFatherData(props.applicant[0].participants[0].id)
          }
          if(nstep==4){
            getMotherData(props.applicant[0].participants[0].id)
          }
          if(nstep==5){
            getWaliData(props.applicant[0].participants[0].id)
          }
          if(nstep==6){
            getParticipantDocuments(props.applicant[0].participants[0].id)
          }
          if(nstep==7){
            getParticipantData(props.applicant[0].participants[0].id)
            // getParticipantDocuments(participant_id?participant_id:participant.id)
          }
          if(nstep==8){
            getParticipantData(props.applicant[0].participants[0].id)
          }
      }

      ////console.log('participant >', participant)
      
      
      if(props.applicant[0].applicant_orders.length > 0) {
        // setApplicantOrder({ ...applicantOrder,
          applicantOrder.invoice_number= props.applicant[0].applicant_orders[0].invoice_number  
          applicantOrder.status= props.applicant[0].applicant_orders[0].status  
        // })
      }
      ////console.log('applicantOrder > ', applicantOrder) 
    
      

      

    }

    if(props.currentStep && (participant?.submission_status== 'accepted' || participant.submission_status== 'on_measurement' )) {
      console.log('currentStep from stepper', props.currentStep)
      setCurrentStep(props.currentStep)
      localStorage.setItem('lastActiveStep',(props.currentStep).toString());
      getStatus()
      // setParamNavigasi(props.currentStep)
    }

    if(last_step != 1 && last_step > currentStep){
      getLastStep(participant_id?participant_id:participant.id)
    }
    if(nstep){
      // setTimeout(() => {
        setTimeout(() => {
          
          const pid = participant_id?participant_id:participant.id
          console.log('pid', pid)
          if(pid){
  
            if(nstep==2){
              getApplicantData(props.applicant[0].id)
              getParticipantData(participant_id?participant_id:participant.id)
            }
            if(nstep==3){
              getFatherData(participant_id?participant_id:participant.id)
            }
            if(nstep==4){
              getMotherData(participant_id?participant_id:participant.id)
            }
            if(nstep==5){
              getWaliData(pid)
            }
            if(nstep==6){
              getParticipantDocuments(participant_id?participant_id:participant.id)
            }
            if(nstep==7){
              getParticipantData(participant_id?participant_id:participant.id)
              // getParticipantDocuments(participant_id?participant_id:participant.id)
            }
            if(nstep==8){
              getParticipantData(participant_id?participant_id:participant.id)
            }
          }
        }, 500);
        // if(nstep!= steps.length-1){

        //   setCurrentStep(nstep)
        // }
        // }, 1000);
    }
    ////console.log('isPending > ',isPending)
    ////console.log('applicant >', applicant)
    // console.log('path >', PATH_URL)
    // if(complete && participant.submission_status!== 'accepted'){
    //   setCurrentStep(steps.length - 1 )
    // }
    // if(complete && participant.submission_status== 'accepted'){
    //   setCurrentStep(steps.length )
    // }
    if(complete && currentStep == steps.length -1){

    }
    
  }, [props.applicant, nstep, complete]) 
// props.applicant, participant, isPending, complete
  const setParamNavigasi  = (nstep) => {
      const params = { step: nstep};
      // console.log('params', params)
      navigate({
        // pathname: `/home`,
        // search: `?${createSearchParams(params)}`,
      });
    };
  // ////console.log('from props > ', props)
  
  const getLastStep = async (id) => {
    const { data, err} = await supabase.from('participants')
                        .select('*')
                        .eq('id', id)
                        // .single()
    if(err){
      ////console.log(err)
      return
    }

    setLastStep(data[0].last_step)
    // setCurrentStep(last_step)

  }
  
  const getSeragamData = async (id) => {

    const { data, err} = await supabase.from('participant_size_charts')
                        .select('uniform_model_id, size_chart, updated_at')
                        .eq('participant_id', id)
                        // .single()
    if(err){
      ////console.log(err)
      return
    }

    setDataSeragam(data)
    // if()
    if(data && data.length>0 && (participant?.submission_status=='accepted'|| participant?.submission_status== 'on_measurement')){
      setCurrentStep(10)
      setComplete(true)
      localStorage.setItem('lastActiveStep', (steps.length).toString());
    }
    ////console.log('dataSeragam >', dataSeragam)

  }
  const getSchoolUniformModel = async (id) => {

    const { data, err} = await supabase.from('school_uniform_models') 
                        .select('model_name, model_size_charts, model_url, model_gender, id, model_code, school_id')
                        .eq('school_id', id)
                        // .single()
    if(err){
      ////console.log(err)
      return
    }

    setSchoolUniformModel(data)
    ////console.log('schoolUniformModel >' , schoolUniformModel)

  }

  const getApplicantData = async (id) => {
    const { data, err} = await supabase.from('applicants')
                        .select('*')
                        .eq('id', id)
                        // .single()
    if(err){
      ////console.log(err)
      return
    }

    console.log('dataAppl',data)
    setApplicant(data[0])
    
  }
  const getParticipantData = async (id) => {
    const { data, err} = await supabase.from('participants')
                        .select('*')
                        .eq('id', id)
                        // .single()
    if(err){
      ////console.log(err)
      return
    }

    if(data){
      console.log('dataPart',data)
      setParticipant(data[0])

    }
  }

  const getFatherData = async (id) => {
    const { data, err} = await supabase.from('participant_father_data')
                        .select('*')
                        .eq('participant_id', id)
                        // .single()
    if(err){
      ////console.log(err)
      return
    }

    setDataAyah(data[0])
    // if(data.length>0 && participant?.submission_status!== 'accepted' && (currentStep < maxStep) ){
    //   setMaxStep(2)
    //   setCurrentStep(2)
    // }
    ////console.log(dataAyah)
  }
  const getMotherData = async (id) => {
    const { data, err} = await supabase.from('participant_mother_data')
                        .select('*')
                        .eq('participant_id', id)
                        // .single()
    if(err){
      ////console.log(err)
      return
    }

    console.log('dataibu', data, id)

    if(Array.isArray(data)){
      setDataIbu(data[0])
    }else{

      setDataIbu(data)
    }
    
    // if(data.length>0 && participant?.submission_status!== 'accepted' && currentStep > 4){
    //   setCurrentStep(5)
    // }
    ////console.log(dataIbu)
  }
  const getWaliData = async (id) => {
    const { data, err} = await supabase.from('participant_wali_data')
                        .select('*')
                        .eq('participant_id', id)
                        // .single()
    if(err){
      ////console.log(err)
      return
    }

    setDataWali(data[0])
    // if(data.length>0 && participant?.submission_status!== 'accepted' && currentStep > 5){
    //   setCurrentStep(6)
    // }
    ////console.log(dataWali)

  }

  const getParticipantDocuments = async (id) => {
    const { data, err} = await supabase.from('participant_documents')
                        .select('*')
                        .eq('participant_id', id)
                        // .single()
    if(err){
      ////console.log(err)
      return
    }
    // const tempData = [
    //   {}
    // ]

    setDataBerkas(data)
    // if(data.length>0 && participant?.submission_status!== 'accepted' && currentStep > 6){
    //   setCurrentStep(7)
    // }
    ////console.log('dataBerkas', dataBerkas)

  }
   const getVerifikasiKeluarga = () => {
    getParticipantData(participant_id?participant_id:participant.id)
      const dataVerifikasiKeluarga = {
        student_category: props.applicant[0].participants[0].student_category?? participant.student_category,
        updated_at : props.applicant[0].participants[0].updated_at,
        photo_sampul_ijazah: dataBerkas.find(e => e.file_title == 'Photo-Sampul-Ijazah')?.file_url
      }
      console.log(dataVerifikasiKeluarga, 'dataVerifikasiKeluarga')
      setDataVerifikasiKeluarga(dataVerifikasiKeluarga)
   }


  const getIdentitas = async (data) => {
    ////console.log("Data Identitas >", data)
    // setTimeout(() => {
    setLoading(true)
    startTransition(() => {
      setTimeout(() => {
        // console.log('1')
        if(data){
          setParticipant(data)
          ////console.log("Data Identitas cek >,", data)
          // setParticipant(d => ({...d, applicant_id: "04f84c3c-11e2-4154-8c88-df1e2f3a6c3a"})  )
          const newdata = (data) => ({...data, applicant_id: applicant.id}) 
          ////console.log('participant ', participant)
          ////console.log('newdata ', newdata)
          data = {...data, applicant_id: applicant.id}
          const data_applicant = {
            full_name: data.full_name, 
            gender: data.gender, 
            phone_number: data.phone_number, 
            email: data.email
          }
          const {full_name,gender,phone_number,email, ...newdatap } = data
          // ////console.log()
          // ////console.log('editc')
            if(!complete){
            ////console.log("masuk")
             if(!edit && applicant.participants.length == 0)
              {
                ////console.log("edit >, ", edit)
                ////console.log("participant >,", participant)
  
                
                saveData(newdatap, 'participants')}
             else 
              {
                updateData(newdatap, 'participants', participant.id?participant.id:participant_id, 'id')
              }
            
          // }else{
            
              updateData(data_applicant, "applicants", applicant.id, 'id')
          }
          // setApplicant(newdatap)
          setTimeout(() => {
            
            if(participant_id?participant_id:participant.id){

              getParticipantData(participant_id?participant_id:participant.id)
            }
          }, 1000);
          // if(applicant.participants.length > 0){
            // setParamNavigasi(currentStep + 1)
            // }
          }
        }, 3000);
        // console.log('2')
        setLoading(false)
        scroll('right')
        setCurrentStep(currentStep + 1)
    })
  }

  const getDataAyah =  (data) => {
    ////console.log("Data Ayah >", data)
    setLoading(true)
    startTransition(() => {

      setTimeout(() => {
      if(data){
        ////console.log('participant dataAyah >', participant)
        ////console.log('participant dataAyah >', participant)
        const pid = participant_id?participant_id:participant.id
        data = {...data, participant_id:pid}
        console.log('pid', pid)
        if(!complete){
          if(props.applicant[0].participants.length>0 || participant){
            // console.log('data ayah',props.applicant[0].participants[0])
            // console.log('data ayah',!props.applicant[0].participants[0].participant_father_data)
            // console.log('data ayah',props.applicant[0].participants[0].participant_father_data.length ===0, props.applicant[0].participants[0].participant_father_data.length)
            console.log('data ayah',!dataAyah)
            if(!edit && (!dataAyah) ){
              // console.log("Data Ayah >,", data)
              
              saveData(data, 'participant_father_data')
            }else{
              // console.log("Data Ayah U>,", data)
              updateData(data, 'participant_father_data', pid, 'participant_id')
            }
            setDataAyah(data)
          }
        }
        // setDataAyah(data)
        
        
        ////console.log('dataAyah ', dataAyah)
        // setParamNavigasi(currentStep + 1)
      }
    }, 2000);

    setLoading(false)
    if(!isPending || !loading){
      setCurrentStep(currentStep + 1)
      scroll('right')
    }
      // if(dataAyah){
      //   modal_data.title = "Data Ayah Berhasil Disimpan"
      //   // modal_data.message = "Mohon periksa link pendaftaran"
      //   // modal_data.url2 = "/home"
      //   // modal_data.text2 = "Halaman Utama"
      //   // modal_data.type = "static"
      //   setModalShow(true)
      // }
    })
  }
  const getDataIbu = (data) => {
    ////console.log("DataIbu >", data)
    setLoading(true)
    startTransition(() => {

      setTimeout(() => {
      if(data){
        ////console.log("DataIbu >,", data)
        const pid = participant_id?participant_id:participant.id
        data = {...data, participant_id:pid}
        
        if(!complete){
          if(props.applicant[0].participants.length>0 || participant){
            console.log('dataibu', data)
            console.log('data ibu',props.applicant[0].participants[0])
            console.log('data ibu',!props.applicant[0].participants[0]?.participant_mother_data)
            console.log('data ibu',props.applicant[0].participants[0].participant_mother_data.length ===0, props.applicant[0].participants[0].participant_mother_data.length)
            console.log('data ibu',!dataIbu)
            if(!edit && (!dataIbu) ){
              console.log("masuk")
              // console.log('dataibu', data)
              // console.log('dataibu', props.applicant[0].participants[0].participant_mother_data)
              saveData(data, 'participant_mother_data')
            }else{
              console.log('dataibu-', data)
              updateData(data, 'participant_mother_data', pid, 'participant_id')
            }
            setDataIbu(data)

          }
          
        }
          
          
          // getMotherData(pid)
          setCurrentStep(currentStep + 1)
        
        }
      }, 2000);
      // setCurrentStep(5)
      
      setLoading(false)
      if(!isPending || !loading){
        console.log('masuk')
        // setCurrentStep(5)
        scroll('right')
      }
      // scroll('right')
      // setParamNavigasi(currentStep + 1)
      console.log(currentStep)
      console.log(currentStep)
      ////console.log(dataIbu)
    })
  }
  const getDataWali = (data) => {
    console.log("DataWali >", data)
    setLoading(true)
    startTransition(()=>{

      setTimeout(() => {
      if(data){
        ////console.log("DataWali >,", data)
        // console.log('data wali',props.applicant[0].participants[0])
        const pid = participant_id?participant_id:participant.id
        data = {...data, participant_id:pid}
        if(!complete){
          if(props.applicant[0].participants.length>0 || participant){
            // console.log('data wali',props.applicant[0].participants[0])
            // console.log('data wali',!props.applicant[0].participants[0]?.participant_wali_data)
            // console.log('data wali',props.applicant[0].participants[0].participant_wali_data.length ===0, props.applicant[0].participants[0].participant_wali_data.length)
            // console.log('data wali',!dataWali)
            // || props.applicant[0].participants[0].participant_wali_data.length === 0 ||
            if(!edit && (!dataWali)){
              ////console.log("masuk")
              saveData(data, 'participant_wali_data')
            }else{
              updateData(data, 'participant_wali_data', pid, 'participant_id')
            }
            setDataWali(data)

          }
        }
        // getWaliData(pid)
        setCurrentStep(currentStep + 1)

        ////console.log('dataWali >', dataWali)
        
      }
    }, 2000);
    // if(success && dataWali){
      setLoading(false)
      if(!isPending || !loading){
        scroll('right')
      }

      getParticipantDocuments(participant_id?participant_id:participant.id)
      //   modal_data.title = "Data Wali Berhasil Disimpan"
      //   setModalShow(true)
      // }
    })
  }
  const getDataBerkas = (data) =>{
    ////console.log("DataBerkas >", data)
    setLoading(true)
    startTransition(() => {

      setTimeout(() => {
        if(data.length === 0 && dataBerkas.length === 0) {
          dataAlert.message = "Data berkas tidak boleh kosong"
          setDataAlertShow(true) 
        }

        // if(data.length > 0){
          ////console.log("DataBerkas >,", data)
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
          getParticipantDocuments(participant.id?participant.id:participant_id)
          setCurrentStep(currentStep + 1)
          // saveData(data, 'participant_documents', 'file')
          // }
        }, 2000);

        setLoading(false)
        if(!isPending || !loading){
          scroll('right')
          // setCurrentStep(currentStep + 1)
          console.log('masuk', currentStep)
// if(!isPending || !loading){
      
//       scroll('right')
//     }
        }
        // setParamNavigasi(currentStep + 1)
    })
  }
  const getDataVerifikasiKeluarga = (data) => {
    console.log("Data VerifikasiKeluarga >", data)
    setLoading(true)
    startTransition(()=> {
      setTimeout(() => {
        if(data){
          ////console.log("Data VerifikasiKeluarga >,", data)
          // const {photo_sampul_ijazah} = data.photo_sampul_ijazah
          const {photo_sampul_ijazah,...newdata} = data
          // setParticipant(d => ({...d, participant_id: "04f84c3c-11e2-4154-8c88-df1e2f3a6c3a"})  )
          // ////console.log(participant)
          const pid = participant.id?participant.id:participant_id
          if(!complete){
            
            updateData(newdata, 'participants', pid, 'id')

            // if(!edit && inserted && )
            
            saveData(photo_sampul_ijazah, 'participant_documents', 'file')
          }
          
        }
      }, 2000);
      
      getParticipantData(participant.id?participant.id:participant_id)
      // getParticipantDocuments(participant.id?participant.id:participant_id)
      // getVerifikasiKeluarga()
      setLoading(false)
      // const dataVerifikasiKeluarga = {
      //   student_category: data?.student_category,
      //   updated_at : props.applicant[0].participants[0].updated_at,
      //   photo_sampul_ijazah: dataBerkas.find(e => e.file_title == 'Photo-Sampul-Ijazah')?.file_url
      // }
      // console.log(dataVerifikasiKeluarga, 'dataVerifikasiKeluarga')
      // setDataVerifikasiKeluarga(dataVerifikasiKeluarga)
      setTimeout(() => {
        
        console.log("participant.student_category", participant.student_category)
        const dataStudentCategory = {
            student_category : data.student_category,
            updated_at : new Date()
          }
          setApplicantStudentCategory(dataStudentCategory)
      }, 1000);
      
      if(!isPending || !loading){
        scroll('right')
        setCurrentStep(currentStep + 1)
      }

    })
  }
  const getDataMetodeUangPangkal = (data) => {
 
    ////console.log("Data Uang Pangkal >", data)
    setLoading(true)
    startTransition(() => {
      
      setTimeout(() => {
        if(data){
          ////console.log("Data Uang Pangkal >,", data)
          data = {...data}
          const pid = participant.id?participant.id:participant_id
          ////console.log('pid > ', pid)
          updateData(data, 'participants', pid, 'id')
        }
        setCurrentStep(prev => prev + 1)
        getComplete(true)
      }, 2000);

      setLoading(false)
      scroll('right')
      // setParamNavigasi(currentStep + 1)
    })
  }

  const getPengukuranSeragam = (data) => {
 
    console.log("Data Pengukuran Seragam >", data, complete)
    setLoading(true)
    startTransition(() => {
      
      setTimeout(() => {
      if(data){
        const pid = participant.id?participant.id:participant_id
        ////console.log("Data Pengukuran Seragam >,", data)
        // data = {...data, participant_id:pid}
        // data = {participant_id:pid, uniform_model_id:data.id, size_chart:data.}
        // data.map((e) => {
        //   e.participant_id=pid
        // })
        // data.forEach(e => { e.participant_id = pid});
        
        ////console.log('data > ', data)
        if(complete){
          console.log("Data Pengukuran Seragam >>", data)
          if(dataSeragam.length == 0){
            console.log("Data Pengukuran Seragam >>", data)
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
      }, 1000);
      setComplete(true)
      setLoading(false)
      getSeragamData(participant.id?participant.id:participant_id)
    })
  }

  const getStatus = () => {
    // ////console.log("Data Uang Pangkal >", data)
    setLoading(true)
    startTransition( () => {

      setTimeout( async () => {
        const pid = participant.id?participant.id:participant_id
        if(pid){
          const { data, error } = await supabase.from('participants')
                                  .select('is_complete, submission_status')
                                  .eq('id', pid)
                                  .single()

          if(data){
            console.log("Complete >,", data)
            setComplete(data.is_complete)
            setDataStatus(data.submission_status)
            // scroll('right')
            //   setCurrentStep(currentStep + 1)
            }
        }
      }, 3000);
      setLoading(false)
    })
  }

  const upload = async (file, name ) => {

    if(file){
      const filepath = `${name}-${Date.now()}`
      const pid = participant.id?participant.id:participant_id
      const { data_, error_ } = await supabase
          .storage
          .from('participant-documents')
          .upload(pid + "/" + filepath, file,
            {cacheControl: '3600', upsert: true}
          )
      if (error_) {
        ////console.error("Gagal Upload Berkas", error_.message)
        return null
      }
      const { data } = await supabase.storage.from("participant-documents").getPublicUrl(pid+ "/" +filepath)
      const data_url = {
        path: data.publicUrl
      }
      ////console.log(data.publicUrl)
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
      // ////console.log(berkasUrl)
      return data.publicUrl??null

    }
    
    // const { data, error } = await supabase.storage.from('participant-documents').createSignedUrl(participant_id+ "/" +filepath, 3600)

    // const path = {
    //   signedUrl: data.signedUrl.toString()?? ""
    // } 

    // if (data) {
    //   ////console.log('signedUrl > ', data.signedUrl)
    //   ////console.log('data_ > ', data_)
    //   return path
    // }
  }
  const saveData = async (dataInput, to, type=null) => {

    
    
    if (type=='file'){
      // const avatarFile = event.target.files[0]

      ////console.log('dataInput', dataInput)
      ////console.log(typeof dataInput)
      
      let path
      if(Array.isArray(dataInput)){
        
        // let error = 0;
        let countError = 0
          for (let i = 0; i < dataInput.length; i++) {
            const d = dataInput[i];
            ////console.log(d)
            const file_url = await upload(d.file, d.name)
            
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
            
            ////console.log('url >', path)
            // berkasUrl.a?(berkasUrl.b?(berkasUrl.c?berkasUrl.d:""):berkasUrl.e):berkasUrl.f
            ////console.log('url >', berkasUrl)
            ////console.log(participant.id)

            const pid = participant.id?participant.id:participant_id

            const dataItem = {
              participant_id: pid,
              file_url: file_url? file_url : berkasUrl,
              file_name: participant_id+'/'+`${d.name}-${Date.now()}`,
              file_size: d.size?.toString(),
              file_type: d.type?.slice(d.type.indexOf("/")+1).toUpperCase(),
              file_title: d.name
            }
            ////console.log(dataItem)
            if(!edit && dataBerkas.length == 0){
              console.log('in insert', dataItem)
              const { data, err} = await supabase.from(to)
                                .insert([dataItem])
                                .select()
              ////console.log('data>', data)
              ////console.log('err >', err)
              if(!data){
                countError++
              }

            }else{
              console.log('in update', dataItem)
              dataItem.participant_id = participant.id?participant.id:participant_id
              dataItem.updated_at = new Date().toISOString()
              const { data, err} = await supabase.from(to)
              .update([dataItem])
              .eq('participant_id', dataItem.participant_id)
              .eq('file_title', dataItem.file_title)
              .select()
              ////console.log('data>', data)
              ////console.log('err >', err)
              if(!data){
                countError++
              }
              
            }

            if(countError>0){
              modal_data.title = "Data Gagal Disimpan"
              setModalShow(true)
            }else{
              modal_data.title = "Data Berhasil Disimpan"
              setModalShow(true)
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
        // ////console.logO
        if(d.file){
          const file_url = await upload(d.file, d.name)
        console.log('file', file_url)

          const pid = participant.id?participant.id:participant_id
          // ////console.log(('url >', url.value('path')));
          const dataItem = {
            participant_id: pid,
            file_url: file_url? file_url : berkasUrl,
            file_name: participant_id+'/'+`${d.name}-${Date.now()}`,
            file_size: d.size?.toString(),
            file_type: d.type?.slice(d.type.indexOf("/")).toUpperCase(),
            file_title: d.name
          }
          ////console.log(dataItem)
          const currentFile = dataBerkas.find(e => e.file_title == d.name)
          console.log('currentFile', currentFile)
          if(!edit && !currentFile){
            console.log('dataItem',dataItem, !dataBerkas.find(e => e.file_title == d.name))
            console.log('in insert single', dataItem)
              const { data, err} = await supabase.from(to)
                                .insert([dataItem])
                                .select()
              console.log('data>', data)
              ////console.log('err >', err)

              if(data){
                modal_data.title = "Data Berhasil Disimpan"
                setModalShow(true)
              }else{
                modal_data.title = "Data Gagal Disimpan"
                setModalShow(true)
              }
            }else{
              console.log('dataItem>',dataItem)
              console.log('in update single', dataItem)
              // console.log(da)
              // dataItem.participant_id = participant.id?participant.id:participant_id
              const { data, err} = await supabase.from(to)
              .update([dataItem])
              .eq('participant_id', pid)
              .eq('file_title', d.name)
              .select()
              console.log('data>>', data)

              if(data){
                modal_data.title = "Data Berhasil Diedit"
                setModalShow(true)
              }else{
                modal_data.title = "Data Gagal Diedit"
                setModalShow(true)
              }
              ////console.log('err >', err)
            }
        }
        

            // berkasUrl.g = ""
            
          // const { data, err} = await supabase.from(to)
          //                   .insert([dataItem])
          //                   .select()
          // ////console.log('data upladed>', data)
          // ////console.log('err >', err)
        
      }

    }else{
      
        let input = []
        Array.isArray(dataInput) ? input = dataInput : input.push(dataInput) 
        console.log('input data ibu', input)
        const { data, err} = await supabase.from(to)
                          .insert(input)
                          .select()
        if(data){
          if(dataInput.pob){
            setInserted(true)
            setParticipantId(data[0].id)
            getParticipantData(data[0].id)
          }  
          if(to == 'participant_size_charts'){
            modal_data.url = '/home#pengukuran_seragam'
            modal_data.text = 'OK'
          }
          modal_data.title = "Data Berhasil Disimpan"
          setModalShow(true)
        }else{
          modal_data.title = "Data Gagal Disimpan"
          setModalShow(true)
        }

        if(to == 'participant_mother_data' && !err){
            //   modal_data.url = '/home'
            // modal_data.text = 'OK'
            setModalShow(true)
        }else{
          setModalShow(true)
        }
        ////console.log('data>', data)
        ////console.log('err >', err)
         
      
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

      ////console.log('dataInput> ' ,dataInput)

      if(!Array.isArray(dataInput)){
        const { data, err} = await supabase.from(to)
                            .update({...dataInput, updated_at : new Date().toISOString()})
                            .eq(pk, bo)
                            .select()
        ////console.log('data>', data[0])
        ////console.log('err >', err)
        if(data){
          if(to == 'participant_size_charts'){
            modal_data.url = '/home#pengukuran_seragam'
            modal_data.text = 'OK'
          }
          modal_data.title = "Data Berhasil Disimpan"
          modal_data.title = "Data Berhasil Disimpan"
          setModalShow(true)
        }else{
          modal_data.title = "Data Gagal Disimpan"
          setModalShow(true)
        }
      }else{
        ////console.log('from input array')
        let error = false
        let dataError = ""
        dataInput.forEach( async (e, key) => {
          // const pk1 = pk
          // const pk2 = e.uniform_model_id
          ////console.log('element', e)
          const pk1 = Object.keys(e)[0]
          const pk2 = Object.keys(e)[1]
          const { data, err} = await supabase.from(to)
                              .update({...e, updated_at : new Date().toISOString()})
                              .eq(pk1, e[pk1])
                              .eq(pk2, e[pk2])
                              .select()
          if(err){
            error = true
            dataError = key
          }
        
          // if(data)
          //   error = false
        });

        if(!error){
          if(to == 'participant_size_charts'){
            modal_data.url = '/home#pengukuran_seragam'
            modal_data.text = 'OK'
          }
          modal_data.title = "Data Berhasil Disimpan"
          dataAlert.title = "Data Berhasil Diedit"
          setDataAlertShow(true)
        }else{
          dataAlert.title = `Data ke ${dataError} Gagal Diedit`
          setDataAlertShow(true)
        }
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
                            ////console.log('data participant after klik edit >', data)
                            ////console.log(error)
                            if(data){

                              getParticipantDocuments(participant.id?participant.id:participant_id)
                              localStorage.setItem('lastActiveStep', (2).toString());
                            }
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
    ////console.log('data participant after klik complete >', data)
    ////console.log(error)
    if(data){
      setComplete(value)
      props.getComplete(value)
    }

  }

  const setDataAlertShow_ = (value) => {
    setDataAlertShow(value)
  }

  // const pengSeragamRef = (data) => {
  //   setPengSeragam(data)
  // }

  const scrollToStep = () => {
    console.log('el')
    window.scrollTo({
      top: pengSeragam.current.offsetTop,
      behavior: "smooth"
    })
  }

  const handleCloseModal = (value) => {
    if(value){
      setModalShow(!value)
    }
  }

  // const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6'];
    const steps = ["Pembayaran", "Identitas Calon Santri", "Data Ayah", "Data Ibu", "Data Wali", "Upload Berkas", "Verifikasi Keluarga", "Konfirmasi Uang Pangkal", "Status", "Pengukuran Seragam"];
    const form = [<Pembayaran scroll={scroll} applicantOrder={applicantOrder} /> , <IdentitasForm onSubmit={getIdentitas} dataApplicant={applicant} dataParticipant={participant} isPending={isPending} loading={loading} setParamNavigasi={setParamNavigasi} edit={edit} complete={complete} currentStep={currentStep} />, <DataAyahForm onSubmit={getDataAyah} dataAyah={dataAyah} isPending={isPending} loading={loading} setParamNavigasi={setParamNavigasi} edit={edit} complete={complete} currentStep={currentStep} setComplete={setComplete} />, <DataIbuForm onSubmit={getDataIbu} isPending={isPending} loading={loading} complete={complete} setParamNavigasi={setParamNavigasi} edit={edit} currentStep={currentStep} setCurrentStep={setCurrentStep} setComplete={setComplete} dataIbu={dataIbu} />, <DataWaliForm onSubmit={getDataWali} isPending={isPending} loading={loading} complete={complete} setParamNavigasi={setParamNavigasi} edit={edit} currentStep={currentStep} setCurrentStep={setCurrentStep} setComplete={setComplete} dataWali={dataWali} />,  <BerkasForm  onSubmit={getDataBerkas} retrieveData={getParticipantDocuments} dataBerkas={dataBerkas} participant={participant.id?participant.id:participant_id} school={applicantSchool.id} isPending={isPending} loading={loading} setParamNavigasi={setParamNavigasi} edit={edit} complete={complete} currentStep={currentStep} setComplete={setComplete} />, <VerifikasiKeluargaForm onSubmit={getDataVerifikasiKeluarga} dataVerifikasiKeluarga={dataVerifikasiKeluarga} dataBerkas={dataBerkas} student_category={participant.student_category} retrieveData={getDataVerifikasiKeluarga} isPending={isPending} loading={loading} complete={complete} setParamNavigasi={setParamNavigasi} edit={edit} currentStep={currentStep} setComplete={setComplete}/>, <MetodeUangPangkal onSubmit={getDataMetodeUangPangkal} dataApplicant={applicantSchool} dataMetodeUangPangkal={dataMetodeUangPangkal} dataApplicantCategory={applicantStudentCategory} isPending={isPending} loading={loading} complete={complete} setParamNavigasi={setParamNavigasi} edit={edit} currentStep={currentStep} setComplete={setComplete}/>,<Status onSubmit={getStatus} participant={participant} applicant={applicant} school="" dataStatus={dataStatus} complete={complete} setParamNavigasi={setParamNavigasi} currentStep={currentStep} getCurrentStep={getCurrentStep} scrollToStep={scrollToStep} getEdit={getEdit} getComplete={getComplete}/>, <PengukuranSeragam onSubmit={getPengukuranSeragam} participant={participant_id?participant_id:participant.id} school={applicantSchool.id} gender={applicant.gender} ref={ref} dataSeragam={dataSeragam} schoolUniformModel={schoolUniformModel} isPending={isPending} loading={loading} complete={complete} setParamNavigasi={setParamNavigasi} currentStep={currentStep} getCurrentStep={getCurrentStep} getEdit={getEdit} getComplete={getComplete}/>];

  return (
    <>
    <div className="flex items-center justify-center shadow-md p-4">
      {/* {dataAlertShow && (
        <SmallAlert dataAlert={dataAlert} setDataAlertShow={setDataAlertShow_} />
      )} */}
      {modal_show && (
        <Swal dataModal={modal_data} setClose={handleCloseModal} />
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
      <div
  ref={stepperRef}
  className="flex overflow-x-auto space-x-4 scrollbar-hide"
>
  {steps.map((step, index) => (
    <div 
      key={index}
      className={`flex-shrink-0 w-64 p-6 bg-white rounded-lg shadow-md flex items-center justify-center ${
        currentStep === index + 1 ? "border-2 border-blue-500" : "border border-gray-200"
      } ${
          ( index + 1 <= steps.length-1 && index === 0 || index + 1 < currentStep && complete)? "complete" : index+1 == steps.length && (dataSeragam && dataSeragam.length >0) ? "complete" : ""
      }`}
    >
      <div className="step">
        {  ( index + 1 <= steps.length-1 && index === 0 || index + 1 < currentStep && complete)? <TiTick size={24} /> : index+1 == steps.length && (dataSeragam && dataSeragam.length >0) ? <TiTick size={24} /> : index + 1} 
        {/* {index === 0 || index + 1 < currentStep || complete ? <TiTick size={24} /> : index + 1} */}
      </div>
      <span className="text-sm/6 font-medium ml-2">{step}</span>
    </div>
  ))}
</div>
      {/* <div
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
            <div className="step">
              {index == 0 || index + 1 < currentStep || complete ? <TiTick size={24} /> : index + 1}
            </div>
            <span className="text-sm/6 font-medium ml-2">{step}</span>
          </div>
          
        ))}
        
      </div> */}
      
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

    <div className="flex justify-center">
      {form[currentStep - 1]}
    </div>

    {/* {steps.map((step, index) => (

      <div key={index} className={`flex justify-center ${currentStep !== index  + 1 && "hide"}`}>
          {form[currentStep-1]}
      </div>
    ))} */}
    

    <div className='flex-wrap justify-center px-5'>
      {/* {isPending} */}
        { (
          
          <div className=''>
            {/* <div className="flex-wrap">
              
            </div> */}
            <div className=" w-full">
              <button
            className={`btn w-full block btn-sm text-gray-200 bg-green-900 hover:bg-gray-800 ml-3 ${currentStep!=1?"invisible":''}`}
            onClick={() => {
              // currentStep === steps.length
              //   ? setComplete(true)
              //   : setCurrentStep((prev) => prev + 1); 
              setLoading(true)
              setParamNavigasi(2)
              if(currentStep === steps.length){
                setComplete(true)
                props.setIsRefresh(true)
                
              }else if (currentStep == steps.length -1){
                getComplete(true)
                props.setIsRefresh(true)
                setCurrentStep((prev) => prev + parseInt(1));
                
                setParamNavigasi(currentStep)
              }
              else{
                // setCurrentStep((prev) => prev + parseInt(1));  
                setCurrentStep(currentStep +1)
                localStorage.setItem('lastActiveStep', currentStep.toString());
                // setCurrentStep(2)              
                // callback(data)
              }
              // handleSubmit
              // setTimeout(() => {
                
                // setParamNavigasi(currentStep)
                // }, 1000);
                setLoading(false)
              scroll('right')
            }}
            type='submit'
            
          >
            {isPending || loading? (
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
                    setLoading(true)
                    setCurrentStep((prev) => prev - 1);
                    localStorage.setItem('lastActiveStep', currentStep.toString());
                    // callback(data)
                    
                    // handleSubmit
                    console.log(currentStep, 'current') 
                    // startTransition(()=>{
                      
                      // if(currentStep===2){
                      //   getParticipantData(participant_id?participant_id:participant.id)
                      //   // getFatherData(participant_id?participant_id:participant.id)
                      //   setCurrentStep(2)
                      // }
                      // if(currentStep===3){
                      //   getFatherData(participant_id?participant_id:participant.id)
                      //   // getMotherData(participant_id?participant_id:participant.id)
                      //   setCurrentStep(3)
                      // }
                      // if(currentStep===4){
                      //   getMotherData(participant_id?participant_id:participant.id)
                      //   // getWaliData(participant_id?participant_id:participant.id)
                      //   setCurrentStep(4)
                      // }
                      // if(currentStep===5){
                      //   getWaliData(participant_id?participant_id:participant.id)
                      //   // getParticipantDocuments(participant_id?participant_id:participant.id)
                      //   setCurrentStep(5)
                      // }
                      if(currentStep===6 ){
                        getParticipantDocuments(participant_id?participant_id:participant.id)
                        // getParticipantData(participant_id?participant_id: participant.id)
                        // setCurrentStep(6)
                      }                                
                      if(currentStep===7){
                        getParticipantData(participant_id?participant_id: participant.id)
                        getParticipantDocuments(participant_id?participant_id:participant.id)
                        const dataVerifikasiKeluarga = {
                          student_category: participant.student_category,
                          updated_at : participant.updated_at,
                          photo_sampul_ijazah: dataBerkas.find(e => e.file_title == 'Photo-Sampul-Ijazah')?.file_url
                        }
                        setDataVerifikasiKeluarga(dataVerifikasiKeluarga)
                        // setCurrentStep(7)
                      }                                
                      if(currentStep===8){
                      //   getParticipantDocuments(participant_id?participant_id:participant.id)
                        getParticipantData(participant_id?participant_id: participant.id)
                      //   setCurrentStep(8)
                      // }                                
                      }

                      setParamNavigasi(currentStep)
                      setLoading(false)
                      scroll('left')
                      // setTimeout(() => {
                      
                      // }, 500);
                      // setTimeout(() => {
                        
                      //   
                      // }, 3000);
                    
                  }}
                  
                  
                >
                  {loading ? 
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                        {/* SVG path for your spinner */}
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                        {/* <Spinner aria-label="Spinner button example" size="sm" light /> */}
                      <span className='pl-3'>Loading...</span>
                    </>
                    : 
                      "Kembali"
                  }
                  {/* Kembali */}
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
                  setLoading(true)
                    setCurrentStep((prev) => prev - 1);
                    localStorage.setItem('lastActiveStep', currentStep.toString());
                    // callback(data)
                    
                    // handleSubmit
                    // setTimeout(() => {
                      
                      // setParamNavigasi(currentStep)
                      
                      console.log(currentStep, 'current')
                      // if(currentStep===2){
                        //   getParticipantData(participant_id?participant_id:participant.id)
                        //   // getFatherData(participant_id?participant_id:participant.id)
                        //   setCurrentStep(2)
                        // }
                        // if(currentStep===3){
                    //   ge``tFatherData(participant_id?participant_id:participant.id)
                    //   // getMotherData(participant_id?participant_id:participant.id)
                    //   setCurrentStep(2)
                    // }
                    // if(currentStep===4){
                      //   getMotherData(participant_id?participant_id:participant.id)
                      //   // getWaliData(participant_id?participant_id:participant.id)
                      //   setCurrentStep(4)
                      // }
                      // if(currentStep===5){
                        //   getWaliData(participant_id?participant_id:participant.id)
                        //   // getParticipantDocuments(participant_id?participant_id:participant.id)
                        //   setCurrentStep(5)
                        // }
                        if(currentStep===6){
                          getParticipantDocuments(participant_id?participant_id:participant.id)
                          getParticipantData(participant_id?participant_id: participant.id)
                          // setCurrentStep(6)
                        }
                        if(currentStep===7){
                          getParticipantDocuments(participant_id?participant_id:participant.id)
                          getParticipantData(participant_id?participant_id: participant.id)
                          // setCurrentStep(7)
                        }                                
                        if(currentStep===8){
                          // getParticipantDocuments(participant_id?participant_id:participant.id)
                          getParticipantData(participant_id?participant_id: participant.id)
                          // setCurrentStep(8)
                        } 
                      // }, 1000);
                      setParamNavigasi(currentStep)
                      setLoading(false)
                      scroll('left')
                      // setTimeout(() => {
                      
                      // }, 1000);
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
                    setLoading(true)
                    setParamNavigasi(currentStep+1)
                    setCurrentStep((prev) => prev + 1);
                    localStorage.setItem('lastActiveStep', currentStep.toString());
                    // callback(data)
                  // handleSubmit
                  // setTimeout(() => {
                    
                    if(currentStep===6){
                          getParticipantDocuments(participant_id?participant_id:participant.id)
                          getParticipantData(participant_id?participant_id: participant.id)
                          // setCurrentStep(6)
                        }
                        if(currentStep===7){
                          getParticipantDocuments(participant_id?participant_id:participant.id)
                          getParticipantData(participant_id?participant_id: participant.id)
                          // setCurrentStep(7)
                        }                                
                        if(currentStep===8){
                          // getParticipantDocuments(participant_id?participant_id:participant.id)
                          getParticipantData(participant_id?participant_id: participant.id)
                          // setCurrentStep(8)
                        } 
                  // }, 500);
                  // setTimeout(() => {
                      
                    
                  // }, 500);
                  setLoading(false)
                  scroll('right')
                  // setParamNavigasi(currentStep)
                }}
                type='submit'
                
              >
                {loading ? 
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      {/* SVG path for your spinner */}
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                      {/* <Spinner aria-label="Spinner button example" size="sm" light /> */}
                    <span className='pl-3'>Loading...</span>
                  </>
                  : "Lanjut"
                  }
                {/* Lanjut */}
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
});

export default HorizontalStepper;