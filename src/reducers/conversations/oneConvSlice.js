import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const oneConvSlice = createAppSlice({
  name: "oneConv",
  initialState: {
    loading: false,
    oneConv: {
      _id: null,
    },
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
    addMessage: create.preparedReducer(
      (message) => {
        return { payload: { message: message } };
      },
      (state, action) => {
        state.oneConv.messages.push(action.payload.message);
      }
    ),
    // An async thunk
    getOneConv: create.asyncThunk(
      // Async payload function as the first argument
      async (sendData, { rejectWithValue, dispatch }) => {
        try {
          const response = await fetch(
            `https://localhost:4001/conversations/create`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(sendData),
              mode: "cors",
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
      async ({ convId, oldId }, { rejectWithValue, dispatch }) => {
        try {
          const response = await fetch(
            `https://localhost:4001/conversations/getconversationbyid/${convId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({ oldId: oldId }),
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
          console.log(action.payload.data);
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
export const { getOneConv, getOneConvById, addMessage } = oneConvSlice.actions;
export default oneConvSlice.reducer;
