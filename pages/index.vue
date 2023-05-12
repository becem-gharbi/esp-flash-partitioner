<template>
    <div class="m-5 grid grid-cols-4 gap-5">

        <div class="col-span-3">
            <h1 class="text-2xl mb-0 font-semibold">ESP32 Flash Partitioner</h1>
            <n-text :depth="3" class="text-base">A utility to easily generate ESP32 partition table</n-text>
            <NuxtLink to="https://github.com/becem-gharbi/esp-flash-partitioner" target="_blank"
                class="block mt-4 text-base">
                How it works ?
            </NuxtLink>
        </div>

        <NaiveColorModeSwitch class="w-fit justify-self-end" :text="false" secondary />

        <CardPreferences class="col-span-full md:col-span-2" @submit="onPreferencesChange"></CardPreferences>

        <CardPartitions class="col-span-full md:col-span-2" v-if="partitionTable" :partition-table="partitionTable" />
    </div>
</template>

<script setup lang="ts">
const partitionTable = ref<Partition[]>()

function onPreferencesChange(prefs: Preferences) {
    partitionTable.value = generatePartitionTable(prefs)
    console.table(partitionTable.value)
}
</script>