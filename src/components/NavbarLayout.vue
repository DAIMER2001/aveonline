<script>

export default {
  emits: ['isShopList'],
  props: {
    userType: {
      default: 'client',
      type: String
    },
    countShopList: {
      default: 0,
      type: Number
    }
  },

  setup() {
  }
}
</script>

<template>

  <nav class="relative z-50 h-24 select-none" x-data="{ showMenu: false }">
    <div
      class="container relative flex flex-wrap items-center justify-between h-24 mx-auto overflow-hidden font-medium border-b border-gray-200 md:overflow-visible lg:justify-center sm:px-4 md:px-2">
      <button @click="$emit('isShopList')" class="flex items-center justify-start w-1/4 h-full pr-4">


        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 group-hover:opacity-50 opacity-70" fill="none"
          viewBox="0 0 24 24" stroke="black">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />


        </svg>

        <span v-if="countShopList"
          class="top-0 right-0 px-2 py-1 -mt-3 -mr-6 text-xs font-medium leading-tight text-white bg-green-700 rounded-full">{{
            countShopList
          }}</span>
      </button>
      <div
        class="top-0 left-0 items-start hidden w-full h-full p-4 text-sm bg-gray-900 bg-opacity-50 md:items-center md:w-3/4 md:absolute lg:text-base md:bg-transparent md:p-0 md:relative md:flex"
        :class="{ 'flex fixed': showMenu, 'hidden': !showMenu }">
        <div
          class="flex-col w-full h-auto overflow-hidden bg-white rounded-lg md:bg-transparent md:overflow-visible md:rounded-none md:relative md:flex md:flex-row">
          <a
            class="inline-flex items-center block w-auto h-16 px-6 text-xl font-black leading-none text-gray-900 md:hidden">
            tails<span class="text-red-700">.</span></a>
          <div
            class="flex flex-col items-start justify-center w-full space-x-6 text-center lg:space-x-8 md:w-2/3 md:mt-0 md:flex-row md:items-center">
            <template v-if="userType === 'admin'">

              <router-link @click="$emit('typeModule', ['invoice', 'Invoices', 'Invoice'])" to="/invoice/0"
                class="inline-block w-full py-2 mx-0 font-medium text-left text-gray-700 md:w-auto md:px-0 md:mx-2 hover:text-red-700 lg:mx-3 md:text-center">
                Invoice</router-link>
              <router-link @click="$emit('typeModule', ['medicine', 'Medicines', 'Medicine'])" to="/medicine/0"
                class="inline-block w-full py-2 mx-0 font-medium text-left text-gray-700 md:w-auto md:px-0 md:mx-2 hover:text-red-700 lg:mx-3 md:text-center">
                Medicine</router-link>
              <router-link @click="$emit('typeModule', ['promotion', 'Promotions', 'Promotion'])" to="/promotion/0"
                class="inline-block w-full py-2 mx-0 font-medium text-left text-gray-700 md:w-auto md:px-0 md:mx-2 hover:text-red-700 lg:mx-3 md:text-center">
                Promotion</router-link>

            </template>


            <router-link to="/"
              class="inline-block w-full py-2 mx-0 ml-6 font-medium text-left text-red-700 md:ml-0 md:w-auto md:px-0 md:mx-2 lg:mx-3 md:text-center">
              Home</router-link>
            <router-link to="/admin/" @click="$emit('typeModule', ['home'])"
              class="inline-block w-full py-2 mx-0 ml-6 font-medium text-left text-red-700 md:ml-0 md:w-auto md:px-0 md:mx-2 lg:mx-3 md:text-center">
              Admin</router-link>

            <router-link to="/"
              class="absolute top-0 left-0 hidden py-2 mt-6 ml-10 mr-2 text-gray-600 lg:inline-block md:mt-0 md:ml-2 lg:mx-3 md:relative">
              <svg class="inline w-5 h-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                viewBox="0 0 24 24" stroke="currentColor">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </router-link>
          </div>
          <div class="flex flex-col items-start justify-end w-full pt-4 md:items-center md:w-1/3 md:flex-row md:py-0">
            <router-link to="/" class="w-full px-6 py-2 mr-0 text-gray-700 md:px-0 lg:pl-2 md:mr-4 lg:mr-5 md:w-auto">
              Sign
              In</router-link>
            <router-link to="/"
              class="inline-flex items-center w-full px-6 py-3 text-sm font-medium leading-4 text-white bg-red-700 md:px-3 md:w-auto lg:px-5 hover:bg-red-600 focus:outline-none md:focus:ring-2 focus:ring-0 focus:ring-offset-2 focus:ring-red-700 rounded-full">
              Sign
              Up</router-link>
          </div>
        </div>
      </div>
      <div @click="showMenu = !showMenu"
        class="absolute right-0 flex flex-col items-center items-end justify-center w-10 h-10 bg-white rounded-full cursor-pointer md:hidden hover:bg-gray-100">
        <svg class="w-6 h-6 text-gray-700" x-show="!showMenu" fill="none" stroke-linecap="round" stroke-linejoin="round"
          stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
        <svg class="w-6 h-6 text-gray-700" x-show="showMenu" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg" style="display: none;">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>
    </div>
  </nav>

</template>
