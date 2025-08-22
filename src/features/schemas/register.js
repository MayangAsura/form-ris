import z from "zod";

export const registerSchema = z.object({
  username: z.string().min(3, { message: "Username tidak valid." }),
  password: z.string().min(6, { message: "Password minimal 6 karakter." }),
});

// export type registerSchemaType = z.infer<typeof registerSchema>;

// export default values for the form
export const defaultRegisterValues= {
  username: "",
  password: "",
};
