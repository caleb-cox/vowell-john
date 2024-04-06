import { useState } from "react";
import { useAppContext } from "@/components/App";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import "./EditView.css";

const EditView = () => {
  const { setMode, pages, currentPage, setPages } = useAppContext();
  const [text, setText] = useState(pages[currentPage]);
  const [openModal, setOpenModal] = useState(false);

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
        <Button className="word-count" disabled={true}>
          {wordCount}
        </Button>
        <Button
          className="material-symbols-outlined"
          onClick={() => setOpenModal(true)}
        >
          Delete
        </Button>
        <Button className="material-symbols-outlined" onClick={savePage}>
          Save
        </Button>
      </div>
      <Modal visible={openModal}>
        <h1>Delete?</h1>
        <div className="buttons">
          <Button
            className="material-symbols-outlined"
            onClick={() => setOpenModal(false)}
          >
            cancel
          </Button>
          <Button className="material-symbols-outlined" onClick={deletePage}>
            check_circle
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default EditView;
