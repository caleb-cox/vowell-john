import { useState, useEffect } from "react";
import { useAppContext } from "@/components/App";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import NewPageForm from "@/components/NewPageForm";
import "./EditView.css";

const EditView = () => {
  const { setMode, pages, setPages, currentPage, setCurrentPage } =
    useAppContext();
  const [text, setText] = useState(pages[currentPage]);
  const [openModal, setOpenModal] = useState(false);

  const wordCount = (text?.match(/\S+/g) || "").length;

  useEffect(() => {
    setText(pages[currentPage]);
  }, [currentPage]);

  const deletePage = () => {
    setCurrentPage(undefined);

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

  return currentPage ? (
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
  ) : (
    <>
      <NewPageForm />
    </>
  );
};

export default EditView;
