import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getListPost = createAsyncThunk(
    'tasks/getListPost',
    async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error("error", error);
            return error;
        }
    });

export const addListPost = createAsyncThunk(
    'tasks/addListPost',
    async (dataList) => {
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(dataList)
        })
        const data = await response.json();
        return data;
        }
        catch(error){
            console.error("error", error);
            return error;
        }
    }
)
export const deleteListPost = createAsyncThunk(
    'tasks/deleteListPost',
    async (dataList) => {
        try{
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${dataList}`);
        const data = await response.json();
        // console.log("data",data);
        return data;
        }
        catch (error) {
            console.error("error", error);
            return error;
        }
    }
)
export const listSlice = createSlice({
    name: 'list',
    initialState: {
        isLoading: false,
        errorMessage: '',
        currentUser: [],
    },
    extraReducers: {
        [getListPost.pending]: (state) => {
            state.isLoading = true;
        },
        [getListPost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
        },

        [getListPost.rejected]: (state, action) => {
            state.errorMessage = action.error;
        },
        [addListPost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.currentUser.push(action.payload);
        },

        [addListPost.rejected]: (state, action) => {
            state.errorMessage = action.error;
        },
        [deleteListPost.fulfilled]: (state, action) => {
            state.isLoading = false;
            const newList = [...state.currentUser];
            //timf index cua id trong mang
            const index = newList.findIndex((item) => item.id === action.payload.id);
            console.log("index", index);
            //remove index of array
            newList.splice(index, 1);
            const newState = { ...state, currentUser: newList };
            return newState;
            //xóa một phần tử trong array
            /**
             * B1:tìm index chứa id truyền vào
             * b2: xóa phần tử trong array
             * 
             */

        },

    }
});


export const { setCurrentUser, addCurrentUse, deleteCurrentUser } = listSlice.actions;

export default listSlice.reducer;
