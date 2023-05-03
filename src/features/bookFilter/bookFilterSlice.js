import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchString: "",
    bookTypeFilter: "all",
};

const bookFilterSlice = createSlice({
    name: "book-filter",
    initialState,
    reducers: {
        searchBook: (state, action) => {
            state.searchString = action.payload;
        },
        selectBookType: (state, action) => {
            state.bookTypeFilter = action.payload;
        },
    }
})

export default bookFilterSlice.reducer;
export const { searchBook, selectBookType } = bookFilterSlice.actions;