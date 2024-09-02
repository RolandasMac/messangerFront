import { useRef, useState } from "react";
import { useCreateUserMutation } from "../../reducers/auth.js";
import { useLocation, useNavigate } from "react-router-dom";
import { changeUserEmail } from "../../reducers/authSlice.js";
import { useDispatch, useSelector } from "react-redux";

function ChanheEmailPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user;
  });
  const [error, setError] = useState(null);
  async function sendData(e) {
    e.preventDefault();
    const form = e.target.parentElement;
    const formData = new FormData(form);
    const sendData = {};
    for (let [key, val] of formData) {
      sendData[key] = val;
    }
    console.log(sendData);
    const data = {};
    for (const [key, val] of formData) {
      data[key] = val;
    }
    if (
      String(data.code).length === 0 ||
      data.email.length === 0 ||
      data.password.length === 0
    ) {
      setError("Laukeliai negali būti tušti");
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(data.email)) {
      setError("Elektroninio pašto adresas yra neteisingas");
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }
    const result = await dispatch(changeUserEmail(data));
    if (result.meta.requestStatus === "fulfilled") {
      navigate(`/login`, { replace: true });
    }
  }

  return (
    <div className="card bg-base-100 border border-neutral-200 w-96 shadow-xl mx-auto">
      <div className="card-body">
        <form className="flex flex-col gap-5">
          {(error || user.error) && (
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
              <span>{error || user.error}! </span>
            </div>
          )}

          <h1>{"user.email"}</h1>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow border-none"
              placeholder="Įveskite el.paštu gautą 6 skaitmenų kodą"
              name="code"
            />
          </label>

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
              placeholder="Įveskite norimą elektroninį pašto adresą"
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
              //   value="password"
              placeholder="Įveskite savo paskyros slaptažodį"
              name="password"
            />
          </label>
          <button
            onClick={(event) => {
              sendData(event);
            }}
            className="btn btn-active"
          >
            Keisti El. paštą
          </button>
        </form>
      </div>
    </div>
  );
}
export default ChanheEmailPage;
