// import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
// import axios from '../../api/local-server'
import Cookies from 'js-cookie'
import axios from '../../api/prod-server'

// const backendURL = import.meta.env.VITE_SERVER_URL? import.meta.env.VITE_SERVER_URL : 'http://localhost:3000'

export const userLogin = createAsyncThunk(
  'api/auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
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
      // localStorage.setItem('token', data?.token)
      // localStorage.setItem('token-refresh', data?.token_refresh)
      // if (data?.token_refresh) {
      //   console.log(data.token_refresh)
      //   Cookies.set('token-refresh', data.token_refresh, {
      //     expires: 1, // Expires in 1 day
      //     secure: false, // Secure in production
      //     sameSite: 'strict', // CSRF protection
      //     path: '/' // Accessible across entire site
      //   });
      // }
      // Cookies.set('jwt', data.token)
      // console.log('setelah', data)

      return data
    } catch (error) {
      console.log('error', error)
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
export const userInfo = createAsyncThunk(
  // 'api/auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      // const config = {
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   withCredentials: true
      // }
      // console.log(config)
      // ${backendURL}
      const {data, error} = await supabase.from('applicants').select('applicant_schools(schools(school_id, school_name), subschool), full_name, refresh_token, status))')
                              .eq('refresh_token', token)
                              .eq('status', 'active')
                              .is('deleted_at', null)
          if(error || data.length === 0){
            console.log(error)
            return {error: true, message: error}
            // modal_data.title = "Token tidak valid."
            // modal_data.message = "Informasi Akun tidak ditemukan"
            // modal_data.text = 'Masuk'
            // modal_data.url = "/login"
            // modal_data.type = "static"

            // setModalShow(true)

          }else{
            return data
          }

      // console.log('sebelum', data)
      // store user's token in local storage
      // localStorage.setItem('token', data?.token)
      // localStorage.setItem('token-refresh', data?.token_refresh)
      // if (data?.token_refresh) {
      //   console.log(data.token_refresh)
      //   Cookies.set('token-refresh', data.token_refresh, {
      //     expires: 1, // Expires in 1 day
      //     secure: false, // Secure in production
      //     sameSite: 'strict', // CSRF protection
      //     path: '/' // Accessible across entire site
      //   });
      // }
      // Cookies.set('jwt', data.token)
      // console.log('setelah', data)

      // return data 
    } catch (error) {
      console.log('error', error)
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
export const userLogout = createAsyncThunk(
  'api/auth/logout',
  async () => {
    try {

      // console.log('masuk')
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }

      const { data } = await axios.get(
        `/auth/logout`,
        // { username, password },
        config
      )
      // console.log(data)
      
      if( !data ){
        console.log('err')
      }
      

      // store user's token in local storage
    //   .setItem('jwt', data.t)

      return data
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        // return rejectWithValue(error.response.data.message)
      } else {
        // return rejectWithValue(error.message)
      }
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ firstName, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      await axios.post(
        `${backendURL}/api/user/register`,
        { firstName, email, password },
        config
      )
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)