import reactStringReplace from "react-string-replace";
import { useAppContext } from "@/components/App";
import NewPageForm from "@/components/NewPageForm";
import "./ReadView.css";

const ReadView = () => {
  const { setMode, pages, setPages, currentPage, setCurrentPage } =
    useAppContext();

  return (
    <div className="ReadView">
      <h1>{currentPage ? currentPage : "New page"}</h1>
      <section>
        {reactStringReplace(pages[currentPage], /\[\[(.*?)]]/g, (match) => (
          <span
            className={["link"]
              .concat(pages[match] === undefined ? ["unlinked"] : [])
              .join(" ")}
            onClick={() => {
              if (pages[match] === undefined) {
                setPages((prevState) => {
                  return {
                    ...prevState,
                    [match]: "",
                  };
                });

                setMode("edit");
              }

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
