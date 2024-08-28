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

function TodoPage(props) {
  const { fraze, socket, fraze1 } = props;
  const input = useRef();
  const input1 = useRef();
  const handlesubmit = () => {
    const fraz = input.current.value;
    socket.emit("message", { fraze: fraz });
  };
  const handlesubmit1 = () => {
    const fraz = input1.current.value;
    socket.emit("message1", { fraze: fraz });
  };
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
    event.preventDefault();
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

  useEffect(() => {
    // console.log(data);
  }, [data]);
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <>
      <div className="p-2">
        <form className="flex flex-col gap-2">
          <div className="">Užduotis</div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="task"
            id="task"
            placeholder="Įrašykite užduotį"
          />
          <button
            onClick={(event) => setTodo(event)}
            className="btn btn-active hover:scale-95"
          >
            Sukurti užduotį
          </button>
        </form>
        <div className="flex flex-col gap-2 mt-3">
          {data.map((cur) => {
            return (
              <div key={cur._id} className="flex flex-row gap-5">
                <span
                  className={
                    cur.completed
                      ? `bg-lime-500 p-3 rounded flex-1 text-black`
                      : `bg-amber-300 p-3 rounded flex-1 text-black`
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
                    className="btn btn-active hover:scale-95"
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

export default TodoPage;
