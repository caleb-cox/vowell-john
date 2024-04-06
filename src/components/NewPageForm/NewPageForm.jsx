import { useState } from "react";
import { useAppContext } from "@/components/App";
import Button from "@/components/Button";
import "./NewPageForm.css";

const NewPageForm = () => {
  const { pages, setPages, setCurrentPage } = useAppContext();

  const [newPageTitle, setNewPageTitle] = useState("");

  const handleSubmit = () => {
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
      <h1>Create new page?</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={newPageTitle}
          onChange={(e) => setNewPageTitle(e.target.value)}
        />
        <Button className="material-symbols-outlined" onClick={handleSubmit}>
          add
        </Button>
      </form>
    </div>
  );
};

export default NewPageForm;
