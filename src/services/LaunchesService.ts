import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Launch } from '../models/launch';

export const launchesAPI = createApi({
    reducerPath: 'launchesAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.spacexdata.com' }),
    endpoints: (build: EndpointBuilder<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, "launchesAPI">) => ({
        fetchLaunchesByCustomBody: build.query<Launch[], number>({
            query: (sort: number) => ({
                url: '/v5/launches/query',
                method: 'POST',
                body: JSON.parse(`{
                    "query": {
                        "date_utc": { 
                            "$gte": "2015-01-01T00:00:00.000Z", 
                            "$lte": "2019-12-31T23:59:59.000Z" 
                        },
                        "success": true
                    },
                    "options": {
                        "sort":{
                            "date_utc": ${sort}
                        },
                        "pagination": false 
                    }
                }`)
            }),
            transformResponse: (response: { docs: any[] }, meta, arg) => {
                return response.docs.map(d => new Launch(d.id, d.name, new Date(d.date_utc), d.rocket, d.success, d.details, d.flight_number))
            },
        })
    })
})