import React, {useEffect, useState} from 'react'


function Status(props) {
  const [status_submission, setSubmissionStatus] = useState("initial_submission")

  useEffect(() => {
    
    console.log('dataStatus', props.dataStatus)
    if(props.dataStatus){
      setSubmissionStatus(props.dataStatus)
      
  }
  }, [props.dataStatus])
  return (
   
        <section className="relative">
             {/* Section background (needs .relative class on parent and next sibling elements) */}
          {/* <div className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-900 pointer-events-none" aria-hidden="true"></div> */}
          {/* <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div> */}
    
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
              <div className="py-12 md:py-12">
                <div className="max-w-sm bg-white shadow-2xl rounded-lg border border-dashed border-gray-900/25 overflow-hidden">
      
                  {/* <img className="w-full h-48 object-cover" src="https://via.placeholder.com/400" alt="Card Image" /> */}
      
                  <div className="mt-2 pb-20 flex justify-center rounded-lg">
                      <div className="text-center">
                      {/* <PhotoIcon aria-hidden="true" className="mx-auto size-4 text-gray-300" /> */}
                      {/* bg-green-100 dark:bg-green-900 */}
                      <div className="flex flex-col items-center gap-5 text-sm/6 text-gray-600 p-5">
                        {/* <div className="w-24 h-24 rounded-full outline-dashed outline-blue-500/25 outline-2 opacity p-2 flex items-center justify-center mx-40 mt-10 mb-5">
                            <svg aria-hidden="true" className="w-24 h-24 text-blue-500 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Success</span>
                        </div> */}
                        {/* <p>Status Pengisian Formulir</p> */}
                        <span className="rounded-md w-24 bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          SELESAI
                        </span>
                          {/* <TiInputCheckedOutline  size={512} className='items-center'/> */}
                          {/* <p className="pb-1">Status Pembayaran</p> */}
                          <p className="pb-1">Status Pengisian formulir selesai. Informasi selanjutnya dapat dilihat melalui Pengumuman. 
                            {status_submission == 'initial_submission' ? (
                              "Ananda dapat melakukan pembaruan data sebelum tanggal berakhir pendaftaran."
                            ) : ( 
                              "Ananda tidak dapat lagi melakukan pembaruan data tanggal pendaftaran telah berakhir."
                            )
                            }
                            </p>

                          {/* <button type="submit" className='btn w-full block btn-sm my-12 text-sm text-gray-200 bg-green-900 hover:bg-gray-800'
                                                  onClick={() => {
                                                      // currentStep === steps.length
                                                      //   ? setComplete(true)
                                                      //   : setCurrentStep((prev) => prev + 1); 
                                                      if(props.currentStep === 9){
                                                      props.handledComplete(true)
                                                      }else{
                                                        
                                                      // props.handledCurrentStep(props.currentStep + 1) ;
                                                      // props.setCurrentStep((prev) => prev + 1);
                                                      // callback(data)
                                                      }
                                                      // handleSubmit 
                                                  }}
                                                  >Selesaikan</button> */}
                                                  {/* {status_submission == 'initial_submission' && ( */}

                                                    <button type="submit" className='btn w-full block btn-sm my-12 text-sm text-white bg-black hover:bg-gray-800'
                                                    onClick={() => {
                                                        // currentStep === steps.length
                                                        //   ? setComplete(true)
                                                        //   : setCurrentStep((prev) => prev + 1); 
                                                        if(props.currentStep === 9){
                                                        // props.handledComplete(true)
                                                        props.getCurrentStep(2)
                                                        props.getEdit(true)
                                                        }else{
                                                          
                                                        // props.handledCurrentStep(props.currentStep + 1) ;
                                                        // props.setCurrentStep((prev) => prev + 1);
                                                        // callback(data)
                                                        }
                                                        // handleSubmit 
                                                    }}
                                                    >Edit Data</button>
                                                  {/* )} */}
                                                  {(status_submission == 'accepted' || status_submission == 'on_measurement') && (
                                                      <button type="submit" className='btn w-full block btn-sm my-12 text-sm text-white bg-black hover:bg-gray-800'
                                                      onClick={() => {
                                                          // currentStep === steps.length
                                                          //   ? setComplete(true)
                                                          //   : setCurrentStep((prev) => prev + 1); 
                                                          // if(props.currentStep === 9){
                                                          // // props.handledComplete(true)
                                                          // props.getCurrentStep(2)
                                                          // // props.getEdit(true)
                                                          // }else{
                                                            
                                                          // props.handledCurrentStep(props.currentStep + 1) ;
                                                          props.setCurrentStep((prev) => prev + 1);
                                                          // callback(data)
                                                          // }
                                                          // handleSubmit 
                                                      }}
                                                      >Selanjutnya</button>

                                                  )}
                          {/* <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                          >
                          <span>SUKSES</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label> */}
                      </div>
                      {/* <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p> */}
                      </div>
                  </div>
                  {/* <div className="p-4">
      
                      <div className='mx-auto flex items-center'><TiPinOutline size={48}className="justify-start mx-auto -mr-10"/><h2 className="text-xl font-bold text-gray-800 justify-start mx-auto">Pengumuman</h2></div>
                      
                      <p className="text-gray-600 mt-2">Ini adalah contoh kartu menggunakan Tailwind di React.</p>
      
                      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
      
                      Selengkapnya
      
                      </button>
      
                  </div> */}
      
                </div>
              </div>
            </div>
          </section>
        
    
     
    // <div>Annoucement</div>
  )
}

export default Status