import { createApi } from '@reduxjs/toolkit/query/react';
import { INote, INotesParams } from '../models';
import { firebaseBaseQuery } from './firebaseBaseQuery';

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: firebaseBaseQuery(),
  tagTypes: ['Note'],
  endpoints: (builder) => ({
    getNotes: builder.query<INote[], INotesParams>({
      query: (params) => ({
        method: 'GET',
        url: 'notes',
        body: params,
      }),
      providesTags: ['Note']
    }),
    addNote: builder.mutation<INote, Partial<INote>>({
      query: (note) => ({
        method: 'POST',
        url: 'notes',
        body: note,
      }),
      invalidatesTags: ['Note']
    }),
    updateNote: builder.mutation<INote, Partial<INote> & { id: string }>({
      query: (note) => ({
        method: 'PATCH',
        url: 'notes',
        body: note,
      }),
      invalidatesTags: ['Note']
    }),
    deleteNote: builder.mutation<void, string>({
      query: (id) => ({
        method: 'DELETE',
        url: 'notes',
        body: { id },
      }),
      invalidatesTags: ['Note']
    })
  })
});

export const {
  useGetNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;