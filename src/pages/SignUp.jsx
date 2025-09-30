import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Header from '../partials/Header';
import Banner from '../partials/Banner';
import supabase from '../client/supabase_client';
import Swal from '../utils/Swal';
import { useRegister } from '../features/hooks/use-register';

function SignUp() {
  const { code, pid } = useParams();
  const navigate = useNavigate();
  const { onSubmit, results, form, loading, error, notified, isEditMode } = useRegister();
  
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = form;
  const [schoolOptions, setSchoolOptions] = useState([]);
  const [modal_show, setModalShow] = useState(false);
  const [modal_data, setModalData] = useState({
    type: "",
    title: "",
    message: "",
    text: "OK",
    url: "/",
    text2: "",
    url2: ""
  });

  // Watch form values
  const watchPassword = watch("password");
  const watchConfirmPassword = watch("confirm_password");
  const watchPassword_ = watch("password_");
  const watchConfirmPassword_ = watch("confirm_password_");

  useEffect(() => {
    if (code) {
      const schoolInfo = getSchoolIdSchoolName(code);
      if (schoolInfo && schoolInfo.id) {
        setValue("school_id", schoolInfo.id.toString());
        setValue("subschool", schoolInfo.subschool || "");
      }
    }
    
    if (pid) {
      validatePID(pid);
      setValue("pid", pid);
    }
    
    getSchoolsOptions();
  }, [code, pid, setValue]);

  const getSchoolsOptions = async () => {
    try {
      let { data: schools, error } = await supabase
        .from('schools')
        .select('*');
        
      if (!error && schools) {
        const options = schools.map(school => ({
          id: school.school_id,
          name: school.school_name,
          value: school.school_id.toString()
        }));
        setSchoolOptions(options);
      }
    } catch (error) {
      console.error('Error fetching schools:', error);
    }
  };

  const getSchoolIdSchoolName = (code) => {
    const schoolMap = {
      'tkit-a': { id: 2, subschool: 'A', name: 'TKIT A Rabbaanii Islamic School' },
      'tkit-b': { id: 2, subschool: 'B', name: 'TKIT B Rabbaanii Islamic School' },
      'sdit': { id: 1, subschool: '', name: 'SDIT Rabbaanii Islamic School' },
      'smpi': { id: 3, subschool: '', name: 'SMPI Rabbaanii Islamic School' },
      'smp-pesantren': { id: 4, subschool: '', name: 'SMP Pesantren Rabbaanii Islamic School' },
      'sma-pesantren': { id: 5, subschool: '', name: 'SMA Pesantren Rabbaanii Islamic School' },
      'smai': { id: 6, subschool: '', name: 'SMAI Rabbaanii Islamic School' },
      'rabbaanii-ciwidey': { id: 100, subschool: '', name: 'Rabbaanii Ciwidey' }
    };
    
    return schoolMap[code] || { id: 0, subschool: '', name: 'Not Found' };
  };

  const validatePID = async (pid) => {
    try {
      const { data: applicants, error } = await supabase
        .from('applicants')
        .select('*, applicant_schools(*)')
        .eq('regist_number', pid)
        .eq('status', 'active')
        .is('deleted_at', null);

      if (applicants && applicants.length > 0) {
        const applicant = applicants[0];
        
        setValue("full_name", applicant.full_name || "");
        setValue("gender", applicant.gender || "");
        setValue("phone_number", applicant.phone_number || "");
        setValue("regist_number", applicant.regist_number || "");
        setValue("email", applicant.email || "");
        setValue("dob", applicant.dob ? new Date(applicant.dob).toISOString().split('T')[0] : "");
        setValue("school_id", applicant.applicant_schools?.[0]?.school_id?.toString() || "");
        setValue("subschool", applicant.applicant_schools?.[0]?.subschool || "");
        setValue("pid", pid);
        setValue("media", applicant.media || "");
        
      } else {
        setModalData({
          title: "No. Registrasi tidak valid",
          message: "Nomor registrasi yang Anda masukkan tidak valid atau sudah tidak aktif."
        });
        setModalShow(true);
      }
    } catch (error) {
      console.error('Error validating PID:', error);
      setModalData({
        title: "Error",
        message: "Terjadi kesalahan saat memvalidasi nomor registrasi."
      });
      setModalShow(true);
    }
  };

  const handleFormSubmit = async (data) => {
    try {
      // Format date properly
      if (data.dob) {
        data.dob = new Date(data.dob).toISOString();
      }
      
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting form:', error);
      setModalData({
        title: "Error",
        message: "Terjadi kesalahan saat mengirim formulir."
      });
      setModalShow(true);
    }
  };

  // Handle form submission results
  useEffect(() => {
    if (results && Object.keys(results).length > 0) {
      if (results.f1 === '01') {
        // Registration failed
        setModalData({
          title: "Pendaftaran Gagal",
          message: results.f2 || "Terjadi kesalahan saat pendaftaran."
        });
        setModalShow(true);
      } else {
        // Success
        setModalData({
          type: "success",
          title: isEditMode ? "Perubahan Berhasil" : "Pendaftaran Berhasil",
          message: isEditMode 
            ? "Alhamdulillah, perubahan jenjang berhasil." 
            : "Alhamdulillah, tahap pra pendaftaran berhasil. Selanjutnya Ananda dapat melanjutkan pembayaran melalui aplikasi.",
          text2: "Lanjut ke Login",
          url2: "/login"
        });
        setModalShow(true);
        
        if (!isEditMode) {
          reset();
        }
      }
    }
  }, [results, isEditMode, reset]);

  // Handle errors
  useEffect(() => {
    if (error && Object.keys(error).length > 0) {
      setModalData({
        title: "Error",
        message: error.message || "Terjadi kesalahan saat proses pendaftaran."
      });
      setModalShow(true);
    }
  }, [error]);

  const handleCloseModal = () => {
    setModalShow(false);
    if (results && results.f1 !== '01') {
      navigate('/login');
    }
  };

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    
    if (cleaned.startsWith('0')) {
      return cleaned;
    } else if (cleaned.startsWith('62')) {
      return '0' + cleaned.slice(2);
    } else {
      return '0' + cleaned;
    }
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    e.target.value = formatted;
  };

  const schoolInfo = getSchoolIdSchoolName(code);

  return (
    <div className="flex flex-col max-w-lg min-h-screen my-0 mx-auto shadow-lg overflow-hidden relative">
      <Header />

      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-12">
                <h1 className="h1">
                  {isEditMode ? 'Ubah Jenjang' : 'Pra Pendaftaran'}
                </h1>
                <p className="text-xl text-gray-600 inline-grid">
                  {isEditMode 
                    ? 'Silahkan mengubah jenjang pendidikan yang diinginkan.'
                    : 'Silahkan melengkapi formulir pra pendaftaran dan informasi pembuatan akun.'}
                </p>
              </div>

              {modal_show && (
                <Swal dataModal={modal_data} setClose={handleCloseModal} />
              )}

              <div className="max-w-sm mx-auto">
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                  {pid && (
                    <input type="hidden" {...register("regist_number")} />
                  )}
                  
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="full_name">
                        Nama Lengkap <span className="text-red-600">*</span>
                      </label>
                      <input 
                        id="full_name" 
                        {...register("full_name")}
                        type="text" 
                        className="form-input w-full text-gray-800" 
                        placeholder="Masukkan Nama" 
                        disabled={isEditMode}
                      />
                      {errors.full_name && (
                        <p className="text-xs text-red-500 mt-1">{errors.full_name.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-900 text-sm font-medium mb-1">
                        Jenis Kelamin <span className="text-red-600">*</span>
                      </label>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center">
                          <input 
                            type="radio" 
                            value="male"
                            {...register("gender")}
                            className="form-radio text-gray-800" 
                            disabled={isEditMode}
                          />
                          <span className='text-gray-800 text-sm font-medium ml-2'>Laki-Laki</span>
                        </label>
                        <label className="flex items-center">
                          <input 
                            type="radio" 
                            value="female"
                            {...register("gender")}
                            className="form-radio text-gray-800" 
                            disabled={isEditMode}
                          />
                          <span className='text-gray-800 text-sm font-medium ml-2'>Perempuan</span>
                        </label>
                      </div>
                      {errors.gender && (
                        <p className="text-xs text-red-500 mt-1">{errors.gender.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="phone_number">
                        No. WhatsApp <span className="text-red-600">*</span>
                      </label>
                      <input 
                        id="phone_number" 
                        {...register("phone_number")}
                        onChange={handlePhoneChange}
                        className="form-input w-full text-gray-800" 
                        placeholder="No. WhatsApp Aktif" 
                        disabled={isEditMode}
                      />
                      {errors.phone_number && (
                        <p className="text-xs text-red-500 mt-1">{errors.phone_number.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="email">
                        Email <span className="text-red-600">*</span>
                      </label>
                      <input 
                        id="email" 
                        type="email" 
                        {...register("email")}
                        className="form-input w-full text-gray-800" 
                        placeholder="Masukkan Email Aktif" 
                        disabled={isEditMode}
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="dob">
                        Tanggal Lahir <span className="text-red-600">*</span>
                      </label>
                      <input 
                        id="dob" 
                        type="date" 
                        {...register("dob")}
                        className="form-input w-full text-gray-800" 
                        // disabled={isEditMode}
                      />
                      {errors.dob && (
                        <p className="text-xs text-red-500 mt-1">{errors.dob.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="school">
                        Jenjang <span className="text-red-600">*</span>
                      </label>
                      
                      {isEditMode ? (
                        <select 
                          id="school_id" 
                          {...register("school_id")}
                          className="form-input w-full text-gray-800"
                          // value={schoolInfo.id}
                          required
                        >
                          <option value="">-Pilih Jenjang-</option>
                          {schoolOptions.map((option) => (
                            <option key={option.id} value={option.value}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="p-3 bg-gray-100 rounded-md border border-gray-300">
                          <p className="text-gray-800 font-medium">{schoolInfo.name}</p>
                        </div>
                      )}
                      
                      {errors.school_id && (
                        <p className="text-xs text-red-500 mt-1">{errors.school_id.message}</p>
                      )}
                    </div>
                  </div>

                  {!isEditMode && (
                    <>
                      <div className='h4 separator mt-6 mb-4'>Informasi Akun</div>

                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="password">
                            Password <span className="text-red-600">*</span>
                          </label>
                          <input 
                            id="password" 
                            type="password" 
                            {...register("password")}
                            className="form-input w-full text-gray-800" 
                            placeholder="Masukkan Password" 
                          />
                          {errors.password && (
                            <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
                          )}
                          <div className="flex items-center p-3 my-2 text-sm text-blue-800 rounded-lg bg-blue-50" role="alert">
                            <svg className="shrink-0 inline w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                            </svg>
                            <span className="font-thin text-sm">Buatlah password yang sederhana dan mudah diingat.</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="confirm_password">
                            Konfirmasi Password <span className="text-red-600">*</span>
                          </label>
                          <input 
                            id="confirm_password" 
                            type="password" 
                            {...register("confirm_password")}
                            className="form-input w-full text-gray-800" 
                            placeholder="Masukkan Konfirmasi Password" 
                          />
                          {errors.confirm_password && (
                            <p className="text-xs text-red-500 mt-1">{errors.confirm_password.message}</p>
                          )}
                          {watchPassword && watchConfirmPassword && watchPassword !== watchConfirmPassword && (
                            <p className="text-xs text-red-500 mt-1">Password tidak sesuai</p>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {isEditMode && (
                    <>
                      <div className='h4 separator mt-6 mb-4'>Ubah Password (Opsional)</div>

                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="password_">
                            Password Baru
                          </label>
                          <input 
                            id="password_" 
                            type="password" 
                            {...register("password_")}
                            className="form-input w-full text-gray-800" 
                            placeholder="Masukkan Password Baru (opsional)" 
                          />
                          {errors.password_ && (
                            <p className="text-xs text-red-500 mt-1">{errors.password_.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="confirm_password_">
                            Konfirmasi Password Baru
                          </label>
                          <input 
                            id="confirm_password_" 
                            type="password" 
                            {...register("confirm_password_")}
                            className="form-input w-full text-gray-800" 
                            placeholder="Masukkan Konfirmasi Password Baru" 
                          />
                          {errors.confirm_password_ && (
                            <p className="text-xs text-red-500 mt-1">{errors.confirm_password_.message}</p>
                          )}
                          {watchPassword_ && watchConfirmPassword_ && watchPassword_ !== watchConfirmPassword_ && (
                            <p className="text-xs text-red-500 mt-1">Password tidak sesuai</p>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label htmlFor="media" className="block text-sm font-medium text-gray-900">
                        Darimana Bapak/Ibu Mendapatkan Informasi tentang Rabbaanii Islamic School?
                      </label>
                      <select 
                        id="media" 
                        {...register("media")}
                        className="w-full appearance-none rounded-md bg-white py-2 px-3 text-base text-gray-900 border border-gray-300 focus:outline-2 focus:outline-indigo-600"
                        disabled={isEditMode}
                      >
                        <option value="">-Pilih Media-</option>
                        <option value="website">Website Rabbaanii</option>
                        <option value="teman/saudara">Teman / Saudara</option>
                        <option value="karyawan/guru">Karyawan/Guru</option>
                        <option value="kajian">Kajian</option>
                        <option value="spanduk">Spanduk</option>
                        <option value="brosur">Brosur</option>
                        <option value="instagram">Instagram</option>
                        <option value="facebook">Facebook</option>
                        <option value="youtube">Youtube</option>
                        <option value="majalah">Majalah</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="tiktok">Tiktok</option>
                        <option value="mesin_pencari">Rekomendasi mesin pencarian internet</option>
                      </select>
                      {errors.media && (
                        <p className="text-xs text-red-500 mt-1">{errors.media.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button 
                        className="btn text-white bg-green-600 hover:bg-green-700 w-full flex items-center justify-center" 
                        disabled={loading}
                        type="submit"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className='pl-3'>Menyimpan...</span>
                          </>
                        ) : (isEditMode ? 'UBAH JENJANG' : 'DAFTAR')}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mt-4">
                    <div className="w-full px-3">
                      <Link to="/" className="btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full relative flex items-center justify-center">
                        <span className="">LAMAN PENDAFTARAN</span>
                      </Link>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 text-center mt-3">
                    *Pastikan data yang diisi sudah benar. Bila ada pertanyaan seputar Kami, silahkan dapat membuka halaman <a href="https://rabbaanii.sch.id/faq/" className='text-blue-300 underline'>FAQ</a> atau menghubungi CS yang tertera di Web. Baarakallahu fiikum.
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Banner />
    </div>
  );
}

export default SignUp;
// import React, { useEffect, useState } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';

// import Header from '../partials/Header';
// import Banner from '../partials/Banner';
// import supabase from '../client/supabase_client'
// import Swal from '../utils/Swal'
// import { useRegister } from '../features/hooks/use-register';

// function SignUp() {
//   const { code, pid } = useParams();
//   const navigate = useNavigate();
//   const { onSubmit, results, form, loading, error, notified } = useRegister();
  
//   const { register, handleSubmit, formState: { errors }, setValue, watch, reset, getValues } = form;
//   const [schoolOptions, setSchoolOptions] = useState([])
//   const [modal_show, setModalShow] = useState(false);
//   const [modal_data, setModalData] = useState({
//     type: "",
//     title: "",
//     message: "",
//     text: "OK",
//     url: "/",
//     text2: "",
//     url2: ""
//   });

//   // Watch form values
//   const watchPassword = watch("password");
//   const watchConfirmPassword = watch("confirm_password");
//   const watchPassword_ = watch("password_");
//   const watchConfirmPassword_ = watch("confirm_password_");

//   // Fixed: Set default values based on code parameter
//   useEffect(() => {
//     if (code) {
//       const schoolInfo = getSchoolIdSchoolName(code);
//       if (schoolInfo && schoolInfo.id) {
//         setValue("school_id", schoolInfo.id.toString());
//         setValue("subschool", schoolInfo.subschool);
//       }
//     }
    
//     if (pid) {
//       validatePID(pid);
//       setValue("pid", pid);
//     }
    
//     getSchoolsOptions();
//   }, [code, pid, setValue]);

//   // Fixed: Improved school options fetching
//   const getSchoolsOptions = async () => {
//     try {
//       let { data: schools, error } = await supabase
//         .from('schools')
//         .select('*');
        
//       if (!error && schools) {
//         const options = schools.map(school => ({
//           id: school.school_id,
//           name: school.school_name,
//           value: school.school_id
//         }));
//         setSchoolOptions(options);
//       }
//     } catch (error) {
//       console.error('Error fetching schools:', error);
//     }
//   };

//   // Fixed: Improved getSchoolIdSchoolName to return object with id and subschool
//   const getSchoolIdSchoolName = (code) => {
//     const schoolMap = {
//       'tkit-a': { id: 2, subschool: 'A', name: 'TKIT A Rabbaanii Islamic School' },
//       'tkit-b': { id: 2, subschool: 'B', name: 'TKIT B Rabbaanii Islamic School' },
//       'sdit': { id: 1, subschool: '', name: 'SDIT Rabbaanii Islamic School' },
//       'smpi': { id: 3, subschool: '', name: 'SMPI Rabbaanii Islamic School' },
//       'smp-pesantren': { id: 4, subschool: '', name: 'SMP Pesantren Rabbaanii Islamic School' },
//       'sma-pesantren': { id: 5, subschool: '', name: 'SMA Pesantren Rabbaanii Islamic School' },
//       'smai': { id: 6, subschool: '', name: 'SMAI Rabbaanii Islamic School' },
//       'rabbaanii-ciwidey': { id: 100, subschool: '', name: 'Rabbaanii Ciwidey' }
//     };
    
//     return schoolMap[code] || { id: 0, subschool: '', name: 'Not Found' };
//   };

//   const validatePID = async (pid) => {
//     try {
//       const { data: applicants, error } = await supabase
//         .from('applicants')
//         .select('*, applicant_schools(*)')
//         .eq('regist_number', pid)
//         .eq('status', 'active')
//         .is('deleted_at', null);

//       if (applicants && applicants.length > 0) {
//         const applicant = applicants[0];
        
//         // Set form values using react-hook-form setValue
//         setValue("full_name", applicant.full_name);
//         setValue("gender", applicant.gender);
//         setValue("phone_number", applicant.phone_number);
//         setValue("regist_number", applicant.regist_number); // Add this line
//         setValue("email", applicant.email);
//         setValue("dob", applicant.dob);
//         // setValue("password_", 'default');
//         setValue("school_id", applicant.applicant_schools[0]?.school_id.toString());
//         setValue("subschool", applicant.applicant_schools[0]?.subschool);
//         setValue("pid", pid);
//         setValue("media", applicant.media);
//         setValue("defaults", applicant);
//       } else {
//         setModalData({
//           title: "No. Registrasi tidak valid",
//           message: "Nomor registrasi yang Anda masukkan tidak valid atau sudah tidak aktif."
//         });
//         setModalShow(true);
//       }
//     } catch (error) {
//       console.error('Error validating PID:', error);
//       setModalData({
//         title: "Error",
//         message: "Terjadi kesalahan saat memvalidasi nomor registrasi: " + error.message
//       });
//       setModalShow(true);
//     }
//   };

//   // Custom submit handler that includes regist_number when pid exists
//   const handleFormSubmit = async (data) => {
//     try {
//       // If pid exists, include regist_number in the data
//       if (pid) {
//         data.regist_number = pid;
//       }
      
//       // Call the original onSubmit function with the modified data
//       await onSubmit(data);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       setModalData({
//         title: "Error",
//         message: "Terjadi kesalahan saat mengirim formulir: " + error.message
//       });
//       setModalShow(true);
//     }
//   };

//   // Handle form submission results
//   useEffect(() => {
//     // if (results) {
//     //   if (results.f1 === '01') {
//     //     // Registration failed
//     //     setModalData({
//     //       title: "Pendaftaran Gagal",
//     //       message: results.f2 || "Terjadi kesalahan saat pendaftaran."
//     //     });
//     //     setModalShow(true);
//     //   } else {
//     //     // Registration success
//     //     setModalData({
//     //       type: "basic",
//     //       title: "Pendaftaran Berhasil",
//     //       message: "Alhamdulillah, tahap pra pendaftaran berhasil. Selanjutnya Ananda dapat melanjutkan pembayaran melalui aplikasi.",
//     //       text2: "Lanjut Pembayaran",
//     //       url2: "/login"
//     //     });
//     //     setModalShow(true);
//     //     // Reset form on success
//     //     reset();
//     //   }
//     // }
//   }, [results, reset]);

//   // Handle errors
//   useEffect(() => {
//     // if (error) {
//     //   setModalData({
//     //     title: "Error",
//     //     message: error.message || "Terjadi kesalahan saat proses pendaftaran."
//     //   });
//     //   setModalShow(true);
//     // }
//   }, [error]);

//   const handleCloseModal = (value) => {
//     setModalShow(false);
//     if (results && results.f1 !== '01') {
//       navigate('/login');
//     }
//   };

//   const formatPhoneNumber = (value) => {
//     const cleaned = value.replace(/\D/g, '');
    
//     if (cleaned.startsWith('0')) {
//       return cleaned;
//     } else if (cleaned.startsWith('62')) {
//       return '0' + cleaned.slice(2);
//     } else {
//       return '0' + cleaned;
//     }
//   };

//   const handlePhoneChange = (e) => {
//     const formatted = formatPhoneNumber(e.target.value);
//     e.target.value = formatted;
//   };

//   // Get the school info for display
//   const schoolInfo = getSchoolIdSchoolName(code);

//   return (
//     <div className="flex flex-col max-w-lg min-h-screen my-0 mx-auto shadow-lg overflow-hidden relative">
//       <Header />

//       <main className="flex-grow">
//         <section className="bg-gradient-to-b from-gray-100 to-white">
//           <div className="max-w-6xl mx-auto px-4 sm:px-6">
//             <div className="pt-32 pb-12 md:pt-40 md:pb-20">

//               <div className="max-w-3xl mx-auto text-center pb-12 md:pb-12">
//                 <h1 className="h1">Pra Pendaftaran</h1>
//                 <p className="text-xl text-gray-600 inline-grid">
//                   Silahkan melengkapi formulir pra pendaftaran dan informasi pembuatan akun.
//                 </p>
//               </div>

//               {modal_show && (
//                 <Swal dataModal={modal_data} setClose={handleCloseModal} />
//               )}

//               <div className="max-w-sm mx-auto">
//                 <form onSubmit={handleSubmit(handleFormSubmit)}>
//                   {/* Hidden field for regist_number when pid exists */}
//                   {pid && (
//                     <input type="hidden" {...register("regist_number")} />
//                   )}
                  
//                   <div className="flex flex-wrap -mx-3 mb-4">
//                     <div className="w-full px-3">
//                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="full_name">
//                         Nama Lengkap <span className="text-red-600">*</span>
//                       </label>
//                       <input 
//                         id="full_name" 
//                         {...register("full_name")}
//                         type="text" 
//                         className="form-input w-full text-gray-800" 
//                         placeholder="Masukkan Nama" 
//                       />
//                       {errors.full_name && (
//                         <p className="text-xs text-red-500 mt-1">{errors.full_name.message}</p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap -mx-3 mb-4">
//                     <div className="w-full px-3">
//                       <label className="block text-gray-900 text-sm font-medium mb-1">
//                         Jenis Kelamin <span className="text-red-600">*</span>
//                       </label>
//                       <div className="flex items-center space-x-4">
//                         <label className="flex items-center">
//                           <input 
//                             type="radio" 
//                             value="male"
//                             {...register("gender")}
//                             className="form-radio text-gray-800" 
//                           />
//                           <span className='text-gray-800 text-sm font-medium ml-2'>Laki-Laki</span>
//                         </label>
//                         <label className="flex items-center">
//                           <input 
//                             type="radio" 
//                             value="female"
//                             {...register("gender")}
//                             className="form-radio text-gray-800" 
//                           />
//                           <span className='text-gray-800 text-sm font-medium ml-2'>Perempuan</span>
//                         </label>
//                       </div>
//                       {errors.gender && (
//                         <p className="text-xs text-red-500 mt-1">{errors.gender.message}</p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap -mx-3 mb-4">
//                     <div className="w-full px-3">
//                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="phone_number">
//                         No. WhatsApp <span className="text-red-600">*</span>
//                       </label>
//                       <input 
//                         id="phone_number" 
//                         {...register("phone_number")}
//                         onChange={handlePhoneChange}
//                         className="form-input w-full text-gray-800" 
//                         placeholder="08xxxxxxxxxx" 
//                       />
//                       {errors.phone_number && (
//                         <p className="text-xs text-red-500 mt-1">{errors.phone_number.message}</p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap -mx-3 mb-4">
//                     <div className="w-full px-3">
//                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="email">
//                         Email <span className="text-red-600">*</span>
//                       </label>
//                       <input 
//                         id="email" 
//                         type="email" 
//                         {...register("email")}
//                         className="form-input w-full text-gray-800" 
//                         placeholder="Masukkan Email Aktif" 
//                       />
//                       {errors.email && (
//                         <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap -mx-3 mb-4">
//                     <div className="w-full px-3">
//                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="dob">
//                         Tanggal Lahir <span className="text-red-600">*</span>
//                       </label>
//                       <input 
//                         id="dob" 
//                         type="date" 
//                         {...register("dob")}
//                         className="form-input w-full text-gray-800" 
//                       />
//                       {errors.dob && (
//                         <p className="text-xs text-red-500 mt-1">{errors.dob.message}</p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap -mx-3 mb-4">
//                     <div className="w-full px-3">
//                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="school">
//                         Jenjang <span className="text-red-600">*</span>
//                       </label>
                      
//                       {pid ? (
//                         <select 
//                           id="school_id" 
//                           {...register("school_id")}
//                           className="form-input w-full text-gray-800"
//                           value={schoolInfo.id}
//                           required
//                         >
//                           <option value="">-Pilih Jenjang-</option>
//                           {schoolOptions.map((option) => (
//                             <option key={option.id} value={option.id}>
//                               {option.name}
//                             </option>
//                           ))}
//                         </select>
//                       ) : (
//                         <div className="p-3 bg-gray-100 rounded-md border border-gray-300">
//                           <p className="text-gray-800 font-medium">{schoolInfo.name}</p>
//                           {/* <p className="text-sm text-gray-600">Jenjang terpilih berdasarkan link pendaftaran</p> */}
//                         </div>
//                       )}
                      
//                       {errors.school_id && (
//                         <p className="text-xs text-red-500 mt-1">{errors.school_id.message}</p>
//                       )}
//                     </div>
//                   </div>

//                   <div className='h4 separator mt-6 mb-4'>Informasi Akun</div>

//                   <div className="flex flex-wrap -mx-3 mb-4">
//                     <div className="w-full px-3">
//                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="password">
//                         Password <span className="text-red-600">*</span>
//                       </label>
//                       {pid && 
//                       <>
//                       <input 
//                         id="password_" 
//                         type="password" 
//                         {...register("password_")}
//                         className="form-input w-full text-gray-800" 
//                         placeholder="Masukkan Password" 
//                       />
//                       {errors.password_ && (
//                         <p className="text-xs text-red-500 mt-1">{errors.password_.message}</p>
//                       )}
//                       </>
//                       }
//                       {!pid && 
//                       <>
//                       <input 
//                         id="password" 
//                         type="password" 
//                         {...register("password")}
//                         className="form-input w-full text-gray-800" 
//                         placeholder="Masukkan Password" 
//                       />
//                       {errors.password && (
//                         <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
//                       )}
//                       </>
                      
//                        }
                      
//                       <div className="flex items-center p-3 my-2 text-sm text-blue-800 rounded-lg bg-blue-50" role="alert">
//                         <svg className="shrink-0 inline w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//                           <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
//                         </svg>
//                         <span className="font-thin text-sm">Buatlah password yang sederhana dan mudah diingat.</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap -mx-3 mb-4">
//                     <div className="w-full px-3">
//                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="confirm_password">
//                         Konfirmasi Password <span className="text-red-600">*</span>
//                       </label>
//                       {pid && 
//                       <>
//                       <input 
//                         id="confirm_password_" 
//                         type="password" 
//                         {...register("confirm_password_")}
//                         className="form-input w-full text-gray-800" 
//                         placeholder="Masukkan Konfirmasi Password" 
//                       />
//                       {errors.confirm_password_ && (
//                         <p className="text-xs text-red-500 mt-1">{errors.confirm_password_.message}</p>
//                       )}
//                       {watchPassword_ && watchConfirmPassword_ && watchPassword_ !== watchConfirmPassword_ && (
//                         <p className="text-xs text-red-500 mt-1">Password tidak sesuai</p>
//                       )}
//                       </>
//                       }
//                       {!pid && 
//                       <>
//                       <input 
//                         id="confirm_password" 
//                         type="password" 
//                         {...register("confirm_password")}
//                         className="form-input w-full text-gray-800" 
//                         placeholder="Masukkan Konfirmasi Password" 
//                       />
//                       {errors.confirm_password && (
//                         <p className="text-xs text-red-500 mt-1">{errors.confirm_password.message}</p>
//                       )}
//                       {watchPassword && watchConfirmPassword && watchPassword !== watchConfirmPassword && (
//                         <p className="text-xs text-red-500 mt-1">Password tidak sesuai</p>
//                       )}
//                       </>
//                       }
                      
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap -mx-3 mb-4">
//                     <div className="w-full px-3">
//                       <label htmlFor="media" className="block text-sm font-medium text-gray-900">
//                         Darimana Bapak/Ibu Mendapatkan Informasi tentang Rabbaanii Islamic School?
//                       </label>
//                       <select 
//                         id="media" 
//                         {...register("media")}
//                         className="w-full appearance-none rounded-md bg-white py-2 px-3 text-base text-gray-900 border border-gray-300 focus:outline-2 focus:outline-indigo-600"
//                       >
//                         <option value="">-Pilih Media-</option>
//                         <option value="website">Website Rabbaanii</option>
//                         <option value="teman/saudara">Teman / Saudara</option>
//                         <option value="karyawan/guru">Karyawan/Guru</option>
//                         <option value="kajian">Kajian</option>
//                         <option value="spanduk">Spanduk</option>
//                         <option value="brosur">Brosur</option>
//                         <option value="instagram">Instagram</option>
//                         <option value="facebook">Facebook</option>
//                         <option value="youtube">Youtube</option>
//                         <option value="majalah">Majalah</option>
//                         <option value="whatsapp">WhatsApp</option>
//                         <option value="tiktok">Tiktok</option>
//                         <option value="mesin_pencari">Rekomendasi mesin pencarian internet</option>
//                       </select>
//                       {errors.media && (
//                         <p className="text-xs text-red-500 mt-1">{errors.media.message}</p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap -mx-3 mt-6">
//                     <div className="w-full px-3">
//                       <button 
//                         className="btn text-white bg-green-600 hover:bg-green-700 w-full flex items-center justify-center" 
//                         disabled={loading}
//                         type="submit"
//                       >
//                         {loading ? (
//                           <>
//                             <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
//                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                             </svg>
//                             <span className='pl-3'>Menyimpan...</span>
//                           </>
//                         ) : 'DAFTAR'}
//                       </button>
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap -mx-3 mt-4">
//                     <div className="w-full px-3">
//                       <Link to="/" className="btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full relative flex items-center justify-center">
//                         <span className="">LAMAN PENDAFTARAN</span>
//                       </Link>
//                     </div>
//                   </div>

//                   <div className="text-sm text-gray-500 text-center mt-3">
//                     *Pastikan data yang diisi sudah benar. Bila ada pertanyaan seputar Kami, silahkan dapat membuka halaman <a href="https://rabbaanii.sch.id/faq/" className='text-blue-300 underline'>FAQ</a> atau menghubungi CS yang tertera di Web. Baarakallahu fiikum.
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       <Banner />
//     </div>
//   );
// }

// export default SignUp;
// // import React, { useEffect, useState } from 'react';
// // import { Link, useParams, useNavigate } from 'react-router-dom';
// // import { useForm } from 'react-hook-form';
// // import { zodResolver } from '@hookform/resolvers/zod';

// // import Header from '../partials/Header';
// // import Banner from '../partials/Banner';
// // import supabase from '../client/supabase_client'
// // import Swal from '../utils/Swal'
// // import { useRegister } from '../features/hooks/use-register';
// // // import { registerSchema } from '../schemas/register';

// // function SignUp() {
// //   const { code, pid } = useParams();
// //   const navigate = useNavigate();
// //   const { onSubmit, results, form, form_, loading, error, notified } = useRegister();
  
// //   const { register, handleSubmit, formState: { errors }, setValue, watch } = pid?form_:form;
// //   const [schoolOptions, setSchoolOptions] = useState([])
// //   const [modal_show, setModalShow] = useState(false);
// //   const [modal_data, setModalData] = useState({
// //     type: "",
// //     title: "",
// //     message: "",
// //     text: "OK",
// //     url: "/",
// //     text2: "",
// //     url2: ""
// //   });

// //   // Watch form values
// //   const watchPassword = watch("password");
// //   const watchConfirmPassword = watch("confirm_password");

// //   // Fixed: Set default values based on code parameter
// //   useEffect(() => {
// //     if (code) {
// //       const schoolInfo = getSchoolIdSchoolName(code);
// //       if (schoolInfo && schoolInfo.id) {
// //         setValue("school_id", schoolInfo.id.toString());
// //         setValue("subschool", schoolInfo.subschool);
// //       }
// //     }
    
// //     if (pid) {
// //       validatePID(pid);
// //       setValue("pid", pid);
// //     }
    
// //     getSchoolsOptions();
// //   }, [code, pid, setValue]);

// //     // Fixed: Improved school options fetching
// //   const getSchoolsOptions = async () => {
// //     try {
// //       let { data: schools, error } = await supabase
// //         .from('schools')
// //         .select('*');
        
// //       if (!error && schools) {
// //         const options = schools.map(school => ({
// //           name: school.school_id,
// //           value: school.school_name
// //         }));
// //         setSchoolOptions(options);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching schools:', error);
// //     }
// //   };

// //   // Fixed: Improved getSchoolIdSchoolName to return object with id and subschool
// //   const getSchoolIdSchoolName = (code) => {
// //     const schoolMap = {
// //       'tkit-a': { id: 2, subschool: 'A', name: 'TKIT A Rabbaanii Islamic School' },
// //       'tkit-b': { id: 2, subschool: 'B', name: 'TKIT B Rabbaanii Islamic School' },
// //       'sdit': { id: 1, subschool: '', name: 'SDIT Rabbaanii Islamic School' },
// //       'smpi': { id: 3, subschool: '', name: 'SMPI Rabbaanii Islamic School' },
// //       'smp-pesantren': { id: 4, subschool: '', name: 'SMP Pesantren Rabbaanii Islamic School' },
// //       'sma-pesantren': { id: 5, subschool: '', name: 'SMA Pesantren Rabbaanii Islamic School' },
// //       'smai': { id: 6, subschool: '', name: 'SMAI Rabbaanii Islamic School' },
// //       'rabbaanii-ciwidey': { id: 100, subschool: '', name: 'Rabbaanii Ciwidey' }
// //     };
    
// //     return schoolMap[code] || { id: 0, subschool: '', name: 'Not Found' };
// //   };

// //   const validatePID = async (pid) => {
// //     try {
// //       const { data: applicants, error } = await supabase
// //         .from('applicants')
// //         .select('*, applicant_schools(*)')
// //         .eq('regist_number', pid)
// //         .eq('status', 'active')
// //         .is('deleted_at', null);

// //       if (applicants && applicants.length > 0) {
// //         const applicant = applicants[0];
        
// //         // Set form values using react-hook-form setValue
// //         setValue("full_name", applicant.full_name);
// //         setValue("gender", applicant.gender);
// //         setValue("phone_number", applicant.phone_number);
// //         setValue("regist_number", applicant.regist_number);
// //         setValue("email", applicant.email);
// //         setValue("dob", applicant.dob);
// //         setValue("school_id", applicant.applicant_schools[0]?.school_id);
// //         setValue("subschool", applicant.applicant_schools[0]?.subschool);
// //         setValue("pid", pid);
// //         setValue("media", applicant.media);
// //         setValue("defaults", applicant);
// //       } else {
// //         setModalData(prev => ({
// //           ...prev,
// //           title: "No. Registrasi tidak valid",
// //           message: "Nomor registrasi yang Anda masukkan tidak valid atau sudah tidak aktif."
// //         }));
// //         setModalShow(true);
// //       }
// //     } catch (error) {
// //       console.error('Error validating PID:', error);
// //       setModalData(prev => ({
// //         ...prev,
// //         title: "Error",
// //         message: "Terjadi kesalahan saat memvalidasi nomor registrasi."+ error
// //       }));
// //       setModalShow(true);
// //     }
// //   };

// //   // const getSchoolsOptions = async () => {
// //   //   try {
// //   //     let { data: schools, error } = await supabase
// //   //       .from('schools')
// //   //       .select('*');
        
// //   //     if (!error && schools) {
// //   //       // You can set this to state if needed for display
// //   //       console.log('Schools loaded:', schools);
// //   //     }
// //   //   } catch (error) {
// //   //     console.error('Error fetching schools:', error);
// //   //   }
// //   // };

// //   // Handle form submission results
// //   useEffect(() => {
// //     // if (results) {
// //     //   if (results.f1 === '01') {
// //     //     // Registration failed
// //     //     setModalData(prev => ({
// //     //       ...prev,
// //     //       title: "Pendaftaran Gagal",
// //     //       message: results.f2 || "Terjadi kesalahan saat pendaftaran."
// //     //     }));
// //     //     setModalShow(true);
// //     //   } else {
// //     //     // Registration success
// //     //     setModalData(prev => ({
// //     //       ...prev,
// //     //       type: "basic",
// //     //       title: "Pendaftaran Berhasil",
// //     //       message: "Alhamdulillah, tahap pra pendaftaran berhasil. Selanjutnya Ananda dapat melanjutkan pembayaran melalui aplikasi.",
// //     //       text2: "Lanjut Pembayaran",
// //     //       url2: "/login"
// //     //     }));
// //     //     setModalShow(true);
// //     //   }
// //     // }
// //   }, [results]);

// //   // Handle errors
// //   useEffect(() => {
// //     // if (error) {
// //     //   setModalData(prev => ({
// //     //     ...prev,
// //     //     title: "Error",
// //     //     message: error.message || "Terjadi kesalahan saat proses pendaftaran."
// //     //   }));
// //     //   setModalShow(true);
// //     // }
// //   }, [error]);

// //   const handleCloseModal = (value) => {
// //     setModalShow(false);
// //     if (results && results.f1 !== '01') {
// //       navigate('/login');
// //     }
// //   };

// //   const formatPhoneNumber = (value) => {
// //     const cleaned = value.replace(/\D/g, '');
    
// //     if (cleaned.startsWith('0')) {
// //       return cleaned;
// //     } else if (cleaned.startsWith('62')) {
// //       return '0' + cleaned.slice(2);
// //     } else {
// //       return '0' + cleaned;
// //     }
// //   };

// //   const handlePhoneChange = (e) => {
// //     const formatted = formatPhoneNumber(e.target.value);
// //     e.target.value = formatted;
// //   };

// //   // Get the school info for display
// //   const schoolInfo = getSchoolIdSchoolName(code);

// //   return (
// //     <div className="flex flex-col max-w-lg min-h-screen my-0 mx-auto shadow-lg overflow-hidden relative">
// //       <Header />

// //       <main className="flex-grow">
// //         <section className="bg-gradient-to-b from-gray-100 to-white">
// //           <div className="max-w-6xl mx-auto px-4 sm:px-6">
// //             <div className="pt-32 pb-12 md:pt-40 md:pb-20">

// //               <div className="max-w-3xl mx-auto text-center pb-12 md:pb-12">
// //                 <h1 className="h1">Pra Pendaftaran</h1>
// //                 <p className="text-xl text-gray-600 inline-grid">
// //                   Silahkan melengkapi formulir pra pendaftaran dan informasi pembuatan akun.
// //                 </p>
// //               </div>

// //               {modal_show && (
// //                 <Swal dataModal={modal_data} setClose={handleCloseModal} />
// //               )}

// //               <div className="max-w-sm mx-auto">
// //                 <form onSubmit={handleSubmit(onSubmit)}>
// //                   <div className="flex flex-wrap -mx-3 mb-4">
// //                     <div className="w-full px-3">
// //                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="full_name">
// //                         Nama Lengkap <span className="text-red-600">*</span>
// //                       </label>
// //                       <input 
// //                         id="full_name" 
// //                         {...register("full_name")}
// //                         type="text" 
// //                         className="form-input w-full text-gray-800" 
// //                         placeholder="Masukkan Nama" 
// //                       />
// //                       {errors.full_name && (
// //                         <p className="text-xs text-red-500 mt-1">{errors.full_name.message}</p>
// //                       )}
// //                     </div>
// //                   </div>

// //                   <div className="flex flex-wrap -mx-3 mb-4">
// //                     <div className="w-full px-3">
// //                       <label className="block text-gray-900 text-sm font-medium mb-1">
// //                         Jenis Kelamin <span className="text-red-600">*</span>
// //                       </label>
// //                       <div className="flex items-center space-x-4">
// //                         <label className="flex items-center">
// //                           <input 
// //                             type="radio" 
// //                             value="male"
// //                             {...register("gender")}
// //                             className="form-radio text-gray-800" 
// //                           />
// //                           <span className='text-gray-800 text-sm font-medium ml-2'>Laki-Laki</span>
// //                         </label>
// //                         <label className="flex items-center">
// //                           <input 
// //                             type="radio" 
// //                             value="female"
// //                             {...register("gender")}
// //                             className="form-radio text-gray-800" 
// //                           />
// //                           <span className='text-gray-800 text-sm font-medium ml-2'>Perempuan</span>
// //                         </label>
// //                       </div>
// //                       {errors.gender && (
// //                         <p className="text-xs text-red-500 mt-1">{errors.gender.message}</p>
// //                       )}
// //                     </div>
// //                   </div>

// //                   <div className="flex flex-wrap -mx-3 mb-4">
// //                     <div className="w-full px-3">
// //                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="phone_number">
// //                         No. WhatsApp <span className="text-red-600">*</span>
// //                       </label>
// //                       <input 
// //                         id="phone_number" 
// //                         {...register("phone_number")}
// //                         onChange={handlePhoneChange}
// //                         className="form-input w-full text-gray-800" 
// //                         placeholder="08xxxxxxxxxx" 
// //                       />
// //                       {errors.phone_number && (
// //                         <p className="text-xs text-red-500 mt-1">{errors.phone_number.message}</p>
// //                       )}
// //                     </div>
// //                   </div>

// //                   <div className="flex flex-wrap -mx-3 mb-4">
// //                     <div className="w-full px-3">
// //                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="email">
// //                         Email <span className="text-red-600">*</span>
// //                       </label>
// //                       <input 
// //                         id="email" 
// //                         type="email" 
// //                         {...register("email")}
// //                         className="form-input w-full text-gray-800" 
// //                         placeholder="Masukkan Email Aktif" 
// //                       />
// //                       {errors.email && (
// //                         <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
// //                       )}
// //                     </div>
// //                   </div>

// //                   <div className="flex flex-wrap -mx-3 mb-4">
// //                     <div className="w-full px-3">
// //                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="dob">
// //                         Tanggal Lahir <span className="text-red-600">*</span>
// //                       </label>
// //                       <input 
// //                         id="dob" 
// //                         type="date" 
// //                         {...register("dob")}
// //                         className="form-input w-full text-gray-800" 
// //                       />
// //                       {errors.dob && (
// //                         <p className="text-xs text-red-500 mt-1">{errors.dob.message}</p>
// //                       )}
// //                     </div>
// //                   </div>

// //                   <div className="flex flex-wrap -mx-3 mb-4">
// //                     <div className="w-full px-3">
// //                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="school">
// //                         Jenjang <span className="text-red-600">*</span>
// //                       </label>
                      
// //                       {/* Hidden inputs for school_id and subschool */}
                      
// //                       {pid && 
// //                       <>
                      
// //                       <select 
// //                         id="school_id" 
// //                         name="school_id" 
// //                         // value={school_id}
// //                         {...register("school_id")}
// //                         // onChange={(e) => setSchoolId(e.target.value)} 
// //                         className="form-input w-full text-gray-800"
// //                         required
// //                       >
// //                         <option value="">-Pilih Jenjang-</option>
// //                         {schoolOptions?.map((option) => (
// //                           <option key={option.name} value={option.name}  >
// //                             {option.value}
// //                           </option>
// //                         ))}
// //                       </select>
// //                       <input 
// //                         type="hidden"
// //                         {...register("pid")}
// //                       />
// //                       <input 
// //                         type="hidden"
// //                         {...register("regist_number")}
// //                       />
// //                       </>
                      
// //                       }
// //                       <input 
// //                         type="hidden"
// //                         {...register("subschool")}
// //                       />
                      
                      
// //                       {!pid &&
// //                       <>
// //                       {/* Display only - shows the selected school based on code */}
// //                       <div className="p-3 bg-gray-100 rounded-md border border-gray-300">
// //                         <p className="text-gray-800 font-medium">{schoolInfo.name}</p>
// //                         <p className="text-sm text-gray-600">Jenjang terpilih berdasarkan link pendaftaran</p>
// //                       </div>
// //                       </>
// //                       }
                      
                      
// //                       {errors.school_id && (
// //                         <p className="text-xs text-red-500 mt-1">{errors.school_id.message}</p>
// //                       )}
// //                     </div>
// //                   </div>

// //                   <div className='h4 separator mt-6 mb-4'>Informasi Akun</div>

// //                   <div className="flex flex-wrap -mx-3 mb-4">
// //                     <div className="w-full px-3">
// //                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="password">
// //                         Password <span className="text-red-600">*</span>
// //                       </label>
// //                       <input 
// //                         id="password" 
// //                         type="password" 
// //                         {...register("password")}
// //                         className="form-input w-full text-gray-800" 
// //                         placeholder="Masukkan Password" 
// //                       />
// //                       {errors.password && (
// //                         <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
// //                       )}
// //                       <div className="flex items-center p-3 my-2 text-sm text-blue-800 rounded-lg bg-blue-50" role="alert">
// //                         <svg className="shrink-0 inline w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
// //                           <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
// //                         </svg>
// //                         <span className="font-thin text-sm">Buatlah password yang sederhana dan mudah diingat.</span>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="flex flex-wrap -mx-3 mb-4">
// //                     <div className="w-full px-3">
// //                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="confirm_password">
// //                         Konfirmasi Password <span className="text-red-600">*</span>
// //                       </label>
// //                       <input 
// //                         id="confirm_password" 
// //                         type="password" 
// //                         {...register("confirm_password")}
// //                         className="form-input w-full text-gray-800" 
// //                         placeholder="Masukkan Konfirmasi Password" 
// //                       />
// //                       {errors.confirm_password && (
// //                         <p className="text-xs text-red-500 mt-1">{errors.confirm_password.message}</p>
// //                       )}
// //                       {watchPassword && watchConfirmPassword && watchPassword !== watchConfirmPassword && (
// //                         <p className="text-xs text-red-500 mt-1">Password tidak sesuai</p>
// //                       )}
// //                     </div>
// //                   </div>

// //                   <div className="flex flex-wrap -mx-3 mb-4">
// //                     <div className="w-full px-3">
// //                       <label htmlFor="media" className="block text-sm font-medium text-gray-900">
// //                         Darimana Bapak/Ibu Mendapatkan Informasi tentang Rabbaanii Islamic School?
// //                       </label>
// //                       <select 
// //                         id="media" 
// //                         {...register("media")}
// //                         className="w-full appearance-none rounded-md bg-white py-2 px-3 text-base text-gray-900 border border-gray-300 focus:outline-2 focus:outline-indigo-600"
// //                       >
// //                         <option value="">-Pilih Media-</option>
// //                         <option value="website">Website Rabbaanii</option>
// //                         <option value="teman/saudara">Teman / Saudara</option>
// //                         <option value="karyawan/guru">Karyawan/Guru</option>
// //                         <option value="kajian">Kajian</option>
// //                         <option value="spanduk">Spanduk</option>
// //                         <option value="brosur">Brosur</option>
// //                         <option value="instagram">Instagram</option>
// //                         <option value="facebook">Facebook</option>
// //                         <option value="youtube">Youtube</option>
// //                         <option value="majalah">Majalah</option>
// //                         <option value="whatsapp">WhatsApp</option>
// //                         <option value="tiktok">Tiktok</option>
// //                         <option value="mesin_pencari">Rekomendasi mesin pencarian internet</option>
// //                       </select>
// //                       {errors.media && (
// //                         <p className="text-xs text-red-500 mt-1">{errors.media.message}</p>
// //                       )}
// //                     </div>
// //                   </div>

// //                   <div className="flex flex-wrap -mx-3 mt-6">
// //                     <div className="w-full px-3">
// //                       <button 
// //                         className="btn text-white bg-green-600 hover:bg-green-700 w-full flex items-center justify-center" 
// //                         disabled={loading}
// //                         type="submit"
// //                       >
// //                         {loading ? (
// //                           <>
// //                             <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
// //                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// //                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// //                             </svg>
// //                             <span className='pl-3'>Menyimpan...</span>
// //                           </>
// //                         ) : 'DAFTAR'}
// //                       </button>
// //                     </div>
// //                   </div>

// //                   <div className="flex flex-wrap -mx-3 mt-4">
// //                     <div className="w-full px-3">
// //                       <Link to="/" className="btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full relative flex items-center justify-center">
// //                         <span className="">LAMAN PENDAFTARAN</span>
// //                       </Link>
// //                     </div>
// //                   </div>

// //                   <div className="text-sm text-gray-500 text-center mt-3">
// //                     *Pastikan data yang diisi sudah benar. Bila ada pertanyaan seputar Kami, silahkan dapat membuka halaman <a href="https://rabbaanii.sch.id/faq/" className='text-blue-300 underline'>FAQ</a> atau menghubungi CS yang tertera di Web. Baarakallahu fiikum.
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //         </section>
// //       </main>

// //       <Banner />
// //     </div>
// //   );
// // }

// // export default SignUp;

// // // import React, { useEffect, useState } from 'react';
// // // import { Link, useParams, useNavigate } from 'react-router-dom';

// // // import Header from '../partials/Header';
// // // import Banner from '../partials/Banner';
// // // import supabase from '../client/supabase_client'
// // // import { createClient } from '@supabase/supabase-js'
// // // import { ScaleIcon } from '@heroicons/react/24/solid';
// // // import Modal from '../utils/Modal';
// // // import Swal from '../utils/Swal'
// // // import axios from '../api/prod-server';

// // // function SignUp() {
// // //   const [applicants, setApplicants] = useState({})
// // //   const [dataAppTemp, setDataAppTemp] = useState({})
// // //   const [full_name, setFullName] = useState("")
// // //   const [gender, setGender] = useState("")
// // //   const [phone_number, setPhoneNumber] = useState("")
// // //   const [_phone_number, set_PhoneNumber] = useState("")
// // //   const [email, setEmail] = useState("")
// // //   const [school_id, setSchoolId] = useState("")
// // //   const [school_name, setSchoolName] = useState("")
// // //   const [subschool, setSubschool] = useState("")
// // //   const [password, setPassword] = useState("")
// // //   const [temp_password, setTempPassword] = useState("")
// // //   const [confirm_password, setConfirmPassword] = useState("")
// // //   const [media, setMedia] = useState("website")
// // //   const [dob, setDob] = useState("")
// // //   const [schoolOptions, setSchoolOptions] = useState([])
// // //   const [modal_show, setModalShow] = useState(false)
// // //   const [modal_data, setModalData] = useState({
// // //     type: "",
// // //     title: "",
// // //     message: "",
// // //     text: "OK",
// // //     url: "/",
// // //     text2: "",
// // //     url2: ""
// // //   })

// // //   const [is_validated, setIsValidated] = useState(false)
// // //   const [is_loading, setIsLoading] = useState(false)
// // //   const [success, setSuccess] = useState(false)
// // //   const navigate = useNavigate()
  
// // //   let code = useParams().code
// // //   let pid = useParams().pid

// // //   // Fixed: Added proper validation function
// // //   const validateForm = () => {
// // //     if (!full_name || !gender || !phone_number || !email || !password || !confirm_password || !dob || !school_id) {
// // //       return false;
// // //     }
    
// // //     if (password !== confirm_password) {
// // //       return false;
// // //     }
    
// // //     if (phone_number.length < 10) {
// // //       return false;
// // //     }
    
// // //     return true;
// // //   };

// // //   // Fixed: Proper useEffect dependencies
// // //   useEffect(() => {
// // //     if (pid) {
// // //       validatePID(pid);
// // //     }
// // //     getSchoolsOptions();
// // //   }, [pid]);

// // //   // Fixed: Added proper error handling for validatePID
// // //   const validatePID = async (pid) => {
// // //     try {
// // //       const { data: applicants, error } = await supabase
// // //         .from('applicants')
// // //         .select('*')
// // //         .eq('regist_number', pid)
// // //         .eq('status', 'active')
// // //         .is('deleted_at', null);

// // //       if (applicants && applicants.length > 0) {
// // //         const applicant = applicants[0];
// // //         setApplicants({
// // //           full_name: applicant.full_name,
// // //           gender: applicant.gender,
// // //           phone_number: applicant.phone_number,
// // //           email: applicant.email,
// // //           dob: applicant.dob,
// // //           school_id: applicant.school_id,
// // //           subschool: applicant.subschool
// // //         });
        
// // //         // Set form values
// // //         setFullName(applicant.full_name);
// // //         setGender(applicant.gender);
// // //         setPhoneNumber(applicant.phone_number);
// // //         setEmail(applicant.email);
// // //         setDob(applicant.dob);
// // //         setSchoolId(applicant.school_id);
// // //         setSubschool(applicant.subschool);
// // //       } else {
// // //         setModalData(prev => ({
// // //           ...prev,
// // //           title: "No. Registrasi tidak valid",
// // //           message: "Nomor registrasi yang Anda masukkan tidak valid atau sudah tidak aktif."
// // //         }));
// // //         setModalShow(true);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error validating PID:', error);
// // //       setModalData(prev => ({
// // //         ...prev,
// // //         title: "Error",
// // //         message: "Terjadi kesalahan saat memvalidasi nomor registrasi."
// // //       }));
// // //       setModalShow(true);
// // //     }
// // //   };

// // //   // Fixed: Improved school options fetching
// // //   const getSchoolsOptions = async () => {
// // //     try {
// // //       let { data: schools, error } = await supabase
// // //         .from('schools')
// // //         .select('*');
        
// // //       if (!error && schools) {
// // //         const options = schools.map(school => ({
// // //           name: school.school_id,
// // //           value: school.school_name
// // //         }));
// // //         setSchoolOptions(options);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching schools:', error);
// // //     }
// // //   };

// // //   // Fixed: Improved getSchoolIdSchoolName function
// // //   const getSchoolIdSchoolName = (code) => {
// // //     const schoolMap = {
// // //       'tkit-a': '2A-TKIT A Rabbaanii Islamic School',
// // //       'tkit-b': '2A-TKIT B Rabbaanii Islamic School',
// // //       'sdit': '1-SDIT Rabbaanii Islamic School',
// // //       'smpi': '3-SMPI Rabbaanii Islamic School',
// // //       'smp-pesantren': '4-SMP Pesantren Rabbaanii Islamic School',
// // //       'sma-pesantren': '5-SMA Pesantren Rabbaanii Islamic School',
// // //       'smai': '6-SMAI Rabbaanii Islamic School',
// // //       'rabbaanii-ciwidey': '100Rabbaanii Ciwidey'
// // //     };
    
// // //     return schoolMap[code] || '0Not Found';
// // //   };

// // //   // Fixed: Improved form submission with better error handling
// // //   const addApplicants = async (e) => {
// // //     e.preventDefault();
// // //     setIsLoading(true);

// // //     // Validate form
// // //     if (!validateForm()) {
// // //       setModalData(prev => ({
// // //         ...prev,
// // //         title: "Data Tidak Lengkap",
// // //         message: "Mohon lengkapi semua data yang diperlukan dan pastikan password sesuai."
// // //       }));
// // //       setModalShow(true);
// // //       setIsLoading(false);
// // //       return;
// // //     }

// // //     try {
// // //       const _school_id = parseInt(getSchoolIdSchoolName(code).substring(0, 1));
// // //       const _subschool = getSchoolIdSchoolName(code).split("-")[0].substring(1, 2);

// // //       const { data: data_appl, error } = await supabase.rpc("add_new_applicant", {
// // //         _email: email,
// // //         _full_name: full_name,
// // //         _gender: gender,
// // //         _media: media,
// // //         _password: password,
// // //         _phone_number: phone_number,
// // //         _school_id: _school_id,
// // //         _subschool: _subschool
// // //       });

// // //       if (error || data_appl?.f1 === '01') {
// // //         const errorMessage = error?.message || data_appl?.f2 || 'Terjadi kesalahan saat pendaftaran';
// // //         setModalData(prev => ({
// // //           ...prev,
// // //           title: "Pendaftaran Gagal",
// // //           message: errorMessage
// // //         }));
// // //         setModalShow(true);
// // //         return;
// // //       }

// // //       // Success case
// // //       setModalData(prev => ({
// // //         ...prev,
// // //         type: "basic",
// // //         title: "Pendaftaran Berhasil",
// // //         message: "Alhamdulillah, tahap pra pendaftaran berhasil. Selanjutnya Ananda dapat melanjutkan pembayaran melalui aplikasi.",
// // //         text2: "Lanjut Pembayaran",
// // //         url2: "/login"
// // //       }));

// // //       setSuccess(true);
// // //       setModalShow(true);

// // //       // Send notification
// // //       await sendNotification();

// // //       // Reset form
// // //       resetForm();

// // //     } catch (error) {
// // //       console.error('Error during registration:', error);
// // //       setModalData(prev => ({
// // //         ...prev,
// // //         title: "Error",
// // //         message: "Terjadi kesalahan saat proses pendaftaran. Silakan coba lagi."
// // //       }));
// // //       setModalShow(true);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   // Fixed: Added sendNotification function
// // //   const sendNotification = async () => {
// // //     try {
// // //       const new_phone_number = '62' + phone_number.slice(1);
// // //       const data = [{
// // //         "phone": new_phone_number,
// // //         "message": `Assalamu'alaikum, Alhamdulillah Ananda ${full_name} telah terdaftar di Aplikasi PSB RIS TA. 26/27. 
// // // No. Pendaftaran: ${dataAppTemp?.f3}
// // // Login Aplikasi: https://psb.rabbaanii.sch.id/login

// // // Ananda dapat login dengan No. Pendaftaran atau No. WhatsApp terdaftar untuk melanjutkan pendaftaran.

// // // Jazaakumullahu khayran wa Baarakallaahu fiikum.

// // // -- PSB RABBAANII ISLAMIC SCHOOL - CS RABBAANII --
// // // - Mohon simpan nomor ini untuk mendapatkan update informasi -`
// // //       }];

// // //       await axios.post("/api/auth/send-notif", {
// // //         message: data,
// // //         type: 'form-success',
// // //         token: null
// // //       }, {
// // //         headers: { 'Content-Type': 'application/json' }
// // //       });

// // //     } catch (error) {
// // //       console.error('Error sending notification:', error);
// // //       // Don't show error to user for notification failures
// // //     }
// // //   };

// // //   // Fixed: Added resetForm function
// // //   const resetForm = () => {
// // //     setFullName("");
// // //     setGender("");
// // //     setPhoneNumber("");
// // //     setEmail("");
// // //     setSchoolId("");
// // //     setSchoolName("");
// // //     setSubschool("");
// // //     setPassword("");
// // //     setConfirmPassword("");
// // //     setDob("");
// // //   };

// // //   const handleCloseModal = (value) => {
// // //     setModalShow(false);
// // //     if (success) {
// // //       navigate('/login');
// // //     }
// // //   };

// // //   // Fixed: Improved phone number formatting
// // //   const formatPhoneNumber = (value) => {
// // //     // Remove all non-digit characters
// // //     const cleaned = value.replace(/\D/g, '');
    
// // //     // Format as Indonesian phone number
// // //     if (cleaned.startsWith('0')) {
// // //       return cleaned;
// // //     } else if (cleaned.startsWith('62')) {
// // //       return '0' + cleaned.slice(2);
// // //     } else {
// // //       return '0' + cleaned;
// // //     }
// // //   };

// // //   const handlePhoneChange = (e) => {
// // //     const formatted = formatPhoneNumber(e.target.value);
// // //     setPhoneNumber(formatted);
// // //     set_PhoneNumber(formatted);
// // //   };

// // //   return (
// // //     <div className="flex flex-col max-w-lg min-h-screen my-0 mx-auto shadow-lg overflow-hidden relative">
// // //       <Header />

// // //       <main className="flex-grow">
// // //         <section className="bg-gradient-to-b from-gray-100 to-white">
// // //           <div className="max-w-6xl mx-auto px-4 sm:px-6">
// // //             <div className="pt-32 pb-12 md:pt-40 md:pb-20">

// // //               <div className="max-w-3xl mx-auto text-center pb-12 md:pb-12">
// // //                 <h1 className="h1">Pra Pendaftaran</h1>
// // //                 <p className="text-xl text-gray-600 inline-grid">
// // //                   Silahkan melengkapi formulir pra pendaftaran dan informasi pembuatan akun.
// // //                 </p>
// // //               </div>

// // //               {modal_show && (
// // //                 <Swal dataModal={modal_data} setClose={handleCloseModal} />
// // //               )}

// // //               <div className="max-w-sm mx-auto">
// // //                 <form onSubmit={addApplicants}>
// // //                   <div className="flex flex-wrap -mx-3 mb-4">
// // //                     <div className="w-full px-3">
// // //                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="full_name">
// // //                         Nama Lengkap <span className="text-red-600">*</span>
// // //                       </label>
// // //                       <input 
// // //                         id="full_name" 
// // //                         name='full_name' 
// // //                         value={full_name}
// // //                         onChange={(e) => setFullName(e.target.value)} 
// // //                         type="text" 
// // //                         className="form-input w-full text-gray-800" 
// // //                         placeholder="Masukkan Nama" 
// // //                         required 
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   <div className="flex flex-wrap -mx-3 mb-4">
// // //                     <div className="w-full px-3">
// // //                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="jenis_kelamin">
// // //                         Jenis Kelamin <span className="text-red-600">*</span>
// // //                       </label>
// // //                       <div className="flex items-center space-x-4">
// // //                         <label className="flex items-center">
// // //                           <input 
// // //                             name="gender" 
// // //                             value="male"
// // //                             checked={gender === "male"}
// // //                             onChange={(e) => setGender(e.target.value)} 
// // //                             type="radio" 
// // //                             className="form-radio text-gray-800" 
// // //                             required 
// // //                           />
// // //                           <span className='text-gray-800 text-sm font-medium ml-2'>Laki-Laki</span>
// // //                         </label>
// // //                         <label className="flex items-center">
// // //                           <input 
// // //                             name="gender" 
// // //                             value="female"
// // //                             checked={gender === "female"}
// // //                             onChange={(e) => setGender(e.target.value)} 
// // //                             type="radio" 
// // //                             className="form-radio text-gray-800" 
// // //                             required 
// // //                           />
// // //                           <span className='text-gray-800 text-sm font-medium ml-2'>Perempuan</span>
// // //                         </label>
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   <div className="flex flex-wrap -mx-3 mb-4">
// // //                     <div className="w-full px-3">
// // //                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="phone_number">
// // //                         No. WhatsApp <span className="text-red-600">*</span>
// // //                       </label>
// // //                       <input 
// // //                         id="phone_number" 
// // //                         name='phone_number' 
// // //                         value={phone_number}
// // //                         onChange={handlePhoneChange}
// // //                         className="form-input w-full text-gray-800" 
// // //                         placeholder="08xxxxxxxxxx" 
// // //                         required 
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   <div className="flex flex-wrap -mx-3 mb-4">
// // //                     <div className="w-full px-3">
// // //                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="email">
// // //                         Email <span className="text-red-600">*</span>
// // //                       </label>
// // //                       <input 
// // //                         id="email" 
// // //                         name='email' 
// // //                         type="email" 
// // //                         value={email}
// // //                         onChange={(e) => setEmail(e.target.value)} 
// // //                         className="form-input w-full text-gray-800" 
// // //                         placeholder="Masukkan Email Aktif" 
// // //                         required
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   <div className="flex flex-wrap -mx-3 mb-4">
// // //                     <div className="w-full px-3">
// // //                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="dob">
// // //                         Tanggal Lahir <span className="text-red-600">*</span>
// // //                       </label>
// // //                       <input 
// // //                         id="dob" 
// // //                         name="dob" 
// // //                         value={new Date()}
// // //                         onChange={(e) => setDob(e.target.value)} 
// // //                         type="date" 
// // //                         className="form-input w-full text-gray-800" 
// // //                         required
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   <div className="flex flex-wrap -mx-3 mb-4">
// // //                     <div className="w-full px-3">
// // //                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="school">
// // //                         Jenjang <span className="text-red-600">*</span>
// // //                       </label>
// // //                       {pid && 
// // //                       <select 
// // //                         id="school_id" 
// // //                         name="school_id" 
// // //                         value={school_id}
// // //                         onChange={(e) => setSchoolId(e.target.value)} 
// // //                         className="w-full appearance-none rounded-md bg-white py-2 px-3 text-base text-gray-900 border border-gray-300 focus:outline-2 focus:outline-indigo-600"
// // //                         required
// // //                       >
// // //                         <option value="">-Pilih Jenjang-</option>
// // //                         {schoolOptions.map((option) => (
// // //                           <option key={option.name} value={option.name} selected={school_id == option.name} >
// // //                             {option.value}
// // //                           </option>
// // //                         ))}
// // //                       </select>
// // //                       }
// // //                       {!pid && 
                      
// // //                       <input 
// // //                         id="school_name" 
// // //                         name='school_name' 
// // //                         type="text" 
// // //                         disabled 
// // //                         value={getSchoolIdSchoolName(code).split("-")[1]} 
// // //                         className="form-input w-full text-gray-800 mt-2 bg-gray-100" 
// // //                         required 
// // //                       />
// // //                       }
// // //                     </div>
// // //                   </div>

// // //                   <div className='h4 separator mt-6 mb-4'>Informasi Akun</div>

// // //                   <div className="flex flex-wrap -mx-3 mb-4">
// // //                     <div className="w-full px-3">
// // //                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="password">
// // //                         Password <span className="text-red-600">*</span>
// // //                       </label>
// // //                       <input 
// // //                         id="password" 
// // //                         name='password' 
// // //                         value={password}
// // //                         onChange={(e) => setPassword(e.target.value)} 
// // //                         type="password" 
// // //                         className="form-input w-full text-gray-800" 
// // //                         placeholder="Masukkan Password" 
// // //                         required 
// // //                       />
// // //                       <div className="flex items-center p-3 my-2 text-sm text-blue-800 rounded-lg bg-blue-50" role="alert">
// // //                         <svg className="shrink-0 inline w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
// // //                           <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
// // //                         </svg>
// // //                         <span className="font-thin text-sm">Buatlah password yang sederhana dan mudah diingat.</span>
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   <div className="flex flex-wrap -mx-3 mb-4">
// // //                     <div className="w-full px-3">
// // //                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="confirm_password">
// // //                         Konfirmasi Password <span className="text-red-600">*</span>
// // //                       </label>
// // //                       <input 
// // //                         id="confirm_password" 
// // //                         name='confirm_password' 
// // //                         value={confirm_password}
// // //                         onChange={(e) => setConfirmPassword(e.target.value)} 
// // //                         type="password" 
// // //                         className="form-input w-full text-gray-800" 
// // //                         placeholder="Masukkan Konfirmasi Password" 
// // //                         required 
// // //                       />
// // //                       {password !== confirm_password && confirm_password && (
// // //                         <p className="text-xs text-red-500 mt-1">Password tidak sesuai</p>
// // //                       )}
// // //                     </div>
// // //                   </div>

// // //                   <div className="flex flex-wrap -mx-3 mb-4">
// // //                     <div className="w-full px-3">
// // //                       <label htmlFor="media" className="block text-sm font-medium text-gray-900">
// // //                         Darimana Bapak/Ibu Mendapatkan Informasi tentang Rabbaanii Islamic School?
// // //                       </label>
// // //                       <select 
// // //                         id="media" 
// // //                         name="media" 
// // //                         value={media}
// // //                         onChange={(e) => setMedia(e.target.value)} 
// // //                         className="w-full appearance-none rounded-md bg-white py-2 px-3 text-base text-gray-900 border border-gray-300 focus:outline-2 focus:outline-indigo-600"
// // //                         required
// // //                       >
// // //                         <option value="">-Pilih Media-</option>
// // //                         <option value="website">Website Rabbaanii</option>
// // //                         <option value="teman/saudara">Teman / Saudara</option>
// // //                         <option value="karyawan/guru">Karyawan/Guru</option>
// // //                         <option value="kajian">Kajian</option>
// // //                         <option value="spanduk">Spanduk</option>
// // //                         <option value="brosur">Brosur</option>
// // //                         <option value="instagram">Instagram</option>
// // //                         <option value="facebook">Facebook</option>
// // //                         <option value="youtube">Youtube</option>
// // //                         <option value="majalah">Majalah</option>
// // //                         <option value="whatsapp">WhatsApp</option>
// // //                         <option value="tiktok">Tiktok</option>
// // //                         <option value="mesin_pencari">Rekomendasi mesin pencarian internet</option>
// // //                       </select>
// // //                     </div>
// // //                   </div>

// // //                   <div className="flex flex-wrap -mx-3 mt-6">
// // //                     <div className="w-full px-3">
// // //                       <button 
// // //                         className="btn text-white bg-green-600 hover:bg-green-700 w-full flex items-center justify-center" 
// // //                         disabled={is_loading}
// // //                         type="submit"
// // //                       >
// // //                         {is_loading ? (
// // //                           <>
// // //                             <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
// // //                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // //                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // //                             </svg>
// // //                             <span className='pl-3'>Menyimpan...</span>
// // //                           </>
// // //                         ) : 'DAFTAR'}
// // //                       </button>
// // //                     </div>
// // //                   </div>

// // //                   <div className="flex flex-wrap -mx-3 mt-4">
// // //                     <div className="w-full px-3">
// // //                       <Link to="/" className="btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full relative flex items-center justify-center">
// // //                         <span className="">LAMAN PENDAFTARAN</span>
// // //                       </Link>
// // //                     </div>
// // //                   </div>

// // //                   <div className="text-sm text-gray-500 text-center mt-3">
// // //                     *Pastikan data yang diisi sudah benar. Bila ada pertanyaan seputar Kami, silahkan dapat membuka halaman <a href="https://rabbaanii.sch.id/faq/" className='text-blue-300 underline'>FAQ</a> atau menghubungi CS yang tertera di Web. Baarakallahu fiikum.
// // //                   </div>
// // //                 </form>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </section>
// // //       </main>

// // //       <Banner />
// // //     </div>
// // //   );
// // // }

// // // export default SignUp;

// // // // import React, { useEffect, useState } from 'react';
// // // // import { Link, useParams, useNavigate } from 'react-router-dom';

// // // // import Header from '../partials/Header';
// // // // import Banner from '../partials/Banner';
// // // // import supabase from '../client/supabase_client'
// // // // import { createClient } from '@supabase/supabase-js'
// // // // import { ScaleIcon } from '@heroicons/react/24/solid';
// // // // import Modal from '../utils/Modal';
// // // // // import {Toaster, Position} from  @blue
// // // // import Swal from '../utils/Swal'
// // // // // import { Spinner } from "flowbite-react";

// // // // import { useRegister } from '../features/hooks/use-register';

// // // // import wablas from '../api/wablas';
// // // // // import axios from '../api/local-server';
// // // // import axios from '../api/prod-server';
// // // // import { stringify } from 'postcss';
// // // // const SEND_MSG_URL ='/send-message'

// // // // function SignUp() {

// // // //   // Use a custom domain as the supabase URL
// // // //   // const supabase = createClient(process.env.VITE_SUPA_PROJECT_URL, process.env.VITE_SUPA_API_KEY_PUBLIC)
// // // //   // const supabase = createClient('https://cnpcpmdrblvjfzzeqoau.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNucGNwbWRyYmx2amZ6emVxb2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxMDc5MjgsImV4cCI6MjA0ODY4MzkyOH0.KDzEImvYqvh6kv9o5eMuWzWuYZIElWNtPyWDdLMi46w' )

// // // //   // console.log(process.env.SUPA_PROJECT_URL)

// // // //   const [applicants, setApplicants] = useState([])
// // // //   const [dataAppTemp, setDataAppTemp] = useState({})
// // // //   const [full_name, setFullName] = useState("")
// // // //   const [gender, setGender] = useState("")
// // // //   const [phone_number, setPhoneNumber] = useState("")
// // // //   const [_phone_number, set_PhoneNumber] = useState("")
// // // //   const [email, setEmail] = useState("")
// // // //   const [school_id, setSchoolId] = useState("")
// // // //   const [school_name, setSchoolName] = useState("")
// // // //   const [subschool, setSubschool] = useState("")
// // // //   const [password, setPassword] = useState("")
// // // //   const [temp_password, setTempPassword] = useState("")
// // // //   const [confirm_password, setConfirmPassword] = useState("")
// // // //   const [media, setMedia] = useState("website")
// // // //   const [dob, setDob] = useState("")
// // // //   const [schoolOptions, setSchoolOptions] = useState([])
// // // //   const [modal_show, setModalShow] = useState(false)
// // // //   const [modal_data, setModalData] = useState({
// // // //     type: "",
// // // //     title: "",
// // // //     message: "",
// // // //     text: "OK",
// // // //     url: "/",
// // // //     // url: "https://wa.me/628123523434?text=Assalamu'alaikum%20warahmatullah%20wabarakatuh%2C%20ustadz%2Fustadzah.%20Alhamdulillah%20ananda%20telah%20menyelesaikan%20formulir%20pra%20pendaftaran.%20Jazaakumullahu%20khayran.",
// // // //     text2: "",
// // // //     url2: ""
// // // //   })

// // // //   const [is_validated, setIsValidated] = useState(false)
// // // //   const [is_loading, setIsLoading] = useState(false)
// // // //   const [success, setSuccess] = useState(false)
// // // //   const navigate = useNavigate()
// // // //   const { onSubmit, results, form, loading, error, notified } = useRegister()
// // // //   const { register, handleSubmit, formState: { errors }} = form;

// // // //   let code = useParams().code
// // // //   let pid = useParams().pid
// // // //     // const dataModal = () => {
// // // //   // const modal = {
    
    
// // // //   //   }
// // // //   //   return data
// // // //   // }
// // // //   // const [code, setCode] = useState(useParams())
  
// // // //   // code = useParams().code

// // // //   useEffect(() => {
// // // //     // if(pid){
// // // //     //   validatePID(pid)
// // // //     // }
// // // //     if(code && pid){
// // // //       validatePID(pid)
// // // //     }
// // // //     if(applicants){
// // // //       form.setValue('defaults', applicants)
// // // //     }
// // // //   }, [code, pid])

// // // //   // const validatePID = async (pid) => {
// // // //   //   if()
// // // //   // }

// // // //   const validatePID = async (pid) => {
// // // //     const { data: applicants, error} = await supabase.from('applicants').select('*')
// // // //                                       .eq('regist_number', pid)
// // // //                                       .eq('status', 'active')
// // // //                                       .is('deleted_at', null)

// // // //                                       if(applicants && applicants.length>0){
// // // //                                         setApplicants(prev => ({...prev, 
// // // //                                           full_name: applicants[0].full_name,
// // // //                                           gender: applicants[0].gender,
// // // //                                           phone_number: applicants[0].phone_number,
// // // //                                           email: applicants[0].email,
// // // //                                           dob: applicants[0].dob,
// // // //                                           school_id: applicants[0].school_id,
// // // //                                           subschool: applicants[0].subschool

// // // //                                         }))
// // // //                                         // setFullName(applicants[0].full_name)
// // // //                                         // setGender(applicants[0].gender)
// // // //                                         // setPhoneNumber(applicants[0].phone_number)
// // // //                                         // setEmail(applicants[0].email)
// // // //                                         // setMedia(applicants[0].media)
// // // //                                         // setDob(applicants[0].dob)
// // // //                                         // setSchoolId(applicants[0].school_id)
// // // //                                         // setSubschool(applicants[0].subschool)
// // // //                                       }else{
// // // //                                         modal_data.title = "No. Registrasi tidak valid"
// // // //                                         modal_data.message = "/"
// // // //                                         setModalShow(true)
// // // //                                       }
// // // //   }
  
// // // //   useEffect( () => {
// // // //     const allowed_codes = [
// // // //       'tkit-a',
// // // //       'tkit-b',
// // // //       'sdit',
// // // //       'smpi',
// // // //       'smai',
// // // //       'smp-pesantren',
// // // //       'sma-pesantren'
// // // //       // 'rabbaanii-ciwidey'
// // // //     ]

// // // //     if(!allowed_codes.includes(code)){
// // // //       modal_data.title = "Jenjang tidak ditemukan"
// // // //       modal_data.message = "Mohon periksa link pendaftaran"
// // // //       modal_data.url2 = "/"
// // // //       modal_data.text2 = "Halaman Utama"
// // // //       modal_data.type = "static"
// // // //       setModalShow(true)
// // // //     }
// // // //     // console.log('pass>', password)
// // // //     // console.log('temppass', temp_password)
// // // //     // console.log('cpass>', confirm_password)
// // // //     // console.log('results>', results)

// // // //     if(results?.f1){
// // // //       // console.log('masuk', results)
// // // //       handleResults(results)
// // // //     }

// // // //     if(code || !school_id || !subschool){
// // // //       setSchoolId(getSchoolIdSchoolName(code).substring(0,1))
// // // //       setSubschool(getSchoolIdSchoolName(code).split("-")[0].substring(1,2))

// // // //       form.setValue('school_id', school_id)
// // // //       form.setValue('subschool', subschool)
// // // //       console.log('id',school_id, subschool)
// // // //     }

// // // //     // getSchoolIdSchoolName()
// // // //     // getSchoolIdSchoolName()
// // // //     getSchoolsOptions()
// // // //   },[code, results, form, password, confirm_password, school_id, subschool])

// // // //   // const handleResults = () => {
// // // //   //   if(Object.values)
// // // //   // }
// // // //   // const [applicants, setApplicants] = useState({
// // // //   //   full_name: "",
// // // //   //   gender: "",
// // // //   //   phone_number
// // // //   // })
// // // //   // console.log(code)
  
// // // //   // const getSchoolIdSchoolName = () => {
    
// // // //     // let {code} = useParams()
// // // //     // switch (code) {
// // // //     //   case 'tkit-a': setSchoolId(1); setSchoolName('TKIT A Rabbaanii Islamic School'); 
// // // //     //   break;
// // // //     //   case 'tkit-b': setSchoolId(1); setSchoolName('TKIT B Rabbaanii Islamic School'); 
// // // //     //   break;
// // // //     //   case 'sdit': setSchoolId(2); setSchoolName('SDIT Rabbaanii Islamic School'); 
// // // //     //   break;
// // // //     //   case 'smpi': setSchoolId(3); setSchoolName('SMPI Rabbaanii Islamic School'); 
// // // //     //   break;
// // // //     //   case 'smai': setSchoolId(4); setSchoolName('SMAI Rabbaanii Islamic School'); 
// // // //     //   break;
// // // //     //   case 'smp-pesantren': setSchoolId(5); setSchoolName('SMP Pesantren Rabbaanii Islamic School'); 
// // // //     //   break;
// // // //     //   case 'sma-pesantren': setSchoolId(6); setSchoolName('SMA Pesantren  Rabbaanii Islamic School'); 
// // // //     //   break;
// // // //     //   case 'rabbaanii-ciwidey': setSchoolId(7); setSchoolName('Rabbaanii Ciwidey'); 
// // // //     //   break;
// // // //     //   default: setSchoolId(0); setSchoolName(''); 
// // // //     //     // break;
// // // //     // }
// // // //     //console.log(code, school_id, school_name)
// // // //   // // }
  
// // // //   // useEffect(() => {

// // // //   //   // fetch(process.env.SUPA_PROJECT_URL+"/rest/v1/applicants?select=*",{
// // // //   //   //   method: 'GET',
// // // //   //   //   headers: {
// // // //   //   //     'apikey': process.env.SUPA_API_KEY_PUBLIC,
// // // //   //   //     "Content-type" :  "application/json; charset =UTF-8",
// // // //   //   //     'Authorization' :  'Bearer '+ process.env.SUPA_API_KEY_PUBLIC
// // // //   //   //   }
// // // //   //   // })
// // // //   //   //   .then(response => response.json())
// // // //   //   //   .then(json => setApplicants(json))
// // // //   // }, [])

// // // //   const isObjectEmpty = async (objectName) => {
// // // //     return (
// // // //       objectName &&
// // // //       Object.keys(objectName).length === 0 &&
// // // //       objectName.constructor === Object
// // // //     );
// // // //   };
// // // //   const handleResults = async (_results) => {

// // // //     // const _full_name = full_name
// // // //     // const _gender = gender
// // // //     // const _phone_number = phone_number
// // // //     // const _email = email
// // // //     // const _school_id = parseInt(getSchoolIdSchoolName(code).substring(0,1)) 
// // // //     // const _subschool = getSchoolIdSchoolName(code).split("-")[0].substring(1,2)
// // // //     // const _password = password
// // // //     // const _media = media
// // // //     console.log('handl',results, error)
// // // //     if(results){
// // // //       console.log('not valid')
// // // //       // setIsValidated(true)
// // // //       // setIsLoading(false)
// // // //       setSuccess(false)
// // // //       modal_data.title = "Pendaftaran Gagal"
// // // //       modal_data.message = "Mohon periksa kembali data Anda"
// // // //       // modal_data.url2 = "/"
// // // //       // modal_data.text2 = "Halaman Utama"
// // // //       setModalShow(true)
// // // //     }


// // // //     if(results?.f1 === '01'){
// // // //       // setIsLoading(false)
// // // //       console.log('masuk', results  )
// // // //       // console.log(Object.values(results)[0] )
// // // //       setSuccess(false)
// // // //       modal_data.title = "Pendaftaran Gagal"
// // // //       modal_data.message = results?.f2
// // // //       if(results?.f2!== 'No. WhatsApp sudah terdaftar'){
// // // //         modal_data.url2 = "/login"
// // // //       }
// // // //       // modal_data.text2 = "Kembali"
// // // //       setModalShow(true)
// // // //       return
// // // //     }
    
// // // //     if(results && results?.f1 !== '01'){
// // // //       console.log('masuk', results)

// // // //       console.log('_phone_number', _phone_number)
// // // //       const new_phone_number = '62'+ _phone_number.slice(1)
// // // //       // console.log(data_appl)
// // // //       // _phone_number.replace()
// // // //       setFullName("")
// // // //       setGender("")
// // // //       setPhoneNumber("")
// // // //       setEmail("")
// // // //       setSchoolId("")
// // // //       setSchoolName("")
// // // //       setSubschool("")
// // // //       setPassword("")
// // // //       setConfirmPassword("")
// // // //       modal_data.type= "basic",
// // // //       modal_data.title= "Pendaftaran Berhasil",
// // // //       modal_data.message= "Alhamdulillah, tahap pra pendaftaran berhasil. Selanjutnya Ananda dapat melanjutkan pembayaran melalui aplikasi.",
// // // //       // modal_data.message= "Alhamdulillah, tahap pra pendaftaran berhasil. Selanjutnya Ananda dapat melakukan konfirmasi pendaftaran ke nomor CS melalui pesan masuk ke no WhatsApp terdaftar. Ananda juga dapat melanjutkan pembayaran langsung melalui website.",
// // // //       // tex.t: "Konfirmasi Pendaftaran ke CS",
// // // //       // url: "https://wa.me/628123523434?text=Assalamu'alaikum%20warahmatullah%20wabarakatuh%2C%20ustadz%2Fustadzah.%20Alhamdulillah%20ananda%20telah%20menyelesaikan%20formulir%20pra%20pendaftaran.%20Jazaakumullahu%20khayran.",
// // // //       modal_data.text2= "Lanjut Pembayaran",
// // // //       modal_data.url2= "/login"
      
// // // //       const type ='form-success'
      
// // // //       // console.log(new_phone_number)
// // // //       const data = [{
// // // //         "phone": new_phone_number,
// // // //         // "phone": "6285778650040",
// // // //         "message": `Assalamu'alaikum, Alhamdulillah Ananda ${full_name} telah terdaftar di Aplikasi PSB RIS TA. 26/27. 
// // // //         No. Pendaftaran: ${results?.f3}
// // // //         Login Aplikasi: https://psb.rabbaanii.sch.id/login
        
// // // //         Ananda dapat login dengan No. Pendaftaran atau No. WhatsApp terdaftar untuk melanjutkan pendaftaran.
        
// // // //         Jazaakumullahu khayran wa Baarakallaahu fiikum.
        
// // // //         -- PSB RABBAANII ISLAMIC SCHOOL - CS RABBAANII --
// // // //         - Mohon simpan nomor ini untuk mendapatkan update informasi -`
// // // //         // "message": "Assalamu'alaikum, Alhamdulillah ananda telah terdaftar di sistem kami dengan No. Registrasi . "

// // // //       }]
// // // //       // console.log(data)
// // // //       // Ayah/Bunda disilahkan bergabung ke tautan Grup WA Pendaftar https://bit.ly/GROUPWA-PPDBRIS2627 untuk informasi lebih lanjut.

// // // //       if(notified){
// // // //         modal_data.url2 = "/login"
// // // //         setSuccess(true)
// // // //         setModalShow(true)
// // // //       }

      
// // // //           // try {
// // // //           //   const response = await axios.post("/api/auth/send-notif", {message: data , type: type, token: null},
// // // //           //   {
// // // //           //     headers: {'Content-Type': 'application/json' }
// // // //           //   }
// // // //           //   );
// // // //           //   // 
// // // //           //   console.log(JSON.stringify(response)); //console.log(JSON.stringify(response));
// // // //           //   if(response.status==200 || response.status==204){
              
// // // //           //     // persistor.purge();
// // // //           //     // // Reset to default state reset: async () => { useCart.persist.clearStorage(); set((state) => ({ ...initialState, })); },
// // // //           //     // localStorage.removeItem("persist:auth")
// // // //           //     // Cookies.remove("jwt")
// // // //           //     // dispatch(logout())
// // // //           //     // navigate('/login')
// // // //           //   }
// // // //           // } catch (error) {
// // // //           //   console.log(error)
// // // //           // } finally {
// // // //           //   // setIsLoading(false)
// // // //           // }
// // // //         }

// // // //   }

// // // //   const getSchoolsOptions = async () => {
// // // //         let { data: schools, error } = await supabase
// // // //             .from('schools')
// // // //             .select('*')
// // // //             console.log(schools)
// // // //             if(!error){
// // // //                 // setSchoolOptions(schools)
// // // //                 schools.map((e)=>(
// // // //                         // setaccountOptions( e => {
// // // //                         schoolOptions.push({ name:e.school_id, value: e.school_name})
                        
// // // //                     ))
// // // //                     setSchoolName(schoolOptions.map((e,key) => {
// // // //                       return { name:e.school_id, value: e.school_name}
// // // //                     }))
// // // //                     console.log('schoolOptions', schoolOptions)
// // // //             // //     // accountsOptions e.name

// // // //             // }))
// // // //             // name: account
// // // //             // setaccountOptions(account => {.})
// // // //         }
// // // //     }

// // // //   const addApplicants = async (e) =>{
// // // //     // setIsLoading(true)
// // // //     e.preventDefault()
// // // //     // console.log('data', full_name, gender, phone_number, email, password, media, school_id)
    
// // // //     // console.log('media',media)
// // // //     const _full_name = full_name
// // // //     const _gender = gender
// // // //     const _phone_number = phone_number
// // // //     const _email = email
// // // //     const _school_id = parseInt(getSchoolIdSchoolName(code).substring(0,1)) 
// // // //     const _subschool = getSchoolIdSchoolName(code).split("-")[0].substring(1,2)
// // // //     const _password = password
// // // //     const _media = media
  
// // // //     // if(school_id)
// // // //     console.log(_full_name)
// // // //     console.log(_gender)
// // // //     console.log(_phone_number)
// // // //     console.log(_email)
// // // //     console.log(_password)
// // // //     console.log(_media)
// // // //     console.log(_school_id)
// // // //     console.log(_subschool)
// // // //     console.log(code)

// // // //     // handleSubmit(onSubmit(full_name,gender,phone_number, email, _school_id, _subschool, password, media))

// // // //     if(!_full_name || !_gender || !_phone_number || !_email || !_password || !_media || !_school_id || !confirm_password){
// // // //       console.log('not valid')
// // // //       // setIsValidated(true)
// // // //       setIsLoading(false)
// // // //       setSuccess(false)
// // // //       modal_data.title = "Pendaftaran Gagal"
// // // //       modal_data.message = "Mohon periksa kembali data Anda"
// // // //       // modal_data.url2 = "/"
// // // //       // modal_data.text2 = "Halaman Utama"
// // // //       setModalShow(true)
// // // //     }else{

// // // //       const { data: data_appl, error } = await supabase.rpc("add_new_applicant", {
// // // //         _email,
// // // //         _full_name,
// // // //         _gender,
// // // //         _media,
// // // //         _password,
// // // //         _phone_number,
// // // //         _school_id,
// // // //         _subschool
// // // //       });

// // // //     // console.log(data_appl)
// // // //     setDataAppTemp(data_appl)
// // // //     // console.log('dataAppTemp >', dataAppTemp)
// // // //     if(error || Object.values(data_appl)[0] === '01'){
// // // //       setIsLoading(false)
// // // //       console.log('masuk')
// // // //       console.log(Object.values(data_appl)[0] )
// // // //       setSuccess(false)
// // // //       modal_data.title = "Pendaftaran Gagal"
// // // //       modal_data.message = error??Object.values(data_appl)[1]
// // // //       // modal_data.url2 = "/"
// // // //       // modal_data.text2 = "Kembali"
// // // //       setModalShow(true)
// // // //       return
// // // //     }

// // // // //     curl --location 'https://jogja.wablas.com/api/v2/send-message' \
// // // // // --header 'Authorization: v00j9KTESxhSyuhnJe7K4Op0aMZMaBuBooBr0unnsUXBhlYZyU5SMLG.b405O85i' \
// // // // // --header 'Content-Type: application/json' \
// // // // // --data '{
// // // // //      "data": [
// // // // //         {
// // // // //             "phone": "085778650040",
// // // // //             "message": "Assalamualaikum testing ujicoba",
// // // // //             "source": "postman"
// // // // //         },
// // // // //         {
// // // // //             "phone": "085216527392",
// // // // //             "message": "Assalamualaikum testing ujicoba",
// // // // //             "source": "postman"
// // // // //         }
// // // // //     ]
// // // // // }'
// // // // console.log(Object.values(data_appl)[0] !== '01')
// // // //     if(Object.values(data_appl)[0] !== '01'){
// // // //       // console.log(data_appl)
// // // //       // _phone_number.replace()
// // // //       setFullName("")
// // // //       setGender("")
// // // //       setPhoneNumber("")
// // // //       setEmail("")
// // // //       setSchoolId("")
// // // //       setSchoolName("")
// // // //       setSubschool("")
// // // //       setPassword("")
// // // //       setConfirmPassword("")

// // // //       modal_data.type= "basic",
// // // //       modal_data.title= "Pendaftaran Berhasil",
// // // //       modal_data.message= "Alhamdulillah, tahap pra pendaftaran berhasil. Selanjutnya Ananda dapat melanjutkan pembayaran melalui aplikasi.",
// // // //       // modal_data.message= "Alhamdulillah, tahap pra pendaftaran berhasil. Selanjutnya Ananda dapat melakukan konfirmasi pendaftaran ke nomor CS melalui pesan masuk ke no WhatsApp terdaftar. Ananda juga dapat melanjutkan pembayaran langsung melalui website.",
// // // //       // tex.t: "Konfirmasi Pendaftaran ke CS",
// // // //       // url: "https://wa.me/628123523434?text=Assalamu'alaikum%20warahmatullah%20wabarakatuh%2C%20ustadz%2Fustadzah.%20Alhamdulillah%20ananda%20telah%20menyelesaikan%20formulir%20pra%20pendaftaran.%20Jazaakumullahu%20khayran.",
// // // //       modal_data.text2= "Lanjut Pembayaran",
// // // //       modal_data.url2= "/login"
      
// // // //       const type ='form-success'
// // // //       // console.log(phone_number)
// // // //       const new_phone_number = '62'+ _phone_number.slice(1)
// // // //       // console.log(new_phone_number)
// // // //       const data = [{
// // // //         "phone": new_phone_number,
// // // //         // "phone": "6285778650040",
// // // //         "message": `Assalamu'alaikum, Alhamdulillah Ananda telah terdaftar di sistem kami.
// // // //         No. Pendaftaran: ${data_appl.f3}
// // // //         Login Aplikasi: https://psb.rabbaanii.sch.id/login
        
// // // //         Mohon untuk menyimpan informasi ini. Ananda dapat login dengan No. Pendaftaran atau No. WhatsApp terdaftar untuk melanjutkan pendaftaran.
// // // //         Jazaakumullahu khayran wa Baarakallaahu fiikum.
        
// // // //         -- PSB RABBAANII ISLAMIC SCHOOL - CS RABBAANII --
// // // //         - Mohon simpan nomor ini untuk mendapatkan update informasi -`
// // // //         // "message": "Assalamu'alaikum, Alhamdulillah ananda telah terdaftar di sistem kami dengan No. Registrasi . "

// // // //       }]
// // // //       // console.log(data)

// // // //       setSuccess(true)
// // // //       setModalShow(true)

      
// // // //       try {
// // // //         const response = await axios.post("/api/auth/send-notif", {message: data , type: type, token: null},
// // // //         {
// // // //           headers: {'Content-Type': 'application/json' }
// // // //         }
// // // //         );
// // // //         // 
// // // //         console.log(JSON.stringify(response)); //console.log(JSON.stringify(response));
// // // //         if(response.status==200 || response.status==204){
          
// // // //           // persistor.purge();
// // // //           // // Reset to default state reset: async () => { useCart.persist.clearStorage(); set((state) => ({ ...initialState, })); },
// // // //           // localStorage.removeItem("persist:auth")
// // // //           // Cookies.remove("jwt")
// // // //           // dispatch(logout())
// // // //           // navigate('/login')
// // // //         }
// // // //     } catch (error) {
// // // //       console.log(error)
// // // //     } finally {
// // // //       setIsLoading(false)
// // // //     }
      
// // // // //       console.log(phone_number)
// // // // //       const new_phone_number = '62'+ _phone_number.slice(1)
// // // // //       console.log(new_phone_number)
// // // // //       const data = [{
// // // // //         "phone": new_phone_number,
// // // // //         // "phone": "6285778650040",
// // // // //         "message": `Assalamu'alaikum, Alhamdulillah Ananda telah terdaftar di sistem kami dengan -- No. Pendaftaran ${data_appl.f3} --. Mohon untuk menyimpan informasi ini. Ananda dapat login dengan No. Pendaftaran atau No. WhatsApp terdaftar untuk melanjutkan pendaftaran.

// // // // // Login Aplikasi: https://psb-formy.vercel.app/login

// // // // // Jazaakumullahu khayran wa Baarakallaahu fiikum.`
// // // // //         // "message": "Assalamu'alaikum, Alhamdulillah ananda telah terdaftar di sistem kami dengan No. Registrasi . "

// // // // //       }]
// // // //       // 'Authorization': 'TGlhnw6kS74RG3jOc7EOzjFkftiemqC7Og6GmseskfryC0RHI3ACfOWnH86Q6zEl.cM6lQGiu'
// // // //       // const response = await wablas.post(SEND_MSG_URL,
// // // //       //   JSON.stringify({ data }),
// // // //       //   {
// // // //       //     headers: {
// // // //       //       'Content-Type': 'application/json',
// // // //       //       'Authorization': 'v00j9KTESxhSyuhnJe7K4Op0aMZMaBuBooBr0unnsUXBhlYZyU5SMLG.b405O85i'
// // // //       //      }, 
// // // //       //   }
// // // //       // );
// // // //       // // 
// // // //       // console.log('response', JSON.stringify(response)); //console.log(JSON.stringify(response));
// // // //       // const token = response?.token
// // // //     }
    

// // // //     }

    

// // // //     // console.log('validated>',is_validated)
// // // //     // if(!is_validated){ 
// // // //     //   setIsLoading(false)
// // // //     //   setSuccess(false)
// // // //     //   modal_data.title = "Pendaftaran Gagal"
// // // //     //   modal_data.message = "Mohon periksa kembali data Anda"
// // // //     //   // modal_data.url2 = "/"
// // // //     //   // modal_data.text2 = "Halaman Utama"
// // // //     //   setModalShow(true)

// // // //     //   return
// // // //     // }

// // // //     // const newapplicants =  {full_name, gender, phone_number, email, password}
  
// // // //     // console.log(newapplicants)
    
// // // //     // const { data, error } = await supabase
// // // //     //   .from('applicants')
// // // //     //   .insert([
// // // //     //     newapplicants
// // // //     //   ])
// // // //     //   .single()

// // // //     //   if(error){
// // // //     //     console.log(error)
// // // //     //   }else{
// // // //     //     console.log(data)
// // // //     //   }

// // // //       // const
    
    
// // // //     // console.log('data_applicant =>', data_appl)

    
  
    
// // // //     // if(full_name && gender && phone_number && email && school_id && password){
// // // //     //   fetch("https://cnpcpmdrblvjfzzeqoau.supabase.co/rest/v1/applicants", {
// // // //     //     method: 'POST',
// // // //     //     body: JSON.stringify({full_name, gender, phone_number, email, school_id, password}), 
// // // //     //     headers: {
// // // //     //       "Content-type" :  "application/json; charset =UTF-8"
        
// // // //     //     }
// // // //     //   })
// // // //     //   .then(response => response.json())
// // // //     //   .then(data => {
// // // //     //     setApplicants([...applicants, data])
// // // //     //     setNewFull_name("")
// // // //     //     setNewGender("")
// // // //     //     setNewPhone_number("")
// // // //     //     setNewEmail("")
// // // //     //     setNewSchool_id("")
// // // //     //     setNewPassword("")
// // // //     //     console.log(data)
// // // //     //     // AppToaster.show({
// // // //     //     //   message: "User added successfully",
// // // //     //     //   intent: "success",
// // // //     //     //   timeout: 3000,
// // // //     //     // })

// // // //     //   })

// // // //     // }


// // // //   }

// // // //   // setSchoolName('TKIT A Rabbaanii Islamic School');
// // // //   // ('TKIT B Rabbaanii Islamic School');
// // // //   // setSchoolName('SDIT Rabbaanii Islamic School'); 
// // // //   // setSchoolName('SMPI Rabbaanii Islamic School'); 
// // // //   // setSchoolName('SMAI Rabbaanii Islamic School'); 
// // // //   // setSchoolName('SMP Pesantren Rabbaanii Islamic School');
// // // //   const getSchoolIdSchoolName = (code) => {
// // // //     const allowed_codes = [
// // // //       'tkit-a',
// // // //       'tkit-b',
// // // //       'sdit',
// // // //       'smpi',
// // // //       'smai',
// // // //       'smp-pesantren',
// // // //       'rabbaanii-ciwidey'
// // // //     ]
// // // //     // if(!allowed_codes.includes(code)){
      
// // // //     // }
// // // //     switch (code) {
// // // //       case 'tkit-a': return `2A-TKIT A Rabbaanii Islamic School`;  
// // // //       break;
// // // //       case 'tkit-b': return `2A-TKIT B Rabbaanii Islamic School`;  
// // // //       break;
// // // //       case 'sdit': return `1-SDIT Rabbaanii Islamic School`;
// // // //       break;
// // // //       case 'smpi': return `3-SMPI Rabbaanii Islamic School`;
// // // //       break;
// // // //       case 'smp-pesantren': return `4-SMP Pesantren Rabbaanii Islamic School`; 
// // // //       break;
// // // //       case 'sma-pesantren': return `5-SMA Pesantren  Rabbaanii Islamic School`; 
// // // //       break;
// // // //       case 'smai': return `6-SMAI Rabbaanii Islamic School`; 
// // // //       break;
// // // //       case 'rabbaanii-ciwidey': return `100Rabbaanii Ciwidey`; 
// // // //       break;
// // // //       default: return `0Not Found`; 
// // // //         // break;
// // // //     }
// // // //   }

// // // //   const handleCloseModal = (value) => {
// // // //     if(value){
// // // //       setModalShow(!value)
// // // //     }
// // // //   }

 
  
// // // //   return (
// // // //     <div className="flex flex-col max-w-lg min-h-screen my-0 mx-auto shadow-lg overflow-hidden relative">
// // // // {/* flex flex-col max-w-lg min-h-screen my-0 mx-auto overflow-hidden relative */}
// // // //       {/*  Site header */}
// // // //       <Header />

// // // //       {/*  Page content */}
// // // //       <main className="flex-grow">

// // // //         <section className="bg-gradient-to-b from-gray-100 to-white">
// // // //           <div className="max-w-6xl mx-auto px-4 sm:px-6">
// // // //             <div className="pt-32 pb-12 md:pt-40 md:pb-20">

// // // //               {/* Page header */}
// // // //               <div className="max-w-3xl mx-auto text-center pb-12 md:pb-12">
// // // //                 <h1 className="h1">Pra Pendaftaran</h1>
// // // //                 <p className="text-xl text-gray-600 inline-grid"> 
// // // //                   Silahkan melengkapi formulir pra pendaftaran dan informasi pembuatan akun. 
// // // //               {/* <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24">
// // // //                 <path d="M12 4v8.59l-3.29-3.29L7.41 11l5 5 5-5-1.29-1.29L12 12.59V4h-1.5z"/>
// // // //               </svg> */}
// // // //             </p>
// // // //               </div>
// // // //               {/* <Modal children={children} id={1} aria-label="ffgdfg" show={true} handleClose={handleClose}   /> */}
// // // //                 {modal_show && (
// // // //                   <Swal dataModal={modal_data} setClose={handleCloseModal} />
// // // //                 )}
                
// // // //               {/* Form */}
// // // //               <div className="max-w-sm mx-auto">
// // // //                 <form onSubmit={handleSubmit(onSubmit)}>
// // // //                   <div className="flex flex-wrap -mx-3 mb-4">
// // // //                     <div className="w-full px-3">
// // // //                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="full_name">Nama Lengkap <span className="text-red-600">*</span></label>
// // // //                       <input id="full_name" name='full_name' onChange={(e) => setFullName(e.target.value)} {...register('full_name')} type="text" className="form-input w-full text-gray-800" placeholder="Masukkan Nama" required />
// // // //                       {/* pattern="^[A-Za-z0-9.']{3,50}$" */}
// // // //                       {errors.full_name && (
// // // //                         <p className="text-xs text-red-500"> {errors.full_name.message} </p>
// // // //                       )}
// // // //                     </div>
// // // //                   </div>
// // // //                   <div className="flex flex-wrap -mx-3 mb-4">
// // // //                     <div className="w-full px-3">
// // // //                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="jenis_kelamin">Jenis Kelamin <span className="text-red-600">*</span></label>
// // // //                       <input name="gender" onChange={(e) => setGender(e.target.value)} {...register('gender')} type="radio" className="form-input text-gray-800" placeholder="" required /> <span className='text-gray-800 text-sm font-medium'>Laki-Laki</span>
// // // //                       <input name="gender" onChange={(e) => setGender(e.target.value)}  {...register('gender')} type="radio" className="form-input text-gray-800 ml-3" placeholder="" required /> <span className='text-gray-800 text-sm font-medium'>Perempuan</span>
// // // //                       {errors.gender && (
// // // //                         <p className="text-xs text-red-500"> {errors.gender.message} </p>
// // // //                       )}
// // // //                     </div>
// // // //                   </div>
// // // //                   <div className="flex flex-wrap -mx-3 mb-4">
// // // //                     <div className="w-full px-3">
// // // //                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="phone_number">No. WhatsApp <span className="text-red-600">*</span></label>
// // // //                       <input id="phone_number" name='phone_number' onChange={(e) => {setPhoneNumber(e.target.value), set_PhoneNumber(e.target.value)}} {...register('phone_number')} className="form-input w-full text-gray-800" placeholder="No. WhatsApp aktif" required />
// // // //                       {errors.phone_number && (
// // // //                         <p className="text-xs text-red-500"> {errors.phone_number.message} </p>
// // // //                       )}
// // // //                     </div>
// // // //                   </div>
// // // //                   <div className="flex flex-wrap -mx-3 mb-4">
// // // //                     <div className="w-full px-3">
// // // //                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
// // // //                       <input id="email" name='email' type="email" onChange={(e) => setEmail(e.target.value)} {...register('email')} className="form-input w-full text-gray-800" placeholder="Masukkan Email Aktif" />
// // // //                       {errors.email && (
// // // //                         <p className="text-xs text-red-500"> {errors.email.message} </p>
// // // //                       )}
// // // //                     </div>
// // // //                   </div>
// // // //                   <div className="flex flex-wrap -mx-3 mb-4">
// // // //                     <div className="w-full px-3">
// // // //                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="email">Tanggal Lahir <span className="text-red-600">*</span></label>
// // // //                     <input id="dob" name="dob" onChange={(e) => setDob(e.target.value)} {...register('dob')}  type="date" className="form-input w-full text-gray-800" required/>
// // // //                       {errors.dob && (
// // // //                         <p className="text-xs text-red-500"> {errors.dob.message} </p>
// // // //                       )}
// // // //                     </div>
// // // //                   </div>
// // // //                   <div className="flex flex-wrap -mx-3 mb-4">
// // // //                     <div className="w-full px-3">
// // // //                       {/* school:{code=='tkit-b'&&setSchoolId(1)&&setSchoolName('TKIT B Rabbaanii Islamic School') } */}
// // // //                       {/* {school_id. school_name} */}
// // // //                       {/* {code} */}
// // // //                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="school">Jenjang <span className="text-red-600">*</span></label>
// // // //                       {/* <input id="subschool" name='subschool' type="text" hidden disabled value={} onChange={e => (setSubschool(getSchoolIdSchoolName(code).split("-")[0].substring(1,2)))}  className="form-input w-full text-gray-800" placeholder="" required /> */}
// // // //                       {/* <input id="school_id" name='school_id' type="text" hidden disabled onChange={(e) => setSchoolId(e.target.value)} {...register('school_id')} className="form-input w-full text-gray-800" placeholder="" required /> */}
// // // //                       <div className="mt-2 grid grid-cols-1">
// // // //                           <select id="school_id" name="school_id" onChange={(e) => setSchoolId(e.target.value)} {...register('school_id')} className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" required>
// // // //                           <option value="">-Pilih Jenjang-</option>
// // // //                           {schoolOptions?.map((value) => {
// // // //                             // <option>{value.a}</option>
// // // //                             // <option value={value.value}>{value.name} </option>
// // // //                           <option key={value.name} value={value.name}>{value.value} </option>
// // // //                           })}
                        
// // // //                           </select>
                          
// // // //                       </div>
// // // //                       <input id="school_name" name='school_name' type="text" disabled value={getSchoolIdSchoolName(code).split("-")[1]} className="form-input w-full text-gray-800" placeholder="" required />
// // // //                       <input id="subschool" name='subschool' type="text" hidden disabled onChange={(e) => setSubschool(e.target.value)} {...register('subschool')} className="form-input w-full text-gray-800" placeholder="" required />
// // // //                       {errors.school_id &&(
// // // //                         <p className="text-xs text-red-500"> {errors.school_id.message} </p>
// // // //                       )}
// // // //                       {errors.subschool && (
// // // //                         <p className="text-xs text-red-500"> {errors.subschool.message} </p>
// // // //                       )}
// // // //                     </div>
// // // //                   </div>
// // // //                   <div className='h4 separator'>Informasi Akun</div>
// // // //                   <div className="flex flex-wrap -mx-3 mb-4">
// // // //                     <div className="w-full px-3 ">
// // // //                       {/* <div></div> */}
// // // //                       <label className="block text-gray-900 text-sm font-medium mb-1 tooltip tooltip-open tooltip-right" data-tip="Buatlah password yang mudah diingat" htmlFor="password">Password <span className="text-red-600">*</span></label>
// // // //                       <input id="password" name='password' onChange={(e) => {setPassword(e.target.value), setTempPassword(e.target.value)}} {...register('password')} type="password" className="form-input w-full text-gray-800" placeholder="Masukkan Password" required />
// // // //                       {errors.password && (
// // // //                         <p className="text-xs text-red-500"> {errors.password.message} </p>
// // // //                       )}
// // // //                       <div class="flex items-center p-4 mb-4 my-1 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
// // // //                         <svg class="shrink-0 inline w-6 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
// // // //                           <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
// // // //                         </svg>
// // // //                         {/* Info alert! */}
// // // //                         <span class="sr-only">Info</span>
// // // //                         <div>
// // // //                           <span class="font-thin text-sm">Buatlah password yang sederhana dan mudah diingat.</span>
// // // //                         </div>
// // // //                       </div>
// // // //                       {/* <ul>
// // // //                         <li>lebih dari 8 karakter</li>
// // // //                         <li>kombinasi huruf besar dan kecil</li>
// // // //                         <li></li>
// // // //                       </ul> */}
// // // //                     </div>
// // // //                   </div>
// // // //                   <div className="flex flex-wrap -mx-3 mb-4">
// // // //                     <div className="w-full px-3">
// // // //                       <label className="block text-gray-900 text-sm font-medium mb-1" htmlFor="confirm_password">Konfimasi Password <span className="text-red-600">*</span></label>
// // // //                       <input id="confirm_password" name='confirm_password' onChange={(e) => setConfirmPassword(e.target.value)} {...register('confirm_password')} type="password" className="form-input w-full text-gray-800 peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500" placeholder="Masukkan Konfirmasi Password" required />
// // // //                       {errors.confirm_password && (
// // // //                         <p className="text-xs text-red-500"> {errors.confirm_password.message} </p>
// // // //                       )}
// // // //                       {/* <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
// // // //                           Konfirmasi password tidak sama dengan password
// // // //                       </span> */}
// // // //                     </div>
// // // //                   </div>
// // // //                   <div className="sm:col-span-4">
// // // //                       <label htmlFor="media" className="block text-sm font-medium text-gray-900">Darimana Bapak/Ibu Mendapatkan Informasi tentang Rabbaanii Islamic School?</label>
// // // //                       <div className="mt-2 grid grid-cols-1">
// // // //                           <select id="media" name="media" onChange={(e) => setMedia(e.target.value)} {...register('media')} autoComplete="media" className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" required>
// // // //                           <option value="">-Pilih Media-</option>
// // // //                           <option value={media== 'website'? media:"website"}>Website Rabbaanii </option>
// // // //                           <option value={media== 'teman/saudara'? media:"teman/saudara"} >Teman / Saudara</option>
// // // //                           <option value={media== 'karyawan/guru'? media:"karyawan/guru"}>Karyawan/Guru </option>
// // // //                           <option value={media== 'kajian'? media:"kajian"}>Kajian</option>
// // // //                           <option value={media== 'spanduk'? media:"spanduk"}>Spanduk</option>
// // // //                           <option value={media== 'brosur'? media:"brosur"}>Brosur</option>
// // // //                           <option value={media== 'instagram'? media:"instagram"}>Instagram </option>
// // // //                           <option value={media== 'facebook'? media:"facebook"}>Facebook </option>
// // // //                           <option value={media== 'youtube'? media:"youtube"}>Youtube </option>
// // // //                           <option value={media== 'majalah'? media: "majalah"}>Majalah </option>
// // // //                           <option value={media== 'whatsapp'? media:"whatsapp"}>WhatsApp</option>
// // // //                           <option value={media== 'tiktok'? media:"tiktok"}>Tiktok</option>
// // // //                           <option value={media== 'mesin_pencari'? media:"mesin_pencari"}>Rekomendasi mesin pencarian internet</option>

// // // //                           </select>
// // // //                           {errors.media && (
// // // //                             <p className="text-xs text-red-500"> {errors.media.message} </p>
// // // //                           )}
// // // //                           {/* <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
// // // //                           <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
// // // //                           </svg> */}
// // // //                       </div>
// // // //                   </div>
// // // //                   <div className="flex flex-wrap -mx-3 mt-6">
// // // //                     <div className="w-full px-3">
// // // //                       <button className="btn text-white bg-green-600 hover:bg-green-700 w-full" disabled={loading} 
// // // //                       // onClick={addApplicants}
// // // //                       >
// // // //                         {loading ? (
// // // //                           <>
// // // //                           <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
// // // //                 {/* SVG path for your spinner */}
// // // //                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // // //                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // // //               </svg>
// // // //                             {/* <Spinner aria-label="Spinner button example" size="sm" light /> */}
// // // //                             <span className='pl-3'>Menyimpan...</span>
// // // //                           </>
// // // //                         )
// // // //                          : 'DAFTAR'}
// // // //                       </button>
// // // //                     </div>
// // // //                   </div>
// // // //                   <hr />
// // // //                   <div className="flex flex-wrap -mx-3 mt-6">
// // // //                     <div className="w-full px-3">
// // // //                     <Link to="/" className="btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full relative flex items-center">
// // // //                                           {/* <svg className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
// // // //                                             <path d="M7.95 0C3.578 0 0 3.578 0 7.95c0 3.479 2.286 6.46 5.466 7.553.397.1.497-.199.497-.397v-1.392c-2.187.497-2.683-.993-2.683-.993-.398-.895-.895-1.193-.895-1.193-.696-.497.1-.497.1-.497.795.1 1.192.795 1.192.795.696 1.292 1.888.895 2.286.696.1-.497.298-.895.497-1.093-1.79-.2-3.578-.895-3.578-3.975 0-.895.298-1.59.795-2.087-.1-.2-.397-.994.1-2.087 0 0 .695-.2 2.186.795a6.408 6.408 0 011.987-.299c.696 0 1.392.1 1.988.299 1.49-.994 2.186-.795 2.186-.795.398 1.093.199 1.888.1 2.087.496.596.795 1.291.795 2.087 0 3.08-1.889 3.677-3.677 3.875.298.398.596.895.596 1.59v2.187c0 .198.1.497.596.397C13.714 14.41 16 11.43 16 7.95 15.9 3.578 12.323 0 7.95 0z" />
// // // //                                           </svg> */}
// // // //                                           <span className="">LAMAN PENDAFTARAN</span>
// // // //                                           {/* <svg className="w-4 h-4 fill-current text-gray-400 " viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
// // // //                                             <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
// // // //                                           </svg> */}
// // // //                                         </Link>
// // // //                     </div>
// // // //                   </div>  
// // // //                   <div className="text-sm text-gray-500 text-center mt-3">
// // // //                       *Pastikan data yang diisi sudah benar. Bila ada pertanyaan seputar Kami, silahkan dapat membuka halaman <a href="https://rabbaanii.sch.id/faq/" className='text-blue-300 underline'>FAQ</a> atau menghubungi CS yang tertera di Web. Baarakallahu fiikum.
// // // //                     {/* By creating an account, you agree to the <a className="underline" href="#0">terms & conditions</a>, and our <a className="underline" href="#0">privacy policy</a>. */}
// // // //                                 </div>
// // // //                 </form>
// // // //                 {/* <div className="flex items-center my-6">
// // // //                   <div className="border-t border-gray-300 flex-grow mr-3" aria-hidden="true"></div>
// // // //                   <div className="text-gray-600 italic">Or</div>
// // // //                   <div className="border-t border-gray-300 flex-grow ml-3" aria-hidden="true"></div>
// // // //                 </div>
// // // //                 <form>
// // // //                   <div className="flex flex-wrap -mx-3 mb-3">
// // // //                     <div className="w-full px-3">
// // // //                       <button className="btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full relative flex items-center">
// // // //                         <svg className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
// // // //                           <path d="M7.95 0C3.578 0 0 3.578 0 7.95c0 3.479 2.286 6.46 5.466 7.553.397.1.497-.199.497-.397v-1.392c-2.187.497-2.683-.993-2.683-.993-.398-.895-.895-1.193-.895-1.193-.696-.497.1-.497.1-.497.795.1 1.192.795 1.192.795.696 1.292 1.888.895 2.286.696.1-.497.298-.895.497-1.093-1.79-.2-3.578-.895-3.578-3.975 0-.895.298-1.59.795-2.087-.1-.2-.397-.994.1-2.087 0 0 .695-.2 2.186.795a6.408 6.408 0 011.987-.299c.696 0 1.392.1 1.988.299 1.49-.994 2.186-.795 2.186-.795.398 1.093.199 1.888.1 2.087.496.596.795 1.291.795 2.087 0 3.08-1.889 3.677-3.677 3.875.298.398.596.895.596 1.59v2.187c0 .198.1.497.596.397C13.714 14.41 16 11.43 16 7.95 15.9 3.578 12.323 0 7.95 0z" />
// // // //                         </svg>
// // // //                         <span className="flex-auto pl-16 pr-8 -ml-16">Continue with GitHub</span>
// // // //                       </button>
// // // //                     </div>
// // // //                   </div>
// // // //                   <div className="flex flex-wrap -mx-3">
// // // //                     <div className="w-full px-3">
// // // //                       <button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
// // // //                         <svg className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
// // // //                           <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
// // // //                         </svg>
// // // //                         <span className="flex-auto pl-16 pr-8 -ml-16">Continue with Google</span>
// // // //                       </button>
// // // //                     </div>
// // // //                   </div>
// // // //                 </form> */}
// // // //                 {/* <div className="text-gray-600 text-center mt-6">
// // // //                   Already using Simple? <Link to="/signin" className="text-blue-600 hover:underline transition duration-150 ease-in-out">Sign in</Link>
// // // //                 </div> */}
// // // //               </div>

// // // //             </div>
// // // //           </div>
// // // //         </section>

// // // //       </main>

// // // //       <Banner />

// // // //     </div>

    
// // // //   );
// // // // }

// // // // export default SignUp;