import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

function DataWaliForm() {

    return (
        <section className="relative">
            <div className='max-w-6xl mx-auto px-4 sm:px-6'>
                <div className='py-12 md:py-12'>
                    <div className='max-w-sm md:max-w-4xl mx-auto'>
                        <form action="">
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-3xl font-semibold text-gray-900">Data Wali</h2>
                                <p className="mt-1 text-sm/6 text-gray-600 italic">
                                    (Diisi jika Calon Peserta Didik diasuh oleh Wali)
                                    {/* Jika Ananda tinggal dengan wali. */}
                                    {/* This information will be displayed publicly so be careful what you share. */}
                                </p>
                                <div className="border-b border-gray-900/20 py-3"></div>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div class="sm:col-span-4">
                                    <label for="wali_name" class="block text-sm/6 font-medium text-gray-900">Nama Wali</label>
                                    <div class="mt-2">
                                        <input id="wali_name" name="wali_name" type="text" autocomplete="wali_name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                    </div>
                                    </div>
                                    <div class="sm:col-span-3">
                                        <label for="wali_academic" class="block text-sm/6 font-medium text-gray-900">Pendidikan Wali</label>
                                        <div class="mt-2 grid grid-cols-1">
                                            <select id="wali_academic" name="wali_academic" autocomplete="wali_academic" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                            <option value="sma_sederajat">SMA/sederajat</option>
                                            <option value="d1">D1</option>
                                            <option value="d2">D2</option>
                                            <option value="d3">D3</option>
                                            <option value="s1">S1</option>
                                            <option value="s2">S2</option>
                                            <option value="s3">S3</option>
                                            <option value="other">Other</option>

                                            </select>
                                            {/* <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                            </svg> */}
                                        </div>
                                    </div>
                                    <div class="sm:col-span-4">
                                    <label for="wali_job" class="block text-sm/6 font-medium text-gray-900">Pekerjaan Wali</label><span className='text-sm italic'>Pekerjaan utama wali</span>
                                    <div class="mt-2">
                                        <input id="wali_job" name="wali_job" type="text" autocomplete="wali_job" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                    </div>
                                    </div>
                                    <div class="sm:col-span-3">
                                        <label for="wali_salary" class="block text-sm/6 font-medium text-gray-900">Penghasilan Wali</label>
                                        <div class="mt-2 grid grid-cols-1">
                                            <select id="wali_salary" name="wali_salary" autocomplete="wali_salary" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                            <option>Kurang dari Rp2 Jt</option>
                                            <option>Kurang dari Rp2 Jt</option>
                                            <option>Rp5 Jt - Rp10 Jt</option>
                                            <option>Rp10 Jt - Rp15 Jt</option>
                                            <option>Rp15 Jt - Rp20 Jt</option>
                                            <option>Lebih dari Rp20 Jt</option>
                                            <option>Other</option>

                                            </select>
                                            {/* <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                            </svg> */}
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

export default DataWaliForm;