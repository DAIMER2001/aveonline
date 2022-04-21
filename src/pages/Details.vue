<script setup>
import { reactive, toRefs, computed, defineComponent, onMounted, watch } from 'vue'
const state = reactive({
  pokemon: null,
  stats: computed(() => filterStats()),
  types: computed(() => filterTypes())
})

function filterStats() {
  if (state.pokemon) {
    return state.pokemon.stats.map((stat) => stat.base_stat)
  }
}

function filterTypes() {
  if (state.pokemon) {
    return state.pokemon.types.map((type) => type.type.name)
  }
}

const { pokemon, stats, types } = toRefs(state)
const route = useRoute()
console.log(route.params.id)
const getData = async () => {

  fetch(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      state.pokemon = data
    })
}

onMounted(() => {
  getData()
})

watch(route, () => {
  getData()
})
</script>

<template>
  <div>
    <div v-if="pokemon">
      <div class="w-4/6 mx-auto rounded-xl p-10 shadow-lg">
        <h1 class="font-black md:text-3xl text-xl text-red-900">{{ pokemon.name }}</h1>
        <span v-for="type in types" :key="type"
          class="py-1 px-2 shadow-md rounded-full bg-red-500 text-white font-semibold mr-2 mt-3">{{
            type
          }}</span>
        <div class="flex flex-wrap">
          <div class="flex-1 grid place-items-center">
            <img class="w-48 h-48" :src="pokemon.sprites.front_default" :alt="`image de ${pokemon.name}`" />
          </div>
          <div class="flex-1">
            asd
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No hay datos del pokemon</p>
    </div>
    <router-link to="/">Home</router-link>
  </div>
</template>
