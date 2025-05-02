import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import supabase from '../../../client/supabase_client'
import supabase from '../../../client/supabase_client'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    // base url of backend API
    baseUrl: 'http://127.0.0.1:5000/',
    // prepareHeaders is used to configure the header of every request and gives access to getState which we use to include the token from the store
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userToken
      if (token) {
       // include token in req header
        headers.set('authorization', `Bearer ${token}`)  
        return headers
      }
    },
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: 'api/user/profile',
        method: 'GET',
      }),
    }),
  }),
})

export const getProfileData = async () =>{
    const token = getState().auth.userToken
      if (token) {
    const {data, error} = await supabase.from('applicants').select('applicant_schools(schools(school_name)), full_name, gender, email, phone_number, regist_number, created_at, participants(dob, aspiration))').eq('refresh_token', token).single()
    if(error){
      console.log(error)
    //   setProfileData({})
    }else{
      console.log(data)
      // return data
    //   setProfileData(data)
    }
    }

  }

// export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserDetailsQuery } = getProfileData

