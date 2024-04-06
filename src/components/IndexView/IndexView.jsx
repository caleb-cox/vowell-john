import { useState } from "react";
import { useAppContext } from "@/components/App";
import Button from "@/components/Button";
import "./IndexView.css";

const IndexView = () => {
  const { setMode, pages, setCurrentPage } = useAppContext();

  return (
    <div className="IndexView">
      <div className="pages">
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
      <Button
        icon="add_circle"
        onClick={() => {
          setCurrentPage(undefined);
          setMode("edit");
        }}
      />
    </div>
  );
};

export default IndexView;
