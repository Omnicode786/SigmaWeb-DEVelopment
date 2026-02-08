import { createSlice } from "@reduxjs/toolkit";
import { Bounce, ToastContainer, Zoom, toast } from 'react-toastify';

const initialState = {
  items: JSON.parse(localStorage.getItem("collection")) || [],
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addToCollection: (state, action) => {
      const exists = state.items.some(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem("collection", JSON.stringify(state.items));
      }
    },

    removeFromCollection: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("collection", JSON.stringify(state.items));
    },
    clearCollection: (state) => {
      state.items = []
      localStorage.setItem('collection', JSON.stringify(state.items));
      console.log("collection was remvoed");
    },
    ToastOnAdd: (state) => {
      // console.log('toast add run')

        toast.success('🦄 Item Added To Collection!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Zoom,
  });
    },
    ToastOnRemove: (state) => {
      // console.log('toast remove run');
      toast.error('🦄 Item Removed From Collection!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
});
    }
  },
});

export const { addToCollection, removeFromCollection, ToastOnAdd, ToastOnRemove, clearCollection } =
  collectionSlice.actions;

export default collectionSlice.reducer;
