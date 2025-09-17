// import { supabase } from "@/lib/supabase/client";
// import { AuthReturn } from "../types";
// import PATHS from "@/configs/route";
import { email } from 'zod';
// import axios from '../../api/local-server'
import axios from '../../api/prod-server'
import Cookies from 'js-cookie'
import supabase from '../../client/supabase_client';
// import supabase from "../../client/supabase_client";

export class AuthService {
  static async login(username, password){
    // const { error, data: userData } = await supabase.auth.signInWithPassword({
    //   email: email,
    //   password: password,
    // });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }
          // console.log(config)
          // ${backendURL}
    const { data } = await axios.post(
        `api/auth/login`,
        { username, password },
        config
    )
    // console.log('sebelum', data)
    // store user's token in local storage

    if (data?.status == 400) {
    //   if (error.code === "invalid_credentials") {
    //     throw new Error("Email atau password salah.");
    //   }
    //   if (error.code === "user_not_found") {
    //     throw new Error(
    //       "Pengguna tidak ditemukan. Silakan daftar terlebih dahulu."
    //     );
    //   }
    //   if (error.code === "too_many_requests") {
    //     throw new Error("Terlalu banyak permintaan. Silakan coba lagi nanti.");
    //   }
      throw new Error(data?.message);
    }

    return data;
  }

  static async register_trans(
            full_name,
            gender,
            phone_number,
            email,
            media,
            password,
            school_id,
            subschool,
            is_new,
            class_code,
            dob
        ){
    const { data: data_appl, error } = await supabase.rpc("add_new_applicant", {
            _full_name : full_name,
            _gender : gender,
            _phone_number : phone_number,
            _email : email,
            _password : password,
            _media : media,
            _school_id : parseInt(school_id),
            _subschool : subschool,
            _is_new : is_new,
            _class_code : class_code,
            _dob : dob
          });

    if (error) {
      throw new Error("Pendaftaran gagal.");
    }

    return data_appl
  }
//   static async logout(): Promise<void> {
//     const { error } = await supabase.auth.signOut();

//     if (error) {
//       throw new Error("Gagal logout.");
//     }
//   }

//   static async forgotPassword(email: string): Promise<void> {
//     const { error } = await supabase.auth.resetPasswordForEmail(email, {
//       redirectTo: window.location.origin + PATHS.PUBLIC.CHANGE_PASSWORD,
//     });

//     if (error) {
//       throw new Error(`Gagal mengirim email reset password: ${error.message}`);
//     }
//   }

//   static async verifyPasswordResetToken(): Promise<boolean> {
//     const {
//       data: { session },
//       error,
//     } = await supabase.auth.getSession();

//     if (error || !session) {
//       throw new Error(
//         "Token reset password tidak valid atau sudah kedaluwarsa."
//       );
//     }

//     return true;
//   }

//   static async resetPassword(newPassword: string): Promise<void> {
//     const { error } = await supabase.auth.updateUser({
//       password: newPassword,
//     });

//     if (error) {
//       if (error.code === "over_email_send_rate_limit") {
//         throw new Error("Terlalu banyak permintaan. Silakan coba lagi nanti.");
//       }

//       throw new Error(`Gagal mengatur ulang password: ${error.message}`);
//     }
//   }
}
