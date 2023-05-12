<template>
    <div class="flex items-center gap-2">
        <n-tooltip trigger="hover" class="max-w-xs" placement="right">
            <template #trigger>
                <n-button text>
                    <NaiveIcon name="ph:question" />
                </n-button>
            </template>
            <slot name="help"></slot>
        </n-tooltip>
        <slot></slot>
    </div>
</template>