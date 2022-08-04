import { useRef } from "react";

interface RawLogProps {
  log: string;
}

export function RawLog(props: RawLogProps) {
  const pre = useRef<HTMLPreElement>(null);

  return (
    <div>
      <button
        className="rounded-none bg-indigo-500"
        onClick={() => {
          if (pre.current !== null) pre.current.scrollIntoView(false);
        }}
      >
        Scroll to bottom
      </button>
      <pre
        className="break-normal whitespace-pre-line overflow-x-scroll bg-slate-600 text-slate-200 p-2 m-5 rounded"
        ref={pre}
      >
        {props.log}
      </pre>
    </div>
  );
}
