/**
 * Reducer para manejar una lista de tareas
 * @typedef {Object} Todo
 * @property {number} id - Identificador único de la tarea
 * @property {string} description - Descripción de la tarea
 * @property {boolean} done - Indica si la tarea está completada
 */

/**
 * Acción para agregar una nueva tarea
 * @typedef {Object} AddTodoAction
 * @property {string} type - Tipo de acción
 * @property {Todo} payload - Tarea a agregar
 */

/**
 * Acción para eliminar una tarea
 * @typedef {Object} DelTodoAction
 * @property {string} type - Tipo de acción
 * @property {number} payload - Identificador de la tarea a eliminar
 */

/**
 * Acción para cambiar el estado de una tarea
 * @typedef {Object} ToggleTodoAction
 * @property {string} type - Tipo de acción
 * @property {number} payload - Identificador de la tarea a cambiar de estado
 */

/**
 * Reducer para manejar una lista de tareas
 * @param {Array.<Todo>} initialState - Lista de tareas inicial
 * @param {(AddTodoAction|DelTodoAction|ToggleTodoAction)} action - Acción a ejecutar
 * @returns {Array.<Todo>} Nueva lista de tareas
 */
 export const todoReducer = (initialState, action) => {
  switch (action.type) {
    case "Add Todo":
      return [...initialState, action.payload];

    case "Del Todo":
      // Retornará un nuevo array con todos los elementos menos el de la tarea con el id especificado
      return initialState.filter((todo) => todo.id !== action.payload);   
    case "Toggle Todo":
      return initialState.map((todo) => {
        if (todo.id === action.payload) {
          // Cambia el valor de done para la tarea con el id especificado
          return { ...todo, done: !todo.done };
        }
        return todo;
      });
    default:
      return [...initialState];
  }
};