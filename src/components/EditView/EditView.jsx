import { useState } from "react";
import { useAppContext } from "@/components/App";
import Button from "@/components/Button";
import "./EditView.css";

const EditView = () => {
  const { setMode, pages, currentPage, setPages } = useAppContext();
  const [text, setText] = useState(pages[currentPage]);

  const wordCount = (text.match(/\S+/g) || "").length;

  const deletePage = () => {
    setPages((prevState) => {
      const newState = { ...prevState };
      delete newState[currentPage];
      return newState;
    });

    setMode("index");
  };

  const savePage = () => {
    setPages((prevState) => {
      return {
        ...prevState,
        [currentPage]: text,
      };
    });

    setMode("read");
  };

  return (
    <div className="EditView">
      <h1>{currentPage}</h1>
      <textarea
        spellCheck={false}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="controls">
        <Button onClick={deletePage}>Delete</Button>
        <Button onClick={savePage}>
          {wordCount !== 250 ? `${wordCount}/250` : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default EditView;
