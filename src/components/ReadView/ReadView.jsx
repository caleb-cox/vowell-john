import reactStringReplace from "react-string-replace";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "@/components/App";
import "./ReadView.css";

const ReadView = () => {
  const { currentPage, findPageByTitle, viewPage, createPage } =
    useAppContext();

  return (
    <div className="ReadView">
      <h1>{currentPage?.title || "New page"}</h1>
      <section>
        {reactStringReplace(currentPage?.text, /\[\[(.*?)]]/g, (match) => {
          const linkedPage = findPageByTitle(match);
          return (
            <span
              key={uuidv4()}
              className={["link"]
                .concat(linkedPage ? [] : ["unlinked"])
                .join(" ")}
              onClick={() => {
                if (linkedPage) {
                  viewPage(linkedPage);
                } else {
                  createPage(match);
                }
              }}
            >
              {match}
            </span>
          );
        })}
      </section>
    </div>
  );
};

export default ReadView;
