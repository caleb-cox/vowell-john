import reactStringReplace from "react-string-replace";
import { useAppContext } from "@/components/App";
import NewPageForm from "@/components/NewPageForm";
import "./ReadView.css";

const ReadView = () => {
  const { pages, setPages, currentPage, setCurrentPage } = useAppContext();

  return currentPage ? (
    <div className="ReadView">
      <h1>{currentPage}</h1>
      <section>
        {reactStringReplace(pages[currentPage], /\[\[(.*?)]]/g, (match) => (
          <span
            className={["link"]
              .concat(!pages[match] ? ["unlinked"] : [])
              .join(" ")}
            onClick={() => {
              if (!pages[match]) {
                setPages((prevState) => {
                  return {
                    ...prevState,
                    [match]: "Enter text here...",
                  };
                });
              }

              setCurrentPage(match);
            }}
          >
            {match}
          </span>
        ))}
      </section>
    </div>
  ) : (
    <>
      <NewPageForm />
    </>
  );
};

export default ReadView;
