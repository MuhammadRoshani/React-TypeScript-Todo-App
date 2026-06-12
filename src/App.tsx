import "./App.css";
import TodosWrapper from "./components/TodosWrapper";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <TodosWrapper />
      <Toaster position="top-center" />
    </>
  );
}
