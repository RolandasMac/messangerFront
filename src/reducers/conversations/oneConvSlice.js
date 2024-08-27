import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const oneConvSlice = createAppSlice({
  name: "oneConv",
  initialState: {
    loading: false,
    oneConv: {},
    error: null,
  },
  reducers: (create) => ({
    // A normal "case reducer", same as always
    deleteUser: create.reducer((state, action) => {
      state.user = {
        loading: false,
        user: {},
        error: null,
        logged: false,
      };
    }),
    // A case reducer with a "prepare callback" to customize the action
    // addMessage: create.preparedReducer(
    //   (message) => {
    //     const id = new Date();
    //     return { payload: { id, user } };
    //   },
    //   // action type is inferred from prepare callback
    //   (state, action) => {
    //     state.user.push(action.payload.user);
    //   }
    // ),
    // An async thunk
    getOneConv: create.asyncThunk(
      // Async payload function as the first argument
      async (sendData, { rejectWithValue, dispatch }) => {
        try {
          const response = await fetch(
            `http://localhost:4001/conversations/create`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(sendData),
              // mode: "no-cors",
            }
          );
          console.log(response);
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
          state.oneConv = action.payload.data;
        },
        // settled is called for both rejected and fulfilled actions
        settled: (state, action) => {
          state.loading = false;
        },
      }
    ),
    getOneConvById: create.asyncThunk(
      // Async payload function as the first argument
      async (convId, { rejectWithValue, dispatch }) => {
        try {
          const response = await fetch(
            `http://localhost:4001/conversations/getconversationbyid/${convId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              // mode: "no-cors",
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
          state.oneConv = action.payload.data;
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
export const { getOneConv, getOneConvById } = oneConvSlice.actions;
export default oneConvSlice.reducer;
