import { LogFile } from "../logs/parseLog";
import {
  DalamudLoadMethod,
  IndexIntegrity,
  XLTroubleshooting
} from "../logs/troubleshooting";
import { Warnings } from "./Warnings";
import { RawLog } from "./RawLog";
import { Platform } from "../logs/troubleshooting";

interface XLLogViewerProps {
  log: LogFile<XLTroubleshooting>;
}

export function XLLogViewer(props: XLLogViewerProps) {
  const log = props.log;
  const troubleshooting = log.troubleshooting;
  if (troubleshooting == null) {
    return <RawLog log={log.data} />;
  }

  let exceptionEl = null;
  const exception = log.exception;
  if (exception) {
    const exceptionTime = new Date(exception!.When).toString();

    exceptionEl = (
      <div>
        <h2 className="text-xl">Exception</h2>
        <hr />
        <pre className="break-normal whitespace-normal bg-slate-600 text-slate-200 p-1 rounded">
          {exception.Info}
        </pre>
        <p>at {exceptionTime}</p>
      </div>
    );
  }

  const warnings: string[] = [];

  if (!troubleshooting.Official) {
    warnings.push(
      "You are using an unofficial build of XIVLauncher. You will not receive any support and it is highly encouraged to use an official release."
    );
  }

  if (troubleshooting.IndexIntegrity != IndexIntegrity.Success) {
    warnings.push(
      "Index integrity did not succeed. Your game client may be corrupted - right click Login and select Repair game in XIVLauncher."
    );
  }

  if (troubleshooting.IsUidCache) {
    warnings.push(
      "You have the UID cache enabled - you almost certainly do not want to enable this."
    );
  }

  return (
    <div>
      <div>
        <h2 className="text-xl">Info</h2>
        <hr />
        <ul className="list-disc list-inside">
          <li>XIVLauncher version: {troubleshooting.LauncherVersion}</li>
          <li>XIVLauncher git hash: {troubleshooting.LauncherHash}</li>
          <li>
            Official XIVLauncher release:{" "}
            {troubleshooting.Official ? "true" : "false"}
          </li>
          <li>Platform: {Platform[troubleshooting.Platform]}</li>
          {troubleshooting.When && (
            <li>Timestamp: {new Date(troubleshooting.When).toString()}</li>
          )}

          <br />

          <li>Autologin: {troubleshooting.IsAutoLogin ? "true" : "false"}</li>
          <li>DirectX: {troubleshooting.IsDx11 ? "DX11" : "DX9"}</li>
          <li>DPI aware: {troubleshooting.DpiAwareness ? "true" : "false"}</li>
          <li>
            Encrypted arguments:{" "}
            {troubleshooting.EncryptArguments ? "true" : "false"}
          </li>
          <li>UID cache: {troubleshooting.IsUidCache ? "true" : "false"}</li>
          <li>
            Dalamud enabled: {troubleshooting.DalamudEnabled ? "true" : "false"}
          </li>

          {troubleshooting.DalamudEnabled && (
            <div>
              <li>
                Injection method:{" "}
                {DalamudLoadMethod[troubleshooting.DalamudLoadMethod]}
              </li>
              <li>
                Injection delay: {troubleshooting.DalamudInjectionDelay}ms
              </li>
            </div>
          )}

          <br />

          <li>A Realm Reborn: {troubleshooting.ObservedGameVersion}</li>
          <li>Heavensward: {troubleshooting.ObservedEx1Version}</li>
          <li>Stormblood: {troubleshooting.ObservedEx2Version}</li>
          <li>Shadowbringers: {troubleshooting.ObservedEx3Version}</li>
          <li>Endwalker: {troubleshooting.ObservedEx4Version}</li>
          <li>
            Index integrity: {IndexIntegrity[troubleshooting.IndexIntegrity]}
          </li>
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
    </div>
  );
}
