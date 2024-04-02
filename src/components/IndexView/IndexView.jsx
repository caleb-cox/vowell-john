import { useAppContext } from "@/components/App";
import Button from "@/components/Button";
import "./IndexView.css";

const IndexView = () => {
  const { setMode, pages, currentPage, setCurrentPage } = useAppContext();

  return (
    <div className="IndexView">
      {Object.keys(pages).map((page) => {
        return (
          <Button
            key={page}
            active={page === currentPage}
            onClick={() => {
              if (page !== currentPage) {
                setCurrentPage(page);
                setMode("read");
              }
            }}
          >
            {page}
          </Button>
        );
      })}
    </div>
  );
};

export default IndexView;
