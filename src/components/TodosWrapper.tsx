import { useState, useEffect } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import type { Todo as TodoType } from "./Todos.type";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function TodosWrapper() {
  const [todos, setTodos] = useState<TodoType[]>(() => {
    // add Todos in localStorage:
    try {
      const savedTodos = localStorage.getItem("todos");

      return savedTodos ? (JSON.parse(savedTodos) as TodoType[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // addTodo func:
  const addTodo = (title: string) => {
    // check duplicate value:
    const normalizedTitle = title.trim().toLowerCase();

    const isDuplicate = todos.some(
      (todo) => todo.title.trim().toLowerCase() === normalizedTitle,
    );

    if (isDuplicate) {
      Swal.fire({
        title: "Duplicate Task",
        text: "This task already exists.",
        icon: "warning",
      });

      return;
    }
    setTodos([
      ...todos,
      {
        id: crypto.randomUUID(),
        title,
        isCompleted: false,
      },
    ]);
    toast.success("Task added ✨");
  };

  // deleteTodo func:
  const deleteTodo = (id: string) => {
    Swal.fire({
      title: "Delete task?",
      text: "Are you sure you want to delete this task?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        setTodos(todos.filter((todo) => todo.id !== id));
        Swal.fire({
          title: "Your task has been successfully deleted.",
          icon: "success",
        });
      }
    });
  };
  // editTodo func:
  const editTodo = async (id: string) => {
    const currentTodo = todos.find((todo) => todo.id === id);

    if (!currentTodo) return;

    const result = await Swal.fire({
      title: "Edit Task",
      input: "text",
      inputValue: currentTodo.title,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed || !result.value.trim()) {
      return;
    }

    const newTitle = result.value.trim();

    const isDuplicate = todos.some(
      (todo) =>
        todo.id !== id &&
        todo.title.trim().toLowerCase() === newTitle.toLowerCase(),
    );

    if (isDuplicate) {
      await Swal.fire({
        title: "Duplicate task",
        text: "This task already exists.",
        icon: "warning",
      });

      return;
    }

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo,
      ),
    );

    await Swal.fire({
      title: "Task updated",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // toggleCompleted
  const toggleCompleted = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  };

  // clearCompleted func:
  const clearCompleted = () => {
    Swal.fire({
      title: "Clear completed tasks?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        setTodos((prev) => prev.filter((todo) => !todo.isCompleted));
        Swal.fire("Cleared!", "", "success");
      }
    });
  };

  return (
    <>
      <div className="TodoWrapper">
        <h1>My Tasks ✨ </h1>

        <TodoForm addTodo={addTodo} />

        {/* empty state before add new task: */}
        {todos.length === 0 ? (
          <div className="empty-state">
            <h2>No tasks yet 📝</h2>
            <p>Add your first task above</p>
          </div>
        ) : (
          todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              toggleCompleted={toggleCompleted}
            />
          ))
        )}

        {/* if we have complete task show this button. */}
        <div
          className={`actions-wrapper ${todos.some((t) => t.isCompleted) ? "show" : ""}`}
        >
          {todos.some((t) => t.isCompleted) && (
            <button
              type="button"
              className="clear-btn"
              onClick={clearCompleted}
            >
              Clear Completed
            </button>
          )}
        </div>
      </div>
    </>
  );
}
