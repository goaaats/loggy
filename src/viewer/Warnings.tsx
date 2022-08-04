export function Warnings(props: { problems: string[] }) {
  const problems = [];
  for (let i = 0; i < props.problems.length; i++) {
    const problem = props.problems[i];
    problems.push(<li key={i}>{problem}</li>);
  }

  return (
    <div>
      <h2 className="text-xl">Problems</h2>
      <hr />
      <ul className="list-disc list-inside">{problems}</ul>
      <br />
    </div>
  );
}
