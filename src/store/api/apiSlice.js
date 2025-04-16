import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/constants";
import { urlParams } from "../../utils/common";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ id }) => `/products/${id}`,
      providesTags: ["Product"],
    }),

    getProductWithFilter: builder.query({
      query: (params) => urlParams("/products", params),
      providesTags: ["Search"],
    }),
  }),
});

export const { useGetProductQuery, useGetProductWithFilterQuery } = apiSlice;
//дает нам готовый хук useGetProductQuery

//baseQuery: fetchBaseQuery({baseUrl: BASE_URL}), есть
//встроенный axios
// tagTypes: ["Product"], //когда добавляем новый продукт
// чтобы сразу обновяляся, чтобы список продуктов сразу
// обновился. поэтому создаем тег(уникальный ключ)
// чтобы переобновлять наше состояние

//когда делаем POST,PUT,DELETE исползуем mutation
//все что кроме GET идет
// addNewProduct : builder.mutatio({
//     query: ({id}) => ({
//      body: ({id})
//       url: `/products/${id}`,
//       method: "POST"
//})
// }),
