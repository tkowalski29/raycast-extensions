import { getPreferenceValues, environment } from "@raycast/api";

export interface ConfigurationPreferencesType {
  apiOpenAiKey: string;
  apiOllamaHost: string;
  apiLangSmithKey: string;
  apiLunaryKey: string;
  apiLangFusePublicKey: string;
  apiLangFuseSecretKey: string;
  apiEndpoint: string;
  apiBinnary: string;
  apiEndpointData: string;

  GetApiOpenAi(): { key: string };
  GetApiOllama(): { host: string };
  GetApiLangSmith(): { host: string; key: string; projectName: string };
  GetApiLunary(): { key: string };
  GetApiLangFuse(): { host: string; public: string; secret: string };
  GetApiEndpoint(): { host: string };
  GetApiBinnary(): { path: string };
  GetApiEndpointData(): { host: string };
}

export const ConfigurationTypeCommunicationLangChain = "lang-chain";
export const ConfigurationTypeCommunicationExternalApi = "external-api";
export const ConfigurationTypeCommunicationBinaryFile = "binary-file";
export const ConfigurationTypeCommunicationDefault: string = ConfigurationTypeCommunicationLangChain;

export const ConfigurationTypeCommunication: { key: string; title: string }[] = [
  {
    key: ConfigurationTypeCommunicationLangChain,
    title: "Local communication",
  },
  {
    key: ConfigurationTypeCommunicationExternalApi,
    title: "External endpoint api communication",
  },
  {
    key: ConfigurationTypeCommunicationBinaryFile,
    title: "Local binnary file communication",
  },
];

export const ConfigurationModelDefault = "openai__gpt-4o";

export const ConfigurationModelCollection: { key: string; title: string }[] = [
  {
    key: "openai__gpt-4o-2024-05-13",
    title: "GPT 4 o 2024-05-13",
  },
  {
    key: "openai__gpt-4o",
    title: "GPT 4 o",
  },
  {
    key: "openai__gpt-4-turbo-2024-04-09",
    title: "GPT 4 Turbo 2024-04-09",
  },
  {
    key: "openai__gpt-4-turbo",
    title: "GPT 4 Turbo",
  },
  {
    key: "openai__gpt-4-turbo-preview",
    title: "GPT 4 Turbo Preview",
  },
  {
    key: "openai__gpt-4-1106-preview",
    title: "GPT 4 1106 Preview",
  },
  {
    key: "openai__gpt-4",
    title: "GPT 4",
  },
  {
    key: "openai__gpt-4-0613",
    title: "GPT 4 0613",
  },
  {
    key: "openai__gpt-3.5-turbo-0125",
    title: "GPT 3.5 Turbo 0125",
  },
  {
    key: "openai__gpt-3.5-turbo-1106",
    title: "GPT 3.5 Turbo 1106",
  },
  {
    key: "openai__gpt-3.5-turbo-0613",
    title: "GPT 3.5 Turbo 0613",
  },
  {
    key: "openai__gpt-3.5-turbo",
    title: "GPT 3.5 Turbo",
  },
  {
    key: "ollama__llama2",
    title: "Ollama 2",
  },
  {
    key: "ollama__llama3",
    title: "Ollama 3",
  },
];

export function ClearImportModel(str: string): string {
  const s = str;

  s.replace(/openai-/g, "openai__");

  return s;
}

export function ClearImportModelTemperature(str: string, base: string): string {
  if (str === "low") {
    return "0.2";
  } else if (str === "medium") {
    return "0.7";
  } else if (str === "maximum") {
    return "1.0";
  }

  return base;
}

export function ChangePromptSystem(str: string) {
  const currentDateTime = new Date();
  const year = currentDateTime.getFullYear();
  const month = String(currentDateTime.getMonth() + 1).padStart(2, "0");
  const day = String(currentDateTime.getDate()).padStart(2, "0");
  const hours = String(currentDateTime.getHours()).padStart(2, "0");
  const minutes = String(currentDateTime.getMinutes()).padStart(2, "0");
  const seconds = String(currentDateTime.getSeconds()).padStart(2, "0");
  const s = str;

  return s.replace(/{{-CURRENT_DATETIME-}}/g, `${year}/${month}/${day}, ${hours}:${minutes}:${seconds}`);

  return s;
}

export function ClearPromptSystem(str: string) {
  const s = str;

  // s.replace(/"/g, "\'");
  // s = s.replace(/'/g, "\'");
  // s = s.replace(/{/g, '<');
  // s = s.replace(/}/g, '>');

  return s;
}

function getConfig(): ConfigurationPreferencesType {
  return getPreferenceValues<ConfigurationPreferencesType>();
}

export function GetApiOpenAi(): { key: string } {
  return {
    key: getConfig().apiOpenAiKey,
  };
}

export function GetApiOllama(): { host: string } {
  return {
    host: getConfig().apiOllamaHost,
  };
}

export function GetApiLangSmith(): { host: string; key: string; projectName: string } {
  return {
    host: "https://api.smith.langchain.com",
    key: getConfig().apiLangSmithKey,
    projectName: "raycast_jose",
  };
}

export function GetApiLunary(): { key: string } {
  return {
    key: getConfig().apiLunaryKey,
  };
}

export function GetApiLangFuse(): { host: string; public: string; secret: string } {
  return {
    host: "https://cloud.langfuse.com",
    public: getConfig().apiLangFusePublicKey,
    secret: getConfig().apiLangFuseSecretKey,
  };
}

export function GetApiEndpoint(): { host: string } {
  return {
    host: getConfig().apiEndpoint,
  };
}

export function GetApiBinnary(): { path: string } {
  return {
    path: getConfig().apiBinnary,
  };
}

export function GetApiEndpointData(): { host: string } {
  return {
    host: getConfig().apiEndpointData,
  };
}

export function GetUserName(): string {
  // eslint-disable-next-line
  const match = environment.assetsPath.match(/\/Users\/([^\/]+)/);
  return match ? match[1] : "unknown";
}

export function GetDevice(): string {
  return "raycast";
}
