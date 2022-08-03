import JSZip from "jszip";
import {
  DalamudTroubleshooting,
  ExceptionTroubleshooting,
  XLTroubleshooting
} from "./troubleshooting";
import { Buffer } from "buffer";

export interface Log {
  xlLog: LogFile<XLTroubleshooting> | null;
  dalamudLog: LogFile<DalamudTroubleshooting> | null;
}

interface LogFile<T> {
  data: string;
  troubleshooting: T | null;
  exception: ExceptionTroubleshooting | null;
}

const dalamudRegex = /TROUBLESHOOTING:(.*)/gu;
const xlRegex = /TROUBLESHXLTING:(.*)/gu;
const exceptionRegex = /LASTEXCEPTION:(.*)/gu;

function getLog<T>(log: string, regex: RegExp): T | null {
  const match = [...log.matchAll(regex)];

  if (match !== null && match.length > 0) {
    const lastEntry = match[match.length - 1];
    const buffer = Buffer.from(lastEntry[1], "base64");
    const data: T = JSON.parse(buffer.toString("utf8"));
    return data;
  }

  return null;
}

async function getLogFile<T>(
  zip: JSZip,
  path: string,
  regex: RegExp
): Promise<LogFile<T> | null> {
  const file = zip.file(path);
  if (!file) return null;

  const log = await file.async("string");
  return {
    data: log,
    troubleshooting: getLog<T>(log, regex),
    exception: getLog<ExceptionTroubleshooting>(log, exceptionRegex)
  };
}

export async function parseLog(data: ArrayBuffer): Promise<Log> {
  const zip = new JSZip();
  await zip.loadAsync(data);

  return {
    xlLog: await getLogFile<XLTroubleshooting>(zip, "output.log", xlRegex),
    dalamudLog: await getLogFile<DalamudTroubleshooting>(
      zip,
      "dalamud.log",
      dalamudRegex
    )
  };
}
