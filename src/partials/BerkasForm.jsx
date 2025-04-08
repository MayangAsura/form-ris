import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

function BerkasForm() {



    return (
        <section className="relative">
            <div className='max-w-6xl mx-auto px-4 sm:px-6'>
                <div className='py-12 md:py-12'>
                    <div className='max-w-sm md:max-w-4xl mx-auto'>
                        <form action="">
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-3xl font-semibold text-gray-900">Upload Kelengkapan Dokumen</h2>
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
                                    <label htmlFor="bird_certificate" className="block text-sm/6 font-medium text-gray-900">Akta Kelahiran</label>
                                    <div className="mt-2">
                                    <div className="relative inline-block">
                                        {/* <input type="file" className="file:absolute file:right-0 file:bg-green-500 file:text-white file:border-0 file:py-1 file:px-3 file:rounded-full file:shadow-xl file:shadow-blue-500/30 text-gray-600"/> */}
                                        <input id="bird_certificate" name="bird_certificte" type="file" 
                                        className="p-3 w-full text-slate-500 text-sm rounded-sm leading-6 file:absolute file:right-0 file:bg-violet-200 file:text-green-700 file:font-semibold file:border-none file:px-4 file:py-0 file:mr-2 file:rounded-sm hover:file:bg-violet-100 border border-gray-300"/>
                                        <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                        {/* <input id="bird_certificate" name="bird_certificte" type="file" autoComplete="bird_certificate" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/> */}
                                    </div>
                                    </div>
                                    
                                    {/* if () {
                                        
                                    } */}
                                    <div className="sm:col-span-4">
                                    <label htmlFor="pas_photo" className="block text-sm/6 font-medium text-gray-900">Pas Photo Background Merah dan Putih (3x4 dan 2x3) (JPG)</label>
                                    <p className="text-xs/5 text-gray-600">JPG, maks 5MB</p>
                                    <div className="mt-2">
                                        <input id="pas_photo" name="pas_photo" type="file" className="p-3 w-full text-slate-500 text-sm rounded-sm leading-6 file:absolute file:right-0 file:bg-violet-200 file:text-green-700 file:font-semibold file:border-none file:px-4 file:py-0 file:mr-2 file:rounded-sm hover:file:bg-violet-100 border border-gray-300"/>
                                        {/* <input id="pas_photo" name="pas_photo" type="file" autoComplete="pas_photo" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/> */}
                                    </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                    <label htmlFor="parent_ktp" className="block text-sm/6 font-medium text-gray-900">KTP Orang Tua / Wali </label>
                                    <p className="text-xs/5 text-gray-600">PNG, JPG, maks 5MB</p>
                                    <div className="mt-2">
                                        <input id="parent_ktp" name="parent_ktp" type="file" className="p-3 w-full text-slate-500 text-sm rounded-sm leading-6 file:absolute file:right-0 file:bg-violet-200 file:text-green-700 file:font-semibold file:border-none file:px-4 file:py-0 file:mr-2 file:rounded-sm hover:file:bg-violet-100 border border-gray-300"/>
                                        {/* <input id="parent_ktp" name="parent_ktp" type="file" autoComplete="parent_ktp" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/> */}
                                    </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                    <label htmlFor="kk" className="block text-sm/6 font-medium text-gray-900">Kartu Keluarga (KK)</label>
                                    <p className="text-xs/5 text-gray-600">PDF, maks 2MB</p>
                                    <div className="mt-2">
                                        <input id="kk" name="kk" type="file" className="p-3 w-full text-slate-500 text-sm rounded-sm leading-6 file:absolute file:right-0 file:bg-violet-200 file:text-green-700 file:font-semibold file:border-none file:px-4 file:py-0 file:mr-2 file:rounded-sm hover:file:bg-violet-100 border border-gray-300"/>
                                        {/* <input id="kk" name="kk" type="file" autoComplete="kk" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/> */}
                                    </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                    <label htmlFor="surat_kesanggupan" className="block text-sm/6 font-medium text-gray-900">Surat Kesanggupan</label>
                                    <p className="text-xs/5 text-gray-600">PDF, maks 2MB</p>
                                    <div className="mt-2">
                                        <input id="surat_kesanggupan" name="surat_kesanggupan" type="file" className="p-3 w-full text-slate-500 text-sm rounded-sm leading-6 file:absolute file:right-0 file:bg-violet-200 file:text-green-700 file:font-semibold file:border-none file:px-4 file:py-0 file:mr-2 file:rounded-sm hover:file:bg-violet-100 border border-gray-300"/>
                                        {/* <input id="surat_kesanggupan" name="surat_kesanggupan" type="file" autoComplete="surat_kesanggupan" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/> */}
                                    </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                    <label htmlFor="certificate" className="block text-sm/6 font-medium text-gray-900">Sertifikat / Syahadah Hafalan</label>
                                    <p className="text-xs/5 text-gray-600">PDF, maks 5MB</p>
                                    <div className="mt-2">
                                        <input id="certificate" name="certificate" type="file" className="p-3 w-full text-slate-500 text-sm rounded-sm leading-6 file:absolute file:right-0 file:bg-violet-200 file:text-green-700 file:font-semibold file:border-none file:px-4 file:py-0 file:mr-2 file:rounded-sm hover:file:bg-violet-100 border border-gray-300"/>
                                        {/* <input id="certificate" name="certificate" type="file" autoComplete="certificate" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/> */}
                                    </div>
                                    </div>
                                    

                                   
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