
<template>
  <section class="w-100 max-w-full  py-16 bg-gray-100 ">
    <div class="max-w-full mx-auto w-100">
      <div class="text-center justify-center flex flex-col items-center md:flex-row">
        <div class=" w-full mt-10 md:mt-0 md:w-3/2 resizeWidth">
          <div class="h-auto  p-2 py-10 overflow-hidden border-b-2 border-gray-300 shadow-2xl px-7 rounded-3xl">
            <h3 class="mb-6 text-2xl font-medium justify-center text-center">Invoices</h3>
            <Datepicker
              :class="'py-1 mb-2 flex flex-col w-full md:h-2/3 justify-center text-center dp__main dp__theme_light block border-gray-200 focus:ring focus:outline-none rounded-full focus_red focus:ring-green-500 focus_green'"
              :placeholder="'fecha inicial'" v-model="dateInit" :minDate="new Date(Date.now())" />
            <Datepicker
              :class="'py-1 mb-2  flex flex-col w-full md:h-2/3 dp__main  justify-center text-center dp__theme_light block border-gray-200 focus:ring focus:outline-none rounded-full focus_red focus:ring-green-500 focus_green'"
              :minDate="new Date(dateInit || Date.now())" :placeholder="'fecha final'" v-model="dateEnd"
              @input="getData" />
            <button @click="getData" type="submit"
              class="md:w-2/5 w-full py-4 font-medium text-white bg-blue-700 my-10 rounded-full"> Search
              Invoices</button>
            <div ref="contain" id="contain" class="pl-15 echarts__demo"
              style="width: 1000px; min-height: 400px; min-width;: 1000px">

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
import axios from 'axios';


const state = reactive({
  dateInit: new Date(Date.now()),
  dateEnd: '',
  dateInvoices: null,
  keyCanvas: 0,
  domChart: 0,
  myChart: '',
  option: {}

})
const { dateEnd, dateInvoices, dateInit, keyCanvas, domChart, myChart, option } = toRefs(state)

var myChartContainer = function () {
  console.log()
  let box = document.querySelector('.resizeWidth');
  console.log(box.offsetWidth)
  state.myChart.style.width = `${box.offsetWidth}px`;
  state.myChart.style.height = `${box.offsetHeight}px`
};


state.dateEnd = new Date(state.dateInit)
state.dateEnd.setDate(state.dateEnd.getDate() + 6)

async function getData() {
  if (state.dateEnd & state.dateInit) {
    const start = new Date(state.dateInit).toISOString()
    const end = new Date(state.dateEnd).toISOString()
    let getInvoices = await axios.get(`${import.meta.env.VITE_SERVER_BACKEND}invoice_dates/${start}/${end}`)
    state.dateInvoices = getInvoices.data
    state.keyCanvas++
    getGraphic(state.dateInvoices)
  }
}
onMounted(() => {
  getData()
})
async function getGraphic(_rawData) {
  if (!state.domChart) {
    console.log('config chart')
    state.domChart = document.getElementById("contain")
    state.myChart = echarts.init(state.domChart);
  }
  state.option = await run(_rawData)
  state.myChart.setOption(state.option);
  window.onresize = function () {
    if (state.myChart != null) {
      console.log('poas')
      // myChartContainer()
      // state.myChart.setOption(state.option);
      var chart = echarts.init(state.domChart);
      // chart.resize()
      // state.myChart.resize({ width: '100%', height: '500px', silent: false, animation: { duration: 1000 } });
    }
    // if (state.domChart) {
    //   let box = document.querySelector('.box');
    //   console.log(box)
    //   let width = box.offsetWidth;
    //   let height = box.offsetHeight;
    //   console.log(width)
    //   console.log(height)
    // }
  };

}

async function run(_rawData) {
  // PAGO TOTAL POR DIA 
  // let payDay = []
  let fullPayDay = []
  const dataDates = filterDate(_rawData)
  dataDates.forEach(element => {
    const day = new Date(element.date_payment).toLocaleDateString()
    // if (!payDay[day]) payDay[day] = []
    fullPayDay[day] = (fullPayDay[day] || 0) + element.full_payment
    // payDay[day].push(element.full_payment)
  });

  let source = [['dates', 'full payment']]
  source.push([new Date(Date.now()).toLocaleDateString(), 0])
  for (const key in fullPayDay) {
    // series.push({ type: 'line', name: key, data: fullPayDay[key] })
    source.push([key, fullPayDay[key]])
  }
  console.log(source)
  console.log('source')
  const option = {
    legend: {},
    tooltip: {},
    dataset: {
      // Provide a set of data.
      source
    },
    // Declare an x-axis (category axis).
    // The category map the first row in the dataset by default.
    xAxis: { type: 'category' },
    // Declare a y-axis (value axis).
    yAxis: {},
    // Declare several 'bar' series,
    // every series will auto-map to each rows by default.
    series: [{ type: 'line' }, { type: 'line' }, { type: 'line' }]

  }
  console.log(option)
  return option
}
function filterDate(dates) {
  return dates.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a.date_payment) - new Date(b.date_payment);
  });
}

</script>

<style scoped>
.chart {
  height: 400px;
}
</style>