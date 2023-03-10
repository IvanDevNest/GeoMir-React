import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deltodo } from "../slices/todoSlice";
import { toggletodo } from "../slices/todoSlice";

export const Todo = ({ todo, handleDelete, handleToggleTodo }) => {
  // export const ToDo = ({ todo, handleToggleTodo,handleDeleteTodo}) => {
  //const { todos } = useSelector(state => state.todos)
  const dispatch = useDispatch();



console.log(todo.done)
  return (
    <div>
      <p className={todo.done ? "ed" : ""}>
          
          {todo.description}

      </p>
      {todo.done ? (

        // <button
        //   onClick={() => handleToggleTodo(todo.id)}
        // >
        //   Not Done
        // </button>
        <button
          onClick={() => dispatch(toggletodo(todo.id))}
          className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-gray-400 border-gray-600 hover:bg-gray-500"
        >
          Not Done
        </button>
      ) : (

        // <button
        //   onClick={() => handleToggleTodo(todo.id)}
        //   >
        //   Done
        // </button>
        <button
          onClick={() => dispatch(toggletodo(todo.id))}
          className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-400 border-green-600 hover:bg-green-500"
        >
          Done
        </button>
      )}


      {/* <button
        onClick={()=> dispatch(deltodo(todo.id))}
        className="flex-no-shrink  p-2 ml-2 border-2 rounded  border-red-600  hover:text-white text-red-400 hover:bg-red-500"
      >
        Remove
      </button> */}
      <button
        onClick={() => dispatch(deltodo(todo.id))}
        className="flex-no-shrink  p-2 ml-2 border-2 rounded  border-red-600  hover:text-white text-red-400 hover:bg-red-500"
      >
        Remove
      </button>
    </div>
  );
};
