import reactStringReplace from "react-string-replace";
import { useAppContext } from "@/components/App";
import NewPageForm from "@/components/NewPageForm";
import "./ReadView.css";

const ReadView = () => {
  const { pages, currentPage } = useAppContext();

  return (
    <div className="ReadView">
      <h1>{currentPage?.title || "New page"}</h1>
      <section>
        {reactStringReplace(currentPage?.text, /\[\[(.*?)]]/g, (match) => {
          const unlinked = pages.find((page) => page.id === currentPageId);
          return (
            <span
              className={["link"]
                .concat(unlinked ? ["unlinked"] : [])
                .join(" ")}
              onClick={() => {
                if (unlinked) {
                  // setPages((prevState) => {
                  //   return {
                  //     ...prevState,
                  //     [match]: "",
                  //   };
                  // });
                  // setMode("edit");
                }

                // setCurrentPageId(match);
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
