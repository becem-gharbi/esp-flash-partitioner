<template>
    <ChartBase :options="options" :height="350"/>
</template>

<script setup lang="ts">
const props = defineProps<{ partitionTable: Partition[] }>()

const data = computed(() => props.partitionTable.map((partition) => ({
    name: partition.name,
    y: partition.size
})))

const options = computed<HighchartsOptions>(() => ({
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },

    title: {
        text: '',
    },

    tooltip: {
        valueSuffix: "K",
        style: {
            fontSize: 13
        }
    },

    accessibility: {
        point: {
            valueSuffix: "K"
        }
    },

    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            },
        },
    },

    series: [{
        name: 'Size',
        colorByPoint: true,
        data: data.value,
        dataLabels: {
            style: {
                fontSize: 13
            }
        },
    }]
}))

</script>