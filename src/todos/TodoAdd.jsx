import React from "react";
import { useForm } from "../hooks/useForm";
import { useDispatch } from "react-redux";
import { addtodo } from "../slices/todoSlice";

/**
 * Componente que muestra un formulario para agregar una nueva tarea
 * @param {Object} props - Propiedades del componente
 * @param {Function} props.handle - Función que maneja el componente
 * @returns {JSX.Element} - Elemento JSX que representa el formulario para agregar una nueva tarea
 */
export const TodoAdd = ({handle}) => {
  /**
   * Hook personalizado que maneja el estado del formulario
   * @typedef {Object} useFormHook
   * @property {string} description - Descripción de la tarea
   * @property {Object} formState - Estado del formulario
   * @property {Function} onInputChange - Función que se ejecuta cuando hay cambios en el formulario
   * @property {Function} onResetForm - Función que resetea el formulario
   */
  const { description, formState, onInputChange, onResetForm } = useForm({
    description: ""
  });
  
  /**
   * Hook que permite despachar acciones a la tienda de Redux
   * @type {Function}
   */
  const dispatch = useDispatch();

  /**
   * Función que se ejecuta cuando se envía el formulario
   * @param {Event} event - Evento de envío de formulario
   */
  const onFormSubmit = (event) => {
    event.preventDefault();
    if (description.length <= 1) return;

    /**
     * Nueva tarea a agregar
     * @typedef {Object} NewTodo
     * @property {number} id - Identificador único de la tarea
     * @property {string} description - Descripción de la tarea
     * @property {boolean} done - Indica si la tarea está completada
     */
    const newTodo = {
      id: new Date().getTime(),
      description: description,
      done: false
    };

    dispatch(addtodo(newTodo));

    console.log("Antes del dispatch");
  };

  return (
    <div className="mb-4">
      <h1 className="text-grey-darkest">Todo List</h1>
      <form onSubmit={onFormSubmit} className="flex mt-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-800"
          placeholder="¿Qué haremos hoy?"
          name="description"
          value={description}
          onChange={onInputChange}
        />
        <input
          type="submit"
          onClick={onFormSubmit}
          value="Agregar"
          className="flex-no-shrink p-2 border-2 rounded text-teal-400 border-teal-600 hover:text-white hover:bg-teal-500"
        />
      </form>
    </div>
  );
};