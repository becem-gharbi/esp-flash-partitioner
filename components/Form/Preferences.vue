<template>
    <n-form ref="formRef" :model="model" @submit.prevent="$emit('submit', model)">

        <n-form-item label="Flash size" path="flashSize">
            <n-select v-model:value="model.flashSize" :options="flashSizeOptions" />
        </n-form-item>

        <n-form-item label="Non-volatile storage" path="nvsSize">
            <n-input-number v-model:value="model.nvsSize" :min="0" :max="64" :step="model.nvsSize === 0 ? 12 : 4"
                :validator="nvsValidator" class="w-full" />
        </n-form-item>

        <n-form-item label="SPIFFS filesystem" path="spiffsSize">
            <n-input-number v-model:value="model.spiffsSize" :min="0" :step="4" :validator="spiffsValidator"
                class="w-full" />
        </n-form-item>

        <div class="grid grid-cols-3">

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

        <n-button attr-type="submit" type="primary">
            Generate Partition Table
        </n-button>

    </n-form>
</template>


<script setup lang="ts">
import type { FormInst, SelectOption } from "naive-ui"

const formRef = ref<FormInst>()

const model = ref<Preferences>({
    coredumpEnable: false,
    encryptionEnable: false,
    flashSize: 4096,
    nvsSize: 24, // between 12 and 64
    spiffsSize: 1408,
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


defineEmits(["submit"])
</script>