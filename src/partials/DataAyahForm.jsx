import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
// import { ChevronDownIcon } from '@heroicons/react/16/solid'

const DataAyahForm = (props) => {
    const [father_name, setFatherName] = useState("")
    const [father_academic, setFatherAcademic] = useState("")
    const [father_job, setFatherJob] = useState("")
    const [father_salary, setFatherSalary] = useState("")
    const [why_chooses, setWhyChooses] = useState("")

    const data = { father_name:father_name, father_academic:father_academic, father_job:father_job, father_salary:father_salary, why_chooses:why_chooses}

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
                                <h2 className="text-3xl font-semibold text-gray-900">Data Ayah</h2>
                                <p className="mt-1 text-sm/6 text-gray-600 italic">
                                    Data Diri Ayah Kandung
                                    {/* This information will be displayed publicly so be careful what you share. */}
                                </p>
                                <div className="border-b border-gray-900/20 py-3"></div>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div  className="sm:col-span-4">
                                    <label htmlFor="father_name"  className="block text-sm/6 font-medium text-gray-900">Nama Ayah Kandung</label>
                                    <span className="text-sm italic">Hindari penggunaan gelar akademik atau sosial (Drs, Dr, H, dll)</span>
                                    <div  className="mt-2">
                                        <input id="father_name" name="father_name" onChange={(e)=> setFatherName(e.target.value)} type="text" autoComplete="father_name"  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required/>
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Nama ayah tidak valid
                                        </span>
                                    </div>
                                    </div>
                                    <div  className="sm:col-span-4">
                                        <label htmlFor="father_academic"  className="block text-sm/6 font-medium text-gray-900">Pendidikan Ayah</label>
                                        <span className="text-sm italic">Pendidikan terakhir ayah kandung</span>
                                        <div  className="mt-2 grid">
                                            <select id="father_academic" name="father_academic" onChange={(e)=> setFatherAcademic(e.target.value)} autoComplete="father_academic" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required>
                                            <option value="">Pilih Pendidikan</option>
                                            <option value="sma_sederajat">SMA/sederajat</option>
                                            <option value="d1">D1</option>
                                            <option value="d2">D2</option>
                                            <option value="d3">D3</option>
                                            <option value="s1">S1</option>
                                            <option value="s2">S2</option>
                                            <option value="s3">S3</option>
                                            <option value="other">Other</option>
                                            </select>
                                            <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                                Pendidikan ayah tidak valid
                                            </span>
                                            {/* <svg  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                            </svg> */}
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                    <label htmlFor="father_job" className="block text-sm/6 font-medium text-gray-900">Pekerjaan Ayah</label>
                                    <span className="text-sm italic">Pekerjaan utama ayah kandung</span>
                                    <div  className="mt-2">
                                        <input id="father_job" name="father_job" onChange={(e)=> setFatherJob(e.target.value)} type="text" autoComplete="father_job"  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required/>
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Pekerjaan ayah tidak valid
                                        </span>
                                    </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label htmlFor="father_salary" className="block text-sm/6 font-medium text-gray-900">Penghasilah Ayah</label>
                                        <div className="mt-2 grid grid-cols-1">
                                            <select id="father_salary" name="father_salary" onChange={(e)=> setFatherSalary(e.target.value)} autoComplete="father_salary"  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required>
                                            <option value="">Pilih Penghasilan</option>
                                            <option value="less_than_1jt">Kurang dari Rp1 Jt</option>
                                            <option value="less_than_2jt">Kurang dari Rp2 Jt</option>
                                            <option value="5jt_-_10jt">Rp5 Jt - Rp10 Jt</option>
                                            <option value="10jt_-_15jt">Rp10 Jt - Rp15 Jt</option>
                                            <option value="15jt_-_20jt">Rp15 Jt - Rp20 Jt</option>
                                            <option value="more_than_20jt">Lebih dari Rp20 Jt</option>
                                            <option value="other">Other</option>
                                            </select>
                                            <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                                Penghasilan ayah tidak valid
                                            </span>
                                            {/* <svg  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                            </svg> */}
                                        </div>
                                    </div>
                                 

                                    <div className="col-span-full">
                                    <label htmlFor="why_chooses" className="block text-sm/6 font-medium text-gray-900">
                                        Alasan Bapak/Ibu mendaftarkan Ananda ke Rabbaanii
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                        id="why_chooses"
                                        name="why_chooses"
                                        onChange={(e)=> setWhyChooses(e.target.value)}
                                        rows={5}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                                        defaultValue={''}
                                        required
                                        />
                                    </div>
                                    {/* <p className="mt-3 text-sm/6 text-gray-600">Write a few sentences about yourself.</p> */}
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

export default DataAyahForm;