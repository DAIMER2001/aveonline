<script setup>
    import { defineAsyncComponent } from 'vue';
import { reactive, toRefs, computed, defineComponent, onMounted, watch } from 'vue'

const Datatable = defineAsyncComponent(() =>
  import("../components/Datatable.vue")
)

const HeaderTable = ['Fecha creado', 'pago Total']

const state = reactive({
  invoice: null,

  stats: computed(() => filterStats()),
  types: computed(() => filterTypes())
})

</script>
<template>
    <div class="background">
        FACTURA
    <datatable :headerTable="HeaderTable"></datatable>
    </div>
</template>

<style>
.background {
  background-color: rgb(237, 235, 235);
}

</style>