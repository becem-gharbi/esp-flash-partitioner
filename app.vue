<template>
  <NaiveConfig :theme-config="themeConfig" >
    <NuxtPage />
  </NaiveConfig>
</template>

<script setup lang="ts">
import type { ThemeConfig } from "@bg-dev/nuxt-naiveui"
import { theme } from "#tailwind-config";

const themeConfig = ref<ThemeConfig>({
  shared: {
    common: {
      fontFamily: 'Source Sans Pro',
      lineHeight: theme.lineHeight.normal,
      borderRadius: "6px"
    },
  },

  light: {
    common: {
      primaryColor: theme.colors.blue[600],
      primaryColorHover: theme.colors.blue[500],
      primaryColorPressed: theme.colors.blue[700],
      borderColor: theme.colors.gray[300],
    },
    Card: {
      borderColor: theme.colors.gray[300]
    }
  },

  dark: {
    common: {
      primaryColor: theme.colors.blue[500],
      primaryColorHover: theme.colors.blue[400],
      primaryColorPressed: theme.colors.blue[600],
      borderColor: theme.colors.gray[800],
    },
    Card: {
      borderColor: theme.colors.gray[800]
    },
  },
})
</script>
