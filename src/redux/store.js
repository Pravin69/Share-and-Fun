import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";
import themeSlice from "./theme";
import postSlice from "./postSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    theme: themeSlice,
    posts: postSlice,
  },
});

const { dispatch } = store;

export { store, dispatch };
