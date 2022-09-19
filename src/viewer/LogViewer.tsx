import { Log } from "../logs/parseLog";
import { DalamudLogViewer } from "./DalamudLogViewer";
import { useLogSelector } from "./LogSelector";
import { RawLog } from "./RawLog";
import { XLLogViewer } from "./XLLogViewer";

interface LogViewerProps {
  log: Log;
}

export function LogViewer(props: LogViewerProps) {
  const log = props.log;
  const [logSelector, selectedLog] = useLogSelector(log.files);

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

  return (
    <div className="flex">
      {logSelector}
      <div className="w-5/6">{el}</div>
    </div>
  );
}
