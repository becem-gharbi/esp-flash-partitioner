<template>
    <div class="m-5 grid md:grid-cols-2 gap-10">
        <!-- <ColorModeToggler /> -->

        <CardPreferences @submit="onPreferencesChange"></CardPreferences>

        <CardPartitions v-if="partitionTable" :partition-table="partitionTable" />
    </div>
</template>

<script setup lang="ts">
const partitionTable = ref<Partition[]>()

function onPreferencesChange(prefs: Preferences) {
    partitionTable.value = generatePartitionTable(prefs)
    console.table(partitionTable.value)
}
</script>

<style>
.page-center {
    min-height: 100vh;
    min-height: 100dvh;
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>