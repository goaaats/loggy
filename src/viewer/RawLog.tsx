interface RawLogProps {
  log: string;
}

export function RawLog(props: RawLogProps) {
  return (
    <pre className="break-normal whitespace-pre-line overflow-x-scroll bg-slate-600 text-slate-200 p-1 m-5 rounded">
      {props.log}
    </pre>
  );
}
