import { useState } from "react";
// eslint-disable-next-line
import { ZipFile } from "../logs/parseLog";

export function useLogSelector(files: ZipFile[]) {
  const [selectedLog, setSelectedLog] = useState<string | null>(null);

  const options = [];
  for (const file of files) {
    options.push(
      <li key={file.name}>
        <button
          className="flex items-center py-2 mt-1 text-gray-600 rounded-md hover:bg-gray-200"
          onClick={() => setSelectedLog(file.name)}
        >
          <span className="mx-4 font-medium">{file.name}</span>
        </button>
      </li>
    );
  }

  return [
    <div className="flex flex-col w-1/6 h-screen px-4 py-8 overflow-y-auto border-r">
      <div className="flex flex-col justify-between">
        <aside>
          <ul>{options}</ul>
        </aside>
      </div>
    </div>,
    selectedLog
  ];
}
