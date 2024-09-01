import { useState } from "react";
import { useSendCodeMutation } from "../../reducers/auth";
import { useNavigate } from "react-router-dom";

function SendEmailForChangePage() {
  const [sendEmail, { data, error, isLoading, isSuccess, isError, reset }] =
    useSendCodeMutation();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(null);

  async function sendData(e) {
    e.preventDefault();
    const form = e.target.parentElement;
    const formData = new FormData(form);
    // console.log(formData);
    const data = {};
    for (const [key, val] of formData) {
      data[key] = val;
    }
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(data.email)) {
      setErrorMsg("Elektroninio pašto adresas yra neteisingas");
      setTimeout(() => {
        setErrorMsg(false);
      }, 5000);
    }
    const { message, success } = await sendEmail(data).unwrap();
    console.log(message, success);
    if (success) {
      navigate("/changeemail");
    } else {
      setErrorMsg(message);
    }
  }

  return (
    <div className="card bg-base-100 border border-neutral-200 w-96 shadow-xl mx-auto">
      <div className="card-body">
        <form className="flex flex-col gap-5">
          {errorMsg && (
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
              <span>{errorMsg}! </span>
            </div>
          )}

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
              onChange={() => {
                setErrorMsg(null);
              }}
            />
          </label>
          <button
            onClick={(event) => {
              sendData(event);
            }}
            className="btn btn-active"
          >
            Siųsti
          </button>
        </form>
      </div>
    </div>
  );
}
export default SendEmailForChangePage;
