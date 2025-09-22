import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { useState, useEffect, version } from 'react';

import { PDFViewer } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from 'react-pdf';
// import Pdf from "@mikecousins/react-pdf";
// Configure PDF.js worker (important for proper rendering)
// const pdfjs = {
//     version : '4.8.69'
// }
    pdfjs.GlobalWorkerOptions.workerSrc = `unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
    // Text layer for React-PDF.
import "react-pdf/dist/Page/TextLayer.css";


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
    const [dataSchool, setDataSchool] = useState({id: ""}) 
    const [last_update, setLastUpdate] = useState("") 
    const [page, setPage] = useState(1);


    useEffect(() => {
            console.log('props.dataBerkas>', props.school)
            if(props.dataBerkas.length > 0) {
                // ////console.log()
                setDataBerkas(props.dataBerkas)
                setLastUpdate(props.dataBerkas[0].updated_at)

            }
            if(props.school){
                dataSchool.id = props.school
                // setDataSchool(props.)
            }
            if(props.currentStep == 5){
                props.retrieveData(props.participant)
            }

            // if(props.retrieveData)
            // ////console.log(dataBerkas)
            // setMotherName(props.dataIbu.mother_name)
            // setMotherAcademic(props.dataIbu.mother_academic)
            // setMotherSalary(props.dataIbu.mother_salary)
            // setMotherJob(props.dataIbu.mother_job)
            // setLastUpdate(props.dataIbu.updated_at)
        },[])

    const data = { bird_certificate:bird_certificate, pas_photo:pas_photo, parent_ktp:parent_ktp, surat_kesanggupan:surat_kesanggupan, kk:kk, certificate:certificate}

    const validateImage = (image, size, file_name) => {

        if(!image || !size || !file_name) {
            return
        }
        if (!image.name.match(/\.(jpg|jpeg|png|pdf)$/)){

            const error = "Tipe file berkas salah. Mohon ulangi upload berkas."
            setError(error)
            return
            
        }
        if(image.size > parseInt(size+'000000')){

            const error = "Berkas tidak melebihi dari "+ size + " MB"
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
        if(!error){
            setBerkasFile([...berkasFile, 
                {name: file_name,
                size: image.size,
                type: image.type,
                file: image}])
            ////console.log(berkasFile)
        }
        
        setError(null)
    }

    const options = {
        // standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,

    };

    const saveData = (e) => {
        e.preventDefault()

        ////console.log(berkasFile)
        props.onSubmit(berkasFile)
        
        setBerkasFile([])
        // setTimeout(() => {
        // }, 1000);
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

    const download = () => {
        fetch("https://cnpcpmdrblvjfzzeqoau.supabase.co/storage/v1/object/sign/uploads/student_submissions/Surat%20Orang%20Tua%20Siap%20Mengikuti%20Aturan%20RIS.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80MzczNjc5MC01MTU4LTQ5N2YtOTUwOS1mM2Y0NDU2NzBiYWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1cGxvYWRzL3N0dWRlbnRfc3VibWlzc2lvbnMvU3VyYXQgT3JhbmcgVHVhIFNpYXAgTWVuZ2lrdXRpIEF0dXJhbiBSSVMucGRmIiwiaWF0IjoxNzQ4OTQ4MTAyLCJleHAiOjE3ODA0ODQxMDJ9.3NiPzmZ-zD2PTvq3JNNU1DnQi3ciIs33ChwF5UNiDo8").then((response) => {
            response.blob().then((blob) => {
                const fileURL =
                    window.URL.createObjectURL(blob);
                let alink = document.createElement("a");
                alink.href = fileURL;
                alink.download = "Surat Kesanggupan.pdf";
                document.body.  appendChild(alink); // Required for this to work in FireFox
                alink.click();
            });
        });
    };


    return (
        <section className="relative">
            <div className='max-w-6xl mx-auto px-4 sm:px-6'>
                <div className='py-12 md:py-12'>
                    <div className='max-w-sm md:max-w-4xl mx-auto'>
                        <form action="" onSubmit={saveData} encType="multipart/form-data">
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-3xl font-semibold text-gray-900">Upload Kelengkapan Dokumen</h2>
                                <p className="mt-1 text-sm/6 text-gray-600 italic">
                                    Silahkan lengkapi dokumen berikut. Mohon untuk mengupload scan/foto dokumen dengan kualitas yang jelas dan mudah terbaca.
                                    {/* This information will be displayed publicly so be careful what you share. */}
                                </p>
                                <p className="my-5 text-sm/8 text-gray-700">Update terakhir: { last_update?formatDate(last_update):"-"} </p>
                                <div className="border-b border-gray-900/20"></div>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-8">
                                        <div className="mt-2">
                                        <label htmlFor="bird_certificate" className="block text-sm/6 font-medium text-gray-900">Pas Photo (Background Merah 3 x 4)
                                            <span className="text-red-600">*</span>
                                        </label>
                                            <p className="text-xs/5 text-gray-600">PNG, JPG, PDF up to 2MB</p>
                                        {dataBerkas.find(e => e.file_title == 'Pas-Photo')?.file_url? (
                                            <span className='py-5 mb-3'>Status : <span className="rounded-md w-24 bg-green-400 px-2 py-1 my-5 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                Sudah Upload
                                                </span>
                                            </span>
                                        ): ""}
                                        <div className="relative inline-block">
                                            <input id="bird_certificate" name="pas_photo" onChange={(e) => validateImage(e.target.files[0], 2, 'Pas-Photo')} type="file" 
                                            className='w-full p-3 mt-3 file:bg-green-500 file:text-white file:border-0
                                                    file:py-1 file:px-3 file:rounded-lg
                                                    file:shadow-xl file:shadow-green-500/30
                                                    text-gray-600'
                                            accept="image/png, image/jpeg, .pdf"/>
                                            { error && <p className='mt-2 text-sm text-red-500'>{error}</p>}
                                        </div>
                                        {(dataBerkas.find(e => e.file_title == 'Pas-Photo')?.file_type === '/PDF' || dataBerkas.find(e => e.file_title == 'Pas-Photo')?.file_type === 'PDF' && dataBerkas.find(e => e.file_title == 'Pas-Photo')?.file_url !== "") && (
                                            <div className="max-w-2xl max-auto my-10">
                                                <iframe src={dataBerkas.find(e => e.file_title == 'Pas-Photo')?.file_url} width={'100%'} height={'500px'} />
                                            </div>                  
                                        )}
                                        {(dataBerkas.find(e => e.file_title == 'Pas-Photo')?.file_type === '/JPEG' || dataBerkas.find(e => e.file_title == 'Pas-Photo')?.file_type === 'JPEG' || dataBerkas.find(e => e.file_title == 'Pas-Photo')?.file_type === 'JPG' || dataBerkas.find(e => e.file_title == 'Pas-Photo')?.file_type === 'PNG') && (
                                            <img src={props.dataBerkas.find(e => e.file_title == 'Bird-Certificate')?.file_url?dataBerkas.find(e => e.file_title == 'Pas-Photo')?.file_url:""} alt="" width="50%"/>
                                        )}
                                        </div>
                                    </div>

                                    <div className="sm:col-span-8">
                                        <div className="mt-2">
                                        <label htmlFor="bird_certificate" className="block text-sm/6 font-medium text-gray-900">Akta Kelahiran
                                            <span className="text-red-600">*</span>
                                        </label>
                                            <p className="text-xs/5 text-gray-600">PNG, JPG, PDF up to 2MB</p>
                                        {dataBerkas.find(e => e.file_title == 'Bird-Certificate')?.file_url? (
                                            <span className='py-5 mb-3'>Status : <span className="rounded-md w-24 bg-green-400 px-2 py-1 my-5 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                Sudah Upload
                                                </span>
                                            </span>
                                        ): ""}
                                        <div className="relative inline-block">
                                            {/* <input type="file" className="file:absolute file:right-0 file:bg-green-500 file:text-white file:border-0 file:py-1 file:px-3 file:rounded-full file:shadow-xl file:shadow-blue-500/30 text-gray-600"/> */}
                                            <input id="bird_certificate" name="bird_certificate" onChange={(e) => validateImage(e.target.files[0], 2, 'Bird-Certificate')} type="file" 
                                            className='w-full p-3 mt-3 file:bg-green-500 file:text-white file:border-0
                                                    file:py-1 file:px-3 file:rounded-lg
                                                    file:shadow-xl file:shadow-green-500/30
                                                    text-gray-600'
                                            // className="p-3 py-5 w-full  items-center text-slate-500 text-sm rounded-sm leading-6 file:absolute file:right-0 file:bg-violet-200 file:text-green-700 file:font-semibold file:border-none file:px-4 file:py-0 file:mr-2 file:rounded-sm hover:file:bg-violet-100 border border-gray-300"
                                            accept="image/png, image/jpeg, .pdf"/>
                                            { error && <p className='mt-2 text-sm text-red-500'>{error}</p>}
                                        </div>
                                        {(dataBerkas.find(e => e.file_title == 'Bird-Certificate')?.file_type === '/PDF' || dataBerkas.find(e => e.file_title == 'Bird-Certificate')?.file_type === 'PDF') && (
                                            <iframe className='mt-3' src={dataBerkas.find(e => e.file_title == 'Bird-Certificate')?.file_url} width={'100%'} height={'500px'} />
    //                                         <div className="max-w-2xl max-auto my-10">
    //                                             <Pdf file={dataBerkas.find(e => e.file_title == 'Bird-Certificate')?.file_url} page={page}>
    //   {({ pdfDocument, pdfPage, canvas }) => (
    //     <>
    //       {!pdfDocument && <span>Loading...</span>}
    //       {canvas}
    //       {Boolean(pdfDocument && pdfDocument.numPages) && (
    //         <nav>
    //           <ul className="pager">
    //             <li className="previous">
    //               <button
    //                 disabled={page === 1}
    //                 onClick={() => setPage(page - 1)}
    //               >
    //                 Previous
    //               </button>
    //             </li>
    //             <li className="next">
    //               <button
    //                 disabled={page === pdfDocument.numPages}
    //                 onClick={() => setPage(page + 1)}
    //               >
    //                 Next
    //               </button>
    //             </li>
    //           </ul>
    //         </nav>
    //       )}
    //     </>
    //   )}
    // </Pdf>
    //                                             {/* {dataBerkas.find(e => e.file_title == 'Bird-Certificate')?.file_url} */}
    //                                             {/* <Document  file={dataBerkas.find(e => e.file_title == 'Bird-Certificate')?.file_url}/> */}
    //                                             {/* <div className="w-full h-[500px]"> */}
    //                                             {/* <span className=' text-green-600 cursor-pointer flex gap- items-center' onClick={() => window.open(dataBerkas.find(e => e.file_title == 'Bird-Certificate')?.file_url?dataBerkas.find(e => e.file_title == 'Bird-Certificate')?.file_url:"")}> Buka <FiExternalLink></FiExternalLink> </span> */}
                                                
    //                                             {/* <PDFViewer width="50%" height="50%" document={dataBerkas.find(e => e.file_title == 'Bird-Certificate')?.file_url?dataBerkas.find(e => e.file_title == 'Bird-Certificate')?.file_url:""}>
                                                    
    //                                             </PDFViewer> */}
    //                                             {/* </div> */}
    //                                         </div>                  
                                        )}
                                        {dataBerkas.find(e => e.file_title == 'Bird-Certificate')?.file_type === '/JPEG' || dataBerkas.find(e => e.file_title == 'Bird-Certificate')?.file_type === 'JPEG' || dataBerkas.find(e => e.file_title == 'Bird-Certificate')?.file_type === 'JPG' || dataBerkas.find(e => e.file_title == 'Bird-Certificate')?.file_type === 'PNG' && (
                                            <img src={props.dataBerkas.find(e => e.file_title == 'Bird-Certificate')?.file_url?dataBerkas.find(e => e.file_title == 'Bird-Certificate')?.file_url:""} alt="" width="80%"/>
                                        )}
                                        
                                        
                                            {/* <input id="bird_certificate" name="bird_certificte" type="file" autoComplete="bird_certificate" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/> */}
                                        </div>
                                        </div>
                                    
                                    {/* if () {
                                        
                                    } */}
                                    {dataSchool.id === 100 && (
                                    <div className="sm:col-span-4">
                                        <label htmlFor="pas_photo" className="block text-sm/6 font-medium text-gray-900">Pas Photo Background Merah dan Putih (3x4 dan 2x3)
                                            <span className="text-red-600">*</span>
                                        </label>
                                        <p className="text-xs/5 text-gray-600">PNG, JPG, maks 2MB</p>
                                        <div className="relative inline-block">
                                            <div className="mt-2">
                                                <input id="pas_photo" name="pas_photo" onChange={(e) => validateImage(e.target.files[0], 2, 'Pas-Photo')} type="file" 
                                                className='w-full p-3 mt-3 file:bg-green-500 file:text-white file:border-0
                                                    file:py-1 file:px-3 file:rounded-lg
                                                    file:shadow-xl file:shadow-green-500/30
                                                    text-gray-600'
                                                // className="p-3 w-full text-slate-500 text-sm rounded-sm leading-6 file:absolute file:right-0 file:bg-violet-200 file:text-green-700 file:font-semibold file:border-none file:px-4 file:py-0 file:mr-2 file:rounded-sm hover:file:bg-violet-100 border border-gray-300"
                                                accept="image/png, image/jpeg"/>
                                                {/* <input id="pas_photo" name="pas_photo" type="file" autoComplete="pas_photo" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/> */}
                                            </div>
                                        </div>
                                        {props.dataBerkas.find(e => e.file_title == 'Surat-Kesanggupan')?.file_url? (
                                            <span>Status : <span className="rounded-md w-24 bg-green-400 px-2 py-1 mt-2 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                Sudah Upload
                                                </span>
                                            </span>
                                        ): ""}
                                        <img src={props.dataBerkas.find(e => e.file_title == 'Surat-Kesanggupan')?.file_url?dataBerkas.find(e => e.file_title == 'Surat-Kesanggupan')?.file_url:""} alt="" width={30}/>
                                    </div>
                                    )}
                                    {dataSchool.id === 100 && (
                                    <div className="sm:col-span-4">
                                        <label htmlFor="parent_ktp" className="block text-sm/6 font-medium text-gray-900">KTP Orang Tua / Wali 
                                            <span className="text-red-600">*</span>
                                        </label>
                                        <p className="text-xs/5 text-gray-600">PNG, JPG, maks 2MB</p>
                                        <div className="relative inline-block">
                                            <div className="mt-2">
                                                <input id="parent_ktp" name="parent_ktp" onChange={(e) => validateImage(e.target.files[0],2,'Parent-KTP')} type="file" 
                                                className='w-full p-3 mt-3 
                                                    file:bg-green-500 file:text-white file:border-0
                                                    file:py-1 file:px-3 file:rounded-lg
                                                    file:shadow-xl file:shadow-green-500/30
                                                    text-gray-600'
                                                // className="p-3 w-full text-slate-500 text-sm rounded-sm leading-6 file:absolute file:right-0 file:bg-violet-200 file:text-green-700 file:font-semibold file:border-none file:px-4 file:py-0 file:mr-2 file:rounded-sm hover:file:bg-violet-100 border border-gray-300"
                                                accept="image/png, image/jpeg"/>
                                                {/* <input id="parent_ktp" name="parent_ktp" type="file" autoComplete="parent_ktp" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/> */}
                                            </div>
                                        </div>
                                        {props.dataBerkas.find(e => e.file_title == 'Parent-KTP')?.file_url? (
                                            <span>Status : <span className="rounded-md w-24 bg-green-400 px-2 py-1 mt-2 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                Sudah Upload
                                                </span>
                                            </span>
                                        ): ""}
                                        <img src={props.dataBerkas.find(e => e.file_title == 'Parent-KTP')?.file_url?dataBerkas.find(e => e.file_title == 'Parent-KTP')?.file_url:"" } alt="" width={30}/>
                                    </div>
                                    )}
                                    <div className="sm:col-span-8">
                                        <div className="mt-2">
                                        <label htmlFor="kk" className="block text-sm/6 font-medium text-gray-900">Kartu Keluarga (KK)
                                            <span className="text-red-600">*</span>
                                        </label>
                                        <p className="text-xs/5 text-gray-600">PNG, JPG, PDF maks 2MB</p>
                                        <div className="relative inline-block">
                                                <input id="kk" name="kk" onChange={(e) => validateImage(e.target.files[0], 2, 'KK')} type="file" 
                                                className='w-full p-3 mt-3 file:bg-green-500 file:text-white file:border-0
                                                    file:py-1 file:px-3 file:rounded-lg
                                                    file:shadow-xl file:shadow-green-500/30
                                                    text-gray-600'
                                                // className="p-1 py-6 w-full block text-slate-500 text-sm rounded-lg leading-12 file:absolute file:top-6 file:right-0 file:bg-violet-200 file:text-green-700 file:font-semibold file:text-center file:border-none file:px-4 file:py-0 file:mr-2  file:rounded-sm hover:file:bg-violet-100 border border-gray-300"
                                                accept="image/png, image/jpeg, .pdf"/>
                                                { error && <p className='mt-2 text-sm text-red-500'>{error}</p>}
                                                {/* <input id="kk" name="kk" type="file" autoComplete="kk" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/> */}
                                            </div>
                                            {props.dataBerkas.find(e => e.file_title == 'KK')?.file_url? (
                                            <span className='py-5 mb-3'>Status : <span className="rounded-md w-24 bg-green-400 px-2 py-1 my-5 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                Sudah Upload
                                                </span>
                                            </span>
                                        ): ""}
                                         {(dataBerkas.find(e => e.file_title == 'KK')?.file_type === '/PDF' || dataBerkas.find(e => e.file_title == 'KK')?.file_type === 'PDF' && dataBerkas.find(e => e.file_title == 'KK')?.file_url !== "") && (
                                            <div className="max-w-2xl max-auto my-10">
                                                <iframe src={dataBerkas.find(e => e.file_title == 'KK')?.file_url} width={'100%'} height={'500px'} />
                                                {/* <Document options={options} file={props.dataBerkas.find(e => e.file_title == 'KK')?.file_url?dataBerkas.find(e => e.file_title == 'KK')?.file_url:""}/> */}
                                                {/* <div className="w-full h-[500px]"> */}
                                                
                                                {/* <PDFViewer width="50%" height="50%" document="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf">
                                                    
                                                </PDFViewer> */}
                                                {/* </div> */}
                                            </div>                  
                                        )}
                                        {dataBerkas.find(e => e.file_title == 'KK')?.file_type === '/JPEG' || dataBerkas.find(e => e.file_title == 'KK')?.file_type === 'JPEG' || dataBerkas.find(e => e.file_title == 'KK')?.file_type === 'JPG' || dataBerkas.find(e => e.file_title == 'KK')?.file_type === 'PNG' && (
                                            <img src={props.dataBerkas.find(e => e.file_title == 'KK')?.file_url?dataBerkas.find(e => e.file_title == 'KK')?.file_url : ""} alt="" width={30}/>
                                        )}
                                        </div>

                                    </div>
                                    <div className="sm:col-span-8">
                                        <label htmlFor="surat_kesanggupan" className="block text-sm/6 font-medium text-gray-900">Surat Kesanggupan
                                            <span className="text-red-600">*</span>
                                        </label>
                                        <p className="text-xs/5 text-gray-600">PDF, maks 2MB</p>
                                        <div className="relative inline-block">
                                            <div className="mt-2 flex justify-center items-center">
                                                <a href={(dataSchool.id === 4 || dataSchool.id === 5) ? 'https://cnpcpmdrblvjfzzeqoau.supabase.co/storage/v1/object/sign/uploads/student_submissions/Surat%20Orang%20Tua%20Siap%20Mengikuti%20Aturan%20RIS.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80MzczNjc5MC01MTU4LTQ5N2YtOTUwOS1mM2Y0NDU2NzBiYWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1cGxvYWRzL3N0dWRlbnRfc3VibWlzc2lvbnMvU3VyYXQgT3JhbmcgVHVhIFNpYXAgTWVuZ2lrdXRpIEF0dXJhbiBSSVMucGRmIiwiaWF0IjoxNzQ4OTQ4MTAyLCJleHAiOjE3ODA0ODQxMDJ9.3NiPzmZ-zD2PTvq3JNNU1DnQi3ciIs33ChwF5UNiDo8' : (dataSchool.id === 1 || dataSchool.id === 2 || dataSchool.id === 3 || dataSchool.id === 6) ? 'https://cnpcpmdrblvjfzzeqoau.supabase.co/storage/v1/object/sign/uploads/student_submissions/SURAT%20KESANGGUPAN-FULLDAY.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV80MzczNjc5MC01MTU4LTQ5N2YtOTUwOS1mM2Y0NDU2NzBiYWMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJ1cGxvYWRzL3N0dWRlbnRfc3VibWlzc2lvbnMvU1VSQVQgS0VTQU5HR1VQQU4tRlVMTERBWS5wZGYiLCJpYXQiOjE3NTc2NDgwNjQsImV4cCI6MTc4OTE4NDA2NH0.mCRdS-e9Q_dIUCTGj67KPl6MLYYPP-3cSoDqVxuNuCU': ''} 
                                                target='_blank'
                                                className='w-full p-3 mt-3 flex-1 items-center bg-green-700 text-white border-0
                                                py-2 px-3 rounded-lg text-sm shadow-xl 
                                                    '
                                                // className='btn w-1/3 block btn-sm text-sm text-gray-200 bg-green-900 hover:bg-gray-800'
                                                >Template</a>
                                                {/* <div className='flex flex-grow gap-1 px-2 mt-10'> */}
                                                {/* {submission_status ==='' && } */}
                                                                        
                                                {/* </div> */}
                                                <input id="surat_kesanggupan" name="surat_kesanggupan" onChange={(e) => validateImage(e.target.files[0],2, 'Surat-Kesanggupan')} type="file" 
                                                className='w-full p-3 mt-3 flex items-center file:bg-green-500 file:text-white file:border-0
                                                    file:py-1 file:px-3 file:rounded-lg
                                                    file:shadow-xl file:shadow-green-500/30
                                                    text-gray-600'
                                                // className="p-3 w-full text-slate-500 text-sm rounded-sm leading-6 file:absolute file:right-0 file:bg-violet-200 file:text-green-700 file:font-semibold file:border-none file:px-4 file:py-0 file:mr-2 file:rounded-sm hover:file:bg-violet-100 border border-gray-300"
                                                accept=".pdf"/>
                                                {/* <input id="surat_kesanggupan" name="surat_kesanggupan" type="file" autoComplete="surat_kesanggupan" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/> */}
                                            </div>
                                            {props.dataBerkas[4]?.file_url? (
                                            <span>Status : <span className="rounded-md w-24 bg-green-400 px-2 py-1 mt-2 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                Sudah Upload
                                                </span>
                                            </span>
                                        ): ""}
                                         {(dataBerkas[4]?.file_type === '/PDF' || dataBerkas[4]?.file_type === 'PDF' && dataBerkas.find(e => e.file_title == 'Surat-Kesanggupan')?.file_url !== "") && (
                                            <div className="max-w-2xl max-auto my-10">
                                                <iframe src={dataBerkas.find(e => e.file_title == 'Surat-Kesanggupan')?.file_url} width={'100%'} height={'500px'} />
                                                {/* <Document options={options} file={props.dataBerkas[4]?.file_url?dataBerkas[4]?.file_url:""}/> */}
                                                {/* <div className="w-full h-[500px]"> */}
                                                
                                                {/* <PDFViewer width="50%" height="50%" document="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf">
                                                    
                                                </PDFViewer> */}
                                                {/* </div> */}
                                            </div>                  
                                        )}
                                        {dataBerkas.find(e => e.file_title == 'Surat-Kesanggupan')?.file_type === '/JPEG' || dataBerkas.find(e => e.file_title == 'Surat-Kesanggupan')?.file_type === 'JPEG' || dataBerkas.find(e => e.file_title == 'Surat-Kesanggupan')?.file_type === 'JPG' || dataBerkas.find(e => e.file_title == 'Surat-Kesanggupan')?.file_type === 'PNG' && (

                                            <img src={props.dataBerkas[4]?.file_url?dataBerkas[4]?.file_url : ""} alt="" width={30}/>
                                        ) }
                                        </div>
                                    </div>
                                    <div className="sm:col-span-8">
                                        <label htmlFor="certificate" className="block text-sm/6 font-medium text-gray-900">Sertifikat / Syahadah Hafalan</label>
                                        <p className="text-xs/5 text-gray-600">PDF, maks 5MB</p>
                                        <div className="relative inline-block">
                                            <div className="mt-2">
                                                <input id="certificate" name="certificate" onChange={(e)=> validateImage(e.target.files[0], 5, 'Syahadah')} type="file" 
                                                className='w-full p-3 mt-3 file:bg-green-500 file:text-white file:border-0
                                                    file:py-1 file:px-3 file:rounded-lg
                                                    file:shadow-xl file:shadow-green-500/30
                                                    text-gray-600'
                                                // className="p-3 w-full text-slate-500 text-sm rounded-sm leading-6 file:absolute file:right-0 file:bg-violet-200 file:text-green-700 file:font-semibold file:border-none file:px-4 file:py-0 file:mr-2 file:rounded-sm hover:file:bg-violet-100 border border-gray-300"
                                                accept=".pdf"/>
                                                {/* <input id="certificate" name="certificate" type="file" autoComplete="certificate" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/> */}
                                            </div>
                                        </div>
                                        {props.dataBerkas.find(e => e.file_title == 'Syahadah')?.file_url? (
                                            <span className=''>Status : <span className="rounded-md w-24 bg-green-400 px-2 py-1 mt-2 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                Sudah Upload
                                                </span>
                                            </span>
                                        ): ""}
                                         {(dataBerkas.find(e => e.file_title == 'Syahadah')?.file_type === '/PDF' || dataBerkas.find(e => e.file_title == 'Syahadah')?.file_type === 'PDF' && dataBerkas.find(e => e.file_title == 'Syahadah')?.file_url !== "" ) && (
                                            <div className="max-w-2xl max-auto my-10">
                                                <iframe src={dataBerkas.find(e => e.file_title == 'Syahadah')?.file_url} width={'100%'} height={'500px'} />
                                                {/* <Document options={options} file={props.dataBerkas.find(e => e.file_title == 'Syahadah')?.file_url?dataBerkas.find(e => e.file_title == 'Syahadah')?.file_url:""}/> */}
                                                {/* <div className="w-full h-[500px]"> */}
                                                
                                                {/* <PDFViewer width="50%" height="50%" document="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf">
                                                    
                                                </PDFViewer> */}
                                                {/* </div> */}
                                            </div>                  
                                        )}
                                        {dataBerkas.find(e => e.file_title == 'Syahadah')?.file_type === '/JPEG' || dataBerkas.find(e => e.file_title == 'Syahadah')?.file_type === 'JPEG' || dataBerkas.find(e => e.file_title == 'Syahadah')?.file_type === 'JPG' || dataBerkas.find(e => e.file_title == 'KK')?.file_type === 'PNG' && (

                                        <img src={props.dataBerkas.find(e => e.file_title == 'Syahadah')?.file_url?dataBerkas.find(e => e.file_title == 'Syahadah')?.file_url:""} alt="" width={30} className=''/>
                                        )}
                                    </div>
                                    

                                   
                                </div>
                                <div className='flex justify-center text-center my-10'>
                                     
                                        {!props.complete && (
                                            <button type="submit" className='btn w-full py-3 block btn-sm  text-gray-200 bg-green-900 hover:bg-gray-800' disabled={props.isPending}
                                                onClick={(e) => {
                                                    setTimeout(() => {
                                                        props.setParamNavigasi(props.currentStep+1)
                                                    }, 1000);
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
                                                            props.dataBerkas.length>0? 'Edit':
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

export default BerkasForm;