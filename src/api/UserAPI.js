import { createApi } from '@reduxjs/toolkit/query/react'

import CustomFetchBaseQuery from './CustomFetchBaseQuery'

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: CustomFetchBaseQuery,
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: 'user/signup',
        method: 'POST',
        body: data
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: 'user/login',
        method: 'POST',
        body: data
      })
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: 'user/password/forgotPassword',
        method: 'POST',
        body: data
      })
    }),
    resetPassword: builder.mutation({
      query: ({ data, id }) => ({
        url: `user/password/resetPassword/${id}`,
        method: 'POST',
        body: data
      })
    }),
  })
})

export const {
  useSignupMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = userAPI
