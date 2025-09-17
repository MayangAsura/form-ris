import z from "zod";

export const registerSchema = z.object({
  // username: z.string().min(3, { message: "Username tidak valid." }),
  // password: z.string().min(6, { message: "Password minimal 6 karakter." }),
  full_name : z.string().min(3, { message: "Nama Lengkap tidak valid." }),
  gender : z.string().min(1, { message: "Jenis kelamin tidak valid." }),
  phone_number : z.string().min(3, { message: "No. WhatsApp tidak valid." }),
  email : z.email("Email tidak valid."),
  // dob : z.string().date(),
  // dob : z.string().datetime({date: true}),
  school_id : z.string().max(1, { message: "Jenjang tidak valid." }),
  subschool : z.string().min(0, { message: "Kelas tidak valid." }),
  // password : z.string().min(6, { message: "Password minimal 6 karakter." }),
  // confirm_password : z.string().min(6, { message: "Konfirmasi Password tidak valid" }),
  // media : z.string().min(3, { message: "Media tidak valid." }),
  is_new : z.boolean(),
  // class_code: z.string().min(1, { message: "Kode Kelas tidak valid." })
})
.superRefine((data, ctx) => {
        if (data.password !== data.confirm_password) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Konfirmasi password tidak sama',
            path: ['confirm_password'], // Attach the error to the confirmPassword field
          });
        }
      });
//  date().max(0, { message: "Tanggal lahir tidak valid." })
// export type registerSchemaType = z.infer<typeof registerSchema>;

// export default values for the form
export const defaultRegisterValues= {
  full_name : "",
  gender : "",
  phone_number : "",
  email : "",
  password : "",
  media : "",
  school_id : "" ,
  subschool : "",
  confirm_password : "",
  is_new : false,
  class_code : "",
  // dob : "" ,
};
