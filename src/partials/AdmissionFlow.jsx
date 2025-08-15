import { useEffect, useState } from 'react';

export default function RegistrationProcess({submission_status}) {
  const [activeStep, setActiveStep] = useState(3);

  useEffect(()=> {
    if(submission_status){
        setActiveValue(submission_status)
        console.log('admissionflow', activeStep, submission_status)
    }

  },[submission_status])

  const setActiveValue = (value) => {
    if(value==='initial_submission') setActiveStep(3)
    if(value==='submission_processed') setActiveStep(3)
    if(value==='on_exam') setActiveStep(4)
    if(value==='accepted' || value==='not_accepted') setActiveStep(5)
    if(value==='on_measurement') setActiveStep(6)
  }

  const steps = [
    {
      id: 1,
      title: "Pra Pendaftaran",
      details: "Mengisi formulir buku tamu dan pembuatan akun aplikasi PSB",
    //   details: "Konfirmasi ke WA CS 0853 1364 2033 setelah transfer",
      type: "form"
    },
    {
      id: 2,
      title: "Membayar Formulir Pendaftaran",
      details: "Membayar biaya formulir pendaftaran melalui aplikasi",
    //   description: "Mengisi data diri dan orangtua",
      type: "payment"
    },
    {
      id: 3,
      title: "Mengisi Formulir Pendaftaran dan Melengkapi Berkas",
      details: "Melengkapi data calon santri, orangtua/wali, dan upload berkas",
    //   description: "Tes IPA, Matematika, Bahasa Inggris, PKn",
      type: "test"
    },
    {
      id: 4,
      title: "Tes Observasi",
      description: "Tes IPA, Matematika, Bahasa Inggris, PKn",
      details: "Tes Observasi Mapel Umum, Diniyah, dan Interview",
      type: "test"
    },
    {
      id: 5,
      title: "Pengumuman Kelulusan",
      details: "Notifikasi kepada orangtua siswa melalui pesan WhatsApp dan online di aplikasi",
    //   description: "Pemberitahuan penerimaan siswa",
      type: "announcement"
    },
    {
      id: 6,
      title: "Pengukuran Seragam",
      details: "Penentuan ukuran seragam sekolah online via size chart atau offline saat interview",
    //   details: "Dapat dilakukan offline saat interview atau online via size chart",
      type: "measurement"
    }
  ];

  const getStepIcon = (type) => {
    switch(type) {
      case 'payment':
        return '💳';
      case 'form':
        return '📝';
      case 'test':
        return '✏️';
      case 'announcement':
        return '📢';
      case 'measurement':
        return '👕';
      default:
        return '✅';
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-8 text-green-800">
        Proses Pendaftaran Rabbaanii Islamic School
      </h1>
      
      <div className="relative">
        {/* Progress line */}
        <div className="absolute left-10 top-0 h-full w-1 bg-green-200 -z-10"></div>
        
        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="flex items-start gap-3 cursor-pointer"
            //   onClick={() => setActiveStep(step.id)}
            >
              {/* Step number with icon */}
              <div className={`flex-shrink-0 w-20 h-20 rounded-full flex flex-col items-center justify-center text-xl font-semibold
                ${activeStep > step.id ? 'bg-green-600 text-white' : (activeStep === step.id? 'bg-orange-400 text-gray-200' : 'bg-gray-200 text-gray-600')}`}>
                <span className="text-2xl">{getStepIcon(step.type)}</span>
                <span className="text-xs ">{step.id}</span>
              </div>
              
              {/* Step content */}
              <div className={`p-4 rounded-lg flex-1 transition-all shadow-sm
                ${activeStep > step.id ? 'bg-white border-l-4 border-green-600 shadow-md' : (activeStep === step.id? 'bg-white border-l-4 border-orange-600 shadow-md' :  'bg-gray-100')}`}>
                <h3 className={`font-bold mb-1 ${activeStep > step.id ? 'text-green-800' : (activeStep === step.id? 'text-orange-700' :  'text-gray-700')}`}>
                  {step.title}
                </h3>
                <p className="text-gray-800 font-medium">{step.description}</p>
                <p className="text-gray-600 text-sm mt-2">{step.details}</p>
                
                {/* Special highlight for payment step */}
                {/* {step.id === 1 && (
                  <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
                    <p className="font-semibold text-yellow-800">BNI: 1111 2019</p>
                    <p className="text-yellow-700">Konfirmasi WA: 0853 1364 2033</p>
                  </div>
                )} */}
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
}