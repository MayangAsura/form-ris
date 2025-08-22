import { useForm } from "react-hook-form";

import { defaultRegisterValues, RegisterSchema } from "../schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../auth/auth";
import { useNavigate } from "react-router-dom";
import Swal from "../../utils/Swal";
// import { useSonner } from "@/hooks/use-sonner";
// import { useRoutes } from "react-router-dom";
// import { useRouter } from "next/navigation";

const useRegister = () => {
  // const { sonner } = useSonner();
  // const { replace } = useRoutes();
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: defaultRegisterValues,
  });

  const { mutate: onRegister, isPending } = useMutation({
    mutationFn: (data) => {
      return AuthService.Register(data.username, data.password);
    },
    onSuccess: (data) => {
      console.log('data', data)
      if(data.token){
        
      }
      // sonner.success("Register berhasil!");

      // Redirect to dashboard
      navigate("/home");
    },
    onError: (error) => {
      // sonner.error((error).message || "Register gagal. Silakan coba lagi.");
    },
  });

  const onSubmit = (data) => {
    onRegister(data);
  };

  return {
    onSubmit,
    form,
    loading: isPending,
  };
};

export { useRegister };
