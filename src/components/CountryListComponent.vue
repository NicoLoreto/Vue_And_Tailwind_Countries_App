<script setup lang="ts">

import { defineProps } from 'vue';
import { ICountry } from '../models/country.model';

interface IProps{
    countries: ICountry[]
}

defineProps<IProps>()
// defineProps define lo que recibirá el componente.
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap3">
    <div
      v-for="(country, index) in countries"
      :key="index"
      class="border border-gray-300 rounded p-3">
      {{country.name.common}}
    </div>
  </div>
</template>
