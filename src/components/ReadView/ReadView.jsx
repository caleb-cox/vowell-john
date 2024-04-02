import reactStringReplace from "react-string-replace";
import { useAppContext } from "@/components/App";
import "./ReadView.css";

const ReadView = () => {
  const { pages, currentPage } = useAppContext();

  return (
    <div className="ReadView">
      <h1>{currentPage}</h1>
      <pre>
        {reactStringReplace(pages[currentPage], /\[\[(.*?)]]/g, (match) => (
          <span className="clickable">{match}</span>
        ))}
      </pre>
    </div>
  );
};

export default ReadView;
