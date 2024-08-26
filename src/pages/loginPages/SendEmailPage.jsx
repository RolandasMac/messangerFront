import { useSendCodeMutation } from "../../reducers/auth";
import { useNavigate } from "react-router-dom";

function SendEmailPage() {
  const [sendEmail, { dat, isError }] = useSendCodeMutation();
  const navigate = useNavigate();

  async function sendData(e) {
    e.preventDefault();
    const form = e.target.parentElement;
    const formData = new FormData(form);
    console.log(formData);
    const data = {};
    for (const [key, val] of formData) {
      data[key] = val;
    }

    const { message, success } = await sendEmail(data).unwrap();
    // console.log(message, success);
    if (success) {
      navigate("/createuser");
    }

    // fetch("http://localhost:4001/auth/sendemailcode", {
    //   // return fetch("https://backend.macrol.lt/ataskaita", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json", // type
    //     // 'Authorization': jwt
    //   },
    //   mode: "cors",
    //   // credentials: 'same-origin',
    //   // credentials: "include",
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   // .then(data => document.getElementById("outputDiv").innerHTML = data.message)
    //   .catch((error) => {
    //     console.error(error);
    //   });
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
          <button
            onClick={(event) => {
              sendData(event);
            }}
            className="btn"
          >
            Siųsti
          </button>
        </form>
      </div>
    </div>
  );
}
export default SendEmailPage;
