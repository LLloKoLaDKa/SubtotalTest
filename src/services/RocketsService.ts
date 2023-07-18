import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Rocket } from '../models/rocket';

export const rocketsAPI = createApi({
    reducerPath: 'rocketsAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spacexdata.com' }),
    endpoints: (build: EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, "rocketsAPI">) => ({
        fetchAllRockets: build.query<Rocket[], {}>({
            query: () => ({
                url: `/v4/rockets`
            }),
            transformResponse: (response: any[], meta, arg) => {
                return response.map(r => new Rocket(r.id, r.name, r.flickr_images as string[]))
            }
        })
    })
})