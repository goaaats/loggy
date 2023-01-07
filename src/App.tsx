import { useEffect, useState } from "react";
import { Log, parseLog } from "./logs/parseLog";
import { LogViewer } from "./viewer/LogViewer";
import { Buffer } from "buffer";
import { decode } from "url-safe-base64";
import "./App.css";

function useFileUpload(): [JSX.Element, ArrayBuffer | undefined] {
  const [file, setFile] = useState<File>();
  const [fileBuf, setFileBuf] = useState<ArrayBuffer>();

  useEffect(() => {
    async function getFileBuf() {
      const arrayBuf = await file?.arrayBuffer();
      setFileBuf(arrayBuf);
    }

    if (file) getFileBuf();
  }, [file]);

  return [
    <input
      type="file"
      onChange={(e) => {
        const target = e.target;
        if (target.files != null && target.files[0] != null) {
          setFile(target.files[0]);
        }
      }}
    />,
    fileBuf
  ];
}

function useLog(fileBuf: ArrayBuffer | undefined): Log | undefined {
  const [log, setLog] = useState<Log>();

  useEffect(() => {
    async function getLog() {
      const log = await parseLog(fileBuf!);
      setLog(log);
    }

    if (fileBuf != null) getLog();
  }, [fileBuf]);

  return log;
}

function App() {
  const [fileUpload, fileBuf] = useFileUpload();
  const [urlBuf, setUrlBuf] = useState<ArrayBuffer>();

  const log = useLog(fileBuf || urlBuf);

  const params = new URL(document.location.toString()).searchParams;
  const logURL = params.get("url");

  useEffect(() => {
    async function getLog() {
      if (logURL !== null) {
        const url = Buffer.from(decode(logURL), "base64").toString();
        const req = await fetch(url, { mode: "cors" });
        const log = await req.arrayBuffer();
        setUrlBuf(log);
      }
    }

    getLog();
  }, []);

  return (
    <div className="App m-2">
      {log == null ? fileUpload : <LogViewer log={log} />}
    </div>
  );
}

export default App;
