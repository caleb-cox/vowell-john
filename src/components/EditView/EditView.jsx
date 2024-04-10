import { useState, useEffect } from "react";
import { useStateContext } from "@/contexts/StateContext";
import DataBox from "@/components/DataBox";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import NewPageForm from "@/components/NewPageForm";
import "./EditView.css";

const EditView = () => {
  const { currentPage, updatePage, deletePage } = useStateContext();

  const [title, setTitle] = useState(currentPage?.title);
  const [text, setText] = useState(currentPage?.text);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setTitle(currentPage?.title);
    setText(currentPage?.text);
  }, [currentPage]);

  return currentPage ? (
    <div className="EditView">
      <input
        spellCheck={false}
        value={title}
        placeholder="Enter title here..."
        onChange={(e) => setTitle(e.target.value)}
      />
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
        <Button
          icon="save"
          onClick={() => updatePage({ ...currentPage, title, text })}
        />
      </div>
      <Modal visible={openModal}>
        <h1>Delete?</h1>
        <div className="buttons">
          <Button icon="cancel" onClick={() => setOpenModal(false)} />
          <Button icon="check_circle" onClick={() => deletePage(currentPage)} />
        </div>
      </Modal>
    </div>
  ) : (
    <NewPageForm />
  );
};

export default EditView;
