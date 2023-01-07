import { useEffect, useState } from "react";
import { Log } from "../logs/parseLog";
import { DalamudLogViewer } from "./DalamudLogViewer";
import { useLogSelector } from "./LogSelector";
import { RawLog } from "./RawLog";
import { XLLogViewer } from "./XLLogViewer";

interface LogViewerProps {
  log: Log;
}

export function LogViewer(props: LogViewerProps) {
  // shamelessly stolen from stackoverflow
  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const log = props.log;
  const mobile = width <= 768;

  const [logSelector, selectedLog] = useLogSelector(log.files, mobile);

  let el;
  switch (selectedLog) {
    case "dalamud.log":
      el = (
        <>
          <DalamudLogViewer log={log.dalamudLog!} />
          <h2 className="text-xl">Log</h2>
          <hr />
          <RawLog log={log.dalamudLog!.data} />
        </>
      );
      break;
    case "output.log":
      el = (
        <>
          <XLLogViewer log={log.xlLog!} />
          <h2 className="text-xl">Log</h2>
          <hr />
          <RawLog log={log.xlLog!.data} />
        </>
      );
      break;
    case "launcher.log":
      el = (
        <>
          <XLLogViewer log={log.xlLog!} />
          <h2 className="text-xl">Log</h2>
          <hr />
          <RawLog log={log.xlLog!.data} />
        </>
      );
      break;
    default:
      if (selectedLog == null) {
        el = <p>Select a log to start!</p>;
      } else {
        el = (
          <RawLog log={log.files.find((x) => x.name == selectedLog)!.data} />
        );
      }
      break;
  }

  if (mobile) {
    return (
      <div className="flex flex-col w-100 overflow-hidden">
        <div className="mb-1">{logSelector}</div>
        <hr />
        {el}
      </div>
    );
  }

  return (
    <div className="flex flex-row w-100 overflow-auto">
      {logSelector}

      <div className="flex flex-col w-100 overflow-hidden">{el}</div>
    </div>
  );
}
