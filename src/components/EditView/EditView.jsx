import { useAppContext } from "@/components/App";
import "./EditView.css";

const EditView = () => {
  const { pages, currentPage, setPages } = useAppContext();

  return (
    <div className="EditView">
      <h1>{currentPage}</h1>
      <p
        contentEditable={true}
        suppressContentEditableWarning={true}
        onBlur={(event) => {
          setPages((prevState) => {
            return {
              ...prevState,
              [currentPage]: event.target.innerText,
            };
          });
        }}
      >
        {pages[currentPage]}
      </p>
    </div>
  );
};

export default EditView;
