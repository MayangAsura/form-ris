import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useState, useEffect } from 'react';

function BerkasForm(props) {

    const [error, setError] = useState(null)

    const [bird_certificate, setBirdCertificate] = useState(null)
    const [pas_photo, setPasPhoto] = useState(null)
    const [parent_ktp, setParentKTP] = useState("")
    const [surat_kesanggupan, setSuratKesanggupan] = useState("")
    const [kk, setKK] = useState("")
    const [certificate, setCertificate] = useState("")
    const [berkasFile, setBerkasFile] = useState([]) 
    const [dataBerkas, setDataBerkas] = useState([]) 
    const [last_update, setLastUpdate] = useState("") 


    useEffect(() => {
            console.log('props.dataBerkas>', props.dataBerkas)
            
            setDataBerkas(props.dataBerkas??[])
            setLastUpdate(props.dataBerkas?props.dataBerkas[0].updated_at:"")
            // setMotherName(props.dataIbu.mother_name)
            // setMotherAcademic(props.dataIbu.mother_academic)
            // setMotherSalary(props.dataIbu.mother_salary)
            // setMotherJob(props.dataIbu.mother_job)
            // setLastUpdate(props.dataIbu.updated_at)
        },[props.dataBerkas])

    const data = { bird_certificate:bird_certificate, pas_photo:pas_photo, parent_ktp:parent_ktp, surat_kesanggupan:surat_kesanggupan, kk:kk, certificate:certificate}

    const validateImage = (image, size, file_name) => {
        if (!image.name.match(/\.(jpg|jpeg|png|pdf)$/)){

            const error = "Tipe file berkas salah. Mohon ulangi upload berkas."
            setError(error)
            return
            
        }
        if(image.size > parseInt(size+'000000')){

            const error = "Berkas tidak melebih dari "+ size + " MB"
            setError(error)
            return
        }
        console.log(image)
        // const data = {
        //     name: image.name,
        //     size: image.size,
        //     type: image.type,
        //     file: image
        // }
        if(!error){
            setBerkasFile([...berkasFile, 
                {name: file_name,
                size: image.size,
                type: image.type,
                file: image}])
            console.log(berkasFile)
        }
        
        setError(null)
    }

    const saveData = (e) => {
        e.preventDefault()

        console.log(berkasFile)
        props.onSubmit(berkasFile)
        
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
                        <form action="" onSubmit={saveData} encType="multipart/form-data">
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-3xl font-semibold text-gray-900">Upload Kelengkapan Dokumen</h2>
                                <p className="my-5 text-sm/8 text-gray-700">Update terakhir { last_update!=""?formatDate(last_update):"-"} </p>
                                <p className="mt-1 text-sm/6 text-gray-600 italic">
                                    Silahkan lengkapi dokumen berikut. Mohon untuk menguploaad scan/foto dokumen dengan kualitas yang baik.
                                    {/* This information will be displayed publicly so be careful what you share. */}
                                </p>
                                <div className="border-b border-gray-900/20 py-3"></div>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    {/* <div className="sm:col-span-4">
                                    <label htmlFor="bird_certificate" className="block text-sm/6 font-medium text-gray-900">Akta Kelahiran</label>
                                    <div className="mt-2">
                                        <input id="bird_certificate" name="bird_certificate" type="file" autoComplete="bird_certificate" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                    </div>
                                    </div> */}
                                    <div className="sm:col-span-4">
                                        <img src={dataBerkas.length>0??dataBerkas[0]?.file_url} alt="" width={30}/>
                                        <label htmlFor="bird_certificate" className="block text-sm/6 font-medium text-gray-900">Akta Kelahiran</label>
                                        <div className="mt-2">
                                        <div className="relative inline-block">
                                            <p className="text-xs/5 text-gray-600">PNG, JPG, PDF up to 2MB</p>
                                            {/* <input type="file" className="file:absolute file:right-0 file:bg-green-500 file:text-white file:border-0 file:py-1 file:px-3 file:rounded-full file:shadow-xl file:shadow-blue-500/30 text-gray-600"/> */}
                                            <input id="bird_certificate" name="bird_certificate" onChange={(e) => validateImage(e.target.files[0], 2, 'Bird-Certificate')} type="file" 
                                            className="p-3 w-full text-slate-500 text-sm rounded-sm leading-6 file:absolute file:right-0 file:bg-violet-200 file:text-green-700 file:font-semibold file:border-none file:px-4 file:py-0 file:mr-2 file:rounded-sm hover:file:bg-violet-100 border border-gray-300"
                                            accept="image/png, image/jpeg, .pdf"/>
                                            { error && <p className='mt-2 text-sm text-red-500'>{error}</p>}
                                        </div>
                                            {/* <input id="bird_certificate" name="bird_certificte" type="file" autoComplete="bird_certificate" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/> */}
                                        </div>
                                        </div>
                                    
                                    {/* if () {
                                        
                                    } */}
                                    <div className="sm:col-span-4">
                                        <img src={dataBerkas.length>0??dataBerkas[3].file_url} alt="" width={30}/>
                                        <label htmlFor="pas_photo" className="block text-sm/6 font-medium text-gray-900">Pas Photo Background Merah dan Putih (3x4 dan 2x3)</label>
                                        <p className="text-xs/5 text-gray-600">PNG, JPG, maks 2MB</p>
                                        <div className="relative inline-block">
                                            <div className="mt-2">
                                                <input id="pas_photo" name="pas_photo" onChange={(e) => validateImage(e.target.files[0], 2, 'Pas-Photo')} type="file" className="p-3 w-full text-slate-500 text-sm rounded-sm leading-6 file:absolute file:right-0 file:bg-violet-200 file:text-green-700 file:font-semibold file:border-none file:px-4 file:py-0 file:mr-2 file:rounded-sm hover:file:bg-violet-100 border border-gray-300"
                                                accept="image/png, image/jpeg"/>
                                                {/* <input id="pas_photo" name="pas_photo" type="file" autoComplete="pas_photo" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <img src={dataBerkas.length>0??dataBerkas[2].file_url} alt="" width={30}/>
                                        <label htmlFor="parent_ktp" className="block text-sm/6 font-medium text-gray-900">KTP Orang Tua / Wali </label>
                                        <p className="text-xs/5 text-gray-600">PNG, JPG, maks 2MB</p>
                                        <div className="relative inline-block">
                                            <div className="mt-2">
                                                <input id="parent_ktp" name="parent_ktp" onChange={(e) => validateImage(e.target.files[0],2,'Parent-KTP')} type="file" className="p-3 w-full text-slate-500 text-sm rounded-sm leading-6 file:absolute file:right-0 file:bg-violet-200 file:text-green-700 file:font-semibold file:border-none file:px-4 file:py-0 file:mr-2 file:rounded-sm hover:file:bg-violet-100 border border-gray-300"
                                                accept="image/png, image/jpeg"/>
                                                {/* <input id="parent_ktp" name="parent_ktp" type="file" autoComplete="parent_ktp" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <img src={dataBerkas.length>0??dataBerkas[1].file_url} alt="" width={30}/>
                                        <label htmlFor="kk" className="block text-sm/6 font-medium text-gray-900">Kartu Keluarga (KK)</label>
                                        <p className="text-xs/5 text-gray-600">PDF, maks 2MB</p>
                                        <div className="relative inline-block">
                                            <div className="mt-2">
                                                <input id="kk" name="kk" onChange={(e) => validateImage(e.target.files[0], 2, 'KK')} type="file" className="p-3 w-full text-slate-500 text-sm rounded-sm leading-6 file:absolute file:right-0 file:bg-violet-200 file:text-green-700 file:font-semibold file:border-none file:px-4 file:py-0 file:mr-2 file:rounded-sm hover:file:bg-violet-100 border border-gray-300"
                                                accept=".pdf"/>
                                                {/* <input id="kk" name="kk" type="file" autoComplete="kk" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <img src={dataBerkas.length>0??dataBerkas[4].file_url} alt="" width={30}/>
                                    <label htmlFor="surat_kesanggupan" className="block text-sm/6 font-medium text-gray-900">Surat Kesanggupan</label>
                                    <p className="text-xs/5 text-gray-600">PDF, maks 2MB</p>
                                    <div className="relative inline-block">
                                        <div className="mt-2">
                                            <input id="surat_kesanggupan" name="surat_kesanggupan" onChange={(e) => validateImage(e.target.files[0],2, 'Surat-Kesanggupan')} type="file" className="p-3 w-full text-slate-500 text-sm rounded-sm leading-6 file:absolute file:right-0 file:bg-violet-200 file:text-green-700 file:font-semibold file:border-none file:px-4 file:py-0 file:mr-2 file:rounded-sm hover:file:bg-violet-100 border border-gray-300"
                                            accept=".pdf"/>
                                            {/* <input id="surat_kesanggupan" name="surat_kesanggupan" type="file" autoComplete="surat_kesanggupan" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/> */}
                                        </div>
                                    </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <img src={dataBerkas.length>0??dataBerkas[5].file_url} alt="" width={30} className='my-5'/>
                                        <label htmlFor="certificate" className="block text-sm/6 font-medium text-gray-900">Sertifikat / Syahadah Hafalan</label>
                                        <p className="text-xs/5 text-gray-600">PDF, maks 5MB</p>
                                        <div className="relative inline-block">
                                            <div className="mt-2">
                                                <input id="certificate" name="certificate" onChange={(e)=> validateImage(e.target.files[0], 5, 'Syahadah')} type="file" className="p-3 w-full text-slate-500 text-sm rounded-sm leading-6 file:absolute file:right-0 file:bg-violet-200 file:text-green-700 file:font-semibold file:border-none file:px-4 file:py-0 file:mr-2 file:rounded-sm hover:file:bg-violet-100 border border-gray-300"
                                                accept=".pdf"/>
                                                {/* <input id="certificate" name="certificate" type="file" autoComplete="certificate" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/> */}
                                            </div>
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

export default BerkasForm;