import { useState } from "react";

function ContactPage() {
  const [error, setError] = useState(null);

  function sendMessage(e) {
    e.preventDefault();
    const form = e.currentTarget.parentElement;
    const formData = new FormData(form);

    const sendData = {};
    for (let [key, val] of formData) {
      sendData[key] = val;
    }
    console.log(sendData);

    if (
      sendData.name.length === 0 ||
      sendData.email.length === 0 ||
      sendData.subject.length === 0 ||
      sendData.text.length === 0
    ) {
      setError("Laukeliai negali būti tušti");
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(sendData.email)) {
      setError("Elektroninio pašto adresas yra neteisingas");
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }

    fetch("https://localhost:4001/contacts/sendemailmessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
      mode: "cors",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          setError("Kažkas negerai su žinutės išsiuntimu");
          setTimeout(() => {
            setError(null);
          }, 5000);
        }
        return response.json();
      })
      .then((data) => {
        setError(data.message);
        setTimeout(() => {
          setError(null);
        }, 5000);
        form.reset();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }
  return (
    <div>
      <h1 className="text-center">This is contact page</h1>
      <form action="" className="flex flex-col gap-3 mt-5">
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
            <span>{error}! </span>
          </div>
        )}

        <div className="flex flex-row gap-5">
          <input
            type="text"
            className="grow rounded"
            placeholder="Vardas"
            name="name"
          />

          <input
            type="email"
            className="grow rounded"
            placeholder="El.pašto adresas"
            name="email"
          />
        </div>

        <input
          type="text"
          className="grow rounded"
          placeholder="Pranešimo pavadinimas"
          name="subject"
        />

        <textarea
          className="grow rounded"
          placeholder="Pranešimo tekstas"
          name="text"
        />
        <button
          className="btn btn-active btn-ghost"
          onClick={(event) => sendMessage(event)}
        >
          Siųsti pranešimą
        </button>
      </form>
    </div>
  );
}
export default ContactPage;
