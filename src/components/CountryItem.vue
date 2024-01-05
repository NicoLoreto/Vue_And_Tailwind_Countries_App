<script setup lang="ts">

// defineProps para definir las props, se ejecuto al final del script.
import { defineProps } from 'vue';
import { ICountry } from '../models/country.model';

interface Props {
    country: ICountry
}

defineProps<Props>()
</script>

<template>
  <div class="h-56 sm:h-36">
    <img
      class="h-56 sm:h-36 w-full"
      :src="country.flags.png"
      :alt="country.flags.alt" />
  </div>
  <h4 class="text-xl font-bold text-gray-500">{{country.name.common}}</h4>
  <p class="text-sm text-gray-400">
    Capital:
    <span v-for="item, index in country.capital" class="font-bold" :key="index"
      >{{ item  }}
      <template>
        Este template es para generar un espacio entre capitales, si el pais
        tiene mas de una</template
      ></span
    >
  </p>
  <p class="text-sm text-gray-400">
    Population:
    <span class="font-bold">{{ country.population?.toLocaleString() }}</span>
  </p>
  <p class="text-sm text-gray-400">
    Region:
    <span class="font-bold">{{ country.region}}</span>
  </p>
</template>
