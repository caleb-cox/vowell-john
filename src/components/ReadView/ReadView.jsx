import reactStringReplace from "react-string-replace";
import { v4 as uuidv4 } from "uuid";
import { useStateContext } from "@/contexts/StateContext";
import "./ReadView.css";

const ReadView = () => {
  const { currentPage, findPageByTitle, viewPage, createPage } =
    useStateContext();

  let replacedText;

  replacedText = reactStringReplace(currentPage?.text, /\*\*(.*?)\*\*/g, (match) => {
    return <strong>{match}</strong>;
  });

  replacedText = reactStringReplace(replacedText, /\*(.*?)\*/g, (match) => {
    return <em>{match}</em>;
  });

  replacedText = reactStringReplace(replacedText, /\[\[(.*?)]]/g, (match) => {
    const linkedPage = findPageByTitle(match);
    return (
      <span
        key={uuidv4()}
        className={["link"].concat(linkedPage ? [] : ["unlinked"]).join(" ")}
        onClick={() => (linkedPage ? viewPage(linkedPage) : createPage(match))}
      >
        {match}
      </span>
    );
  });

  return (
    <div className="ReadView">
      <h1>{currentPage?.title || "New page"}</h1>
      <section>{replacedText}</section>
    </div>
  );
};

export default ReadView;
