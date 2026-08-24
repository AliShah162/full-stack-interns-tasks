import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const employeeApi = createApi({
    // 1. reducerPath: Unique name for this API in the store
    reducerPath: 'employeeApi',  // Must be a string!
    
    // 2. baseQuery: Base URL for all API calls
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dummyjson.com'
    }),
    
    // 3. tagTypes: For caching & invalidation
    tagTypes: ['Employee'],
    //Purpose: For caching and automatic data refetching
    // Think of it as: Labels to tag cached data
    // Example: When you add/update an employee, you can invalidate the 'Employee' tag to refetch fresh data
    
    
    // 4. endpoints: Define your API endpoints
    endpoints: (builder) => ({
        // Empty for now - you'll add endpoints here
    })
})