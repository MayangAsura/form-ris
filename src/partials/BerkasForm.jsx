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
                                    <div class="sm:col-span-4">
                                    <label for="bird_certificate" class="block text-sm/6 font-medium text-gray-900">Akta Kelahiran</label>
                                    <span></span>
                                    <div class="mt-2">
                                        <input id="bird_certificate" name="bird_certificte" type="file" autocomplete="bird_certificate" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                    </div>
                                    </div>
                                    <div class="sm:col-span-4">
                                    <label for="bird_certificate" class="block text-sm/6 font-medium text-gray-900">Akta Kelahiran</label>
                                    <span></span>
                                    <div class="mt-2">
                                    <div class="relative inline-block">
                                        <input type="file" class="
                                            file:absolute file:right-0 
                                            file:bg-blue-500 file:text-white file:border-0
                                            file:py-1 file:px-3 file:rounded-full
                                            file:shadow-xl file:shadow-blue-500/30
                                            text-gray-600
                                        "/>
                                    </div>
                                        {/* <input id="bird_certificate" name="bird_certificte" type="file" autocomplete="bird_certificate" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/> */}
                                    </div>
                                    </div>
                                    <div className="col-span-full">
                                        <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                                            Cover photo
                                        </label>
                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-3 py-5">
                                            <div className="text-center">
                                            <PhotoIcon aria-hidden="true" className="mx-auto size-4 text-gray-300" />
                                            <div className="mt-4 flex text-sm/6 text-gray-600">
                                                <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                                                >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* if () {
                                        
                                    } */}
                                    <div class="sm:col-span-4">
                                    <label for="pas_photo" class="block text-sm/6 font-medium text-gray-900">Pas Photo Background Merah dan Putih (3x4 dan 2x3) (JPG)</label>
                                    <p className="text-xs/5 text-gray-600">JPG, maks 5MB</p>
                                    <div class="mt-2">
                                        <input id="pas_photo" name="pas_photo" type="file" autocomplete="pas_photo" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                    </div>
                                    </div>
                                    <div class="sm:col-span-4">
                                    <label for="parent_ktp" class="block text-sm/6 font-medium text-gray-900">KTP Orang Tua / Wali </label>
                                    <p className="text-xs/5 text-gray-600">PNG, JPG, maks 5MB</p>
                                    <div class="mt-2">
                                        <input id="parent_ktp" name="parent_ktp" type="file" autocomplete="parent_ktp" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                    </div>
                                    </div>
                                    <div class="sm:col-span-4">
                                    <label for="kk" class="block text-sm/6 font-medium text-gray-900">Kartu Keluarga (KK)</label>
                                    <p className="text-xs/5 text-gray-600">PDF, maks 2MB</p>
                                    <div class="mt-2    ">
                                        <input id="kk" name="kk" type="file" autocomplete="kk" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                    </div>
                                    </div>
                                    <div class="sm:col-span-4">
                                    <label for="surat_kesanggupan" class="block text-sm/6 font-medium text-gray-900">Surat Kesanggupan</label>
                                    <p className="text-xs/5 text-gray-600">PDF, maks 2MB</p>
                                    <div class="mt-2">
                                        <input id="surat_kesanggupan" name="surat_kesanggupan" type="file" autocomplete="surat_kesanggupan" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                    </div>
                                    </div>
                                    <div class="sm:col-span-4">
                                    <label for="certificate" class="block text-sm/6 font-medium text-gray-900">Sertifikat / Syahadah Hafalan</label>
                                    <p className="text-xs/5 text-gray-600">PDF, maks 5MB</p>
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