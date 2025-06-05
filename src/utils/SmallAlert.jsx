// 'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function SmallAlert(props) {
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()
  console.log(props)

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-30 items-baseline-last">
      <DialogBackdrop
        transition
        className="fixed inset-0 transition-opacity items-baseline-last data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-80 overflow-y-auto ">
        <div className="flex  min-h-full items-start justify-center p-4 text-end sm:items-start sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg  text-left  transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div id="alert-3" className="flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
              <svg className="shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <span className="sr-only">Info</span>
              <div className="mx-3 text-sm font-medium">
                {props.dataAlert.message}
                {/* A simple info alert with an <a href="#" className="font-semibold underline hover:no-underline">example link</a>. Give it a click if you like. */}
              </div>
              <button type="button" onClick={(e) => {props.setDataAlertShow(false)}} className="ms-auto -mx-1.5 -my-1.5 text-end bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-3" aria-label="Close">
                <span className="sr-only">Tutup</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
              </button>
            </div>
            
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
