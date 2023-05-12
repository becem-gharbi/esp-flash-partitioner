<template>
    <n-card title="Flash Partition" size="small" segmented>
        <ChartPartitions :partition-table="partitionTable" />

        <template #footer>
            <n-button @click="downloadTable" type="primary">Download Partition Table</n-button>
        </template>
    </n-card>
</template>

<script setup lang="ts">

const props = defineProps<{ partitionTable: Partition[] }>()

function downloadTable() {
    const partitionTableCsv = props.partitionTable && partitionTableToCsv(props.partitionTable)

    if (partitionTableCsv) {
        saveFile(partitionTableCsv, "custom_partition.csv", "text/csv")
    }
}
</script>