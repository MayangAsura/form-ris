import { useState } from 'react';

export default function EducationPaymentFlow() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Pra-Pendaftaran",
      description: "Persiapan dokumen yang diperlukan",
      icon: "📋",
      color: "bg-emerald-100 border-emerald-400"
    },
    {
      id: 2,
      title: "Pembayaran Formulir",
      description: "Transfer biaya pendaftaran ke rekening sekolah",
      icon: "💳",
      color: "bg-teal-100 border-teal-400"
    },
    {
      id: 3,
      title: "Pengisian Formulir",
      description: "Mengisi data diri calon siswa dan orang tua",
      icon: "✍️",
      color: "bg-green-100 border-green-400"
    },
    {
      id: 4,
      title: "Tes Observasi",
      description: "Tes pengetahuan umum (Matematika, IPA, Bahasa)",
      icon: "📝",
      color: "bg-lime-100 border-lime-400"
    },
    {
      id: 5,
      title: "Tes Diniyah & Interview",
      description: "Praktik ibadah dan wawancara dengan pengajar",
      icon: "🕌",
      color: "bg-amber-100 border-amber-400"
    },
    {
      id: 6,
      title: "Pengumuman",
      description: "Pemberitahuan hasil seleksi penerimaan",
      icon: "📢",
      color: "bg-orange-100 border-orange-400"
    },
    {
      id: 7,
      title: "Pengukuran Seragam",
      description: "Penentuan ukuran seragam sekolah",
      icon: "👕",
      color: "bg-cyan-100 border-cyan-400"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-700">
        Alur Pembayaran Biaya Pendidikan
      </h1>
      
      <div className="relative">
        {/* Progress line */}
        <div className="absolute left-12 top-0 h-full w-1 bg-green-200 -z-10"></div>
        
        {/* Steps container */}
        <div className="space-y-6">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="flex items-start gap-6 group cursor-pointer"
              onClick={() => setActiveStep(step.id)}
            >
              {/* Step indicator */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold
                ${activeStep >= step.id ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {step.icon}
              </div>
              
              {/* Step content */}
              <div className={`p-5 rounded-lg flex-1 transition-all border-l-4 ${step.color} 
                ${activeStep === step.id ? 'scale-[1.02] shadow-md' : 'shadow-sm'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-lg font-bold mb-1 ${activeStep === step.id ? 'text-green-800' : 'text-gray-700'}`}>
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium 
                    ${activeStep >= step.id ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                    Step {step.id}
                  </span>
                </div>

                {/* Special highlight for Siakad sync */}
                {step.highlight && (
                  <div className="mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-sm">
                    <p className="font-medium text-blue-800">Status pembayaran akan otomatis tersinkron dengan Siakad</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Information panel */}
      <div className="mt-8 p-5 bg-green-50 rounded-lg border border-green-200">
        <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Informasi Penting
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Proses sinkronisasi ke Siakad membutuhkan waktu 5-15 menit</li>
          <li>Simpan bukti pembayaran sampai status terverifikasi</li>
          <li>Hubungi administrasi jika ada masalah dengan sinkronisasi</li>
        </ul>
      </div>
    </div>
  );
}