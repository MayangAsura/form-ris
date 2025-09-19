import { useForm } from "react-hook-form";

import { defaultRegisterValues, registerSchema } from "../schemas/register-trans";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../auth/auth";
import { useNavigate } from "react-router-dom";
import Swal from "../../utils/Swal";
import { useState } from "react";
import { da } from "zod/v4/locales";
import axios from '../../api/local-server';
// import axios from '../../api/prod-server';
// import { useSonner } from "@/hooks/use-sonner";
// import { useRoutes } from "react-router-dom";
// import { useRouter } from "next/navigation";

const useRegisterTrans = () => {
  // const { sonner } = useSonner();
  // const { replace } = useRoutes();
  const navigate = useNavigate()
  const [results, setResults] = useState({})
  const [error, setError] = useState({})
  const [requestData, setRequestData] = useState({})
  const [phone_number, setPhoneNumber] = useState("")
  const [full_name, setFullName] = useState("")
  const [notified, setNotified] = useState(false)

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: defaultRegisterValues,
  });

  const { mutate: onRegisterTrans, isPending } = useMutation({
    mutationFn: (data) => {
      setRequestData(prev => ({...prev, phone_number: data.phone_number, full_name: data.full_name}))
      setPhoneNumber(data.phone_number)
      setFullName(data.full_name)
      console.log('data', data, phone_number, requestData)
      return AuthService.register_trans(
            data.full_name,
            data.gender,
            data.phone_number,
            data.email,
            data.password,
            data.media,
            data.school_id,
            data.subschool??"",
            data.is_new,
            data.class_code
            // data.dob
          );
    },
    onSuccess: (data) => {
      if(data){
        setResults(data)

        if(data.f1 !== '01'){
          sendNotif(data)
        }
      }
      // sonner.success("Register berhasil!");

      // Redirect to dashboard
      // if()
      // navigate("/login");
    },
    onError: (error) => {
      setError(error)
      console.log('pendaftaran error ', error)
      // sonner.error((error).message || "Register gagal. Silakan coba lagi.");
    },
  });

  const sendNotif = async (_results) => {
    console.log('phone_number', phone_number)
    console.log('phone_number', requestData.full_name)
      const new_phone_number = '62'+ phone_number.slice(1)
    const data = [{
            "phone": new_phone_number,
            // "phone": "6285778650040",
            "message": `Assalamu'alaikum, Alhamdulillah Ananda ${full_name} telah terdaftar di Aplikasi PSB RIS TA. 26/27. 
No. Pendaftaran: ${_results?.f3}
Login Aplikasi: https://psb.rabbaanii.sch.id/login

Ananda dapat login dengan No. Pendaftaran atau No. WhatsApp terdaftar untuk melanjutkan pendaftaran.
Jazaakumullahu khayran wa Baarakallaahu fiikum.

-- PSB RABBAANII ISLAMIC SCHOOL - CS RABBAANII --
- Mohon simpan nomor ini untuk mendapatkan update informasi -`
            // "message": "Assalamu'alaikum, Alhamdulillah ananda telah terdaftar di sistem kami dengan No. Registrasi . "
    
          }]

          // Ayah/Bunda disilahkan bergabung ke tautan Grup WA Pendaftar https://bit.ly/GROUPWA-PPDBRIS2627 untuk informasi lebih lanjut.
          // console.log(data)
    
          // setSuccess(true)
          // setModalShow(true)
    
          
              try {
                const response = await axios.post("/api/auth/send-notif", {message: data , type: 'form-success', token: null},
                {
                  headers: {'Content-Type': 'application/json' }
                }
                );
                // 
                console.log(JSON.stringify(response)); //console.log(JSON.stringify(response));
                if(response.data.status==200 || response.data.status==204){
                  setNotified(true)
                  // persistor.purge();
                  // // Reset to default state reset: async () => { useCart.persist.clearStorage(); set((state) => ({ ...initialState, })); },
                  // localStorage.removeItem("persist:auth")
                  // Cookies.remove("jwt")
                  // dispatch(logout())
                  // navigate('/login')
                }
              } catch (error) {
                console.log(error)
                setNotified(false)
              } finally {
                setNotified(false)
                // setIsLoading(false)
              }
  }

  const onSubmit = (data) => {
    console.log('data on register', data)
    onRegisterTrans(data);
  };

  return {
    onSubmit,
    results,
    form,
    loading: isPending,
    error, 
    notified
  };
};

export { useRegisterTrans };
