export function Warnings(props: { problems: string[] }) {
  const problems = props.problems.map((x) => <li>{x}</li>);

  return (
    <div>
      <h2 className="text-xl">Problems</h2>
      <hr />
      <ul className="list-disc list-inside">{problems}</ul>
      <br />
    </div>
  );
}
