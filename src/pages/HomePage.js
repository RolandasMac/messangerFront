import { useState, useRef, useEffect } from "react";
import daisyui from "daisyui";

import { getDate } from "../plugins/plugins";

import ReactStars from "react-stars";
import React from "react";
import { render } from "react-dom";

import ReactStars1 from "react-rating-star-with-type";

import ReactStars2 from "react-rating-star-with-type";

// RTK querry  ***********
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useSetIvykdytaTodoMutation,
} from "../reducers/todo";
//************************ */

function HomePage(props) {
  const { fraze, socket, fraze1 } = props;
  const input = useRef();
  const input1 = useRef();
  // const handlesubmit = () => {
  //   const fraz = input.current.value;
  //   socket.emit("message", { fraze: fraz });
  // };
  // const handlesubmit1 = () => {
  //   const fraz = input1.current.value;
  //   socket.emit("message1", { fraze: fraz });
  // };
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const [star, setStar] = useState(5);

  const onChange = (nextValue) => {
    setStar(nextValue);
  };

  const [star2, setStar2] = useState(5);

  const onChange2 = (nextValue) => {
    setStar2(nextValue);
  };
  //RTK querry********************************
  const { data = [], error, isLoading } = useGetTodosQuery();
  const [addTodo, { dat, isError }] = useAddTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useSetIvykdytaTodoMutation();

  async function setTodo(event) {
    const form = event.currentTarget.parentElement;
    const data = new FormData(form);
    let sendData = {};
    for (let [key, value] of data) {
      sendData[key] = value;
    }
    const body = {
      data: {
        completed: false,
        task: sendData.task,
      },
    };
    if (sendData.task.length > 0) {
      await addTodo(body).unwrap();
      form.querySelector("#task").value = "";
    }
  }

  async function removeTodo(id) {
    await deleteTodo(id).unwrap();
  }

  async function setIvykdyta(e, id) {
    // console.log(e.currentTarget.checked);
    await updateTodo({
      completed: e.currentTarget.checked,
      taskId: id,
    }).unwrap();
  }
  //****************************************************** */

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <>
      <div>
        <h1>
          {fraze ? fraze.data + " " + getDate(fraze.time) : "Nėra duomenų"}
        </h1>
        <input ref={input} placeholder="Įveskite frazę"></input>
        <button
          onClick={() => {
            // handlesubmit();
          }}
        >
          Spausti
        </button>
      </div>
      <div>
        <h1>{fraze1 ? fraze1.data + " " + fraze1.name : "Nėra duomenų"}</h1>
        <input ref={input1} placeholder="Įveskite frazę"></input>
        <button
          onClick={() => {
            // handlesubmit1();
          }}
        >
          Spausti
        </button>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={36}
          color2={"#ffd700"}
          value={1.4}
          half={false}
          edit={true}
        />

        <ReactStars1
          onChange={onChange}
          // value={4.7}
          isEdit={true}
          size={36}
          activeColors={["red", "orange", "#FFCE00", "#9177FF", "#8568FC"]}
        />

        <ReactStars2
          onChange={onChange2}
          value={4.2}
          // isEdit={true}
          size={36}
          activeColors={["red", "orange", "#FFCE00", "#9177FF", "#8568FC"]}
        />
      </div>
      <div className="d-flex flex-column">
        <form className="p-2">
          <div className="mb-3">
            <label htmlFor="task" className="form-label">
              Užduotis
            </label>
            <input
              type="text"
              className="form-control"
              name="task"
              id="task"
              aria-describedby="helpId"
              placeholder=""
            />
          </div>

          <button
            onClick={(event) => setTodo(event)}
            type="button"
            name=""
            id=""
            className="btn btn-primary"
          >
            Sukurti užduotį
          </button>
        </form>
        <div className="d-flex flex-column gap-2">
          {data.map((cur) => {
            return (
              <div key={cur._id} className="d-flex flex-row gap-3">
                <span
                  className={
                    cur.completed
                      ? `bg-success text-decoration-line-through p-2 text-center rounded`
                      : `bg-warning p-2 text-center rounded`
                  }
                >
                  {cur.task}
                </span>
                <input
                  type="checkbox"
                  onChange={(event) => setIvykdyta(event, cur._id)}
                  checked={cur.completed}
                />
                <span>
                  <button
                    type="button"
                    name=""
                    id=""
                    className="btn btn-primary"
                    onClick={() => removeTodo(cur._id)}
                  >
                    Trinti užduotį
                  </button>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HomePage;
