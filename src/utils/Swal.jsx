// 'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function Swal(props) {
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()
  console.log(props)


  return (
    <div data-modal-backdrop={props.dataModal.type=='static'?'static': ''} >
      <Dialog open={open} onClose={setOpen} className="relative z-30" >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              {/* sm:flex sm:items-start */}
                <div className="flex flex-col justify-center items-center">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                  </div>
                  <div className="flex flex-col mt-3 text-center items-center justify-center sm:ml-4 sm:mt-0 sm:text-center">
                    {props.dataModal.title && (
                      <DialogTitle as="h3" className="text-base text-center font-semibold text-gray-900">
                        {props.dataModal.title}
                      </DialogTitle>
                    )}
                    {props.dataModal.message && (
                      <div className="mt-2">
                        <p className="text-sm text-center text-gray-500">
                          {props.dataModal.message}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-col sm:px-6">
              {/* setOpen(false) */}
              {/* {!props.dataModal.url && !props.dataModal.url2 && (
                <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 my-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:w-auto"
              >
                OK
              </button>
              )} */}
              {props.dataModal.url?(
                <button
                  type="button"
                  onClick={() => window.location.href=`${props.dataModal.url}`}
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 my-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:w-auto"
                >
                  {props.dataModal.text}
                </button>):(
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 my-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:w-auto"
                >
                  OK
                </button>
                )
                }
              {props.dataModal.url2? (
                <button
                  type="button"
                  data-autofocus
                  onClick={() => window.location.href=`${props.dataModal.url2}`}
                  className="mt-5 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  {props.dataModal.text2}
                </button>
              ): (
              <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 my-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 sm:w-auto"
                >
                  Cancel
                </button>

              )
              }
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      
    </div>
  )
}
