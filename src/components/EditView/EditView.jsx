import { useState, useEffect } from "react";
import { useAppContext } from "@/components/App";
import DataBox from "@/components/DataBox";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import NewPageForm from "@/components/NewPageForm";
import "./EditView.css";

const EditView = () => {
  const { currentPage, updateCurrentPage, deleteCurrentPage } = useAppContext();

  const [title, setTitle] = useState(currentPage?.title);
  const [text, setText] = useState(currentPage?.text);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setTitle(currentPage?.title);
    setText(currentPage?.text);
  }, [currentPage]);

  return currentPage ? (
    <div className="EditView">
      <h1>{title}</h1>
      <textarea
        spellCheck={false}
        value={text}
        placeholder="Enter text here..."
        onChange={(e) => setText(e.target.value)}
      />
      <div className="controls">
        <DataBox
          label="Word count:"
          value={(text?.match(/\S+/g) || "").length}
        />
        <Button icon="delete" onClick={() => setOpenModal(true)} />
        <Button icon="save" onClick={() => updateCurrentPage(title, text)} />
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
