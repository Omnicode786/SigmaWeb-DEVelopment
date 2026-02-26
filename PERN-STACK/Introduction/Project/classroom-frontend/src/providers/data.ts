// import { createSimpleRestDataProvider } from "@refinedev/rest/simple-rest";
// import { API_URL } from "./constants";
// import type { BaseRecord, DataProvider, GetListParams, GetListResponse } from "@refinedev/core";
// import { mockSubjects } from "@/constants/mock_subject";
// import { current } from "@reduxjs/toolkit";
// // export const { dataProvider, kyInstance } = createSimpleRestDataProvider({
// //   apiURL: API_URL,
// // });


// export const dataProvider: DataProvider = {
//  getList: async <TData extends BaseRecord = BaseRecord>({
//   resource,
//   pagination,
//   filters,
//   sorters,
// }: GetListParams): Promise<GetListResponse<TData>> => {

//   if (resource !== "subjects") {
//     return { data: [] as TData[], total: 0 };
//   }

//   let data = [...mockSubjects];

//   // ----------------------------
//   // FILTERING
//   // ----------------------------
//   if (filters) {
//     filters.forEach((filter) => {
//       if (!("field" in filter)) return;

//       const { field, operator, value } = filter;

//       if (operator === "eq") {
//         data = data.filter(
//           (item) => String(item[field as keyof typeof item]) === String(value)
//         );
//       }

//       if (operator === "contains") {
//         data = data.filter((item) =>
//           String(item[field as keyof typeof item])
//             .toLowerCase()
//             .includes(String(value).toLowerCase())
//         );
//       }
//     });
//   }

//   // ----------------------------
//   // SORTING
//   // ----------------------------
//   if (sorters && sorters.length > 0) {
//     const { field, order } = sorters[0];

//     data.sort((a, b) => {
//       const aValue = a[field as keyof typeof a];
//       const bValue = b[field as keyof typeof b];

//       if (aValue < bValue) return order === "asc" ? -1 : 1;
//       if (aValue > bValue) return order === "asc" ? 1 : -1;
//       return 0;
//     });
//   }

//   // ----------------------------
//   // PAGINATION
//   // ----------------------------
//   const total = data.length;

//   if (pagination) {
//     const { currentPage = 1, pageSize = 10 } = pagination;

//     const start = (currentPage - 1) * pageSize;
//     const end = start + pageSize;

//     data = data.slice(start, end);
//   }

//   return {
//     data: data as unknown as TData[],
//     total,
//   };
// },

//   getOne: async () => { throw new Error('The function is not present in mock')},
//   create: async () => { throw new Error('The function is not present in mock')},
//   update: async () => { throw new Error('The function is not present in mock')},
//   deleteOne: async () => { throw new Error('The function is not present in mock')},
//   getApiUrl: () => '',

// }


// the idea is same but let's do it again to get more hands on

const options: CreateDa