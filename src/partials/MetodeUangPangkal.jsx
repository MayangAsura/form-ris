import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useEffect, useState } from 'react';

import PaymentUangPangkalNonRabTKIT from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalNonRabTKIT';
import PaymentUangPangkalNonRabSDIT from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalNonRabSDIT';
import PaymentUangPangkalNonRabSMPI from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalNonRabSMPI';
import PaymentUangPangkalNonRabSMAI from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalNonRabSMAI';
import PaymentUangPangkalNonRabSMPPesantren from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalNonRabSMPPesantren';
import PaymentUangPangkalNonRabSMAPesantren from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalNonRabSMAPesantren';
import PaymentUangPangkalPondokCiwidey from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalPondokCiwidey';
import PaymentUangPangkalRabTKIT from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalRabTKIT';
import PaymentUangPangkalRabSDIT from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalRabSDIT';
import PaymentUangPangkalRabSMPI from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalRabSMPI';
import PaymentUangPangkalRabSMAI from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalRabSMAI';
import PaymentUangPangkalRabSMPPesantren from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalRabSMPPesantren';
import PaymentUangPangkalRabSMAPesantren from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalRabSMAPesantren';

import PaymentUangPangkalNonRabSDIT2 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalNonRabSDIT2Trans';
import PaymentUangPangkalNonRabSDIT3 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalNonRabSDIT3Trans';
import PaymentUangPangkalNonRabSDIT4 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalNonRabSDIT4Trans';
import PaymentUangPangkalNonRabSDIT5 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalNonRabSDIT5Trans';
import PaymentUangPangkalNonRabSDIT6 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalNonRabSDIT6Trans';
import PaymentUangPangkalNonRabSMPI8 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalNonRabSMPI8Trans';
import PaymentUangPangkalNonRabSMPI9 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalNonRabSMPI9Trans';
import PaymentUangPangkalNonRabSMAI11 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalNonRabSMAI11Trans';
import PaymentUangPangkalNonRabSMAI12 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalNonRabSMAI12Trans';
import PaymentUangPangkalNonRabSMPPesantren8 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalNonRabSMPPesantren8Trans';
import PaymentUangPangkalNonRabSMPPesantren9 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalNonRabSMPPesantren9Trans';
import PaymentUangPangkalNonRabSMAPesantren11 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalNonRabSMAPesantren11Trans';
import PaymentUangPangkalNonRabSMAPesantren12 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalNonRabSMAPesantren12Trans';
import PaymentUangPangkalRabSDIT2 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalRabSDIT2Trans';
import PaymentUangPangkalRabSDIT3 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalRabSDIT3Trans';
import PaymentUangPangkalRabSDIT4 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalRabSDIT4Trans';
import PaymentUangPangkalRabSDIT5 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalRabSDIT5Trans';
import PaymentUangPangkalRabSDIT6 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalRabSDIT6Trans';
import PaymentUangPangkalRabSMPI8 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalRabSMPI8Trans';
import PaymentUangPangkalRabSMPI9 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalRabSMPI9Trans';
import PaymentUangPangkalRabSMAI11 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalRabSMAI11Trans';
import PaymentUangPangkalRabSMAI12 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalRabSMAI12Trans';
import PaymentUangPangkalRabSMPPesantren8 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalRabSMPPesantren8Trans';
import PaymentUangPangkalRabSMPPesantren9 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalRabSMPPesantren9Trans';
import PaymentUangPangkalRabSMAPesantren11 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalRabSMAPesantren11Trans';
import PaymentUangPangkalRabSMAPesantren12 from './metode_uang_pangkal/jalur_khusus/PaymentUangPangkalRabSMAPesantren12Trans';


