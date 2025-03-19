import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
// import { data } from 'autoprefixer';
import  React, { useState } from 'react';

function IdentitasForm() {
    const [full_name, setFull_name] = useState("")

    const data = { full_name}



    return (
        <section className="relative">
            <div className='max-w-6xl mx-auto px-4 sm:px-6'>
                <div className='py-12 md:py-20'>
                    <div className='max-w-sm md:max-w-4xl mx-auto'>
                        <form action="">
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base/7 font-semibold text-gray-900">Identitas Calon Santri</h2> <hr className='inline' />
                                <p className="mt-1 text-sm/6 text-gray-600">
                                    {/* This information will be displayed publicly so be careful what you share. */}
                                </p>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div class="sm:col-span-4">
                                    <label for="full_name" class="block text-sm/6 font-medium text-gray-900">Nama Lengkap</label>
                                    <div class="mt-2">
                                        <input id="full_name" name="full_name" onChange={e => (setFull_name(e.target.value))} type="text" autocomplete="full_name" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                    </div>
                                    </div>
                                    <div class="sm:col-span-4">
                                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Jenis Kelamin</label>
                                    <div class="mt-2">
                                        <input id="gender" name="gender" type="text" autocomplete="gender" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                    </div>
                                    </div>
                                    <div class="sm:col-span-4">
                                    <label for="phone_number" class="block text-sm/6 font-medium text-gray-900">No. WhatsApp</label>
                                    <div class="mt-2">
                                        <input id="phone_number" name="phone_number" type="text" autocomplete="phone_number" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                    </div>
                                    </div>
                                    <div class="sm:col-span-4">
                                    <label for="email" class="block text-sm/6 font-medium text-gray-900">Email</label>
                                    <div class="mt-2">
                                        <input id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                    </div>
                                    </div>
                                    <div class="sm:col-span-4">
                                    <label for="previous_school" class="block text-sm/6 font-medium text-gray-900">Sekolah Asal</label>
                                    <div class="mt-2">
                                        <input id="previous_school" name="previous_school" type="text" autocomplete="previous_school" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                    </div>
                                    </div>
                                    <div class="sm:col-span-4">
                                    <label for="school" class="block text-sm/6 font-medium text-gray-900">Mendaftar Jenjang</label>
                                    <div class="mt-2">
                                        <input id="school_id" name="school_id" type="text" autocomplete="school_id" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                    </div>
                                    </div>
                                    
                                    
                                    
                                    <div class="sm:col-span-4">
                                        <label for="national" class="block text-sm/6 font-medium text-gray-900">Kewarganegaraan</label>
                                        <div class="mt-2 grid grid-cols-1">
                                            <select id="national" name="national" autocomplete="national" class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                            <option>United States</option>
                                            <option>Canada</option>
                                            <option>Mexico</option>
                                            </select>
                                            {/* <svg class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 8 8" fill="currentColor" aria-hidden="true"  data-slot="icon">
                                            <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                            </svg> */}
                                        </div>
                                    </div>

                                        <div class="col-span-full">
                                        <label for="address" class="block text-sm/6 font-medium text-gray-900">Alamat</label>
                                        <div class="mt-2">
                                            <input type="text" name="address" id="address" autocomplete="address" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                        </div>
                                        </div>

                                        <div class="sm:col-span-2 sm:col-start-1">
                                        <label for="province" class="block text-sm/6 font-medium text-gray-900">Provinsi</label>
                                        <div class="mt-2">
                                            <input type="text" name="province" id="province" autocomplete="province-level2" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                        </div>
                                        </div>

                                        <div class="sm:col-span-2">
                                        <label for="region" class="block text-sm/6 font-medium text-gray-900">Kabupaten</label>
                                        <div class="mt-2">
                                            <input type="text" name="region" id="region" autocomplete="address-level1" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                        </div>
                                        </div>

                                        <div class="sm:col-span-2">
                                        <label for="postal-code" class="block text-sm/6 font-medium text-gray-900">Kode Pos</label>
                                        <div class="mt-2">
                                            <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                        </div>
                                        </div>
                                  
                                   

                                    <div className="col-span-full">
                                    <label htmlFor="aspiration" className="block text-sm/6 font-medium text-gray-900">
                                        Cita-Cita
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                        id="aspiration"
                                        name="aspiration"
                                        rows={3}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        defaultValue={''}
                                        />
                                    </div>
                                    <p className="mt-3 text-sm/6 text-gray-600 ita">Tulis cita-cita dan harapan ananda bersekolah di Rabbaanii Islamic School.</p>
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

export default IdentitasForm;