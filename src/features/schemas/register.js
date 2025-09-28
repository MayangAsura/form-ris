import z from "zod";

export const registerSchema = z.object({
  full_name: z.string().min(3, { message: "Nama Lengkap tidak valid." }),
  gender: z.string().min(1, { message: "Jenis kelamin tidak valid." }),
  phone_number: z.string().min(3, { message: "No. WhatsApp tidak valid." }),
  email: z.string().email("Email tidak valid."),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), { 
    message: "Tanggal lahir tidak valid." 
  }),
  school_id: z.string().min(1, { message: "Jenjang tidak valid." }),
  subschool: z.string().min(0, { message: "Kelas tidak valid." }),
  password: z.string().min(6, { message: "Password minimal 6 karakter." }),
  confirm_password: z.string().min(1, { message: "Konfirmasi Password tidak valid" }),
  media: z.string().min(1, { message: "Media tidak valid." })
})
.refine((data) => data.password === data.confirm_password, {
  message: "Konfirmasi password tidak sama",
  path: ["confirm_password"],
});

export const editSchema = z.object({
  full_name: z.string().min(3, { message: "Nama Lengkap tidak valid." }),
  gender: z.string().min(1, { message: "Jenis kelamin tidak valid." }),
  phone_number: z.string().min(3, { message: "No. WhatsApp tidak valid." }),
  email: z.string().email("Email tidak valid."),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), { 
    message: "Tanggal lahir tidak valid." 
  }),
  school_id: z.string().min(1, { message: "Jenjang tidak valid." }),
  subschool: z.string().min(0, { message: "Kelas tidak valid." }),
  password_: z.string().optional(),
  confirm_password_: z.string().optional(),
  media: z.string().min(1, { message: "Media tidak valid." }),
  pid: z.string().min(3, { message: "PID tidak valid." }),
  regist_number: z.string().optional()
})
.refine((data) => {
  // Only validate password confirmation if password_ is provided
  if (data.password_ && data.password_.length > 0) {
    return data.password_ === data.confirm_password_;
  }
  return true;
}, {
  message: "Konfirmasi password tidak sama",
  path: ["confirm_password_"],
});

export const defaultRegisterValues = {
  full_name: "",
  gender: "",
  phone_number: "",
  email: "",
  dob: "",
  school_id: "",
  subschool: "",
  password: "",
  confirm_password: "",
  media: "",
  pid: ""
};
// import z from "zod";

// export const registerSchema = z.object({
//   // username: z.string().min(3, { message: "Username tidak valid." }),
//   // password: z.string().min(6, { message: "Password minimal 6 karakter." }),
//   full_name : z.string().min(3, { message: "Nama Lengkap tidak valid." }),
//   gender : z.string().min(1, { message: "Jenis kelamin tidak valid." }),
//   phone_number : z.string().min(3, { message: "No. WhatsApp tidak valid." }),
//   email : z.email("Email tidak valid."),
//   dob : z.string().date(),
//   // dob : z.string().datetime({date: true}),
//   school_id : z.string().max(1, { message: "Jenjang tidak valid." }),
//   subschool : z.string().min(0, { message: "Kelas tidak valid." }),
//   password : z.string().min(6, { message: "Password minimal 6 karakter." }),
//   password_ : z.string().optional(),
//   confirm_password : z.string().min(1, { message: "Konfirmasi Password tidak valid" }),
//   confirm_password_ : z.string().optional(),
//   media : z.string().min(3, { message: "Media tidak valid." }),
//   // pid : z.string().min(3, { message: "PID tidak valid." })
// })
// .superRefine((data, ctx) => {
//         if (data.password !== data.confirm_password) {
//           ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: 'Konfirmasi password tidak sama',
//             path: ['confirm_password'], // Attach the error to the confirmPassword field
//           });
//         }
//       })
// .superRefine((data, ctx) => {
//         if (data.password_ && data.password_ !== data.confirm_password_) {
//           ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: 'Konfirmasi password tidak sama',
//             path: ['confirm_password'], // Attach the error to the confirmPassword field
//           });
//         }
//       });
// export const editSchema = z.object({
//   // username: z.string().min(3, { message: "Username tidak valid." }),
//   // password: z.string().min(6, { message: "Password minimal 6 karakter." }),
//   full_name : z.string().min(3, { message: "Nama Lengkap tidak valid." }),
//   gender : z.string().min(1, { message: "Jenis kelamin tidak valid." }),
//   phone_number : z.string().min(3, { message: "No. WhatsApp tidak valid." }),
//   email : z.email("Email tidak valid."),
//   dob : z.string().date(),
//   // dob : z.string().datetime({date: true}),
//   school_id : z.string().max(1, { message: "Jenjang tidak valid." }),
//   subschool : z.string().min(0, { message: "Kelas tidak valid." }),
//   password_ : z.string(),
//   confirm_password : z.string(),
//   media : z.string().min(3, { message: "Media tidak valid." }),
//   pid : z.string().min(3, { message: "PID tidak valid." })
// })
// .superRefine((data, ctx) => {
//         if (data.password_ !== data.confirm_password) {
//           ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: 'Konfirmasi password tidak sama',
//             path: ['confirm_password'], // Attach the error to the confirmPassword field
//           });
//         }
//       });
// //  date().max(0, { message: "Tanggal lahir tidak valid." })
// // export type registerSchemaType = z.infer<typeof registerSchema>;

// // export default values for the form
// export const defaultRegisterValues= {
//   full_name : "",
//   gender : "",
//   phone_number : "",
//   email : "",
//   dob : "" ,
//   school_id : "" ,
//   subschool : "",
//   password : "",
//   confirm_password : "",
//   media : "",
//   pid : ""
// };
