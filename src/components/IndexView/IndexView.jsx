import { useAppContext } from "@/components/App";
import Button from "@/components/Button";
import "./IndexView.css";

const IndexView = () => {
  const { setMode, pages, currentPage, setCurrentPage } = useAppContext();

  return (
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
  );
};

export default IndexView;
