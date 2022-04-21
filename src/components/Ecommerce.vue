

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex';
import Toast from './Toast.vue';
import flowbite from 'flowbite';
import ShopList from './ShopList.vue';

export default {
  name: 'Ecommerce',
  emits: ['countShopList'],
  components: { Toast, ShopList },
  props: {
    isShopList: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
    const store = useStore()


    const isShopListsE = ref(props.isShopList)
    const medicinesCart = computed(() => store.state.infoModules.itemsMedicine)
    const medicines = ref([])
    const shoppingListCart = ref([])
    const keyMedicine = ref(0)
    const isOpenToast = ref(false)
    const messageToast = ref('')
    const typeMessageToast = ref('check')

    function addMedicineShoppingList(medicine) {
      isOpenToast.value = false;
      let isShopMedicine
      if (shoppingListCart.value.length) {
        isShopMedicine = shoppingListCart.value.find((medicineShop) => medicineShop.id === medicine.id)
      }

      if (isShopMedicine) {
        messageToast.value = "Medicine removed from shopping list"
        typeMessageToast.value = 'delete'
        medicine.isShop = false
        shoppingListCart.value = shoppingListCart.value.filter((medicineShop) => medicineShop.id != medicine.id)

      } else {
        messageToast.value = "Medicine add from shopping list"
        typeMessageToast.value = 'check'
        medicine.isShop = true
        shoppingListCart.value.push(medicine)
      }
      emit('countShopList', shoppingListCart.value)

      watch(props, () => {
        console.log(' IS PROPSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS')
        // getItems()
        isShopListsE.value = shoppingListCart.value.length == 0 ? false : props.isShopList
      })
      isOpenToast.value = true;
      setTimeout(() => {
        isOpenToast.value = false;
      }, 2000);
      keyMedicine.value++

    }
    // store.dispatch('infoModules/getItemsMedicine')

    // function getData() {
    //   console.log(' GET DATA')
    //   fetch('http://localhost:8082/v1/medicine').then((res) => res.json()).then((res) => {
    //     console.log(' GET DATA', res)
    //     medicines.value = res.data
    //   })
    // }

    console.log('RRROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO')

    store.dispatch('infoModules/getItemsMedicine')
    const getItems = () => {
      console.log(' ERROR', medicinesCart.value)
      console.log(medicinesCart)
      // medicine.value = [...medicinesCart.value]
    }
    function deleteItem(item) {
      console.log('================================', item)
      shoppingListCart.value = shoppingListCart.value.filter((itemS) => itemS.id != item.id)
      medicines.value.find((med) => med.id === item.id).isShop = false
      console.log('================================', shoppingListCart.value.length)
      if (shoppingListCart.value.length === 0) isShopListsE.value = false
      emit('countShopList', shoppingListCart.value)
    }
    watch(medicinesCart, () => {
      console.log('????????????????????????????????????????')
      console.log(medicinesCart)
      medicines.value = JSON.parse(JSON.stringify(medicinesCart.value))
    })

    return {
      medicines,
      medicinesCart,
      keyMedicine,
      isOpenToast,
      shoppingListCart,
      messageToast,
      typeMessageToast,
      addMedicineShoppingList,
      getItems,
      deleteItem,
      isShopListsE
    }

  },
  mounted() {
    console.log(' ERROR', this.medicinesCart)
    // this.medicine = [...this.medicinesCart]
    this.getItems()
  }
}


</script>

