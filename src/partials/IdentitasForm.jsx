import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
// import { data } from 'autoprefixer';
import  React, { useEffect, useState } from 'react';
import axios from 'axios';

function IdentitasForm(props) {
    const [full_name, setFull_name] = useState("")
    const [gender, setGender] = useState("")
    const [phone_number, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [school_id, setSchoolId] = useState("")
    const [school_name, setSchoolName] = useState("")
    const [prev_school, setPrevSchool] = useState("")
    const [prev_school_address, setPrevSchoolAddress] = useState("")
    const [kk_number, setKKNumber] = useState("")
    const [nik, setNIK] = useState("")
    const [nisn, setNISN] = useState("")
    const [pob, setPob] = useState("")
    const [dob, setDob] = useState("")
    const [medical_history, setMedicalHistory] = useState("")
    const [sickness_history, setSicknessHistory] = useState("")
    const [home_address, setAddress] = useState("")
    const [child_number, setChildNumber] = useState("")
    const [child_status, setChildStatus] = useState("")
    const [live_with, setLiveWith] = useState("")
    const [parent_email, setParentEmail] = useState("")
    // const [parent_ktp, setParentKTP] = useState("")
    const [parent_phone_number, setParentPhoneNumber] = useState("")
    const [distance, setDistance] = useState("")
    const [nationality, setNationality] = useState("")
    const [province, setProvince] = useState("")
    const [region, setRegion] = useState("")
    const [postal_code, setPostalCode] = useState("")
    const [aspiration, setAspiration] = useState("")
    const [dataWilayahProvinces, setDataWilayahProvinces] = useState([])
    const [dataWilayahRegencies, setDataWilayahRegencies] = useState([])
    const [dataWilayahDistricts, setDataWilayahDistricts] = useState([])

    const data = { 
        full_name, 
        gender,
        phone_number,
        email,
        prev_school,
        prev_school_address,
        kk_number,
        nik,
        nisn,
        pob,
        dob,
        medical_history,
        sickness_history,
        home_address,
        child_number,
        child_status,
        live_with,
        parent_email,
        parent_phone_number,
        distance,
        nationality,
        province,
        region,
        postal_code,
        aspiration
    }

    const saveData = (e) => {
        e.preventDefault()

        props.onSubmit(data)
    }

    useEffect(()=> {
        // getDataWilayahProvince()
        // getDataWilayahRegencies()
        // getDataWilayahDistritc()
    },[])
    // const getDataWilayahProvince = async () => {
    //     await axios.get("https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json")
    //         // .then(res => res.json())
    //         .then(res => {
    //             setDataWilayahProvinces(res)
    //             console.log(dataWilayahProvinces)
    //         })
    // }
    // const getDataWilayahRegencies = async (code) => {
    //     await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${code??13}.json`)
    //         .then(res => {
    //             setDataWilayahProvinces(res)
    //         })
    // }
    // const getDataWilayahDistritc = async (code) => {
    //     await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${code??12}.json`)
    //         .then(res => {
    //             setDataWilayahProvinces(res)
    //         })
    // }

    return (
        <section className="relative">
            <div className='max-w-6xl mx-auto px-4 sm:px-6'>
                <div className='py-12 md:py-12'>
                    <div className='max-w-sm md:max-w-4xl mx-auto'>
                        <form action="" onSubmit={saveData} encType=''>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-3xl font-semibold text-gray-900">Identitas Calon Santri</h2> <hr className='inline border-gray-900/10 py-3' />
                                {/* <div className="border-b border-gray-900/20 py-3"></div> */}
                                <p className="mt-1 text-sm/6 text-gray-600">
                                    {/* This information will be displayed publicly so be careful what you share. */}
                                </p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                    <label htmlFor="full_name" className="block text-sm/6 font-medium text-gray-900">Nama Lengkap <span className="text-red-600">*</span></label>
                                    <span className="text-sm italic">Isi sesuai dokumen resmi yang berlaku (akta atau ijazah sebelumnya)</span>
                                    <div className="mt-2">
                                        <input id="full_name" name="full_name" pattern="^[A-Za-z0-9.']{3,50}$" error="Nama Lengkap Invalid" onChange={e => (setFull_name(e.target.value))} type="text" autoComplete="full_name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 first-letter peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required/>
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Nama Lengkap tidak valid
                                        </span>
                                    </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label className="block text-gray-900 text-sm/7 font-medium mb-1" htmlFor="jenis_kelamin">Jenis Kelamin <span className="text-red-600">*</span></label>
                                        <input name="gender" onChange={(e) => setGender(e.target.value)} value={gender=='male'?gender:'male'} type="radio" className="form-input text-gray-800" placeholder="Enter your email address" required /> <span className='text-gray-800 text-sm font-medium'>Laki-Laki</span>
                                        <input name="gender" onChange={(e) => setGender(e.target.value)} value={gender=='female'?gender:'female'} type="radio" className="form-input text-gray-800 ml-5" placeholder="Enter your email address" required /> <span className='text-gray-800 text-sm font-medium'>Perempuan</span>
                                    {/* <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Jenis Kelamin</label>
                                    <div className="mt-2">
                                        <input id="gender" name="gender" type="text" autoComplete="gender" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                    </div> */}
                                    </div>
                                    <div className="sm:col-span-4">
                                    <label htmlFor="phone_number" className="block text-sm/6 font-medium text-gray-900">No. WhatsApp <span className="text-red-600">*</span></label>
                                    <div className="mt-2">
                                        <input id="phone_number" name="phone_number" onChange={(e) => setPhoneNumber(e.target.value)} pattern="^[0-9]{3,14}" type="text" autoComplete="phone_number" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"/>
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block" required>
                                            No WhatsApp hanya angka
                                        </span>
                                    </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email</label>
                                    <div className="mt-2">
                                        <input id="email" name="email" onChange={(e) => setEmail(e.target.value)} pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/" type="email" autoComplete="email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required/>
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Email tidak valid
                                        </span>
                                    </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                    <label htmlFor="prev_school" className="block text-sm/6 font-medium text-gray-900">Sekolah Asal <span className="text-red-600">*</span></label>
                                    <div className="mt-2">
                                        <input id="prev_school" name="prev_school" onChange={(e) => setPrevSchool(e.target.value)} type="text" autoComplete="prev_school" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required/>
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Sekolah Asal tidak boleh kosong
                                        </span>
                                    </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                    <label htmlFor="prev_school_address" className="block text-sm/6 font-medium text-gray-900">Alamat Sekolah Asal <span className="text-red-600">*</span></label>
                                    <div className="mt-2">
                                        <input id="prev_school_address" name="prev_school_address" onChange={(e) => setPrevSchoolAddress(e.target.value)} type="text" autoComplete="prev_school_address" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required/>
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Alamat Sekolah Asal tidak boleh kosong
                                        </span>
                                    </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                    <label htmlFor="nisn" className="block text-sm/6 font-medium text-gray-900">NISN  (Nomor Induk Siswa Nasional)</label>
                                    <span className='text-sm italic'>Jika tidak memiliki silahkan dikosongkan</span>
                                    <div className="mt-2">
                                        <input id="nisn" name="nisn" type="text" autoComplete="nisn" onChange={(e) => setNISN(e.target.value)} pattern="^[0-9]{10}" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"/>
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            NISN tidak valid
                                        </span>
                                    </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                    <label htmlFor="kk_number" className="block text-sm/6 font-medium text-gray-900">Nomor KK <span className="text-red-600">*</span></label>
                                    <div className="mt-2">
                                        <input id="kk_number" name="kk_number" onChange={(e) => setKKNumber(e.target.value)} pattern="^[0-9]{16}" type="text" autoComplete="kk_number" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required/>
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Nomor KK tidak valid
                                        </span>
                                    </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                    <label htmlFor="nik" className="block text-sm/6 font-medium text-gray-900">NIK <span className="text-red-600">*</span></label>
                                    <div className="mt-2">
                                        <input id="nik" name="nik" onChange={(e) => setNIK(e.target.value)} pattern="^[0-9]{16}" type="text" autoComplete="nik" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required/>
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            NIK tidak valid
                                        </span>
                                    </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                    <label htmlFor="pob" className="block text-sm/6 font-medium text-gray-900">Tempat Lahir <span className="text-red-600">*</span></label>
                                    <span className="text-sm italic">Isi sesuai dokumen resmi yang berlaku</span>
                                    <div className="mt-2">
                                        <input id="pob" name="pob" onChange={(e) => setPob(e.target.value)} type="text" autoComplete="pob" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required/>
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Tempat lahir tidak valid
                                        </span>
                                    </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                    <label htmlFor="dob" className="block text-sm/6 font-medium text-gray-900">Tanggal Lahir <span className="text-red-600">*</span></label>
                                    <span className="text-sm italic">Isi sesuai dokumen resmi yang berlaku</span>
                                    <div className="mt-2">
                                        <input id="dob" name="dob" onChange={(e) => setDob(e.target.value)} type="date" autoComplete="dob" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" required/>
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Tanggal lahir tidak valid
                                        </span>
                                    </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                    <label htmlFor="medical_history" className="block text-sm/6 font-medium text-gray-900">Riwayat Kesehatan <span className="text-red-600">*</span></label>
                                    <span className="text-sm italic">Memiliki riwayat penyakit tertentu?</span>
                                    <div className="mt-2">
                                        <input name="medical_history" onChange={(e) => setMedicalHistory(e.target.value)} value={"have"} type="radio" className="form-input text-gray-800" placeholder="Enter your email address" required /> <span className='text-gray-800 text-sm font-medium'>Ada</span>
                                        <input name="medical_history" onChange={(e) => setMedicalHistory(e.target.value)} value={"none"} type="radio" className="form-input text-gray-800 ml-5" placeholder="Enter your email address" required /> <span className='text-gray-800 text-sm font-medium'>Tidak Ada</span>
                                        {/* <input id="medical_history" name="medical_history" type="text" autoComplete="medical_history" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/> */}
                                    </div>
                                    </div>
                                    
                                    <div className="sm:col-span-4">
                                    <label htmlFor="sickness_history" className="block text-sm/6 font-medium text-gray-900">Riwayat Penyakit Tertentu</label>
                                    <span className="text-sm italic">Sebutkan riwayat penyakit yang diderita (jika ada)</span>
                                    <div className="mt-2">
                                        <input id="sickness_history" name="sickness_history" onChange={(e) => setSicknessHistory(e.target.value)} type="text" autoComplete="sickness_history" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"/>
                                    </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                    <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">Alamat Rumah Lengkap <span className="text-red-600">*</span></label>
                                    <span className="text-sm italic">Contoh: JL. Cimandiri 8B No. 34 A Perum Graha Asri, Desa Jatireja, Kec Cikarang Timur, Kab Bekasi 17530</span>
                                    <div className="mt-2">
                                        <input id="address" name="address" onChange={(e) => setAddress(e.target.value)} type="text" autoComplete="address" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required/>
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Alamat Rumah tidak valid
                                        </span>
                                    </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                    <label htmlFor="child_status" className="block text-sm/6 font-medium text-gray-900">Status Anak <span className="text-red-600">*</span></label>
                                    <div className="mt-2">
                                        <select id="child_status" name="child_status" onChange={(e) => setChildStatus(e.target.value)} autoComplete="child_status" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required>
                                            <option value="">Pilih Status Anak</option>
                                            <option value="anak_kandung" defaultValue={"anak_kandung"}>Anak Kandung</option>
                                            <option value="anak_angkat">Anak Angkat</option>
                                            <option value="anak_asuh">Anak Asuh</option>
                                            <option value="lainnya">Lainnya</option>
                                        </select>
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Status Anak tidak valid
                                        </span>
                                        {/* <input id="child_status" name="child_status" type="text" autoComplete="child_status" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/> */}
                                    </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                    <label htmlFor="child_number" className="block text-sm/6 font-medium text-gray-900">Anak ke- <span className="text-red-600">*</span></label>
                                    <div className="mt-2">
                                        <input id="child_number" name="child_number" onChange={(e) => setChildNumber(e.target.value)} type="text" autoComplete="child_number" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required/>
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Anak ke- tidak boleh kosong
                                        </span>
                                    </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                    <label htmlFor="live_with" className="block text-sm/6 font-medium text-gray-900">Tinggal Bersama <span className="text-red-600">*</span></label>
                                    <div className="mt-2">
                                        <select id="live_with" name="live_with" onChange={(e) => setLiveWith(e.target.value)} autoComplete="live_with" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required>
                                            <option value="">Pilih Tinggal Bersama</option>
                                            <option value="parent" defaultValue={"parent"}>Orang Tua</option>
                                            <option value="guardian">Wali</option>
                                            <option value="kos">Anak Asuh</option>
                                            <option value="dormitory">Asrama</option>
                                        </select>
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Tinggal Bersama tidak boleh kosong
                                        </span>
                                        {/* <input id="live_with" name="live_with" type="text" autoComplete="live_with" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/> */}
                                    </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                    <label htmlFor="parent_phone_numb" className="block text-sm/6 font-medium text-gray-900">No HP/WA Orang Tua <span className="text-red-600">*</span></label>
                                    <span className='text-sm italic'>Diisi No. telepon seluler yang aktif (milik pribadi orang tua, boleh ayah atau ibu, atau wali), Mohon dipilih salah satu yang paling mudah dihubungi.</span>
                                    <div className="mt-2">
                                        <input id="parent_phone_numb" name="parent_phone_numb" onChange={(e) => setParentPhoneNumber(e.target.value)} pattern="^[0-9]{3,14}" type="text" autoComplete="parent_phone_numb" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required/>
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            No HP/WA Orang Tua tidak valid
                                        </span>
                                    </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                    <label htmlFor="parent_email" className="block text-sm/6 font-medium text-gray-900">Email Orang Tua <span className="text-red-600">*</span></label>
                                    <span className='text-sm italic'>Diisi email yang aktif (milik pribadi orang tua, boleh ayah atau ibu, atau wali), Mohon dipilih yang paling aktif dan ingat passwordnya.</span>
                                    <div className="mt-2">
                                        <input id="parent_email" name="parent_email" onChange={(e) => setParentEmail(e.target.value)} type="email" autoComplete="parent_email" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required/>
                                        <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                                            Email Orang Tua tidak valid
                                        </span>
                                    </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                    <label htmlFor="distance" className="block text-sm/6 font-medium text-gray-900">Jarak <span className="text-red-600">*</span></label>
                                    <div className="mt-2">
                                        <select id="distance" name="distance" onChange={(e) => setDistance(e.target.value)} autoComplete="distance" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required>
                                            <option value="" >Pilih Jarak</option>
                                            <option value="less_than_1km" defaultValue={"less_than_1km"}>Kurang dari 1 Km</option>
                                            <option value="1_-_5km">1 - 5 Km</option>
                                            <option value="more_than_5km">Lebih dari 5 Km</option>
                                            <option value="other">Lainnya</option>
                                        </select>
                                        {/* <input id="live_with" name="live_with" type="text" autoComplete="live_with" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/> */}
                                    </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                    <label htmlFor="nationality" className="block text-sm/6 font-medium text-gray-900">Kewarganegaraan <span className="text-red-600">*</span></label>
                                    <div className="mt-2">
                                        <input id="nationality" name="nationality" onChange={(e) => setNationality(e.target.value)} type="text" autoComplete="nationality" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required/>
                                    </div>
                                    </div>
                                    {/* <div className="sm:col-span-4">
                                        <label htmlFor="nationality" className="block text-sm/6 font-medium text-gray-900">Kewarganegaraan</label>
                                        <div className="mt-2 grid grid-cols-1">
                                            <select id="nationality" name="nationality" autoComplete="nationality" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                            <option>Indonesia</option>
                                            <option>Malaysia</option>
                                            <option>Singapura</option>
                                            </select>
                                            <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 8 8" fill="currentColor" aria-hidden="true"  data-slot="icon">
                                            <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                    </div> */}


                                        {/* <div className="col-span-full">
                                        <label htmlFor="address" className="block text-sm/6 font-medium text-gray-900">Alamat</label>
                                        <div className="mt-2">
                                            <input type="text" name="address" id="address" autoComplete="address" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                        </div>
                                        </div> */}

                                        <div className="sm:col-span-2 sm:col-start-1">
                                        <label htmlFor="province" className="block text-sm/6 font-medium text-gray-900">Provinsi <span className="text-red-600">*</span></label>
                                        <div className="mt-2">
                                            {/* <select id="provinces" name="provinces" autoComplete="province" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                                {dataWilayahProvinces.map((prov) => {
                                                    
                                                    <option value={prov.id}>{prov.name}</option>
                                                    
                                                })}
                                            </select> */}
                                            <input type="text" name="province" id="province" onChange={(e) => setProvince(e.target.value)} autoComplete="province-level2" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required/>
                                        </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                        <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">Kabupaten <span className="text-red-600">*</span></label>
                                        <div className="mt-2">
                                            <input type="text" name="region" id="region" onChange={(e) => setRegion(e.target.value)} autoComplete="address-level1" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required/>
                                        </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                        <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">Kode Pos <span className="text-red-600">*</span></label>
                                        <div className="mt-2">
                                            <input type="text" name="postal-code" id="postal-code" onChange={(e) => setPostalCode(e.target.value)} autoComplete="postal-code" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" required/>
                                        </div>
                                        </div>
                                  
                                   

                                    <div className="col-span-full">
                                    <label htmlFor="aspiration" className="block text-sm/6 font-medium text-gray-900">
                                        Cita-Cita
                                        <span className="text-red-600">*</span>
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                        id="aspiration"
                                        name="aspiration"
                                        onChange={(e) => setAspiration(e.target.value)}
                                        rows={5}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                                        defaultValue={''}
                                        required
                                        />
                                    </div>
                                    <p className="mt-3 text-sm/6 text-gray-600 italic">Tulis cita-cita dan harapan ananda bersekolah di Rabbaanii Islamic School.</p>
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

export default IdentitasForm;