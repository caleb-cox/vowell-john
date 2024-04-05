import reactStringReplace from "react-string-replace";
import { useAppContext } from "@/components/App";
import "./ReadView.css";

const ReadView = () => {
  const { pages, currentPage, setCurrentPage } = useAppContext();

  return (
    <div className="ReadView">
      <h1>{currentPage}</h1>
      <section>
        {reactStringReplace(pages[currentPage], /\[\[(.*?)]]/g, (match) => (
          <span
            className="link"
            onClick={() => {
              setCurrentPage(match);
            }}
          >
            {match}
          </span>
        ))}
      </section>
    </div>
  );
};

export default ReadView;
