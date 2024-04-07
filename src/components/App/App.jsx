import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import axios from "axios";
import ModeSelector from "@/components/ModeSelector";
import IndexView from "@/components/IndexView";
import ReadView from "@/components/ReadView";
import EditView from "@/components/EditView";
import "./App.css";

const localStorageIsAvailable = (() => {
  try {
    localStorage.setItem("__test__", "__test__");
    localStorage.removeItem("__test__");
    return true;
  } catch {
    return false;
  }
})();

const AppContext = createContext();

const App = () => {
  // Pages - saved to back end
  const [pages, setPages] = useState([]);

  useEffect(() => {
    localStorage.removeItem("pages");

    axios({
      method: "get",
      url: "https://vowell-john-back-end.glitch.me/pages",
      headers: { admin_key: "toadspit" },
    }).then((response) => {
      setPages(response.data.pages);
    });
  }, []);

  // Current page - saved to localStorage
  const [currentPageId, setCurrentPageId] = useState(
    (localStorageIsAvailable && localStorage.getItem("currentPageId")) ||
      undefined
  );
  const [currentPage, setCurrentPage] = useState();

  useEffect(() => {
    setCurrentPage(pages.find((page) => page.id === currentPageId));

    if (!localStorageIsAvailable) return;
    if (currentPageId) {
      localStorage.setItem("currentPageId", currentPageId);
    } else {
      localStorage.removeItem("currentPageId");
    }
  }, [currentPageId]);

  // Mode - saved to localStorage
  const [mode, setMode] = useState(
    (localStorageIsAvailable && localStorage.getItem("mode")) || "index"
  );

  useEffect(() => {
    document.body.classList.value = `${mode}-mode`;

    if (!localStorageIsAvailable) return;
    localStorage.setItem("mode", mode);
  }, [mode]);

  return (
    <AppContext.Provider
      value={{
        pages,
        setPages,
        currentPage,
        setCurrentPageId,
        mode,
        setMode,
      }}
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
