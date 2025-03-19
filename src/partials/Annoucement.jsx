import React from 'react'

function Annoucement() {
  return (
   
        <section className="relative">
             {/* Section background (needs .relative class on parent and next sibling elements) */}
          <div className="absolute inset-0 top-1/2 md:mt-24 lg:mt-0 bg-gray-900 pointer-events-none" aria-hidden="true"></div>
          {/* <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div> */}
    
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <div className="py-12 md:py-20">
              <div className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden">
    
                <img className="w-full h-48 object-cover" src="https://via.placeholder.com/400" alt="Card Image" />
    
                <div className="p-4">
    
                    <h2 className="text-xl font-bold text-gray-800">Informasi</h2>
    
                    <p className="text-gray-600 mt-2"></p>
    
                    <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
    
                    Selengkapnya
    
                    </button>
    
                </div>
    
              </div>
            </div>
          </div>
          </section>
        
    
     
    // <div>Annoucement</div>
  )
}

export default Annoucement