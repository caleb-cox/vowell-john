import { useState } from "react";
import { useAppContext } from "@/components/App";
import Button from "@/components/Button";
import "./NewPageForm.css";

const NewPageForm = () => {
  const { pages, setPages, setCurrentPage } = useAppContext();

  const [newPageTitle, setNewPageTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPageTitle) return;

    if (!pages[newPageTitle]) {
      setPages((prevState) => {
        return {
          ...prevState,
          [newPageTitle]: "Enter text here...",
        };
      });
    }

    setCurrentPage(newPageTitle);
  };

  return (
    <div className="NewPageForm">
      <h1>New page:</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={newPageTitle}
          onChange={(e) => setNewPageTitle(e.target.value)}
        />
        <Button icon="add_circle" onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default NewPageForm;
