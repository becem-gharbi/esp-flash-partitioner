const OTA_DATA: Partition = {
  name: "otadata",
  type: "data",
  subType: "ota",
  offset: 36,
  size: 8,
  flags: "",
};

export function generatePartitionTable(prefs: Preferences) {
  let partitionTable: Partition[] = [];

  partitionTable.push(OTA_DATA);

  if (prefs.coredumpEnable) {
    const previousPartition: Partition =
      partitionTable[partitionTable.length - 1];

    const coredump: Partition = {
      name: "coredump",
      type: "data",
      subType: "coredump",
      offset: previousPartition.size + previousPartition.offset,
      size: 64,
      flags: "",
    };

    partitionTable.push(coredump);
  }

  if (prefs.encryptionEnable) {
    const previousPartition: Partition =
      partitionTable[partitionTable.length - 1];

    const nvsKey: Partition = {
      name: "nvs_key",
      type: "data",
      subType: "nvs_keys",
      offset: previousPartition.size + previousPartition.offset,
      size: 4,
      flags: "",
    };

    partitionTable.push(nvsKey);
  }

  if (prefs.nvsSize > 0) {
    const previousPartition: Partition =
      partitionTable[partitionTable.length - 1];

    const nvs: Partition = {
      name: "nvs",
      type: "data",
      subType: "nvs",
      offset: previousPartition.size + previousPartition.offset,
      size: prefs.nvsSize,
      flags: "",
    };

    partitionTable.push(nvs);
  }

  if (prefs.spiffsSize > 0) {
    const previousPartition: Partition =
      partitionTable[partitionTable.length - 1];

    const spiffs: Partition = {
      name: "spiffs",
      type: "data",
      subType: "spiffs",
      offset: previousPartition.size + previousPartition.offset,
      size: prefs.spiffsSize,
      flags: "",
    };

    partitionTable.push(spiffs);
  }

  const previousPartition: Partition =
    partitionTable[partitionTable.length - 1];

  const remainingFlashSize =
    prefs.flashSize - (previousPartition.size + previousPartition.offset);

  const app0: Partition = {
    name: "app0",
    type: "app",
    subType: "ota_0",
    flags: "",
    offset: previousPartition.size + previousPartition.offset, // Check if offset multiple of 64
    size: prefs.otaEnable ? remainingFlashSize / 2 : remainingFlashSize,
  };

  partitionTable.push(app0);

  if (prefs.otaEnable) {
    const app1: Partition = {
      name: "app1",
      type: "app",
      subType: "ota_1",
      flags: "",
      offset: app0.size + app0.offset, // Check if offset multiple of 64
      size: app0.size,
    };

    partitionTable.push(app1);
  }

  return partitionTable;
}
