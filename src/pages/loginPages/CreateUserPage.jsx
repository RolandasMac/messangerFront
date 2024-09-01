import { useRef, useState } from "react";
import { useCreateUserMutation } from "../../reducers/auth.js";
import { useNavigate } from "react-router-dom";

function CreateUserPage() {
  const [createUser, { data, isError }] = useCreateUserMutation();
  const navigate = useNavigate();
  const [validateError, setValidateError] = useState("Kažkokia klaida");
  const [error, setError] = useState(false);
  const fileRef = useRef();
  function validFields(formData) {
    const data = {};
    for (const [key, val] of formData) {
      data[key] = val;
    }
    if (
      data.password.length === 0 ||
      data.password1.length === 0 ||
      data.name.length === 0 ||
      String(data.code).length === 0 ||
      data.file === null
    ) {
      setValidateError("Laukeliai negali būti tušti");
      setError(true);
      setTimeout(() => {
        setError(false);
        setValidateError("");
      }, 5000);
      return false;
    }

    if (data.password !== data.password1) {
      setValidateError("Slaptažodis nesutampa");
      setError(true);
      setTimeout(() => {
        setError(false);
        setValidateError("");
      }, 5000);
      return false;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(data.password)) {
      setValidateError("Slaptažodis neatitinka reikalavimų");
      setError(true);
      setTimeout(() => {
        setError(false);
        setValidateError("");
      }, 5000);
      return false;
    }
    const file = fileRef.current.files[0];
    if (file) {
      // Check if the file is an image
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (validImageTypes.includes(file.type)) {
      } else {
        setValidateError(
          "Avataro failas yra netinkamo formato arba nepasirinktas"
        );
        setError(true);
        setTimeout(() => {
          setError(false);
          setValidateError("");
        }, 5000);
        return false;
      }
    }
    return true;
  }

  async function sendData(e) {
    e.preventDefault();
    const form = e.target.parentElement;
    const formData = new FormData(form);
    if (!validFields(formData)) {
      return;
    }
    const { message, success, createdUser } = await createUser(
      formData
    ).unwrap();
    if (success) {
      navigate("/login");
    }
  }

  return (
    <div className="card bg-base-100 border border-neutral-200 w-96 shadow-xl mx-auto">
      <div className="card-body">
        <form className="flex flex-col gap-5">
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
              placeholder="Code"
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
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow border-none"
              placeholder="Username"
              name="name"
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
              placeholder="Password1"
              name="password1"
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
              placeholder="Password2"
              name="password"
            />
          </label>
          <input
            ref={fileRef}
            name="file"
            type="file"
            className="file-input w-full max-w-xs"
          />
          <button
            onClick={(event) => {
              sendData(event);
            }}
            className="btn btn-active"
          >
            Siųsti
          </button>
        </form>
        {error && (
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
            <span>{validateError}! </span>
          </div>
        )}
      </div>
    </div>
  );
}
export default CreateUserPage;
