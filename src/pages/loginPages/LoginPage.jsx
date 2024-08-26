import { useRef, useState } from "react";
import { useCreateUserMutation } from "../../reducers/auth.js";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../reducers/authSlice.js";
import { useDispatch, useSelector } from "react-redux";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });

  async function sendData(e) {
    e.preventDefault();
    const form = e.target.parentElement;
    const formData = new FormData(form);
    const sendData = {};
    for (let [key, val] of formData) {
      sendData[key] = val;
    }
    const result = await dispatch(loginUser(sendData));
    if (result.meta.requestStatus === "fulfilled") {
      // console.log();
      navigate("/todo");
    }
  }

  return (
    <div className="card bg-base-100 border border-neutral-200 w-96 shadow-xl mx-auto">
      <div className="card-body">
        <form className="flex flex-col gap-5">
          {user.error && (
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{user.error}! </span>
            </div>
          )}

          <h1>{user.email}</h1>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow border-none"
              placeholder="Email"
              name="email"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow border-none"
              // value="password"
              placeholder="Password"
              name="password"
            />
          </label>
          <button
            onClick={(event) => {
              sendData(event);
            }}
            className="btn"
          >
            Jungtis
          </button>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;
