import type { Options } from "highcharts";

declare global {
  type HighchartsOptions = Options;

  interface Partition {
    type: "app" | "data";
    size: number;
    offset: number;
    flags: "" | "encrypted";
    name:
      | "nvs"
      | "otadata"
      | "app0"
      | "app1"
      | "coredump"
      | "spiffs"
      | "nvs_key";

    subType:
      | "nvs"
      | "ota"
      | "ota_0"
      | "ota_1"
      | "coredump"
      | "spiffs"
      | "nvs_keys";
  }

  interface Preferences {
    flashSize: 2048 | 4096 | 8192 | 16384 | 32768;
    encryptionEnable: boolean;
    coredumpEnable: boolean;
    otaEnable: boolean;
    nvsSize: number;
    spiffsSize: number;
  }
}

export {};
