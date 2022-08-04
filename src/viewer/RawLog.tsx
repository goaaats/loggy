import { useRef } from "react";

interface RawLogProps {
  log: string;
}

export function RawLog(props: RawLogProps) {
  const pre = useRef<HTMLPreElement>(null);

  return (
    <div className="p-2">
      <button
        className="rounded-md bg-indigo-500 text-white p-2"
        onClick={() => {
          if (pre.current !== null) pre.current.scrollIntoView(false);
        }}
      >
        Scroll to bottom
      </button>
      <pre
        className="break-normal whitespace-pre-line overflow-x-scroll bg-slate-600 text-slate-200 p-2 mt-3 rounded"
        ref={pre}
      >
        {props.log}
      </pre>
    </div>
  );
}
