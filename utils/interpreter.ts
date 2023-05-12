import Papa from "papaparse";

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

  const app0: Partition = {
    name: "app0",
    type: "app",
    subType: "ota_0",
    flags: "",
    offset: getApp0Offset(previousPartition),
    size: getApp0Size(previousPartition, prefs),
  };

  partitionTable.push(app0);

  if (prefs.otaEnable) {
    const app1: Partition = {
      name: "app1",
      type: "app",
      subType: "ota_1",
      flags: "",
      offset: app0.size + app0.offset,
      size: app0.size,
    };

    partitionTable.push(app1);
  }

  return partitionTable;
}

function getApp0Offset(previousPartition: Partition) {
  const offset = previousPartition.size + previousPartition.offset;
  const remainder = offset % 64;
  return offset - remainder + (remainder === 0 ? 0 : 64);
}

function getApp0Size(previousPartition: Partition, prefs: Preferences) {
  const app0Offset = getApp0Offset(previousPartition);

  const remainingFlashSize = prefs.flashSize - app0Offset;

  const usableFlashSize = remainingFlashSize - (remainingFlashSize % 64);

  if (prefs.otaEnable) {
    const usableFlashSizeHalf = usableFlashSize / 2;
    return usableFlashSizeHalf - (usableFlashSizeHalf % 64);
  } else {
    return usableFlashSize;
  }
}

export function partitionTableToCsv(partitionTable: Partition[]) {
  const formattedTable = partitionTable.map((partition) => ({
    name: partition.name,
    type: partition.type,
    subType: partition.subType,
    offset: partition.offset + "K",
    size: partition.size + "K",
    flags: partition.flags,
  }));

  return Papa.unparse(formattedTable, {
    header: false,
  });
}
