import { useAppContext } from "@/components/App";
import NewPageForm from "@/components/NewPageForm";
import "./IndexView.css";

const IndexView = () => {
  const { setMode, pages, currentPage, setCurrentPage } = useAppContext();

  return currentPage ? (
    <div className="IndexView">
      {Object.keys(pages)
        .sort()
        .map((page) => {
          return (
            <div
              key={page}
              className="page"
              onClick={() => {
                setCurrentPage(page);
                setMode("read");
              }}
            >
              {page}
            </div>
          );
        })}
    </div>
  ) : (
    <NewPageForm />
  );
};

export default IndexView;
