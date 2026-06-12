import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

type TodoFormProps = {
  addTodo: (title: string) => void;
};

export default function TodoForm({ addTodo }: TodoFormProps) {
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // check input not empty:
    if (!value.trim()) {
      toast.error("Task cannot be empty.");
      return;
    }
    if (value.trim()) {
      addTodo(value.trim());
      setValue("");

      inputRef.current?.focus();
    }
  };

  // for focus when first time visit the page:
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <form className="TodoForm" onSubmit={handleSubmit}>
        <input
          value={value}
          ref={inputRef}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          className="todo-input"
          placeholder="Add a new task..."
        />
        {/* <button className="clear-btn" type="button" onClick={clearCompleted}>
          Clear Completed
        </button> */}
        <button type="submit" className="todo-btn">
          Add Task
        </button>
      </form>
    </>
  );
}
