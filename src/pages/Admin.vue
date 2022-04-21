
<template>
    <div>
        <NavbarLayout userType="admin" @typeModule="typeModule"></NavbarLayout>
        <HomeAdmin v-show="isHome"></HomeAdmin>
        <Datatable v-show="isTable & !isHome" :key="apiModule + keyModule" @dataTable="dataTable" :apiModule="apiModule"
            :titleModule="titleModule" @createData="createData">
        </Datatable>
        <FormCreate v-show="!isTable & !isHome" @cancelForm="cancelForm" :key="titleForm" :apiModule="apiModule"
            :titleModule="titleForm" :idEdit="idEdit" :typeAction="typeAction" :dataTable="itemsTable"
            :disabledDates="disabledDates" :itemEdit="itemEdit">
        </FormCreate>
    </div>
</template>


<script>
import { ref, defineExpose, watch } from 'vue';
import NavbarLayout from '../components/NavbarLayout.vue';
import Datatable from '../components/Datatable.vue';
import { computed } from '@vue/reactivity';
import FormCreate from '../components/FormCreate.vue';
import HomeAdmin from '../components/HomeAdmin.vue';
import { is } from 'date-fns/locale';

export default {
    components: { NavbarLayout, Datatable, FormCreate, HomeAdmin },
    setup() {
        const isHome = ref('home')
        const isTable = ref(true)
        const apiModule = ref('invoice')
        const titleModule = ref('Invoices')
        const titleForm = ref('Invoice')
        const typeAction = ref("")
        const idEdit = ref(0)
        const disabledDates = ref([])
        const itemsTable = ref([])
        const itemEdit = ref({})
        const keyModule = ref(0)
        // For demo purposes disables the next 2 days from the current date
        // const disabledDates = computed(() => {
        //     const today = new Date();

        //     const tomorrow = new Date(today)
        //     tomorrow.setDate(tomorrow.getDate() + 1)
        //     const afterTomorrow = new Date(tomorrow);
        //     const after = new Date(today)
        //     const after2 = new Date(today)
        //     afterTomorrow.setDate(tomorrow.getDate() + 1);
        //     after.setDate(after.getDate() + 5);
        //     after2.setDate(after2.getDate() + 6);


        //     return [tomorrow, afterTomorrow, after, after2]
        // })


        // const typeModule = (apiModule, titleModule) => {

        //     apiModule = apiModule
        //     titleModule = titleModule
        // }
        // defineExpose({
        //     typeModule
        // })
        function cancelForm() {
            isTable.value = true
            isHome.value = false
            keyModule.value++
        }
        function typeModule(dataApiModule) {
            console.log(dataApiModule)
            console.log('dataApiModule')
            if (dataApiModule[0] === 'home') {

                isHome.value = true
            } else {

                apiModule.value = dataApiModule[0]
                titleModule.value = dataApiModule[1]
                titleForm.value = dataApiModule[2]
                isHome.value = false
                isTable.value = true
            }
        }
        function dataTable(data) {
            console.log(data, 'DATAA')
            itemsTable.value = data
            if (apiModule.value === 'promotion' && data.length && typeAction.value === 'Edit') {
                data.forEach(element => {

                    const start = new Date(element.start_date)
                    const end = new Date(element.end_date)
                    console.log('START', start)
                    console.log('START', end)
                    disabledDates.value.push(start)
                    disabledDates.value.push(end)
                    // VALIDATE MENOR QUE FECHA ANTERIOR Y MAYOR QUE FECHA ACTUAL
                    // const start = new Date(element.start_date).getTime()
                    // const now = new Date().getTime()
                    // if (datevalidate & start <= datevalidate & start >= now) {
                    //     console.log(datevalidate)
                    //     datevalidate = new Date(element.start_date).getTime()
                    // }
                    // datevalidate = datevalidate ? (start <= datevalidate & start >= now) ? start : datevalidate :
                    //     dateGreater.value = datevalidate


                })

            }
        }

        function createData({ action = 'Create', data }) {
            console.log(action)
            console.log(data)
            idEdit.value = data?.id
            itemEdit.value = data
            typeAction.value = action
            isTable.value = false
            isHome.value = false
        }


        return {
            isHome,
            keyModule,
            disabledDates,
            apiModule,
            titleModule,
            titleForm,
            isTable,
            typeAction,
            itemEdit,
            idEdit,
            itemsTable,
            typeModule,
            createData,
            cancelForm,
            dataTable,

            // typeModule
        }
    }

}
</script>
