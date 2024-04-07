import reactStringReplace from "react-string-replace";
import { useAppContext } from "@/components/App";
import "./ReadView.css";

const ReadView = () => {
  const { pages, currentPage, setCurrentPageId, createPage } = useAppContext();

  return (
    <div className="ReadView">
      <h1>{currentPage?.title || "New page"}</h1>
      <section>
        {reactStringReplace(currentPage?.text, /\[\[(.*?)]]/g, (match) => {
          const linkedPage = pages.find((page) => page.title === match);
          return (
            <span
              className={["link"]
                .concat(linkedPage ? [] : ["unlinked"])
                .join(" ")}
              onClick={() => {
                if (linkedPage) {
                  setCurrentPageId(linkedPage?.id);
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
