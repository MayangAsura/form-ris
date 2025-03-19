import React, { useState } from "react";
import "../css/additional-styles/stepper.css"
import { TiTick } from "react-icons/ti";
import IdentitasForm from "./IdentitasForm.jsx";
import DataAyahForm from "./DataAyahForm.jsx";
import DataIbuForm from "./DataIbuForm.jsx";
import DataWaliForm from "./DataWaliForm.jsx";
import BerkasForm from "./BerkasForm.jsx";
import VerifikasiKeluargaForm from "./VerifikasiKeluargaForm.jsx";
const Stepper = () => {
  const steps = ["Identitas Calon Santri", "Data Ayah", "Data Ibu", "Data Wali", "Upload Berkas", "Verifikasi Keluarga", "Konfirmasi Metode Pembayaran", "Status"];
  const form = [<IdentitasForm/>, <DataAyahForm/>, <DataIbuForm/>, <DataWaliForm/>, <BerkasForm/>, <VerifikasiKeluargaForm/>];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const callbackForm = (value) =>{
    console.log(value)
  }

  
  return (
    <>
      <div className="flex justify-center">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500">{step}</p>
            
            {/* { set} */}
            {/* {i==1?{
                <IdentitasForm callback={callbackForm}/>
            }} */}
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        {form[currentStep-1]}
      </div>
      {!complete && (
        <button
          className="btn"
          onClick={() => {
            currentStep === steps.length
              ? setComplete(true)
              : setCurrentStep((prev) => prev + 1);
          }}
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      )}
    </>
  );
};

export default Stepper;