function MetodeUangPangkal(props) {
    const [ metode_uang_pangkal, setMetodeUangPangkal] = useState("")
    const [ dataSchool, setDataSchool ] = useState({id: "", name: "" })
    const [ applicantSchoolCode, setApplicantSchoolCode ] = useState("")    
    const [ applicantStudentCategory, setApplicantStudentCategory ] = useState("")    
    const [ dataMetodeUangPangkal, setDataMetodeUangPangkal ] = useState({})    
    const [ last_update, setLastUpdate ] = useState({})    
    
    useEffect(() =>{
        // setApplicantSchool()
        
        //console.log('applicantSchool . MetodeUangPangkal >', props.dataApplicant)
        //console.log('props.dataMetodeUangPangkal>', props.dataMetodeUangPangkal)
        
        //console.log('props.dataApplicant.id > ', props.dataApplicant.id)
        //console.log('props.dataApplicantCategory > ', props.dataApplicantCategory)
        
        setMetodeUangPangkal(props.dataMetodeUangPangkal?.metode_uang_pangkal)
        setLastUpdate(props.dataMetodeUangPangkal?.updated_at)

        if(props.dataApplicantCategory){

            setApplicantStudentCategory(props.dataApplicantCategory?.student_category)

            console.log('propsp.dataApplicantCategory', data.dataApplicantCategory)
        }

        getSchoolCode(props.dataApplicant?.id)
        if(props.dataApplicant){

            console.log('schoolCode > ', props.dataApplicant)
        }

        setDataMetodeUangPangkal(props.dataMetodeUangPangkal?props.dataMetodeUangPangkal:{})
        
        
    },[props.dataApplicant, props.dataApplicantCategory])

    const getSchoolCode = (code) => {
        // if(!allowed_codes.includes(code)){
          
        // }
        switch (code) {
            case 1 : return setApplicantSchoolCode('sdit')  
            case 2 : return setApplicantSchoolCode('tkit')  
            //   case 1 : return 'tkit-b'  
            case 3 : return setApplicantSchoolCode('smpi')  
            case 4 : return setApplicantSchoolCode('smp-pesantren')  
            case 5 : return setApplicantSchoolCode('sma-pesantren')  
            case 6 : return setApplicantSchoolCode('smai')  
            case 7 : return setApplicantSchoolCode('rabbaanii-ciwidey')
            default : return ''  
          
        //   break;
        //   case 'tkit-b': return `1TKIT B Rabbaanii Islamic School`;  
        //   break;
        //   case 'sdit': return `2SDIT Rabbaanii Islamic School`;
        //   break;
        //   case 'smpi': return `3SMPI Rabbaanii Islamic School`;
        //   break;
        //   case 'smai': return `4SMAI Rabbaanii Islamic School`; 
        //   break;
        //   case 'smp-pesantren': return `5SMP Pesantren Rabbaanii Islamic School`; 
        //   break;
        //   case 'sma-pesantren': return `6SMA Pesantren  Rabbaanii Islamic School`; 
        //   break;
        //   case 'rabbaanii-ciwidey': return `7Rabbaanii Ciwidey`; 
        //   break;
        //   default: return `10Not Found`; 
            // break;
        }
      }
    // const 
    const data = { metode_uang_pangkal:metode_uang_pangkal}   

    const saveData = (e) => {
        e.preventDefault()
        //console.log(data)
        props.onSubmit(data)
        
    }

    const formatDate = (date) => {
        const dayNames = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

        date = new Date(date);
        const dayName = dayNames[date.getDay()];
        const day = date.getDate();
        const monthName = monthNames[date.getMonth()];
        const year = date.getFullYear();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();

        const indonesianFormat = `${dayName}, ${day} ${monthName} ${year} ${hour}:${minute} WIB`;
        return indonesianFormat
    }


    return (
        <section className="relative">
            <div className='max-w-6xl mx-auto px-4 sm:px-6'>
                <div className='py-12 md:py-12'>
                    <div className='max-w-sm md:max-w-4xl mx-auto'>
                        <form action="" onSubmit={saveData}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-3xl font-semibold text-gray-900">Konfirmasi Metode Uang Pangkal</h2>
                                <p className="mt-1 text-sm/6 text-gray-600">
                                <p className="mt-1 text-sm/12 text-gray-600">
                                    Update terakhir: {last_update?formatDate(last_update):'-'}.
                                </p>
                                {/* Keluarga Rabbaanii : calon peserta didik adalah alumni RIS atau mempunyai kakak/adik yang bersekolah di RIS.
                                Non Keluarga Rabbaanii : calon peserta didik belum menjadi  alumni RIS atau belum memiliki kakak/adik yang bersekolah di RIS. */}
                                    {/* Silakan upload dokumen berikut, mohon Scan/Foto setiap dokumen dengan jelas. */}
                                    {/* This information will be displayed publicly so be careful what you share. */}
                                </p>
                                <div className="border-b border-gray-900/10 py-3"></div>

                                <h2 className="text-3xl font-semibold text-gray-900"></h2>

                                <div className="mt-10 grid grid-cols- gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-5">
                                    
                                        {   applicantSchoolCode === 'tkit' && (props.dataApplicant.class_id == 0 || !props.dataApplicant.class_id ) && (applicantStudentCategory ==='alumni' || applicantStudentCategory==='hasfamily' ) && (
                                                <PaymentUangPangkalRabTKIT/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode === 'tkit' && (props.dataApplicant.class_id == 0 || !props.dataApplicant.class_id ) && (applicantStudentCategory !=='alumni' && applicantStudentCategory!=='hasfamily' ) &&
                                            (
                                                <PaymentUangPangkalNonRabTKIT/>
                                            )
                                        }
                                        {   applicantSchoolCode == 'sdit' && (props.dataApplicant.class_id == 0 || !props.dataApplicant.class_id ) && (applicantStudentCategory=='alumni' || applicantStudentCategory=='hasfamily' ) && (
                                                <PaymentUangPangkalRabSDIT/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'sdit' && (props.dataApplicant.class_id == 0 || !props.dataApplicant.class_id ) && (applicantStudentCategory!=='alumni' && applicantStudentCategory!=='hasfamily' )&& (
                                                <PaymentUangPangkalNonRabSDIT/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'smpi' && (props.dataApplicant.class_id == 0 || !props.dataApplicant.class_id ) && (applicantStudentCategory=='alumni' || applicantStudentCategory=='hasfamily' ) && (
                                                <PaymentUangPangkalRabSMPI/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'smpi' && (props.dataApplicant.class_id == 0 || !props.dataApplicant.class_id ) && (applicantStudentCategory!=='alumni' && applicantStudentCategory!=='hasfamily' ) && (
                                                <PaymentUangPangkalNonRabSMPI/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'smai' && (props.dataApplicant.class_id == 0 || !props.dataApplicant.class_id ) && (applicantStudentCategory=='alumni' || applicantStudentCategory=='hasfamily' ) && (
                                                <PaymentUangPangkalRabSMAI/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'smai' && (props.dataApplicant.class_id == 0 || !props.dataApplicant.class_id ) && (applicantStudentCategory!=='alumni' && applicantStudentCategory!=='hasfamily' ) && (
                                                <PaymentUangPangkalNonRabSMAI/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'smp-pesantren'&& (props.dataApplicant.class_id == 0 || !props.dataApplicant.class_id ) && (applicantStudentCategory=='alumni' || applicantStudentCategory=='hasfamily' ) && (
                                                <PaymentUangPangkalRabSMPPesantren/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'smp-pesantren' && (props.dataApplicant.class_id == 0 || !props.dataApplicant.class_id ) && (applicantStudentCategory!=='alumni' && applicantStudentCategory!=='hasfamily' ) && (
                                                <PaymentUangPangkalNonRabSMPPesantren/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'sma-pesantren' && (props.dataApplicant.class_id == 0 || !props.dataApplicant.class_id ) && (applicantStudentCategory=='alumni' || applicantStudentCategory=='hasfamily' ) && (
                                                <PaymentUangPangkalRabSMAPesantren/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'sma-pesantren' && (props.dataApplicant.class_id == 0 || !props.dataApplicant.class_id ) && (applicantStudentCategory!=='alumni' && applicantStudentCategory!=='hasfamily' ) && (
                                                <PaymentUangPangkalNonRabSMAPesantren/>
                                            )
                                        }
                                        {   applicantSchoolCode == 'sdit' && props.dataApplicant.class_id == 2 && (applicantStudentCategory=='alumni' || applicantStudentCategory=='hasfamily' ) && (
                                                <PaymentUangPangkalRabSDIT2/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'sdit' && props.dataApplicant.class_id == 2 && (applicantStudentCategory!=='alumni' && applicantStudentCategory!=='hasfamily' )&& (
                                                <PaymentUangPangkalNonRabSDIT2/>
                                            )
                                        }
                                        {   applicantSchoolCode == 'sdit' && props.dataApplicant.class_id == 3 && (applicantStudentCategory=='alumni' || applicantStudentCategory=='hasfamily' ) && (
                                                <PaymentUangPangkalRabSDIT3/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'sdit' && props.dataApplicant.class_id == 3 && (applicantStudentCategory!=='alumni' && applicantStudentCategory!=='hasfamily' )&& (
                                                <PaymentUangPangkalNonRabSDIT3/>
                                            )
                                        }
                                        {   applicantSchoolCode == 'sdit' && props.dataApplicant.class_id == 4 && (applicantStudentCategory=='alumni' || applicantStudentCategory=='hasfamily' ) && (
                                                <PaymentUangPangkalRabSDIT4/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'sdit' && props.dataApplicant.class_id == 4 && (applicantStudentCategory!=='alumni' && applicantStudentCategory!=='hasfamily' )&& (
                                                <PaymentUangPangkalNonRabSDIT4/>
                                            )
                                        }
                                        {   applicantSchoolCode == 'sdit' && props.dataApplicant.class_id == 5 && (applicantStudentCategory=='alumni' || applicantStudentCategory=='hasfamily' ) && (
                                                <PaymentUangPangkalRabSDIT5/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'sdit' && props.dataApplicant.class_id == 5 && (applicantStudentCategory!=='alumni' && applicantStudentCategory!=='hasfamily' )&& (
                                                <PaymentUangPangkalNonRabSDIT5/>
                                            )
                                        }
                                        {   applicantSchoolCode == 'sdit' && props.dataApplicant.class_id == 6 && (applicantStudentCategory=='alumni' || applicantStudentCategory=='hasfamily' ) && (
                                                <PaymentUangPangkalRabSDIT6/>
                                            )
                                        }
                                        {   applicantSchoolCode == 'sdit' && props.dataApplicant.class_id == 6 && (applicantStudentCategory=='alumni' || applicantStudentCategory=='hasfamily' ) && (
                                                <PaymentUangPangkalNonRabSDIT6/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'smpi' && props.dataApplicant.class_id == 8 && (applicantStudentCategory=='alumni' || applicantStudentCategory=='hasfamily' ) && (
                                                <PaymentUangPangkalRabSMPI8/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'smpi' && props.dataApplicant.class_id == 8 && (applicantStudentCategory!=='alumni' && applicantStudentCategory!=='hasfamily' ) && (
                                                <PaymentUangPangkalNonRabSMPI8/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'smpi' && props.dataApplicant.class_id == 9 && (applicantStudentCategory=='alumni' || applicantStudentCategory=='hasfamily' ) && (
                                                <PaymentUangPangkalRabSMPI9/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'smpi' && props.dataApplicant.class_id == 9 && (applicantStudentCategory!=='alumni' && applicantStudentCategory!=='hasfamily' ) && (
                                                <PaymentUangPangkalNonRabSMPI9/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'smai' && props.dataApplicant.class_id == 11 && (applicantStudentCategory=='alumni' || applicantStudentCategory=='hasfamily' ) && (
                                                <PaymentUangPangkalRabSMAI11/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'smai' && props.dataApplicant.class_id == 11 && (applicantStudentCategory!=='alumni' && applicantStudentCategory!=='hasfamily' ) && (
                                                <PaymentUangPangkalNonRabSMAI11/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'smai' && props.dataApplicant.class_id == 12 && (applicantStudentCategory=='alumni' || applicantStudentCategory=='hasfamily' ) && (
                                                <PaymentUangPangkalRabSMAI12/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'smai' && props.dataApplicant.class_id == 12 && (applicantStudentCategory!=='alumni' && applicantStudentCategory!=='hasfamily' ) && (
                                                <PaymentUangPangkalNonRabSMAI12/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'smp-pesantren' && props.dataApplicant.class_id == 8 && (applicantStudentCategory=='alumni' || applicantStudentCategory=='hasfamily' ) && (
                                                <PaymentUangPangkalRabSMPPesantren8/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'smp-pesantren' && props.dataApplicant.class_id == 8 && (applicantStudentCategory!=='alumni' && applicantStudentCategory!=='hasfamily' ) && (
                                                <PaymentUangPangkalNonRabSMPPesantren8/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'smp-pesantren' && props.dataApplicant.class_id == 9 && (applicantStudentCategory=='alumni' || applicantStudentCategory=='hasfamily' ) && (
                                                <PaymentUangPangkalRabSMPPesantren9/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'smp-pesantren' && props.dataApplicant.class_id == 9 && (applicantStudentCategory!=='alumni' && applicantStudentCategory!=='hasfamily' ) && (
                                                <PaymentUangPangkalNonRabSMPPesantren9/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'sma-pesantren' && props.dataApplicant.class_id == 11 && (applicantStudentCategory=='alumni' || applicantStudentCategory=='hasfamily' ) && (
                                                <PaymentUangPangkalRabSMAPesantren11/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'sma-pesantren' && props.dataApplicant.class_id == 11 && (applicantStudentCategory!=='alumni' && applicantStudentCategory!=='hasfamily' ) && (
                                                <PaymentUangPangkalNonRabSMAPesantren12/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'sma-pesantren' && props.dataApplicant.class_id == 12 && (applicantStudentCategory=='alumni' || applicantStudentCategory=='hasfamily' ) && (
                                                <PaymentUangPangkalRabSMAPesantren12/>
                                            )
                                        }
                                        {
                                            applicantSchoolCode == 'sma-pesantren' && props.dataApplicant.class_id == 12 && (applicantStudentCategory!=='alumni' && applicantStudentCategory!=='hasfamily' ) && (
                                                <PaymentUangPangkalNonRabSMAPesantren12/>
                                            )
                                        }
                                        
                                        
                                    </div>
                                </div>
                                <div className="border-b border-gray-900/10 py-3"></div>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        
                                    <div className="sm:col-span-8">
                                        <label htmlFor="metode_uang_pangkal" className="block text-sm/6 font-medium text-gray-900">Pilihan Metode Pembayaran Uang Pangkal
                                            <span className="text-red-600">*</span>
                                        </label>
                                        <div className="mt-2 grid grid-cols-1">
                                            <select id="metode_uang_pangkal" name="metode_uang_pangkal" value={metode_uang_pangkal} onChange={(e) => setMetodeUangPangkal(e.target.value)} autoComplete="metode_uang_pangkal" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required>
                                                <option value="">Pilih Metode Pembayaran</option>
                                                <option value="jalur_khusus" >Jalur Khusus</option>
                                                {/* <option value="gel_1" >Gelombang 1 (Dibayarkan 2 Pekan Setelah Dinyatakan diterima)</option> */}
                                            </select>    
                                            <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                                Pilihan Metode tidak valid
                                            </span>
                                            {/* <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                            </svg> */}
                                        </div>
                                    </div>
                                    {/* if () {
                                        
                                    } */}
                                   
                                    

                                   
                                </div>
                                <div className='flex justify-center text-center my-10'>
                                     
                                     {!props.complete && (
                                         <button type="submit" className='btn w-full py-3 block btn-sm  text-gray-200 bg-green-900 hover:bg-gray-800' disabled={props.isPending}
                                            onClick={(e) => {
                                                setTimeout(() => {
                                                    props.setParamNavigasi(props.currentStep+1)
                                                }, 500);
                                            }
                                            }
                                                 // onClick={() => {
                                                 //     // currentStep === steps.length
                                                 //     //   ? setComplete(true)
                                                 //     //   : setCurrentStep((prev) => prev + 1); 
                                                 //     if(props.currentStep === 9){
                                                 //     props.handledComplete(true)
                                                 //     }else{
                                                 //     // props.handledCurrentStep(props.currentStep + 1) ;
                                                 //     // props.setCurrentStep((prev) => prev + 1);
                                                 //     // callback(data)
                                                 //     }
                                                 //     // handleSubmit
     
                                                     
                                                 // }}
                                                 >
                                                    {(props.isPending)? (
                                                        <div>
                                                            {/* // <button type="button" class="flex items-center rounded-lg bg-green-700 px-4 py-2 text-white" disabled> */}
                                                                <svg class="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                Menyimpan...
                                                                </svg>
                                                            {/* // </button> */}
                                                            {/* // <svg className="animate-spin h-5 w-5 mr-3 " viewBox="0 0 24 24"></svg> */}
                                                            
                                                        </div>
                                                    ) : 
                                                    (
                                                        props.dataMetodeUangPangkal?.metode_uang_pangkal? 'Edit':
                                                        "Simpan"
                                                    )
                                                    }
                                        </button>
                                    )}
                                 </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
           
        </section>
    )
}

export default MetodeUangPangkal;