import React from 'react'
import { TiPinOutline} from 'react-icons/ti'

function Annoucement() {
  return (
   
        <section className="relative">
             {/* Section background (needs .relative class on parent and next sibling elements) */}
          <div className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-900 pointer-events-none" aria-hidden="true"></div>
          {/* <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div> */}
    
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
              <div className="py-12 md:py-20">
                <div className="rounded-2xl" style={{ height: '200px',width:"400px", backgroundColor: 'lightgray', padding: '10px', position: 'relative' }}>
                  <div className="rounded-2xl" style={{ height: '5px',  backgroundColor: 'green', position: 'absolute',left: '+10px', top: '-1px', width: 'calc(97% - 10px)' }}></div>
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

export default Annoucement