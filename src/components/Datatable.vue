
<template>
  <div :key="keyTable" class="bg-white p-8 rounded-md w-full">
    <div class=" flex items-center justify-between pb-6">
      <div>
        <h2 class="text-gray-600 font-semibold">{{ titleModule }} Order</h2>
        <span class="text-xs">All {{ titleModule }} item</span>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex bg-gray-100 items-center p-2 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="text-gray-600 h-12 w-7 mr-2" viewBox="0 0 20 20"
            fill="currentColor">
            <path fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd" />
          </svg>
          <input @keyup="searchData" v-model="inputSearch"
            :class="'block w-full px-4 border  border-2  border-gray-200   rounded-full focus:ring-green-500 focus_green'"
            type="text" name="" id="" placeholder="search...">
        </div>
        <div class="lg:ml-40 ml-10 space-x-8">
          <button v-if="itemsSelected.length"
            class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Delete
            selected</button>
          <button @click="$emit('createData', { action: 'Create', data: [] })"
            class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Create</button>
        </div>
      </div>
    </div>
    <div>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto shadow-md sm:rounded-lg">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead class="bg-gray-100 dark:bg-gray-700">
              <tr class="hover:bg-gray-100 dark:hover:bg-gray-700">

                <th scope="col" class="p-4">
                  <div class="flex items-center">
                    <input id="checkbox-all" type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="checkbox-all" class="sr-only">checkbox</label>
                  </div>
                </th>

                <th v-for="nameHeader in infoTable.headerTable" :class="classTable.header"
                  class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                  {{ nameHeader }}
                </th>
                <th
                  class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                  Options
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
              <tr v-for="item in itemsTable" :key="item.id">

                <td class="p-4 w-4">
                  <div class="flex items-center">
                    <input id="checkbox-table-4" type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                    <label for="checkbox-table-4" class="sr-only">checkbox</label>
                  </div>
                </td>
                <td v-for="column in infoTable.columns" :key="item.id"
                  class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">{{ item[column] }}</p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <!-- <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                    <span class="relative">Editar</span>
                  </span> -->

                  <button @click="$emit('createData', { action: 'Edit', data: item })"
                    class="rounded-full bg-indigo-600 px-5 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>


</template>
<script >
import { computed } from '@vue/reactivity';
import { watch, reactive, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Datatable',
  emits: ['dataTable', 'createData'],
  props: {
    apiModule: {
      type: String,
      default: 'invoice'
    },
    titleModule: {
      type: String,
      default: 'Inovices'
    },
    itemsSelected: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { emit }) {
    const classTable = 'py-3 px-6 text-xs font-medium tracking-wider text-left text-black uppercase dark:text-gray-400'

    const store = useStore()


    const inputSearch = ref('')
    const keyTable = ref(0)

    const titleModule = ref(props.titleModule)
    const infoTable = computed(() => store.state.infoModules.typeTable[props.apiModule])
    const dataTable = computed(() => store.state.infoModules.itemsDataTable)
    const itemsTable = ref([])
    const apiServer = computed(() => store.state.infoModules.apiServer)
    const itemsDataTable = computed(() => store.state.infoModules.getItemsDataTable)
    const getItems = () => {
      store.dispatch('infoModules/addItemsTable', props.apiModule)

      setTimeout(() => {
        itemsTable.value = JSON.parse(JSON.stringify(dataTable.value))
      }, 2000);
    }
    store.dispatch('infoModules/addItemsTable', props.apiModule)
    console.log('-----------------------------------------------------------------------')
    console.log(itemsDataTable)
    console.log('-----------------------------------------------------------------------')

    function searchData() {
      console.log(dataTable.value)
      console.log(inputSearch.value)
      if (props.apiModule === 'promotion') {
        itemsTable.value = dataTable.value.filter((value, index) => {
          console.log(value, index)
          return value.description.includes(inputSearch.value) ||
            value.percentage === inputSearch.value ||
            value.start_date.includes(inputSearch.value) ||
            value.end_date.includes(inputSearch.value)
        })
      } else if (props.apiModule === 'invoice') {
        itemsTable.value = dataTable.value.filter((value, index) => {
          console.log(value, index)
          return value.date_payment.includes(inputSearch.value) ||
            value.full_payment === inputSearch.value ||
            value.created_at.includes(inputSearch.value)
        })
      } else {
        itemsTable.value = dataTable.value.filter((value, index) => {
          console.log(value, index)
          return value.name.includes(inputSearch.value) ||
            value.price === inputSearch.value ||
            value.location.includes(inputSearch.value)
        })
      }
    }

    emit('dataTable', dataTable.value)
    watch(props, () => {
      getItems()
      if (dataTable.value.length) {
        itemsTable.value = JSON.parse(JSON.stringify(dataTable.value))
        emit('dataTable', dataTable.value)
      }
    })
    watch(dataTable, () => {
      if (dataTable.value.length) {
        itemsTable.value = JSON.parse(JSON.stringify(dataTable.value))
        emit('dataTable', dataTable.value)
      }
      console.log(' IS PROPSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS', dataTable.value)
    })

    return {
      infoTable,
      apiServer,
      keyTable,
      classTable,
      dataTable,
      getItems,
      titleModule,
      inputSearch,
      searchData,
      itemsTable
    }
  },
}

</script>