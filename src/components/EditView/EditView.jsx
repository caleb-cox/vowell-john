import { useState, useEffect } from "react";
import { useAppContext } from "@/components/App";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import NewPageForm from "@/components/NewPageForm";
import "./EditView.css";

const EditView = () => {
  const { currentPage, updateCurrentPage, deleteCurrentPage } = useAppContext();

  const [text, setText] = useState(currentPage?.text);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setText(currentPage?.text);
  }, [currentPage]);

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
        <div className="word-count-container">
          <div className="label">Word count:</div>
          <div className="count">{(text?.match(/\S+/g) || "").length}</div>
        </div>
        <Button icon="delete" onClick={() => setOpenModal(true)} />
        <Button icon="save" onClick={() => updateCurrentPage(text)} />
      </div>
      <Modal visible={openModal}>
        <h1>Delete?</h1>
        <div className="buttons">
          <Button icon="cancel" onClick={() => setOpenModal(false)} />
          <Button icon="check_circle" onClick={deleteCurrentPage} />
        </div>
      </Modal>
    </div>
  ) : (
    <NewPageForm />
  );
};

export default EditView;
