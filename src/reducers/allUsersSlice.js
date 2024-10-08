import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import { backHost } from "../plugins/host";
const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const allUsersSlice = createAppSlice({
  name: "allUser",
  initialState: {
    loading: false,
    allUsers: [],
    error: null,
  },
  reducers: (create) => ({
    // A normal "case reducer", same as always
    // deleteUser: create.reducer((state, action) => {
    //   state.user = {
    //     loading: false,
    //     user: {},
    //     error: null,
    //     logged: false,
    //   };
    // }),
    // A case reducer with a "prepare callback" to customize the action
    // addUser: create.preparedReducer(
    //   (user) => {
    //     const id = new Date();
    //     return { payload: { id, user } };
    //   },
    //   // action type is inferred from prepare callback
    //   (state, action) => {
    //     state.user.push(action.payload.user);
    //   }
    // ),
    // An async thunk
    getAllUsers: create.asyncThunk(
      // Async payload function as the first argument
      async (__, { rejectWithValue }) => {
        try {
          const response = await fetch(`${backHost}auth/getallusers`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            // withCredentials: true,
            // body: JSON.stringify(sendData),
            // mode: "cors",
          });
          // console.log(response);
          if (!response.ok) {
            const errorData = await response.json();
            // console.log("Error:", errorData.message);
            throw new Error("Server error:" + errorData.message);
          }
          const data = await response.json();
          // console.log(data);
          return { data };
        } catch (error) {
          // console.log(error);
          return rejectWithValue(error.message);
        }
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.error = action.payload;
          // console.log(action.error, action.payload);
        },
        fulfilled: (state, action) => {
          state.allUsers = action.payload.data;
          // console.log(action.payload.data);
          //   localStorage.setItem(
          //     "user",
          //     JSON.stringify(action.payload.data.userData)
          //   );
        },
        // settled is called for both rejected and fulfilled actions
        settled: (state, action) => {
          state.loading = false;
        },
      }
    ),
  }),
});

// `addTodo` and `deleteTodo` are normal action creators.
// `fetchTodo` is the async thunk
export const { getAllUsers } = allUsersSlice.actions;
export default allUsersSlice.reducer;
