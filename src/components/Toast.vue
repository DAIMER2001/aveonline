
<script setup>
import { reactive, toRefs, watch } from 'vue';

let timer;

const props = defineProps({
  isOpenToast: Boolean,
  messageToast: {
    default: 'Item Created Successfully!',
    type: String
  },
  typeToast: {
    default: 'check'
  }
})

const state = reactive({
  classToast: props.typeToast === 'check' ? ' bg-green-500 px-5 py-4 text-white transition hover:bg-green-600' : 'bg-red-500 px-5 py-4 text-white transition hover:bg-red-600'
})
const { classToast } = toRefs(state)
console.log(props.isOpenToast)
// function openToast() {
//       if (props.isOpenToast) return;
//       props.isOpenToast = true;

//       // reset time to 0 second
//       clearTimeout(timer);

//       // auto close toast after 5 seconds
//       timer = setTimeout(() => {
//         props.isOpenToast = false;
//       }, 2000);
//     }
function closeToast() {
  props.isOpenToast = false;
}

// state.classToast = props.typeToast === 'check' ? ' bg-green-500 px-5 py-4 text-white transition hover:bg-green-600' : 'bg-red-500 px-5 py-4 text-white transition hover:bg-red-600'

watch(props, () => {
  console.log('props')
  console.log(props.typeToast)
  state.classToast = props.typeToast === 'check' ? ' duration-[2000ms] bg-green-500 px-5 py-4 text-white transition hover:bg-green-600' : 'duration-[2000ms] bg-red-500 px-5 py-4 text-white transition hover:bg-red-600'
})


console.log('props')
console.log(props.typeToast)
state.classToast = props.typeToast === 'check' ? ' duration-[2000ms] bg-green-500 px-5 py-4 text-white transition hover:bg-green-600' : ' duration-[2000ms] bg-red-500 px-5 py-4 text-white transition hover:bg-red-600'

</script>
<template>
  <div @click="closeToast()" v-if="isOpenToast" :key="isOpenToast"
    :class="' fixed top-4 right-4 z-50 cursor-pointer rounded-md' + classToast">
    <div class="flex items-center space-x-2">

      <svg v-if="typeToast === 'check'" class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
      </svg>
      <svg v-if="typeToast === 'delete'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
      <p class="font-bold">{{ messageToast }}</p>
    </div>
  </div>
  <!-- trigger button -->
  <!-- <button
    type="button"
    @click="openToast()"
    class="rounded-md bg-blue-500 px-4 py-2 font-bold text-white transition hover:bg-blue-600"
  >
    Launch toast
  </button> -->

</template>