import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
// import { ChevronDownIcon } from '@heroicons/react/16/solid'

function DataAyahForm() {

    return (
        <section className="relative">
            <div className='max-w-6xl mx-auto px-4 sm:px-6'>
                <div className='py-12 md:py-12'>
                    <div className='max-w-sm md:max-w-4xl mx-auto'>
                        <form action="">
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-3xl font-semibold text-gray-900">Data Ayah</h2>
                                <p className="mt-1 text-sm/6 text-gray-600 italic">
                                    Data Diri Ayah Kandung
                                    {/* This information will be displayed publicly so be careful what you share. */}
                                </p>
                                <div className="border-b border-gray-900/20 py-3"></div>

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div  className="sm:col-span-4">
                                    <label htmlFor="father_name"  className="block text-sm/6 font-medium text-gray-900">Nama Ayah Kandung</label>
                                    <span className="text-sm italic">Hindari penggunaan gelar akademik atau sosial (Drs, Dr, H, dll)</span>
                                    <div  className="mt-2">
                                        <input id="father_name" name="father_name" type="text" autoComplete="father_name"  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                    </div>
                                    </div>
                                    <div  className="sm:col-span-4">
                                        <label htmlFor="father_academic"  className="block text-sm/6 font-medium text-gray-900">Pendidikan Ayah</label>
                                        <span className="text-sm italic">Pendidikan terakhir ayah kandung</span>
                                        <div  className="mt-2 grid grid-cols-1">
                                            <select id="father_academic" name="father_academic" autoComplete="father_academic"  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                            <option>SMA/sederajat</option>
                                            <option>D1</option>
                                            <option>D2</option>
                                            <option>D3</option>
                                            <option>S1</option>
                                            <option>S2</option>
                                            <option>S3</option>
                                            <option>Other</option>

                                            </select>
                                            {/* <svg  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                            </svg> */}
                                        </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                    <label htmlFor="father_job" className="block text-sm/6 font-medium text-gray-900">Pekerjaan Ayah</label>
                                    <span className="text-sm italic">Pekerjaan utama ayah kandung</span>
                                    <div  className="mt-2">
                                        <input id="father_job" name="father_job" type="text" autoComplete="father_job"  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"/>
                                    </div>
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label htmlFor="father_salary" className="block text-sm/6 font-medium text-gray-900">Penghasilah Ayah</label>
                                        <div className="mt-2 grid grid-cols-1">
                                            <select id="father_salary" name="father_salary" autoComplete="father_salary"  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                            <option>Kurang dari Rp2 Jt</option>
                                            <option>Kurang dari Rp2 Jt</option>
                                            <option>Rp5 Jt - Rp10 Jt</option>
                                            <option>Rp10 Jt - Rp15 Jt</option>
                                            <option>Rp15 Jt - Rp20 Jt</option>
                                            <option>Lebih dari Rp20 Jt</option>
                                            <option>Other</option>

                                            </select>
                                            {/* <svg  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                                            </svg> */}
                                        </div>
                                    </div>
                                 

                                    <div className="col-span-full">
                                    <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                                        Alasan Bapak/Ibu mendaftarkan Ananda ke Rabbaanii
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                        id="why_chooses"
                                        name="why_chooses"
                                        rows={5}
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        defaultValue={''}
                                        />
                                    </div>
                                    {/* <p className="mt-3 text-sm/6 text-gray-600">Write a few sentences about yourself.</p> */}
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

export default DataAyahForm;