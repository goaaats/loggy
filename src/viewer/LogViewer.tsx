//import { useState } from "react";
import { Log } from "../logs/parseLog";
import { DalamudLogViewer } from "./DalamudLogViewer";
import { useLogSelector } from "./LogSelector";
import "./LogViewer.css";
import { RawLog } from "./RawLog";

interface LogViewerProps {
  log: Log;
}

export function LogViewer(props: LogViewerProps) {
  const log = props.log;
  const [logSelector, selectedLog] = useLogSelector(log.files);

  let el;
  switch (selectedLog) {
    case "dalamud.log":
      el = <DalamudLogViewer log={log.dalamudLog!} />;
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

  return (
    <div className="flex">
      {logSelector}
      <div className="w-5/6">{el}</div>
    </div>
  );
}
