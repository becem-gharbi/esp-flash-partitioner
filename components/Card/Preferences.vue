<template>
    <n-card size="small" title="Preferences" segmented>
        <n-form ref="formRef" :model="model">

            <n-form-item label="Flash size" path="flashSize">
                <n-select v-model:value="model.flashSize" :options="flashSizeOptions" />
            </n-form-item>

            <n-form-item label="Non-volatile storage" path="nvsSize">
                <n-input-number v-model:value="model.nvsSize" :min="0" :max="64"
                    :step="[12, 0].includes(model.nvsSize) ? 12 : 4" :validator="nvsValidator" class="w-full" />
            </n-form-item>

            <n-form-item label="Usable SPIFFS" path="spiffsSize">
                <n-input-number v-model:value="model.spiffsSize" :min="0" :step="4" :validator="spiffsValidator"
                    class="w-full" />
            </n-form-item>

            <div class="grid grid-cols-2">

                <n-form-item label="Over The Air updates" path="otaEnable">
                    <n-checkbox v-model:checked="model.otaEnable" label="Enable" />
                </n-form-item>

                <n-form-item label="Coredump" path="coredumpEnable">
                    <n-checkbox v-model:checked="model.coredumpEnable" label="Enable" />
                </n-form-item>

                <n-form-item label="Encryption" path="encryptionEnable">
                    <n-checkbox v-model:checked="model.encryptionEnable" label="Enable" />
                </n-form-item>

            </div>
        </n-form>

        <template #footer>
            <n-button @click="onSubmit" type="primary">Generate Partition Table</n-button>
        </template>
    </n-card>
</template>

<script setup lang="ts">
import type { FormInst, SelectOption } from "naive-ui"

const formRef = ref<FormInst>()

const model = ref<Preferences>({
    coredumpEnable: false,
    encryptionEnable: false,
    flashSize: 4096,
    nvsSize: 24,
    spiffsSize: 1056,
    otaEnable: false
})

const flashSizeOptions: SelectOption[] = [
    { label: "2M", value: 2048 },
    { label: "4M", value: 4096 },
    { label: "8M", value: 8192 },
    { label: "16M", value: 16384 },
    { label: "32M", value: 32768 },
]

function nvsValidator(size: number) {
    return size === 0 || size % 4 === 0 && size >= 12
}

function spiffsValidator(size: number) {
    return size % 4 === 0
}

const emits = defineEmits(["submit"])

function onSubmit() {
    const preferences: Preferences = { ...model.value }

    preferences.spiffsSize = Math.ceil(preferences.spiffsSize * 100 / 75)

    preferences.spiffsSize += preferences.spiffsSize % 4 === 0 ? 0 : 4

    emits('submit', preferences)
}
</script>