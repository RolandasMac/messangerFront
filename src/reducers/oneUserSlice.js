import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const oneUserSlice = createAppSlice({
  name: "oneUser",
  initialState: {
    loading: false,
    oneUser: {},
    error: null,
    success: false,
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
    getOneUser: create.asyncThunk(
      // Async payload function as the first argument
      async (userId, { rejectWithValue }) => {
        try {
          const response = await fetch(
            `https://localhost:4001/auth/${userId}`,
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
          state.oneUser = action.payload.data;
          state.success = true;
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
export const { getOneUser } = oneUserSlice.actions;
export default oneUserSlice.reducer;
