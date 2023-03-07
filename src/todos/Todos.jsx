import React from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { TodoAdd } from "./TodoAdd";
import { Todo } from "./Todo";
import { todosReducer } from "./todoReducer";

// Estat inicial del reducer. Buit
const initialState = [];
const init = () => {
  // Si localstorage tornes null tornariem un array buit
  return JSON.parse(localStorage.getItem("todos")) || [];
};

export const Todos = () => {
  const [todos, dispatchTodos] = useReducer(todosReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo) => {
    console.log("Afegeixo");
    console.log({ todo });

    const action = {
      type: "Add Todo",
      payload: todo
    };
    dispatchTodos(action);
  };

  const handleDeleteTodo = (id) => {
    console.log("AQui arribo " + id);
    dispatchTodos({
      type: "Del Todo",
      payload: id
    });
  };

  const handleToggleTodo = (id) => {
    dispatchTodos({
      type: "Toggle Todo",
      payload: id
    });
  };

  console.log(todos);

  return (
    <>
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <TodoAdd handle={handleNewTodo} />
          <div>
            {todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                handleDelete={handleDeleteTodo}
                handleToggleTodo={handleToggleTodo}
              />
            ))}

            {/* <div className="flex mb-4 items-center">
              <p className="w-full line-through text-green">
                Submit Todo App Component to Tailwind Components
              </p>
              <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-gray-400 border-gray-600 hover:bg-gray-500">
                Not Done
              </button>
              <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-400 border-red-600 hover:text-white hover:bg-red-500">
                Remove
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
