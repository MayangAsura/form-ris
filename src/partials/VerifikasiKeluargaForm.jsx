import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

function VerifikasiKeluargaForm() {



    return (
        <section className="relative">
            <div className='max-w-6xl mx-auto px-4 sm:px-6'>
                <div className='py-12 md:py-20'>
                    <div className='max-w-sm md:max-w-4xl mx-auto'>
                        <form action="">
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base/7 font-semibold text-gray-900">Verifikasi Keluarga Rabbaanii</h2>
                                <p className="mt-1 text-sm/6 text-gray-600">
                                Keluarga Rabbaanii : calon peserta didik adalah alumni RIS atau mempunyai kakak/adik yang bersekolah di RIS.
                                Non Keluarga Rabbaanii : calon peserta didik belum menjadi  alumni RIS atau belum memiliki kakak/adik yang bersekolah di RIS.
                                    {/* Silakan upload dokumen berikut, mohon Scan/Foto setiap dokumen dengan jelas. */}
                                    {/* This information will be displayed publicly so be careful what you share. */}
                                </p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            
                                    <div class="sm:col-span-3">
                                        <label for="student_category" class="block text-sm/6 font-medium text-gray-900">Calon Siswa termasuk kategori</label>
                                        <div class="mt-2 grid grid-cols-1">
                                            <select id="student_category" name="student_category" autocomplete="student_category" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                            <option value="ALUMNI">Alumni Rabbaanii</option>
                                            <option value="HASFAMILY">Memiliki saudara kandung sekolah di Rabbaanii</option>
                                            <option value="NEWSTUDENT">Tidak keduanya</option>
                                            </select>
                                            {/* <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                            </svg> */}
                                        </div>
                                    </div>
                                    {/* if () {
                                        
                                    } */}
                                   
                                    

                                   
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