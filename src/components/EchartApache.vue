
<template>
  <section class="w-full px-40 py-16 bg-gray-100 xl:px-8">
    <div class="max-w-full mx-auto">
      <div class="text-center justify-center flex flex-col items-center md:flex-row">
        <div class=" w-full mt-10 md:mt-0 md:w-2/4">
          <div
            class="relative z-10 h-auto p-2 py-10 overflow-hidden border-b-2 border-gray-300 shadow-2xl px-7 rounded-3xl">
            <h3 class="mb-6 text-2xl font-medium text-center">Invoices</h3>
            <Datepicker
              :class="'py-1 mb-2 md:h-2/3 dp__main dp__theme_light block border-gray-200 focus:ring focus:outline-none rounded-full focus_red focus:ring-green-500 focus_green'"
              :placeholder="'fecha inicial'" v-model="dateInit" />

            <Datepicker
              :class="'py-1 mb-2 md:h-2/3 dp__main dp__theme_light block border-gray-200 focus:ring focus:outline-none rounded-full focus_red focus:ring-green-500 focus_green'"
              :placeholder="'fecha final'" v-model="dateEnd" @input="getData" />

            <button @click="getData" type="submit"
              class="md:w-2/5 w-full py-4 font-medium text-white bg-blue-700 my-10 rounded-full"> Search
              Invoices</button>
            <div ref="contain" id="contain" class="h-96">

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- <v-chart v-if="option.dataset[0].source.length" :key="reset" class="chart" :option="option" /> -->
</template>

<script setup>
import { onMounted, reactive, toRefs } from 'vue';

import * as echarts from 'echarts';

import { data } from '../plugins/data.js'
import axios from 'axios';
console.log(data)
const state = reactive({
  dateEnd: null,
  dateInit: null,
  dateInvoice: null
})
const { dateEnd, dateInvoice, dateInit } = toRefs(state)

async function getData() {
  console.log(state.dateInit)
  if (state.dateEnd & state.dateInit) {
    const start = new Date(state.dateInit).toISOString()
    const end = new Date(state.dateEnd).toISOString()
    console.log(start)
    console.log(end)
    const data = await axios.get(`${import.meta.env.VITE_SERVER_BACKEND}invoice_dates/${start}/${end}`)
    console.log(data, ' datos')
    state.dateInvoice = data.data
    getGraphic(state.dateInvoice)
  }
}
onMounted(() => {
  console.log('gettttttttttttttttttttttttttttttttttttt')
  getGraphic(data)

})
async function getGraphic(_rawData) {
  console.log(' GRAPICCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC')
  var dom = document.getElementById("contain");
  console.log(dom)
  var myChart = echarts.init(dom);
  console.log('myChart', myChart)
  var app = {};

  var option;
  console.log(state.dateInvoice)
  if (state.dateInvoice) {
    run(state.dateInvoice);

  }

  if (option && typeof option === 'object') {
    myChart.setOption(option);
  }
}

function run(_rawData) {
  // var countries = ['Australia', 'Canada', 'China', 'Cuba', 'Finland', 'France', 'Germany', 'Iceland', 'India', 'Japan', 'North Korea', 'South Korea', 'New Zealand', 'Norway', 'Poland', 'Russia', 'Turkey', 'United Kingdom', 'United States'];
  const countries = [
    'Finland',
    'France',
    'Germany',
    'Iceland',
    'Norway',
    'Poland',
    'Russia',
    'United Kingdom'
  ];
  const datasetWithFilters = [];
  const seriesList = [];
  echarts.util.each(countries, function (full_payment) {
    var datasetId = 'dataset_' + full_payment;
    datasetWithFilters.push({
      id: datasetId,
      source: dataRows
    });
    seriesList.push({
      type: 'line',
      datasetId: datasetId,
      showSymbol: false,
      name: full_payment,
      endLabel: {
        show: true
      },
      labelLayout: {
        moveOverlap: 'shiftY'
      },
      emphasis: {
        focus: 'series'
      },
      encode: {
        x: 'full_payment',
        y: 'date_payment',
        itemName: 'full_payment',
        tooltip: ['date_payment']
      }
    });
  });
  option = {
    animationDuration: 10000,
    dataset: [
      {
        id: 'dataset_raw',
        source: _rawData
      },
      ...datasetWithFilters
    ],
    title: {
      text: 'Invoices Between Dates'
    },
    tooltip: {
      order: 'valueDesc',
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      nameLocation: 'middle'
    },
    yAxis: {
      name: 'Income'
    },
    grid: {
      right: 140
    },
    series: seriesList
  };
  myChart.setOption(option);
}


</script>

<style scoped>
.chart {
  height: 400px;
}
</style>