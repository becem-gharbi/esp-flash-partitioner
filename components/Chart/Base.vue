<template>
    <div :style="{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: naiveTheme.common?.borderRadius,
        overflow: 'hidden'
    }">
        <ClientOnly>
            <Chart :options="highchartsOptions"></Chart>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { Chart } from 'highcharts-vue'
import { defu } from 'defu'

const props = defineProps<{
    options: HighchartsOptions,
    height?: number,
    width?: number
}>()

const naiveTheme = useNaiveTheme()

const highchartsOptions = computed<HighchartsOptions>(() => defu(
    props.options,
    {
        chart: {
            height: props.height,
            width: props.width,
            backgroundColor: naiveTheme.value.common?.bodyColor,
            plotBackgroundColor: naiveTheme.value.common?.bodyColor,
            style: {
                fontFamily: naiveTheme.value.common?.fontFamily,
            },
        },

        accessibility: {
            enabled: false
        },

        title: {
            style: {
                color: naiveTheme.value?.common?.textColor1
            }
        },

        xAxis: {
            lineColor: "#EDEDED82",
            title: {
                style: {
                    color: naiveTheme.value?.common?.textColor2,
                }
            },
            labels: {
                style: {
                    color: naiveTheme.value?.common?.textColor2,
                }
            },
        },

        yAxis: {
            gridLineColor: "#DBDBDB51",
            title: {
                style: {
                    color: naiveTheme.value?.common?.textColor2,
                }
            },
            labels: {
                style: {
                    color: naiveTheme.value?.common?.textColor2,
                }
            },
        },

        legend: {
            itemStyle: {
                color: naiveTheme.value?.common?.textColor2
            }
        },

        credits: {
            enabled: false,
        }
    } as HighchartsOptions
))

</script>
