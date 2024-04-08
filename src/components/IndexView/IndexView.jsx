import { useAppContext } from "@/components/App";
import Button from "@/components/Button";
import DataBox from "@/components/DataBox";
import "./IndexView.css";

const IndexView = () => {
  const { pages, lastSyncTime, setCurrentPageId, setMode, getPages } =
    useAppContext();

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
      <div className="controls">
        <Button
          icon="add_circle"
          onClick={() => {
            setCurrentPageId(undefined);
            setMode("edit");
          }}
        />
        <Button icon="sync" onClick={getPages} />
        <DataBox
          label="Last sync:"
          value={Intl.DateTimeFormat("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }).format(lastSyncTime)}
        />
      </div>
    </div>
  );
};

export default IndexView;
