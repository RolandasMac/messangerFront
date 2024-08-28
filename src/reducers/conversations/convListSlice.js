import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const convListSlice = createAppSlice({
  name: "convList",
  initialState: {
    loading: false,
    convList: {},
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
    getConvList: create.asyncThunk(
      // Async payload function as the first argument
      async (__, { rejectWithValue }) => {
        try {
          const response = await fetch(
            `https://localhost:4001/conversations/getconversationslist`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              mode: "cors",
            }
          );
          // console.log(response);
          if (!response.ok) {
            const errorData = await response.json();
            // console.log("Error:", errorData.message);
            throw new Error("Server error:" + errorData.message);
          }
          const data = await response.json();
          console.log(data);
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
          state.convList = action.payload.data;
        },
        // settled is called for both rejected and fulfilled actions
        settled: (state, action) => {
          state.loading = false;
        },
      }
    ),
    // autologinUser: create.asyncThunk(
    //   // Async payload function as the first argument
    //   async (token, { rejectWithValue, dispatch }) => {
    //     try {
    //       const response = await fetch(`http://localhost:4001/auth/autologin`, {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(token),
    //         // mode: "no-cors",
    //       });
    //       // console.log(response);
    //       if (!response.ok) {
    //         const errorData = await response.json();
    //         // console.log("Error:", errorData.message);
    //         throw new Error("Server error:" + errorData.message);
    //       }
    //       const data = await response.json();
    //       console.log(data);
    //       return { data };
    //     } catch (error) {
    //       // console.log(error);
    //       return rejectWithValue(error.message);
    //     }
    //   },
    //   {
    //     pending: (state) => {
    //       state.loading = true;
    //     },
    //     rejected: (state, action) => {
    //       state.error = action.payload;
    //       // console.log(action.error, action.payload);
    //     },
    //     fulfilled: (state, action) => {
    //       state.user = action.payload.data.userData;
    //       state.logged = true;
    //       localStorage.setItem("token", action.payload.data.token);
    //       localStorage.setItem(
    //         "user",
    //         JSON.stringify(action.payload.data.userData)
    //       );
    //     },
    //     // settled is called for both rejected and fulfilled actions
    //     settled: (state, action) => {
    //       state.loading = false;
    //     },
    //   }
    // ),
  }),
});

// `addTodo` and `deleteTodo` are normal action creators.
// `fetchTodo` is the async thunk
export const { getConvList } = convListSlice.actions;
export default convListSlice.reducer;
