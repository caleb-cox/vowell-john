import "./Modal.css";

const Modal = ({ visible, children }) => {
  return visible ? (
    <div className="Modal wrapper">
      <div className="content">{children}</div>
    </div>
  ) : null;
};

export default Modal;
