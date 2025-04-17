import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {

  const [top, setTop] = useState(true);

  // detect whether user has scrolled the page down by 10px 
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true)
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);  

  return (
    <header className={`mx-auto fixed flex z-30 md:bg-opacity-90 transition duration-300 mt-5 ease-in-out border-b ${!top && 'bg-white rounded-full backdrop-blur-sm shadow-lg'}`}>
      {/* w-10/12 */}
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex flex-row items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="block" aria-label="Cruip">
              <img src={"/images/rabbaanii-logo.png"} className="w-10 h-10"/>
            </Link>
          </div>

          {/* Site navigation */}
          <nav className="flex flex-grow ">
            <ul className="flex flex-grow justify-end flex-wrap items-center ml-8">
              <li>
                <Link to="/login" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">PENGISIAN FORMULIR</Link>
              </li>
              <li>
                <Link to="/" className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800">
                  <span>PENDAFTARAN</span>
                  <svg className="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                  </svg>                  
                </Link>
              </li>
              {/* <li className='ml-24'>
                <span className='font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out'>DASHBOARD SISWA</span> 
              </li>
              <li className='mr-2'>
                <Link to="/logout" className="btn-sm text-gray-200  bg-gray-900 hover:bg-gray-800">
                  <span>KELUAR</span>
                  <svg className="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                  </svg>                  
                </Link>
              </li> */}
            </ul>

          </nav>

        </div>
      </div>
    </header>
  );
}

export default Header;
