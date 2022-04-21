<script setup>
    import { defineAsyncComponent } from 'vue';
import { reactive, toRefs, computed, defineComponent, onMounted, watch } from 'vue'

const Datatable = defineAsyncComponent(() =>
  import("../components/Datatable.vue")
)

const HeaderTable = ['Nombre', 'Precio', 'ubicacion']

const state = reactive({
  invoice: null,

  stats: computed(() => filterStats()),
  types: computed(() => filterTypes())
})

</script>
<template>
    <div class="background">
        MEDICAMENTO
    <datatable :headerTable="HeaderTable"></datatable>
    </div>
</template>
<style>
.background {
  background-color: rgb(237, 235, 235);
}

</style>