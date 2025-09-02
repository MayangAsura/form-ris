import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { FiExternalLink } from "react-icons/fi";
import { useState,useEffect } from 'react';

function VerifikasiKeluargaForm(props) {

    const [error, setError] = useState(null)
    const [student_category, setStudentCategory] = useState("")
    const [photo_sampul_ijazah, setPhotoSampulIjazah] = useState("")
    const [dataVerifikasiKeluarga, setDataVerifikasiKeluarga] = useState({})
    const [dataBerkasPhotoSampul, setDataBerkasPhotoSampul] = useState([])
    const [last_update, setLastUpdate] = useState({})
    
    const data = { student_category:student_category, photo_sampul_ijazah:photo_sampul_ijazah}

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
        ////console.log(image)
        // const data = {
        //     name: image.name,
        //     size: image.size,
        //     type: image.type,
        //     file: image
        // }
        setPhotoSampulIjazah( 
            {name: file_name,
            size: image.size,
            type: image.type,
            file: image})
        ////console.log(photo_sampul_ijazah)
        
        
        // con[]
        
        setError(null)
    }

    useEffect(() => {
            console.log('props.student_category>', student_category)
            // setStudentCategory(props.dataVerifikasiKeluarga.student_category)
            // setPhotoSampulIjazah(props.dataVerifikasiKeluarga.photo_sampul_ijazah)
            ////console.log('props.dataVerifikasiKeluarga>', props.dataVerifikasiKeluarga)
            if(props.dataVerifikasiKeluarga){

                setDataVerifikasiKeluarga(props.dataVerifikasiKeluarga)
                if(props.dataVerifikasiKeluarga.student_category){
                    setStudentCategory(props.dataVerifikasiKeluarga.student_category)
                }
                setLastUpdate(props.dataVerifikasiKeluarga.updated_at)
            }

            if(props.dataBerkas){
                setDataBerkasPhotoSampul(props.dataBerkas)
            }
            // setMotherAcademic(props.dataWali[0].wali_academic)
            // setMotherSalary(props.dataWali[0].wali_salary)
            // setMotherJob(props.dataWali[0].wali_job)
            // setLastUpdate(props.dataWali[0].updated_at)
    },[props.dataVerifikasiKeluarga, props.dataBerkas, student_category])

    const saveData = (e) => {
        e.preventDefault()
        ////console.log(data)
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
                        <form action="" onSubmit={saveData} encType="multipart/form-data">
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-3xl font-semibold text-gray-900 !inline">Verifikasi Keluarga Rabbaanii</h2>
                                <p className="my-5 text-sm/6 text-gray-700">
                                <b>Keluarga Rabbaanii :</b> calon peserta didik adalah alumni RIS atau mempunyai kakak/adik yang bersekolah di RIS.
                                <br /><br /> <b>Non Keluarga Rabbaanii :</b> calon peserta didik belum menjadi alumni RIS atau belum memiliki kakak/adik yang bersekolah di RIS.
                                    {/* Silakan upload dokumen berikut, mohon Scan/Foto setiap dokumen dengan jelas. */}
                                    {/* This information will be displayed publicly so be careful what you share. */}
                                </p>
                                <p className="mt-1 text-sm/12 text-gray-600">
                                    Update terakhir: {last_update?formatDate(last_update):'-'}.
                                </p>
                                <div className="border-b border-gray-900/10 my-2"></div>


                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            
                                    <div className="sm:col-span-6">
                                        <label htmlFor="student_category" className="block text-sm/6 font-medium text-gray-900">Calon Siswa termasuk kategori
                                            <span className="text-red-600">*</span>
                                        </label>
                                        <div className="mt-2 grid grid-cols-1">
                                            <select id="student_category" name="student_category" value={student_category} onChange={(e) => setStudentCategory(e.target.value)} autoComplete="student_category" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required>
                                                <option value="">Pilih Kategori Siswa</option>
                                                <option value={student_category == 'alumni'?student_category:'alumni'} selected={student_category=='alumni'}>(Keluarga Rabbaanii) Alumni Rabbaanii</option>
                                                <option value="hasfamily" selected={student_category=='has_family'}>(Keluarga Rabbaanii) Memiliki saudara kandung sekolah di Rabbaanii</option>
                                                <option value="newstudent" selected={student_category=='newstudent'}>Non Keluarga Rabbaanii</option>
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
                                    <div className="sm:col-span-6 mt-2 mb-0"> 
                                        <div className="relative inline-block">

                                        {dataVerifikasiKeluarga?.photo_sampul_ijazah? (
                                                <span>Status : <span className="rounded-md w-24 bg-green-400 px-2 py-1 mt-2 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                    Sudah Upload
                                                    </span>
                                                </span>
                                            ): ""}
                                        </div>
                                            {(dataBerkasPhotoSampul.find(e => e.file_title == 'Photo-Sampul-Ijazah')?.file_type === '/PDF' || dataBerkasPhotoSampul.find(e => e.file_title == 'Photo-Sampul-Ijazah')?.file_type === 'PDF' && dataBerkasPhotoSampul.find(e => e.file_title == 'Photo-Sampul-Ijazah')?.file_url !== "") && (
                                                <div className="max-w-xl max-auto my-10">
                                                    <iframe src={dataBerkasPhotoSampul.find(e => e.file_title == 'Photo-Sampul-Ijazah')?.file_url} width={'100%'} height={'500px'} />
                                                </div>                  
                                            )}
                                            {dataBerkasPhotoSampul.find(e => e.file_title == 'Photo-Sampul-Ijazah')?.file_type === '/JPEG' || dataBerkasPhotoSampul.find(e => e.file_title == 'Photo-Sampul-Ijazah')?.file_type === 'JPEG' || dataBerkasPhotoSampul.find(e => e.file_title == 'Photo-Sampul-Ijazah')?.file_type === 'JPG' || dataBerkasPhotoSampul.find(e => e.file_title == 'Photo-Sampul-Ijazah')?.file_type === 'PNG' && (
                                                <img src={dataBerkasPhotoSampul.find(e => e.file_title == 'Photo-Sampul-Ijazah')?.file_url?dataBerkasPhotoSampul.find(e => e.file_title == 'Photo-Sampul-Ijazah')?.file_url : ""} alt="" width={30}/>
                                            )}
                                        </div>
                                        {/* <img src={props.dataBerkasPhotoSampul[4]?.file_url?dataBerkasPhotoSampul[4]?.file_url : ""} alt="" width={30}/> */}
                                    {/* {(dataVerifikasiKeluarga?.photo_sampul_ijazah) && ( 
                                        <div className="sm:col-span-4 mt-2 mb-0">
                                            <img src={dataVerifikasiKeluarga?.photo_sampul_ijazah} alt="" width={250} className='w-full'/>
                                            <span className=' text-green-600 cursor-pointer flex gap- items-center' onClick={() => window.open(dataVerifikasiKeluarga?.photo_sampul_ijazah)}> Buka <FiExternalLink></FiExternalLink> </span>
                                        </div>

                                      )} */}
                                    <div className="sm:col-span-6">
                                    <label htmlFor="photo_sampul_ijazah" className="block text-sm/6 font-medium text-gray-900">Upload foto sampul depan Raport/Ijazah Rabbaanii</label>
                                    <span className="text-sm italic">Bagi calon santri yang memiliki keluarga terdaftar dalam satu Kartu Keluarga</span>
                                    <p className="text-xs/5 text-gray-600">PNG, JPG, PDF, maks 2MB</p>
                                    <div className="mt-2">
                                        <div className='relative inline'>
                                            <input id="photo_sampul_ijazah" name="photo_sampul_ijazah" onChange={(e) => validateImage(e.target.files[0],2,'Photo-Sampul-Ijazah')} type="file" autoComplete="photo_sampul_ijazah" 
                                            className='w-full p-3 mt-3 file:bg-green-500 file:text-white file:border-0
                                                    file:py-1 file:px-3 file:rounded-lg
                                                    file:shadow-xl file:shadow-green-500/30
                                                    text-gray-600'
                                            // className="p-3 w-full text-slate-500 text-sm rounded-sm leading-6 file:absolute file:right-0 file:bg-violet-200 file:text-green-700 file:font-semibold file:border-none file:px-4 file:py-0 file:mr-2 file:rounded-sm hover:file:bg-violet-100 border border-gray-300"
                                            accept="image/png, image/jpeg, .pdf"/>
                                            {/* <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 2MB</p> */}
                                            { error && <p className='mt-2 text-sm text-red-500'>{error}</p>}
                                            
                                        </div>
                                        {/* <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Berkas tidak sesuai
                                        </span> */}
                                    </div>
                                    </div>

                    
                                   
                                    

                                   
                                </div>
                                <div className='flex justify-center text-center my-10'>
                                     
                                        {!props.complete && (
                                            <button type="submit" className='btn w-full py-3 block btn-sm  text-gray-200 bg-green-900 hover:bg-gray-800' disabled={props.isPending}
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
                                                        {(props.isPending || props.loading)? (
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
                                                            props.dataVerifikasiKeluarga?.student_category? 'Edit':
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

export default VerifikasiKeluargaForm;