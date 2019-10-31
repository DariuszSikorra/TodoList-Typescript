export type Todo = {
    id: number;
    discription: string;
    deadline: string;
    important: boolean;
    done: boolean;
    doneDate: string;
};

export type AppState = {
    todoForm: Todo;
    todoList: Array<Todo>;
};

export type Action =
    | { type: "RESET"; payload: AppState }
    | { type: "ADD_DISCRIPTION"; payload: string }
    | { type: "ADD_IMPORTANT"; payload: boolean }
    | { type: "ADD_TODO"; payload: Todo }
    | { type: "ADD_DEADLINE"; payload: string }
    | { type: "DELETE_TODO"; payload: Todo }
    | { type: "MAKEDONE_TODO"; payload: Todo };