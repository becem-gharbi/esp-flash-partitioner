<template>
    <div class="m-3 md:w-1/2">
        <ColorModeToggler />
        <n-card size="small" title="Preferences" segmented>
            <FormPreferences @submit="onPreferencesChange" />
        </n-card>
    </div>
</template>

<script setup lang="ts">

function onPreferencesChange(prefs: Preferences) {
    const partitionTable = generatePartitionTable(prefs)

    console.table(partitionTable)
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