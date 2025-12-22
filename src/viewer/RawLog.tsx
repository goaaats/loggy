import { useRef } from "react";

interface RawLogProps {
  log: string;
}

export function RawLog(props: RawLogProps) {
  const pre = useRef<HTMLPreElement>(null);
  return (
    <div className="w-full">
      <button
        className="rounded-md bg-indigo-500 text-white p-2 px-4 self-start mb-2"
        onClick={() => {
          if (pre.current !== null) pre.current.scrollIntoView(false);
        }}
      >
        Scroll to bottom
      </button>
      <pre
        className="wrap-break-word whitespace-pre-line bg-slate-600 text-slate-200 p-3 rounded overflow-auto min-h-[500px]"
        ref={pre}
      >
        {props.log}
      </pre>
    </div>
  );
}