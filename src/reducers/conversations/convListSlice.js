import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const convListSlice = createAppSlice({
  name: "convList",
  initialState: {
    loading: false,
    convList: [],
    error: null,
    loaded: false,
  },
  reducers: (create) => ({
    // A normal "case reducer", same as always
    // deleteList: create.reducer((state, action) => {
    //   console.log(action.payload);

    //   console.log(state.convList);
    //   let newState = state.convList;
    //   const index = newState.findIndex((cur) => {
    //     return cur._id === action.payload._id;
    //   });
    //   const participantIndex = newState[index].convParticipants.findIndex(
    //     (cur) => {
    //       return cur.userId === action.payload.lastMessage.owner._id;
    //     }
    //   );
    //   console.log(participantIndex);
    // newState[index].convParticipants[participantIndex].hasNewMsg += 1;

    //   return state;
    // }),

    // A case reducer with a "prepare callback" to customize the action
    // updateConvListHasNewMsg: create.preparedReducer(
    //   (newMsg) => {
    //     return { payload: { newMsg } };
    //   },
    //   // action type is inferred from prepare callback
    //   (state, action) => {
    //     const conversationId = action.payload.newMsg._id;
    //     const messageOwnerId = action.payload.newMsg.lastMessage.ownerId;

    //     console.log(conversationId, messageOwnerId);

    //     state.convList
    //       .map((cur) => {
    //         if (cur._id === conversationId) {
    //           console.log();
    //           cur.convParticipants.map((cur) => {
    //             if (cur.userId === messageOwnerId) {
    //               return (cur.hasNewMsg += 1);
    //             }
    //           });
    //         }
    //       })[2]
    //       .convParticipants.map((cur) => {
    //         return (cur.hasNewMsg = 777);
    //       });
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
          state.loaded = false;
        },
        rejected: (state, action) => {
          state.error = action.payload;
          // console.log(action.error, action.payload);
        },
        fulfilled: (state, action) => {
          state.convList = action.payload.data;
          state.loaded = true;
        },
        // settled is called for both rejected and fulfilled actions
        settled: (state, action) => {
          state.loading = false;
        },
      }
    ),
    addNewParticipant: create.asyncThunk(
      async ({ convId, userId }, { rejectWithValue, dispatch }) => {
        try {
          const response = await fetch(
            `https://localhost:4001/conversations/addnewparticipant/${convId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({ userId: userId }),
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
          state.loaded = false;
        },
        rejected: (state, action) => {
          state.error = action.payload;
          // console.log(action.error, action.payload);
        },
        fulfilled: (state, action) => {
          state.convList = action.payload.data;
          state.loaded = true;
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
export const { getConvList, updateConvListHasNewMsg, addNewParticipant } =
  convListSlice.actions;
export default convListSlice.reducer;
