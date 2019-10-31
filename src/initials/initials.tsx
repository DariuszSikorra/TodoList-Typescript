export const today = new Date().toISOString().substring(0, 10);

export const initialTodoForm = {
    id: 0,
    discription: "",
    deadline: today,
    important: false,
    done: false,
    doneDate: ""
};

export const initialState = {
    todoForm: initialTodoForm,
    todoList: []
};