import { createContext, useState, useEffect, useContext } from "react";
import ModeSelector from "@/components/ModeSelector";
import IndexView from "@/components/IndexView";
import ReadView from "@/components/ReadView";
import EditView from "@/components/EditView";
import "./App.css";

const localStorageIsAvailable = (() => {
  try {
    localStorage.setItem("__test", "__test");
    localStorage.removeItem("__test");
    return true;
  } catch {
    return false;
  }
})();

const AppContext = createContext();

const App = () => {
  const [mode, setMode] = useState(
    (localStorageIsAvailable && localStorage.getItem("mode")) || "index"
  );

  useEffect(() => {
    document.body.classList.value = `${mode}-mode`;

    if (!localStorageIsAvailable) return;
    localStorage.setItem("mode", mode);
  }, [mode]);

  const [pages, setPages] = useState(
    (localStorageIsAvailable && JSON.parse(localStorage.getItem("pages"))) || {
      "!!! Start Here": "Enter text here...",
    }
  );

  useEffect(() => {
    // When a page is deleted, let's unfuck that situation
    if (!pages[currentPage]) {
      setCurrentPage(Object.keys(pages).sort()[0]);
    }

    if (!localStorageIsAvailable) return;
    localStorage.setItem("pages", JSON.stringify(pages));
  }, [pages]);

  const [currentPage, setCurrentPage] = useState(
    (localStorageIsAvailable && localStorage.getItem("currentPage")) ||
      Object.keys(pages)[0]
  );

  useEffect(() => {
    // When a page is created, let's unfuck THAT situation
    if (!pages[currentPage]) {
      setPages((prevState) => {
        return {
          ...prevState,
          [currentPage]: "Enter text here...",
        };
      });
    }

    if (!localStorageIsAvailable) return;
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  return (
    <AppContext.Provider
      value={{ mode, setMode, pages, setPages, currentPage, setCurrentPage }}
    >
      <ModeSelector />
      {mode === "index" && <IndexView />}
      {mode === "read" && <ReadView />}
      {mode === "edit" && <EditView />}
    </AppContext.Provider>
  );
};

export default App;

export const useAppContext = () => {
  return useContext(AppContext);
};