<template>
  <div class="   min-h-screen bg-gray-100 flex flex-col justify-center">
    <div v-show="!isShopListsE" class="relative md:w-3/4 m-3 flex flex-wrap mx-auto justify-center">

      <!-- <div class="relative max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
      <div class="overflow-x-hidden rounded-2xl relative">
        <img class="h-40 rounded-2xl w-full object-cover" src="https://mv.com.br/storage/blog/253.730x312.jpg">
        <p class="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:opacity-50 opacity-70" fill="none" viewBox="0 0 24 24" stroke="black">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </p>
      </div>
      <div class="mt-4 pl-2 mb-2 flex justify-between ">
        <div>
          <p class="text-lg font-semibold text-gray-900 mb-0">Product Name</p>
        <p class="text-md text-gray-800 mt-0">$340</p> 
        <div class="bg-gray-800 flex-col items-center px-3 py-1.5 leading-none rounded-full text-xs font-medium uppercase text-white inline-block">
            <span>$340</span>
        </div>
        <p class="pt-2 text-xs font-medium"><a href="#_" class="mr-1 underline">Jake Caldwell</a> · <span class="mx-1">May 15, 2021</span> · <span class="mx-1 text-gray-600">3 min. read</span></p>
        </div>
        <div class="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:opacity-70" fill="none" viewBox="0 0 24 24" stroke="gray">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
      </div>
    </div> -->
      <div v-for="medicine in medicines" :key="medicine.id"
        class="relative max-w-sm min-w-[400px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
        <div class="overflow-x-hidden rounded-2xl relative">
          <img class="h-40 rounded-2xl w-full object-cover" src="https://mv.com.br/storage/blog/253.730x312.jpg">
          <p @click="addMedicineShoppingList(medicine)" :style="medicine.isShop ? 'background: #3f8f0240;' : ''"
            class="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:opacity-50 opacity-70" fill="none"
              viewBox="0 0 24 24" stroke="black">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </p>
        </div>
        <div class="mt-4 pl-2 mb-2 flex h-100 justify-between ">
          <div>
            <p class="text-lg font-semibold  text-gray-900 mb-0">{{ medicine.name || '' }}</p>
            <!-- <div
              class="bg-gray-800 flex-col items-center px-3 py-1.5 leading-none rounded-full text-xs font-medium uppercase text-white inline-block">
              <span>${{ medicine.price }}</span>
            </div> -->
            <!-- //! OFERTA ESPECIAL -->
            <div class="pb-2" v-if="medicine.promotion_medicines.length">

              <p v-for="promotion in medicine.promotion_medicines" class="text-xs pt-2 mt-0 ">
              <div v-if="new Date(promotion.end_date).getTime() >= new Date().getTime()">
                <!-- PRECIO CON DESCUENTO -->
                <a class=" text-black mt-0 mr-3">$ {{
                  medicine.price - (medicine.price * (promotion.percentage /
                    100))
                }}</a>

                <!-- DESCUENTO -->
                <a class=" text-green-700 mt-0 mr-3   "> {{ promotion.percentage }}% OFF</a>
                <!-- PRECIO ORIGINAL -->
                <a class="text-sm text-gray-400 mt-0 mb-5 line-through"> $ {{ medicine.price }}</a>
                <!-- FECHAS DESCUENTO -->
                · <span class="mx-1">{{
                  new Date(promotion.start_date).toLocaleDateString('en-us', {
                    year: "numeric", month: "short",
                    day: 'numeric'
                  })
                }}</span> -
                <span class="mx-1">{{
                  new Date(promotion.end_date).toLocaleDateString('en-us', {
                    year: "numeric", month: "short",
                    day: 'numeric'
                  })
                }}</span>
              </div>

              </p>
              <!-- <p class="text-4sm pb-4 text-gray-400  line-through  ">$ {{ medicine.price }}</p> -->
            </div>

            <!-- <div v-else> -->
            <p class="text-md text-black-400 mt-0 mb-5 ">$ {{ medicine.price }}</p>
            <!-- </div> -->
            <div style="    bottom: 15px;  position: absolute;">

              <p class=" text-xs font-medium"><a href="#_" class="mr-1 underline">{{
                medicine.location
              }}</a> ·
                <span class="mx-1">{{
                  new Date(medicine.CreatedAt).toLocaleDateString('en-us', {
                    year: "numeric", month: "short",
                    day: 'numeric'
                  })
                }}</span>
              </p>
            </div>
          </div>
          <div class="flex flex-col-reverse mb-1 mr-4 group cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:opacity-70" fill="none"
              viewBox="0 0 24 24" stroke="gray">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <Toast v-if="isOpenToast" :isOpenToast="isOpenToast" :messageToast="messageToast" :typeToast="typeMessageToast">
    </Toast>
    <ShopList v-if="isShopListsE" :shopList="shoppingListCart" :isShopLists="isShopListsE" @deleteItem="deleteItem">
    </ShopList>
  </div>
</template>


<style>
</style>