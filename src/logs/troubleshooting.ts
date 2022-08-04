export interface PluginInfo {
  Author: string | null;
  Name: string;
  InternalName: string;
  Punchline: string | null;
  Description: string | string;
  Changelog: string | null;
  Tags: string[] | null;
  CategoryTags: string[] | null;
  RepoUrl: string | null;
  ImageUrls: string[] | null;
  IconUrl: string | null;

  // null bcuz ???
  InstalledFromUrl: string | null;
  IsThirdParty: boolean;
  IsTestingExclusive: boolean;
  // null when devplugins
  DownloadLinkInstall: string | null;
  DownloadLinkUpdate: string | null;
  DownloadLinkTesting: string | null;

  Disabled: boolean;
  Testing: boolean;
  ScheduledForDeletion: boolean;
  IsHide: boolean;

  ApplicableVersion: string;
  DalamudApiLevel: number;
  DownloadCount: number;
  LastUpdate: number;

  AssemblyVersion: string;
  TestingAssemblyVersion: string | null;
  EffectiveVersion: string;

  LoadRequiredState: number;
  LoadSync: boolean;
  LoadPriority: number;
  CanUnloadAsync: boolean;

  AcceptsFeedback: boolean;
  FeedbackMessage: string | null;
}

export interface DalamudTroubleshooting {
  LoadedPlugins: PluginInfo[];

  DalamudVersion: string;
  DalamudGitHash: string;
  GameVersion: string;
  Language: string;

  DoDalamudTest: boolean;
  BetaKey: string | null;
  InterfaceLoaded: boolean;
  ForcedMinHook: boolean;

  ThirdRepo: string[];
  HasThirdRepo: boolean;
}

export interface ExceptionTroubleshooting {
  When: string;
  Info: string;
  Context: string | null;
}

export enum IndexIntegrity {
  Failed = 0,
  Exception = 1,
  NoGame = 2,
  ReferenceNotFound = 3,
  ReferenceFetchFailure = 4,
  Success = 5
}

export enum Platform {
  Windows = 0,
  WindowsOnLinux = 1,
  Linux = 2
}

export enum DalamudLoadMethod {
  Entrypoint,
  DLLInject,
  ACLOnly
}

export interface XLTroubleshooting {
  When: string;
  IsDx11: boolean;
  IsAutoLogin: boolean;
  IsUidCache: boolean;

  DalamudEnabled: boolean;

  DalamudLoadMethod: DalamudLoadMethod;
  DalamudInjectionDelay: number;

  SteamIntegration: boolean;
  EncryptArguments: boolean;

  LauncherVersion: string;
  LauncherHash: string;
  Official: boolean;

  DpiAwareness: number;
  Platform: Platform;

  ObservedGameVersion: string;
  ObservedEx1Version: string;
  ObservedEx2Version: string;
  ObservedEx3Version: string;
  ObservedEx4Version: string;
  BckMatch: boolean;
  IndexIntegrity: IndexIntegrity;
}
