import { configureStore } from "@reduxjs/toolkit";
import listSlice from "./listUser";

export default configureStore({
    reducer:{
        tasks: listSlice,
    }
});
