import { useAppContext } from "@/components/App";
import "./IndexView.css";

const IndexView = () => {
  const { setMode, pages, currentPage, setCurrentPage } = useAppContext();

  return (
    <div className="IndexView">
      {Object.keys(pages).map((page) => {
        return (
          <div
            className={["page", page === currentPage ? "active" : null]
              .join(" ")
              .trim()}
            key={page}
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
  );
};

export default IndexView;
