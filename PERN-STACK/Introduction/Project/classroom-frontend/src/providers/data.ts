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
import type { ListResponse } from "@/types"
import { createDataProvider, type CreateDataProviderOptions } from "@refinedev/rest"
import { BACKEND_BASE_URL } from './../constants/index';
import type { CreateResponse } from "@refinedev/core";

if (!BACKEND_BASE_URL) throw new Error('BACKEND_BASE_URL is not configured please set vite backend base url .env file')


    
console.log("BASE URL:", BACKEND_BASE_URL);



const buildHttpError = async (response: Response) : Promise <HttpError> => {
  let message = 'Request failed';


  try {
    const payload = (await response.json()) as {message?: string}

    if (payload?.message) message = payload.message;

  } catch (error) {
      // ignore and return the default
  }

  return {
    message,
    statusCode: response.status
  }
}

const options: CreateDataProviderOptions = {
    getList: {
        getEndPoint: ({ resource } ) => resource,


    buildQueryParams: async ({ resource, pagination, filters }) => {
      const page = pagination?.currentPage ?? 1;
      const pageSize = pagination?.pageSize ?? 10;

      const params: Record<string, string | number> = {
        page,
        limit: pageSize,
      };

filters?.forEach((filter) => {
  const field = "field" in filter ? filter.field : "";
  const value = String(filter.value ?? "");

  // subjects filters
  if (resource === "subjects") {
    if (field === "department") {
      params.department = value;
    }

    if (field === "name" || field === "code") {
      params.search = value;
    }
  }

  // users filters
  if (resource === "users") {
    if (field === "role") {
      params.role = value;
    }

    if (field === "name" || field === "email") {
      params.search = value;
    }
  }

  // classes filters (generic mapping used by backend)
  if (resource === "classes") {
    filters?.forEach((filter) => {
      const field = "field" in filter ? filter.field : "";
      const value = String(filter.value ?? "");

      if (field === "name") {
        params.search = value;
      }

      if (field === "subject") {
        params.subject = value;
      }

      if (field === "teacher") {
        params.teacher = value;
      }
    });
  }
});

      return params;
    },

    mapResponse: async (response) => {
      if (!response.ok) throw await buildHttpError(response);

      const payload: ListResponse = await response.clone().json();
    return payload.data ?? [];
},

getTotalCount: async (response) => {
      if (!response.ok) throw await buildHttpError(response);

  const payload: ListResponse = await response.clone().json();

  return Number(
    payload.pagination?.total ??
    payload.data?.length ??
    0
  );
}
    },
    getOne: {
    getEndpoint: ({ resource, id }) => `${resource}/${id}`,

    mapResponse: async (response) => {
      if (!response.ok) throw await buildHttpError(response)

      const payload = await response.json()
      // console.log(payload)
      return payload.data
    },
  },
    create: {
      getEndpoint: ({resource}) => resource,

      buildBodyParams: async ({variables}) => {
        // Refine may pass create variables wrapped as { values: {...} } or { data: {...} }
        // Ensure we send the raw values object to the backend so req.body.subjectId is present
        if (!variables) return {};
        return (variables as any).values ?? (variables as any).data ?? variables;
      },

      mapResponse: async (response) => {
        const json: CreateResponse = await response.json();

        return json.data ?? [];
      }
    }
}



const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options);

export {dataProvider}