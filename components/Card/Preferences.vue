<template>
    <n-card size="small" segmented>
        <template #header>
            <div class="flex items-center gap-2">
                <NaiveIcon name="ph:gear" />
                Preferences
            </div>
        </template>

        <n-form ref="formRef" :model="model">

            <n-form-item label="Flash size" path="flashSize">
                <template #label>
                    <TooltipFormItem>
                        Flash size
                        <template #help>
                            The flash size for target ESP32
                        </template>
                    </TooltipFormItem>
                </template>

                <n-select v-model:value="model.flashSize" :options="flashSizeOptions" />
            </n-form-item>

            <n-form-item path="nvsSize">
                <template #label>
                    <TooltipFormItem>
                        Non-volatile storage
                        <template #help>
                            NVS can be used to store per-device PHY calibration data, WiFi data, SSL certificates and other
                            application data. It supports encryption.
                        </template>
                    </TooltipFormItem>
                </template>

                <n-input-number v-model:value="model.nvsSize" :min="0" :max="64"
                    :step="[12, 0].includes(model.nvsSize) ? 12 : 4" :validator="nvsValidator" class="w-full" />
            </n-form-item>

            <n-form-item path="spiffsSize">
                <template #label>
                    <TooltipFormItem>
                        SPIFFS used
                        <template #help>
                            SPI flash filesystem can be used to store large files. It reliably utilizes only around 75% of
                            the assigned partition space -> SPIFFS used = SPIFFS size * 75%. It do not support encryption.
                        </template>
                    </TooltipFormItem>
                </template>

                <n-input-number v-model:value="model.spiffsSize" :min="0" :step="4" :validator="spiffsValidator"
                    class="w-full" />
            </n-form-item>

            <div class="grid grid-cols-2">

                <n-form-item path="otaEnable">
                    <template #label>
                        <TooltipFormItem>
                            Over The Air updates
                            <template #help>
                                Allows remote firmware updates
                            </template>
                        </TooltipFormItem>
                    </template>

                    <n-checkbox v-model:checked="model.otaEnable" label="Enable" />
                </n-form-item>

                <n-form-item path="coredumpEnable">
                    <template #label>
                        <TooltipFormItem>
                            Coredump
                            <template #help>
                                Allows to store core dump on flash. Which used to analyze critical errors like crash and
                                panic
                            </template>
                        </TooltipFormItem>
                    </template>

                    <n-checkbox v-model:checked="model.coredumpEnable" label="Enable" />
                </n-form-item>

                <n-form-item path="encryptionEnable">
                    <template #label>
                        <TooltipFormItem>
                            Encryption
                            <template #help>
                                Allows to store NVS encryption keys when NVS encryption is enabled
                            </template>
                        </TooltipFormItem>
                    </template>

                    <n-checkbox v-model:checked="model.encryptionEnable" label="Enable" />
                </n-form-item>
            </div>
        </n-form>

        <template #footer>
            <n-button @click="onSubmit" type="primary">
                <template #icon>
                    <NaiveIcon name="ph:calculator"></NaiveIcon>
                </template>

                Generate Partition Table</n-button>
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