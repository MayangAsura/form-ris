import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useState } from 'react';

import PaymentUangPangkalNonRabTKIT from './PaymentUangPangkalNonRabTKIT';
import PaymentUangPangkalNonRabSDIT from './PaymentUangPangkalNonRabSDIT';
import PaymentUangPangkalNonRabSMPI from './PaymentUangPangkalNonRabSMPI';
import PaymentUangPangkalNonRabSMAI from './PaymentUangPangkalNonRabSMAI';
import PaymentUangPangkalNonRabSMPPesantren from './PaymentUangPangkalNonRabSMPPesantren';
import PaymentUangPangkalNonRabSMAPesantren from './PaymentUangPangkalNonRabSMAPesantren';
import PaymentUangPangkalPondokCiwidey from './PaymentUangPangkalPondokCiwidey';
import PaymentUangPangkalRabTKIT from './PaymentUangPangkalRabTKIT';
import PaymentUangPangkalRabSDIT from './PaymentUangPangkalRabSDIT';
import PaymentUangPangkalRabSMPI from './PaymentUangPangkalRabSMPI';
import PaymentUangPangkalRabSMAI from './PaymentUangPangkalRabSMAI';
import PaymentUangPangkalRabSMPPesantren from './PaymentUangPangkalRabSMPPesantren';
import PaymentUangPangkalRabSMAPesantren from './PaymentUangPangkalRabSMAPesantren';


function MetodeUangPangkal(props) {
    const [ metode_uang_pangkal, setMetodeUangPangkal] = useState("")
    console.log('applicantSchool . MetodeUangPangkal >', dataApplicant)
    // const 
    const data = { metode_uang_pangkal:metode_uang_pangkal}

    const saveData = (e) => {
        e.preventDefault()
        console.log(data)
        props.onSubmit(data)
        
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
                                {/* Keluarga Rabbaanii : calon peserta didik adalah alumni RIS atau mempunyai kakak/adik yang bersekolah di RIS.
                                Non Keluarga Rabbaanii : calon peserta didik belum menjadi  alumni RIS atau belum memiliki kakak/adik yang bersekolah di RIS. */}
                                    {/* Silakan upload dokumen berikut, mohon Scan/Foto setiap dokumen dengan jelas. */}
                                    {/* This information will be displayed publicly so be careful what you share. */}
                                </p>
                                <div className="border-b border-gray-900/10 py-3"></div>

                                <h2 className="text-3xl font-semibold text-gray-900"></h2>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        if(is_tkit){
                                            <PaymentUangPangkalNonRabSDIT/>
                                        }
                                    </div>    
                                    <div className="sm:col-span-3">
                                        <label htmlFor="metode_uang_pangkal" className="block text-sm/6 font-medium text-gray-900">Pilihan Metode Pembayaran Uang Pangkal</label>
                                        <div className="mt-2 grid grid-cols-1">
                                            <select id="metode_uang_pangkal" name="metode_uang_pangkal" onChange={(e) => setMetodeUangPangkal(e.target.value)} autoComplete="metode_uang_pangkal" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required>
                                                <option value="">Pilih Metode Pembayaran</option>
                                                <option value="gel_1" >Gelombang 1 (Dibayarkan 2 Pekan Setelah Dinyatakan diterima)</option>
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
                                <div className='flex justify-center text-center my-5'>
                                     
                                     {!props.complete && (
                                         <button type="submit" className='btn w-full py-3 block btn-sm  text-gray-200 bg-green-900 hover:bg-gray-800'
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
                                                 >Submit</button>
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