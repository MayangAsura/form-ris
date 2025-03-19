import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

function BerkasForm() {



    return (
        <section className="relative">
            <div className='max-w-6xl mx-auto px-4 sm:px-6'>
                <div className='py-12 md:py-20'>
                    <div className='max-w-sm md:max-w-4xl mx-auto'>
                        <form action="">
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base/7 font-semibold text-gray-900">Upload Kelengkapan Dokumen</h2>
                                <p className="mt-1 text-sm/6 text-gray-600 italic">
                                    Silakan upload Mohon Scan/Foto setiap dokumen dengan jelas.
                                    {/* This information will be displayed publicly so be careful what you share. */}
                                </p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div class="sm:col-span-4">
                                    <label for="bird_certificate" class="block text-sm/6 font-medium text-gray-900">Akta Kelahiran</label>
                                    <div class="mt-2">
                                        <input id="bird_certificate" name="bird_certificate" type="file" autocomplete="bird_certificate" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                    </div>
                                    </div>
                                    {/* if () {
                                        
                                    } */}
                                    <div class="sm:col-span-4">
                                    <label for="pas_photo" class="block text-sm/6 font-medium text-gray-900">Pas Photo background merah dan putih (3x4 dan 2x3) dengan format jpg </label>
                                    <div class="mt-2">
                                        <input id="pas_photo" name="pas_photo" type="file" autocomplete="pas_photo" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                    </div>
                                    </div>
                                    <div class="sm:col-span-4">
                                    <label for="parent_ktp" class="block text-sm/6 font-medium text-gray-900">KTP Orang Tua / Wali </label>
                                    <div class="mt-2">
                                        <input id="parent_ktp" name="parent_ktp" type="file" autocomplete="parent_ktp" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                    </div>
                                    </div>
                                    <div class="sm:col-span-4">
                                    <label for="kk" class="block text-sm/6 font-medium text-gray-900">Kartu Keluarga (KK)</label>
                                    <div class="mt-2    ">
                                        <input id="kk" name="kk" type="file" autocomplete="kk" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                    </div>
                                    </div>
                                    <div class="sm:col-span-4">
                                    <label for="surat_kesanggupan" class="block text-sm/6 font-medium text-gray-900">Surat Kesanggupan</label>
                                    <div class="mt-2">
                                        <input id="surat_kesanggupan" name="surat_kesanggupan" type="file" autocomplete="surat_kesanggupan" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                    </div>
                                    </div>
                                    <div class="sm:col-span-4">
                                    <label for="certificate" class="block text-sm/6 font-medium text-gray-900">Sertifikat / Syahadah Hafalan</label>
                                    <div class="mt-2">
                                        <input id="certificate" name="certificate" type="file" autocomplete="certificate" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
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