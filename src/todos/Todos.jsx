import React from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { TodoAdd } from "./TodoAdd";
import { Todo } from "./Todo";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";



export const Todos = () => {
  const { todos } = useSelector(state => state.todos)

  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);



  console.log(todos);

  return (
    <>
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <TodoAdd /*handle={handleNewTodo}*//>
          <div>
            {todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
              />
            ))}


          </div>
        </div>
      </div>
    </>
  );
};
