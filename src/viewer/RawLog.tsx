import { useRef } from "react";

interface RawLogProps {
  log: string;
}

export function RawLog(props: RawLogProps) {
  const pre = useRef<HTMLPreElement>(null);

  return (
    <div className="w-100 overflow-clip">
      <button
        className="rounded-md bg-indigo-500 text-white p-2"
        onClick={() => {
          if (pre.current !== null) pre.current.scrollIntoView(false);
        }}
      >
        Scroll to bottom
      </button>
      <pre
        className="break-words whitespace-pre-line bg-slate-600 text-slate-200 p-2 mt-3 rounded overflow-hidden"
        ref={pre}
      >
        {props.log}
      </pre>
    </div>
  );
}
