import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = import.meta.env.VITE_SERVER_URL? import.meta.env.VITE_SERVER_URL : 'http://localhost:3000'

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: false
      }

      const { data } = await axios.post(
        `${backendURL}/auth/login`,
        { username, password },
        config
      )

      // store user's token in local storage
    //   .setItem('jwt', data.t)

      return data
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
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