// import { useForm } from "react-hook-form";

// import { defaultLoginValues, loginSchema } from "../schemas/login";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation } from "@tanstack/react-query";
// import { AuthService } from "../auth/auth";
// import { useNavigate } from "react-router-dom";
// // import { useSonner } from "@/hooks/use-sonner";
// // import { useRoutes } from "react-router-dom";
// // import { useRouter } from "next/navigation";

// const useLogin = () => {
//   // const { sonner } = useSonner();
//   // const { replace } = useRoutes();
//   const navigate = useNavigate()

//   const form = useForm({
//     resolver: zodResolver(loginSchema),
//     defaultValues: defaultLoginValues,
//   });

//   const { mutate: onLogin, isPending } = useMutation({
//     mutationFn: (data) => {
//       return AuthService.login(data.username, data.password);
//     },
//     onSuccess: () => {
//       // sonner.success("Login berhasil!");

//       // Redirect to dashboard
//       navigate("/dashboard");
//     },
//     onError: (error) => {
//       sonner.error((error).message || "Login gagal. Silakan coba lagi.");
//     },
//   });

//   const onSubmit = (data) => {
//     onLogin(data);
//   };

//   return {
//     onSubmit,
//     form,
//     loading: isPending,
//   };
// };

// export { useLogin };
