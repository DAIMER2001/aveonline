<script setup>
import { reactive, toRefs, computed, defineAsyncComponent } from "vue";
import Ecommerce from "../components/Ecommerce.vue";
import Toast from "../components/Toast.vue";
import NavbarLayout from "../components/NavbarLayout.vue";
import flowbite from 'flowbite';

// const Navbar = defineAsyncComponent(() =>
//   import("../components/Navbar.vue")
// )
// const Datatable = defineAsyncComponent(() =>
//   import("../components/Datatable.vue")
// )
const state = reactive({
  pokemons: [],
  name: "",
  filterPokemon: computed(() => searchPokemon()),
  countShopList: 0,
  isShopList: false,
  shopList: []
});

defineEmits(['deleteMedicine'])

function searchPokemon() {
  return state.pokemons.filter((pokemon) =>
    pokemon.name.includes(state.name.toLowerCase())
  );
}

function countShop(shopList) {
  state.countShopList = shopList.length
  state.shopList = shopList
}

function viewShopList() {
  console.log(' IS SHOP LIST', state.countShopList)
  if (state.countShopList) {
    state.isShopList = !state.isShopList

  }
}

function deleteMedicine(medicine) {
  state.shopList = state.shopList.filter((medicineS) => medicineS.id !== medicine.id)
  emit('deleteMedicine', medicine)
}

const { countShopList, isShopList, shopList } = toRefs(state);

// fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//     data.results.forEach((element, index) => {
//       const pokemon = {
//         ...element,
//         index: index + 1,
//       };
//       state.pokemons.push(pokemon);
//     });
//   });
</script>
<template>
  <div>
    <NavbarLayout userType="client" :countShopList="countShopList"
      @isShopList="isShopList = countShopList ? !isShopList : false"></NavbarLayout>
    <Toast></Toast>
    <Ecommerce @countShopList="countShop" :isShopList="isShopList"></Ecommerce>

  </div>
  <router-view></router-view>
  <!-- <datatable></datatable> -->
  <!-- 
  <div>
    <div class="grid grid-cols-6 gap-1">
      <div class="col-span-1">
        <input
          v-model="name"
          type="text"
          class="mb-3 p-2 border-black-500 border-2 w-100"
          placeholder="Nombre pokemon"
        />
        <ul class="overflow-y-auto max-h-96">
          <li
            v-for="pokemon in filterPokemon"
            :key="pokemon.index"
            class="p-3 rounded hover:text-red-400 hover:bg-red-100"
          >
            <span class="text-sm font-normal text-gray-500 mr-3">
              {{ pokemon.index }}</span
            >
          </li>
        </ul>
      </div>
      <div class="col-span-5">
      </div>
    </div>
  </div> -->
</template>
