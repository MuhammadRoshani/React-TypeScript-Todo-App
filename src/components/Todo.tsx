import type { Todo as TodoType } from "./Todos.type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

type TodoProps = {
  todo: TodoType;
  deleteTodo: (id: string) => void;
  toggleCompleted: (id: string) => void;
  editTodo: (id: string) => void;
};

export default function Todo({
  todo,
  deleteTodo,
  toggleCompleted,
  editTodo,
}: TodoProps) {
  return (
    <>
      <div className="Todo" onClick={() => toggleCompleted(todo.id)}>
        <p className={`${todo.isCompleted ? "completed" : ""}`}>{todo.title}</p>
        <div>
          <FontAwesomeIcon
            icon={faPen}
            onClick={(e) => {
              e.stopPropagation();
              editTodo(todo.id);
            }}
          />
          <FontAwesomeIcon
            icon={faTrash}
            onClick={(e) => {
              e.stopPropagation();
              deleteTodo(todo.id);
            }}
          />
        </div>
      </div>
    </>
  );
}
