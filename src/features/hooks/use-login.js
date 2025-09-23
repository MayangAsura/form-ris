import { useForm } from "react-hook-form";

import { defaultLoginValues, loginSchema } from "../schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../auth/auth";
import { useNavigate } from "react-router-dom";
import Swal from "../../utils/Swal";
import { useState } from "react";
// import { useSonner } from "@/hooks/use-sonner";
// import { useRoutes } from "react-router-dom";
// import { useRouter } from "next/navigation";

const useLogin = () => {
  // const { sonner } = useSonner();
  // const { replace } = useRoutes();
  // const [modal_data, setmodal_data] = useState({
  //   title: "Login Berhasil",
  //   message: "Mengarahkan ke halaman pengisian formulir.",
  //   text: "OK",
  //   url: "/home"
  // })
  const [results, setResults] = useState({code: '', data: null})
  // let results
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultLoginValues,
  });

  const { mutate: onLogin, isPending } = useMutation({
    mutationFn: (data) => {
      return AuthService.login(data.username, data.password);
    },
    onSuccess: (data) => {
      // if(data.message){
        
      // }
      if(data.token){
        // {modal_show && (xx
        setResults(prev => ({...prev, code: '00', data: data}))

        localStorage.setItem('token', data?.token)
        localStorage.setItem('token-refresh', data?.token_refresh)
        if (data?.token_refresh) {
        console.log(data.token_refresh)
        Cookies.set('token-refresh', data.token_refresh, {
            expires: 1, // Expires in 1 day
            secure: false, // Secure in production
            sameSite: 'strict', // CSRF protection
            path: '/' // Accessible across entire site
        });
        }

        // navigate('/home')

        //   const token = Cookies.get('token-refresh')
        // // }
        // // results = data
        // console.log('results use login', results)
        // <Swal dataModal={modal_data}  />
          // setDestroy={setDestroy}
        // )}
        // navigate("/home");
      }else{                                                                                                                                                                    
        console.log('masuk>> ')
        setResults(prev => ({...prev, code: '01', data: data.message}))
      }
      
      // sonner.success("Login berhasil!");

      // Redirect to dashboard
    },
    onError: (error) => {
      console.log('masuk>> ',error)
      setResults({code: '01', data: error.response.message??"Periksa kembali Username atau Password Anda"})
      // sonner.error((error).message || "Login gagal. Silakan coba lagi.");
    }
  });

  const onSubmit = (data) => {
    onLogin(data);
  };

  // const results = () => {
  //   return 
  // }

  return {
    onSubmit,
    form,
    results,
    loading: isPending,
  };
};

export { useLogin };
