<script setup lang="ts">
// Setup se usa si no exporto como default, usando setup (api composition) no haria falta

import { onMounted, ref } from 'vue';
// onMounted es necesario para esperar a que se renderice el template antes de montar.
// ref se usa para escuchar los cambios y renderizar, es para crear variables de estado.
import PagesHeader from './components/PagesHeader.vue';
import CountryListComponent from './components/CountryListComponent.vue';
import axiosClient from "./utils/axios"
import { ICountry } from './models/country.model';

const countries = ref<ICountry[]>([])
const getCountries = async () => {
try{
  const {data} = await axiosClient.get("/all")
 countries.value = data
}catch(err){
  console.log(err)
}

}
onMounted(() => getCountries())
</script>

<template>
  <PagesHeader />

  <div class="container max-w-screen-lg mx-auto px-6">
    <CountryListComponent :countries="countries" />
  </div>
</template>

<style scoped></style>
