import { createSlice } from '@reduxjs/toolkit';

const fileSlice = createSlice({
  name: 'files',
  initialState: {
    files: [],
    selectedFile: null,
  },
  reducers: {
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    selectFile: (state, action) => {
      state.selectedFile = action.payload;
    },
  },
});

export const { setFiles, selectFile } = fileSlice.actions;
export default fileSlice.reducer;
