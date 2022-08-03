import { Log } from "../logs/parseLog";
import "./LogViewer.css";

interface Plugin {
  name: string;
  internalName: string;
  version: string;
  thirdParty: boolean;
  repoUrl: string | null;
}

export function PluginList(props: { plugins: Plugin[] }) {
  const plugins = props.plugins;

  return (
    <div>
      <ul className="list-disc list-inside">
        {plugins.map((x) => (
          <li key={x.internalName}>
            {x.repoUrl != null ? (
              <a className="underline text-sky-500" href={x.repoUrl}>
                {x.name}
              </a>
            ) : (
              x.name
            )}{" "}
            - {x.version ?? "unknown"}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface LogViewerProps {
  log: Log;
}

export function LogViewer(props: LogViewerProps) {
  const log = props.log;
  if (log.dalamudLog == null) {
    return <p>No dalamud log :(</p>;
  }

  const troubleshooting = log.dalamudLog?.troubleshooting!;

  const pluginSources = [
    null,
    "",
    "https://kamori.goats.dev/Plugin/PluginMaster",
    "https://raw.githubusercontent.com/goatcorp/DalamudPlugins/api6/pluginmaster.json"
  ];

  const plugins: Plugin[] = [];
  for (const plugin of troubleshooting.LoadedPlugins) {
    plugins.push({
      name: plugin.Name,
      internalName: plugin.InternalName,
      version: plugin.AssemblyVersion,
      thirdParty:
        !pluginSources.includes(plugin.InstalledFromUrl) ||
        plugin.DownloadLinkInstall === null,
      repoUrl: plugin.RepoUrl
    });
  }

  plugins.sort((a, b) => a.name.localeCompare(b.name));

  const exception = log.dalamudLog?.exception!;
  const exceptionTime = new Date(exception.When).toString();

  return (
    <div>
      <h2 className="text-xl">Exception</h2>
      <hr />
      <pre className="break-normal whitespace-normal bg-slate-600 text-slate-200 p-1 rounded">
        {exception.Info}
      </pre>
      <p>at {exceptionTime}</p>

      <br />

      <h2 className="text-xl">Official plugins</h2>
      <hr />
      <PluginList plugins={plugins.filter((x) => !x.thirdParty)} />

      <br />

      <h2 className="text-xl">Third party plugins</h2>
      <hr />
      <PluginList plugins={plugins.filter((x) => x.thirdParty)} />
    </div>
  );
}
