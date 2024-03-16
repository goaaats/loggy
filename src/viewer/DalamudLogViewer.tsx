import { LogFile } from "../logs/parseLog";
import { DalamudTroubleshooting, PluginState } from "../logs/troubleshooting";
import { Warnings } from "./Warnings";

interface Plugin {
  name: string;
  internalName: string;
  version: string;
  thirdParty: boolean;
  repoUrl: string | null;
  loadState: PluginState;
}

export function PluginList(props: { plugins: Plugin[] }) {
  const plugins = props.plugins;

  return (
    <div>
      <ul className="list-disc list-inside">
        {plugins.map((x) => {
          let emoji = "\u2753";
          let tooltip = x.loadState.toString();

          switch (x.loadState) {
            case PluginState.Loading:
            case PluginState.Loaded:
              emoji = "\u2705";
              break;

            case PluginState.Unloading:
            case PluginState.Unloaded:
              emoji = "\u274C";
              break;

            case PluginState.LoadError:
            case PluginState.UnloadError:
              emoji = "\u26A0";
              break;

            case PluginState.Banned:
              emoji = "\u26D4";
              break;

            default:
              break;
          }

          return (
            <li key={x.internalName}>
              {x.repoUrl != null ? (
                <a className="underline text-sky-500" href={x.repoUrl}>
                  {x.name}
                </a>
              ) : (
                x.name
              )}{" "}
              - {x.version ?? "unknown"} - <span title={tooltip}>{emoji}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

interface DalamudLogViewerProps {
  log: LogFile<DalamudTroubleshooting>;
}

export function DalamudLogViewer(props: DalamudLogViewerProps) {
  const log = props.log;
  const troubleshooting = log.troubleshooting;
  if (troubleshooting == null) {
    return <div>No troubleshooting detected.</div>;
  }

  const pluginSources = [
    null,
    "",
    "https://kamori.goats.dev/Plugin/PluginMaster",
    "https://raw.githubusercontent.com/goatcorp/DalamudPlugins/api6/pluginmaster.json",
    "OFFICIAL"
  ];

  const plugins: Plugin[] = [];
  for (const plugin of troubleshooting!.LoadedPlugins) {
    plugins.push({
      name: plugin.Name,
      internalName: plugin.InternalName,
      version: plugin.AssemblyVersion,
      thirdParty:
        !pluginSources.includes(plugin.InstalledFromUrl) ||
        plugin.DownloadLinkInstall === null,
      repoUrl: plugin.RepoUrl,
      loadState:
        troubleshooting.PluginStates[plugin.InternalName] ?? PluginState.Unknown
    });
  }

  plugins.sort((a, b) => a.name.localeCompare(b.name));

  let exceptionEl = null;
  const exception = log.exception;
  if (exception) {
    const exceptionTime = new Date(exception!.When).toString();

    exceptionEl = (
      <div>
        <h2 className="text-xl">Exception</h2>
        <hr />
        <pre className="break-normal whitespace-pre-line bg-slate-600 text-slate-200 p-1 rounded">
          {exception.Info}
        </pre>
        <p>at {exceptionTime}</p>
      </div>
    );
  }

  const warnings = [];
  if (plugins.filter((x) => x.thirdParty).length > 0) {
    warnings.push(
      "You are using third party plugins. You will not receive support until you disable or uninstall them."
    );
  }

  if (troubleshooting.BetaKey != null) {
    warnings.push(
      "Dalamud testing is enabled. Please make sure that any potential bugs are not testing related."
    );
  }

  if (troubleshooting.DoPluginTest) {
    warnings.push(
      "Dalamud plugin testing is enabled. Please make sure that any potential bugs are not plugin testing related."
    );
  }

  if (troubleshooting.ForcedMinHook) {
    warnings.push("ForcedMinHook is enabled.");
  }

  return (
    <div>
      <div>
        <h2 className="text-xl">Info</h2>
        <hr />
        <ul className="list-disc list-inside">
          <li>Dalamud version: {troubleshooting.DalamudVersion}</li>
          <li>Dalamud git hash: {troubleshooting.DalamudGitHash}</li>
          <li>Game version: {troubleshooting.GameVersion}</li>
          <li>
            Interface loaded:{" "}
            {troubleshooting.InterfaceLoaded ? "true" : "false"}
          </li>
          <li>
            Has third party repos:{" "}
            {troubleshooting.HasThirdRepo ? "true" : "false"}
          </li>
          <li>Testing key: {troubleshooting.BetaKey ?? "null"}</li>
        </ul>
      </div>

      <br />

      {warnings.length > 0 && <Warnings problems={warnings} />}
      {exceptionEl != null && (
        <div>
          {exceptionEl}
          <br />
        </div>
      )}

      <div>
        <h2 className="text-xl">Official plugins</h2>
        <hr />
        <PluginList plugins={plugins.filter((x) => !x.thirdParty)} />
      </div>

      <br />

      <div>
        <h2 className="text-xl">Third party plugins</h2>
        <hr />
        <PluginList plugins={plugins.filter((x) => x.thirdParty)} />
      </div>
    </div>
  );
}
