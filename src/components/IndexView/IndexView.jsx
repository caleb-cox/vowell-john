import { useAppContext } from "@/components/App";
import Button from "@/components/Button";
import "./IndexView.css";

const IndexView = () => {
  const { pages, setCurrentPageId, setMode } = useAppContext();

  return (
    <div className="IndexView">
      <div className="pages">
        {[...pages].map(({ id, title }) => {
          return (
            <div
              key={id}
              className="page"
              onClick={() => {
                setCurrentPageId(id);
                setMode("read");
              }}
            >
              {title}
            </div>
          );
        })}
      </div>
      <Button
        icon="add_circle"
        onClick={() => {
          setCurrentPageId(undefined);
          setMode("edit");
        }}
      />
    </div>
  );
};

export default IndexView;
