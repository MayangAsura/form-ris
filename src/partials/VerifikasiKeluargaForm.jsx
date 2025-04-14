import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useState } from 'react';

function VerifikasiKeluargaForm(props) {
    const [student_category, setStudentCategory] = useState("")
    const [photo_sampul_ijazah, setPhotoSampulIjazah] = useState("")
    
    const data = { student_category:student_category, photo_sampul_ijazah:photo_sampul_ijazah}

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
                                <h2 className="text-3xl font-semibold text-gray-900 !inline">Verifikasi Keluarga Rabbaanii</h2>
                                <p className="my-5 text-sm/6 text-gray-700">
                                <b>Keluarga Rabbaanii :</b> calon peserta didik adalah alumni RIS atau mempunyai kakak/adik yang bersekolah di RIS.
                                <br /><br /> <b>Non Keluarga Rabbaanii :</b> calon peserta didik belum menjadi alumni RIS atau belum memiliki kakak/adik yang bersekolah di RIS.
                                    {/* Silakan upload dokumen berikut, mohon Scan/Foto setiap dokumen dengan jelas. */}
                                    {/* This information will be displayed publicly so be careful what you share. */}
                                </p>
                                <div className="border-b border-gray-900/10 py-3"></div>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            
                                    <div className="sm:col-span-3">
                                        <label htmlFor="student_category" className="block text-sm/6 font-medium text-gray-900">Calon Siswa termasuk kategori</label>
                                        <div className="mt-2 grid grid-cols-1">
                                            <select id="student_category" name="student_category" onChange={(e) => setStudentCategory(e.target.value)} autoComplete="student_category" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required>
                                                <option value="alumni">Alumni Rabbaanii</option>
                                                <option value="hasfamily">Memiliki saudara kandung sekolah di Rabbaanii</option>
                                                <option value="newstudent">Tidak keduanya</option>
                                            </select>
                                            <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                                Kategori tidak valid
                                            </span>
                                            {/* <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                            </svg> */}
                                        </div>
                                    </div>
                                    {/* if () {
                                        
                                    } */}

                                    <div className="sm:col-span-4">
                                    <label htmlFor="photo_sampul_ijazah" className="block text-sm/6 font-medium text-gray-900">Upload foto sampul depan Raport/Ijazah Rabbaanii</label>
                                    <span className="text-sm italic">Bagi calon santri yang memiliki keluarga terdaftar dalam satu Kartu Keluarga</span>
                                    <p className="text-xs/5 text-gray-600">JPG, maks 2MB</p>
                                    <div className="mt-2">
                                        <input id="photo_sampul_ijazah" name="photo_sampul_ijazah" onChange={(e) => setPhotoSampulIjazah(e.target.value)} type="file" autoComplete="photo_sampul_ijazah" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 "/>
                                        {/* <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Berkas tidak sesuai
                                        </span> */}
                                    </div>
                                    </div>

                    
                                   
                                    

                                   
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

export default VerifikasiKeluargaForm;