// Usando setup (api composition) no hace falta exportar por default.
<script setup lang="ts">

// ref se usa para escuchar los cambios y renderizar, es para crear variables de estado.
import { onMounted, ref, watch } from 'vue';
import PagesHeader from './components/PagesHeader.vue';
import CountryListComponent from './components/CountryListComponent.vue';
import axiosClient from "./utils/axios"
import { ICountry } from './models/country.model';

const countries = ref<ICountry[]>([])

// La directiva v-model en el input va a hacer que se guarde la referencia de lo que se esté buscando en search.
const search = ref("")

const filtered = ref<ICountry[]>([])

// Paginación referencias.
const page = ref(1);
const itemsPerPage = ref(12);
const paginateCountries = ref<ICountry[]>([]);
const totalItems = ref(0)

const getCountries = async () => {

try{
  const {data} = await axiosClient.get("/all")
  countries.value = data
  totalItems.value = countries.value.length
  } catch(err){
      console.log(err)
    }
}

const filterCountries = () => {
  filtered.value = countries.value.filter((country) =>
  country.name.common
  .toLocaleLowerCase()
  .includes(search.value.toLocaleLowerCase())
  )
};

// Paginación función.
const sliceCountries = (currentCountries: ICountry[]) => {
  const start = (page.value - 1) * itemsPerPage.value;
  const end = page.value * itemsPerPage.value;

  paginateCountries.value = currentCountries.slice(start, end);
}

const changePage = (newPage: number) => {
  page.value = newPage
}

// onMounted es necesario para esperar a que se renderice el template antes de montar.
onMounted(() => {
  getCountries(),
  sliceCountries(countries.value)
  }
)

// Watch monitorea los cambios que haya y ejecuta el call back.
watch([countries, page, filtered], ()=> {
    sliceCountries(filtered.value.length <= 0
      && search.value === ""
      ? countries.value
      : filtered.value
    )
  }
)
</script>

<template>
  <PagesHeader />

  <div class="container max-w-screen-lg mx-auto px-6">
    <div class="mb-8">
      <input
        type="text"
        class="border border-gray-300 rounded w-full p-1 px-4"
        placeholder="Search by country name"
        v-model="search"
        @input="filterCountries" />
    </div>

    <div class="mb-8 flex justify-center space-x-6">
      <button
        :disabled="page <= 1"
        :class="{'opacity-50' : page <=1 }"
        @click="changePage(page - 1)"
        class="border border-gray-300 rounded px -2 px-0.5 hover:bg-gray-200">
        Previous
      </button>
      <button
        :disabled="page >= totalItems / itemsPerPage"
        :class="{'opacity-50' : page >= totalItems / itemsPerPage}"
        @click="changePage(page + 1)"
        class="border border-gray-300 rounded px -2 px-0.5 hover:bg-gray-200">
        Next
      </button>
    </div>
    <CountryListComponent :countries="paginateCountries" />
  </div>
</template>

<style scoped></style>
