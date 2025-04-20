import { useState } from "react";
import NavBar from "./components/NavBar";
import MealTable from "./components/MealTable";
import MealForm from "./components/MealForm";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");

  const handleOpen = (mode) => {
    setModalMode(mode);
    setIsOpen(true);
  };

  const handleSubmit = () => {
    if (modalMode === "add") {
      console.log("modal mode Add");
    } else {
      console.log("modal mode Edit");
    }
    setIsOpen(false);
  };

  return (
    <>
      <NavBar onOpen={() => handleOpen("add")} />
      <MealTable handleOpen={handleOpen} />
      <MealForm
        isOpen={isOpen}
        OnSubmit={handleSubmit}
        onClose={() => setIsOpen(false)}
        mode={modalMode}
      />
    </>
  );
}
