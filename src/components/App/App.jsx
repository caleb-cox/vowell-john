import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import ModeSelector from "@/components/ModeSelector";
import IndexView from "@/components/IndexView";
import ReadView from "@/components/ReadView";
import EditView from "@/components/EditView";
import PasswordForm from "@/components/PasswordForm";
import "./App.css";

const AppContext = createContext();

const App = () => {
  const [password, setPassword] = useState();
  const [pages, setPages] = useState();
  const [currentPageId, setCurrentPageId] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [mode, setMode] = useState("locked");
  const [lastSyncTime, setLastSyncTime] = useState();

  useEffect(() => {
    if (password) getPages();
  }, [password]);

  useEffect(() => {
    setCurrentPage(pages?.find((page) => page.id === currentPageId));
  }, [pages, currentPageId]);

  useEffect(() => {
    document.body.classList.value = `${mode}-mode`;
  }, [mode]);

  const getPages = () => {
    axios({
      method: "get",
      url: "https://vowell-john-back-end.glitch.me/pages",
      headers: { password },
    })
      .then(({ data }) => {
        if (data.success) {
          setLastSyncTime(new Date());
          setPages(data.pages);
          setMode("index");
        }
      })
      .catch(() => {
        /* no op */
      });
  };

  const createPage = (title) => {
    if (!title || pages.find((page) => page.title === title)) return;

    axios({
      method: "post",
      url: "https://vowell-john-back-end.glitch.me/page",
      headers: { password },
      data: { title },
    })
      .then(({ data }) => {
        if (data.success) {
          const newPage = data.newPage;
          setPages((prevState) => [...prevState, newPage]);
          setCurrentPageId(newPage.id);
          setMode("edit");
        }
      })
      .catch(() => {
        /* no op */
      });
  };

  const updateCurrentPage = (title, text) => {
    axios({
      method: "put",
      url: "https://vowell-john-back-end.glitch.me/page",
      headers: { password },
      data: { id: currentPageId, title, text },
    })
      .then(({ data }) => {
        if (data.success) {
          setPages((prevState) => {
            const newState = [...prevState];
            newState.splice(
              newState.findIndex((page) => page.id === currentPageId),
              1,
              { ...currentPage, title, text }
            );
            return newState;
          });
          setMode("read");
        }
      })
      .catch(() => {
        /* no op */
      });
  };

  const deleteCurrentPage = () => {
    axios({
      method: "delete",
      url: "https://vowell-john-back-end.glitch.me/page",
      headers: { password },
      data: { id: currentPageId },
    })
      .then(({ data }) => {
        if (data.success) {
          setPages((prevState) =>
            prevState.filter((page) => page.id !== currentPageId)
          );
          setCurrentPageId(undefined);
          setMode("index");
        }
      })
      .catch(() => {
        /* no op */
      });
  };

  return (
    <AppContext.Provider
      value={{
        pages,
        currentPage,
        mode,
        lastSyncTime,
        setPassword,
        setCurrentPageId,
        setMode,
        getPages,
        createPage,
        updateCurrentPage,
        deleteCurrentPage,
      }}
    >
      {password && pages ? (
        <>
          <ModeSelector />
          {mode === "index" && <IndexView />}
          {mode === "read" && <ReadView />}
          {mode === "edit" && <EditView />}
        </>
      ) : (
        <PasswordForm />
      )}
    </AppContext.Provider>
  );
};

export default App;

export const useAppContext = () => {
  return useContext(AppContext);
};
