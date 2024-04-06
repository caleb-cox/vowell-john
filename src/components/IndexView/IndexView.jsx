import { useAppContext } from "@/components/App";
import "./IndexView.css";

const IndexView = () => {
  const { setMode, pages, setCurrentPage } = useAppContext();

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
