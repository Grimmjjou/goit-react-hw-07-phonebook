import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './api';


const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: [],
        isLoading: false,
        error: null,
    },
    extraReducers: builder =>
        builder
            .addCase(fetchContacts.fulfilled, (state, { payload }) => {
                state.contacts = [...payload];
            })
            .addCase(addContact.fulfilled, (state, { payload }) => {
                state.contacts = [...state.contacts, payload];
            })
            .addCase(deleteContact.fulfilled, (state, { payload }) => {
                state.contacts = state.contacts.filter(contact => contact.id !== payload.id);
            })
            .addMatcher(
                isAnyOf(fetchContacts.fulfilled, addContact.fulfilled, deleteContact.fulfilled),
                state => {
                    state.isLoading = false;
                    state.error = null;
                }
            )
            .addMatcher(
                isAnyOf(fetchContacts.pending, addContact.pending, deleteContact.pending),
                state => {
                    state.isLoading = true;
                }
            )
            .addMatcher(
                isAnyOf(fetchContacts.rejected, addContact.rejected, deleteContact.rejected),
                (state, { payload }) => {
                    state.isLoading = false;
                    state.error = payload;
                }
            ),
})

export const contactsReducer = contactsSlice.reducer;