<script setup>

      // import { defineAsyncComponent } from 'vue';
// import LoginPopup from './components/LoginPopup.vue';
// import { useMixin } from './store';

// const store = useMixin()
// const {count} = store
// store.count++
// store.increment(2)


// const AsyncComp = defineAsyncComponent(() =>
//   import("./components/Hello.vue")
// )
</script>

<template>
  <!-- <LoginPopup v-if="show"></LoginPopup> -->
  <!-- <button @cli></button> -->
  <!-- <Navbar></Navbar> -->
  <!-- <async-comp></async-comp> -->
  <!-- <h1>{{store.count}}</h1>
  <h1>{{store.doubleCount}}</h1>
  <button @click="store.increment(1)">increment</button>
  <button @click="store.waitAndAdd">wait increment</button> -->
  <router-view></router-view>
</template>

<style>
</style>
