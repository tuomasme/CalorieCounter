import { useState } from "react";
import NavBar from "./components/NavBar";
import MealForm from "./components/MealForm";
import MealTable from "./components/MealTable";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");

  return (
    <>
      <NavBar />
      <MealTable />
      <MealForm />
    </>
  );
}
