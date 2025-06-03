import React, { useEffect, useState } from 'react'
import { TiPinOutline} from 'react-icons/ti'
import supabase from '../client/supabase_client'
import { useSelector } from 'react-redux'

function Announcement(props) {

  const {userToken} = useSelector(state => state.auth)
  const [submission_status, setSubmissionStatus] = useState("initial_submission")

  useEffect(()=>{
    getSubmissionStatus()
  },[props.participant])

  const getSubmissionStatus = async () => {
    const { data: participants , error} = await supabase.from("participants")
                          .select("submission_status, applicants(refresh_token)")
                          .eq('applicants.refresh_token', userToken)
                          // .single()

    // getSubmissionStatusDesc
    if(error)
      console.log(error)

    if(participants.submission_status=="awaiting_processing"){
      const text = "Formulir Diproses" 
      setSubmissionStatus(text)
    }
    if(participants.submission_status=="initial_submission"){
      const text = "Pengisian Formulir" 
      setSubmissionStatus(text)
    }
    if(participants?.submission_status??"initial_submission"){
      const text = "Pengisian Formulir" 
      setSubmissionStatus(text)
    }
    if(participants?.submission_status=="accepted"){
      const text = "LULUS" 
      setSubmissionStatus(text)
    }
    if(participants?.submission_status=="not_accepted"){
      const text = "Tidak Lulus" 
      setSubmissionStatus(text)
    }

  }
  
  return (
   
        <section className="relative">
             {/* Section background (needs .relative class on parent and next sibling elements) */}
          {/* <div className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-900 pointer-events-none" aria-hidden="true"></div> */}
          {/* <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div> */}
    
          <div className="relative max-w-6xl mx-auto bg-gray-200 px-4 sm:px-6" >
              <div className="py-10 md:py-10">
                  <h3 className="h3 mb-4">Pengumuman</h3>
                <div className="rounded-2xl" style={{ height: '320px', width:"400px", backgroundColor: 'lightgray', padding: '10px', position: 'relative' }}>
                  <div className="rounded-2xl" style={{ height: '5px', backgroundColor: 'green', position: 'absolute',left: '+10px', top: '-1px', width: 'calc(97% - 10px)' }}></div>
                  <p className='text-gray-900 mt-2 text-center'>
                    <p>
                    Jazaakumullahu khayran telah mendaftar di Rabbaanii Islamic School, status pendaftaran saat ini:
                    </p>
                    {/* Status : */}
                    <br />
                  <span className="rounded-md w-24 bg-green-100 px-3 py-2 mt-15 text-base font-medium text-green-700 ring-1 ring-inset ring-green-600/10">
                        {submission_status}
                          
                        </span>
                  {/* Status : Incomplete
                  span
                    <table className='table-auto w-full mt-15'>
                      <tr>
                        <td>Status</td>
                        <td></td>
                        <td></td>
                      </tr>s
                     <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Belum Terdaftar
                        </
                    </table> */}
                    {/* <span className='flex flex-grow justify-center text-start my-5'>
                     Statuspan
                     
                    </span> */}
                    <div className='flex flex-grow gap-2 px-2 mt-10'>
                      {}
                      <button type="submit" className='btn w-full block btn-sm m-2 text-sm text-gray-200 bg-green-900 hover:bg-gray-800'
                                                  // onClick={() => {
                                                  //     // currentStep === steps.length
                                                  //     //   ? setComplete(true)
                                                  //     //   : setCurrentStep((prev) => prev + 1); 
                                                  //     if(props.currentStep === 9){
                                                  //     props.handledComplete(true)
                                                  //     }else{
                                                  //     // props.handledCurrentStep(props.currentStep + 1) ;
                                                  //     // props.setCurrentStep((prev) => prev + 1);
                                                  //     // callback(data)
                                                  //     }
                                                  //     // handleSubmit 
                                                  // }}
                                                  >Download Surat Pengumuman</button> <br />
                      <button type="submit" className='btn w-full block btn-sm m-2 text-sm text-gray-200 bg-green-900 hover:bg-gray-800'
                                                  // onClick={() => {
                                                  //     // currentStep === steps.length
                                                  //     //   ? setComplete(true)
                                                  //     //   : setCurrentStep((prev) => prev + 1); 
                                                  //     if(props.currentStep === 9){
                                                  //     props.handledComplete(true)
                                                  //     }else{
                                                  //     // props.handledCurrentStep(props.currentStep + 1) ;
                                                  //     // props.setCurrentStep((prev) => prev + 1);
                                                  //     // callback(data)
                                                  //     }
                                                  //     // handleSubmit 
                                                  // }}
                                                  >Download Surat Pernyataan Wali Santri</button>

                    </div>
                    {submission_status == 'accepted' && (
                      <div className='flex flex-grow gap-4 px-2 mt-2'>
                        <button type="submit" className='btn w-full block btn-sm -p-2 text-sm text-gray-200 bg-orange-900 hover:bg-gray-800'
                                                    onClick={() => {
                                                        setCurrentStep(10)
                                                        // currentStep === steps.length
                                                        //   ? setComplete(true)
                                                        //   : setCurrentStep((prev) => prev + 1); 
                                                        // if(props.currentStep === 9){
                                                        // props.handledComplete(true)
                                                        // }else{
                                                        // // props.handledCurrentStep(props.currentStep + 1) ;
                                                        // // props.setCurrentStep((prev) => prev + 1);
                                                        // // callback(data)
                                                        // }
                                                        // handleSubmit 
                                                    }}
                                                    >Pengukuran Seragam</button>
                      </div>
                    )}
                    
                  </p>
                </div>
                {/* <div className="max-w-sm bg-white shadow-2xl rounded-lg overflow-hidden">
      
                  <img className="w-full h-48 object-cover" src="https://via.placeholder.com/400" alt="Card Image" />
      
                  <div className="p-4">
      
                      <div className='mx-auto flex items-center'><TiPinOutline size={48} className="justify-start mx-auto -mr-10"/><h2 className="text-xl font-bold text-gray-800 justify-start mx-auto">Pengumuman</h2></div>
                      
                      <p className="text-gray-600 mt-2">Pengumuman.</p>
      
                      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
      
                      Selengkapnya
      
                      </button>
      
                  </div>
      
                </div> */}
              </div>
            </div>
          </section>
        
    
     
    // <div>Annoucement</div>
  )
}

export default Announcement