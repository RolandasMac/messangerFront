import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import { backHost } from "../plugins/host";
const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const authSlice = createAppSlice({
  name: "user",
  initialState: {
    loading: false,
    user: {},
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
    loginUser: create.asyncThunk(
      // Async payload function as the first argument
      async (sendData, { rejectWithValue, dispatch }) => {
        try {
          const response = await fetch(`${backHost}auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Headers": "Coookie",
            },
            credentials: "include",
            body: JSON.stringify(sendData),
            mode: "cors",
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
          state.user = action.payload.data.userData;
          state.logged = true;
          localStorage.setItem("token", action.payload.data.token);
          localStorage.setItem(
            "user",
            JSON.stringify(action.payload.data.userData)
          );
        },
        // settled is called for both rejected and fulfilled actions
        settled: (state, action) => {
          state.loading = false;
        },
      }
    ),
    autologinUser: create.asyncThunk(
      // Async payload function as the first argument
      async (__, { rejectWithValue, dispatch }) => {
        try {
          const response = await fetch(`${backHost}auth/autologin`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            mode: "cors",
          });
          if (!response.ok) {
            const errorData = await response.json();
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            throw new Error("Server error:" + errorData.message);
          }
          const data = await response.json();
          return { data };
        } catch (error) {
          return rejectWithValue(error.message);
        }
      },
      {
        pending: (state) => {
          state.loading = true;
        },
        rejected: (state, action) => {
          state.error = action.payload;
        },
        fulfilled: (state, action) => {
          state.user = action.payload.data.userData;
          state.logged = true;
          localStorage.setItem("token", action.payload.data.token);
          localStorage.setItem(
            "user",
            JSON.stringify(action.payload.data.userData)
          );
        },
        // settled is called for both rejected and fulfilled actions
        settled: (state, action) => {
          state.loading = false;
        },
      }
    ),
    logoutUser: create.asyncThunk(
      // Async payload function as the first argument
      async (__, { rejectWithValue, dispatch }) => {
        try {
          const response = await fetch(`${backHost}auth/logout`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Headers": "Coookie",
            },
            credentials: "include",
            mode: "cors",
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
          state.user = action.payload.data.userData;
          state.logged = false;
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        },
        // settled is called for both rejected and fulfilled actions
        settled: (state, action) => {
          state.loading = false;
        },
      }
    ),
    changeAvatar: create.asyncThunk(
      // Async payload function as the first argument
      async (data, { rejectWithValue, dispatch }) => {
        try {
          const response = await fetch(`${backHost}auth/changeavatar`, {
            method: "POST",
            headers: {
              // "Content-Type": "application/json",
              "Content-Type": "multipart/form-data",
              // "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Headers": "Coookie",
            },
            credentials: "include",
            mode: "cors",
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
          state.user = action.payload.data.userData;
          state.logged = false;
        },
        // settled is called for both rejected and fulfilled actions
        settled: (state, action) => {
          state.loading = false;
        },
      }
    ),
    getOneUser: create.asyncThunk(
      // Async payload function as the first argument
      async (userId, { rejectWithValue }) => {
        try {
          const response = await fetch(`${backHost}auth/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            mode: "cors",
          });
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
          state.user = action.payload.data;
          state.logged = false;
        },
        // settled is called for both rejected and fulfilled actions
        settled: (state, action) => {
          state.loading = false;
        },
      }
    ),
    changeUserPassword: create.asyncThunk(
      // Async payload function as the first argument
      async (sendData, { rejectWithValue, dispatch }) => {
        try {
          const response = await fetch(`${backHost}auth/changeuserpassword`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Headers": "Coookie",
            },
            credentials: "include",
            body: JSON.stringify(sendData),
            mode: "cors",
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
          // console.log(action.error, action);
        },
        fulfilled: (state, action) => {
          state.user = action.payload.data.userData;
          state.logged = true;
        },
        // settled is called for both rejected and fulfilled actions
        settled: (state, action) => {
          state.loading = false;
        },
      }
    ),
    changeUserEmail: create.asyncThunk(
      // Async payload function as the first argument
      async (sendData, { rejectWithValue, dispatch }) => {
        try {
          const response = await fetch(`${backHost}auth/changeuseremail`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Headers": "Coookie",
            },
            credentials: "include",
            body: JSON.stringify(sendData),
            mode: "cors",
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
          state.user = action.payload.data.userData;
          state.logged = true;
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
export const {
  loginUser,
  deleteUser,
  autologinUser,
  logoutUser,
  changeAvatar,
  getOneUser,
  changeUserPassword,
  changeUserEmail,
} = authSlice.actions;
export default authSlice.reducer;
