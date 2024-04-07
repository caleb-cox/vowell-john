import { useState, useEffect } from "react";
import { useAppContext } from "@/components/App";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import NewPageForm from "@/components/NewPageForm";
import "./EditView.css";

const EditView = () => {
  const { currentPage } = useAppContext();

  const [text, setText] = useState(currentPage?.text);
  const [openModal, setOpenModal] = useState(false);

  const wordCount = (text?.match(/\S+/g) || "").length;

  // useEffect(() => {
  //   setText(currentPage?.text);
  // }, [currentPageId]);

  const deletePage = () => {
    //   setCurrentPageId(undefined);
    //   setPages((prevState) => {
    //     const newState = { ...prevState };
    //     delete newState[currentPageId];
    //     return newState;
    //   });
    //   setMode("index");
  };

  const savePage = () => {
    // setPages((prevState) => {
    //   return {
    //     ...prevState,
    //     [currentPageId]: text,
    //   };
    // });
    // setMode("read");
  };

  return currentPage?.title ? (
    <div className="EditView">
      <h1>{currentPage?.title}</h1>
      <textarea
        spellCheck={false}
        value={text}
        placeholder="Enter text here..."
        onChange={(e) => setText(e.target.value)}
      />
      <div className="controls">
        <div className="word-count">{wordCount}</div>
        <Button icon="delete" onClick={() => setOpenModal(true)} />
        <Button icon="save" onClick={savePage} />
      </div>
      <Modal visible={openModal}>
        <h1>Delete?</h1>
        <div className="buttons">
          <Button icon="cancel" onClick={() => setOpenModal(false)} />
          <Button icon="check_circle" onClick={deletePage} />
        </div>
      </Modal>
    </div>
  ) : (
    <NewPageForm />
  );
};

export default EditView;
