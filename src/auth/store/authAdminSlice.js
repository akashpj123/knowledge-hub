import { createSlice } from "@reduxjs/toolkit";

export const authAdminSlice = createSlice({
  name: 'authAdmin',
  initialState: {
    admin: null
  },
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
      window.localStorage.setItem('admin', JSON.stringify(action.payload));
    },
    removeAdmin: (state) => {
      state.admin = null;
      window.localStorage.removeItem('admin');
    },
    setAdminFromLocalStorage: (state) => {
      var admin = window.localStorage.getItem('admin');
      if (admin) {
        admin = JSON.parse(admin);
        state.admin = admin;  // Corrected from state.user to state.admin
      } else {
        state.admin = null;
      }
    }
  }
}
);

export const { setAdmin, removeAdmin, setAdminFromLocalStorage } = authAdminSlice.actions;
export default authAdminSlice.reducer;
