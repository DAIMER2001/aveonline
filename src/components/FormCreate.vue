<template>
    <section class="w-full px-40 py-16 bg-gray-100 xl:px-8">
        <div class="max-w-full mx-auto">
            <div class="text-center justify-center flex flex-col items-center md:flex-row">
                <div class=" w-full mt-10 md:mt-0 md:w-2/4">
                    <div
                        class="relative z-10 h-auto p-2 py-10 overflow-hidden border-b-2 border-gray-300 shadow-2xl px-7 rounded-3xl">
                        <h3 class="mb-6 text-2xl font-medium text-center">{{ typeAction }} your {{ titleModule }}</h3>
                        <div class=" pb-4" v-for="(input, key) in infoModule.inputs">
                            <Datepicker v-if="input.type === 'date'"
                                @input="handleInputChange(input.name, values[input.name])"
                                @blur="handleInputChange(input.name, values[input.name])"
                                :disabledDates="apiModule === 'promotion' ? disabledDates : []"
                                :class="'py-1 mb-2 md:h-2/3 dp__main dp__theme_light block border-gray-200 focus:ring focus:outline-none rounded-full ' + (errors[input.name].message ? 'focus_red focus:ring-red-500' : 'focus:ring-green-500 focus_green')"
                                :minDate="new Date(input.name === 'end_date' ? values['start_date'] : Date.now())"
                                :placeholder="input.placeholder" v-model="values[input.name]"
                                :disabled="input.name === 'end_data' & !values['start_date']" />
                            <multiselect v-else-if="input.type === 'multiselect'" v-model="values[input.name]"
                                @input="handleInputChange(input.name, values[input.name])"
                                @blur="handleInputChange(input.name, values[input.name])" mode="tags"
                                :options="itemsMedicine" trackBy="label" :searchable="true" valueProp="id"
                                :class="(errors[input.name].message ? 'focus_red focus:ring-red-500' : 'focus:ring-green-500 focus_green')">
                            </multiselect>
                            <input v-else :type="input.type" :name="input.name"
                                @input="handleInputChange(input.name, values[input.name])"
                                @change="handleInputChange(input.name, values[input.name])"
                                @blur="handleInputChange(input.name, values[input.name])"
                                :class="'block w-full px-4 py-3 mb-4 border  border-2  border-gray-200   rounded-full ' + (errors[input.name].message ? 'focus_red focus:ring-red-500' : 'focus:ring-green-500 focus_green')"
                                :placeholder="input.placeholder" v-model="values[input.name]">
                            <span class="mb-5 pb-6 font-medium text-red-700 ">{{ errors[input.name].message }}</span>

                        </div>
                        <div
                            class=" w-full pt-3 w-auto self-center items-center content-center text-center justify-center block ">

                            <button @click="$emit('cancelForm')"
                                class="md:w-2/5  mr-3  w-full py-4 font-medium text-white bg-yellow-700 rounded-full">
                                Regresar
                            </button>

                            <button @click="saveForm" type="submit"
                                class="md:w-2/5 w-full py-4 font-medium text-white bg-blue-700 rounded-full">{{
                                    typeAction
                                }}</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <Toast v-if="isOpenToast" :isOpenToast="isOpenToast" :messageToast="messageToast" :typeToast="typeMessageToast">
        </Toast>
    </section>
</template>


<script>
import useFormValidation from "../plugins/veevalidate";
import { Form, Field } from 'vee-validate';

import { computed } from '@vue/reactivity';
import { watch, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import Multiselect from '@vueform/multiselect'
import Toast from './Toast.vue';



export default {
    name: 'Datatable',
    components: { Multiselect, Toast },
    props: {
        apiModule: {
            type: String,
            default: 'invoice'
        },
        titleModule: {
            type: String,
            default: 'Inovices'
        },
        typeAction: {
            type: String,
            required: true
        },
        idEdit: {
            type: Number,
            default: 0
        },
        disabledDates: {
            type: Array,
            default: []
        },
        itemEdit: {
            type: Array,
            default: []
        },
    },
    setup(props, { emit }) {
        const classTable = 'py-3 px-6 text-xs font-medium tracking-wider text-left text-black uppercase dark:text-black-400'

        const form = ref({})
        const store = useStore()
        console.log(props.disabledDates, ' FECHASSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS')

        const isOpenToast = ref(false)
        const messageToast = ref('data created')
        const typeMessageToast = ref('please complete all the fields')


        const titleModule = ref(props.titleModule)
        // const typeAction = ref(props.typeAction)
        const optionsListMedicines = ref(['list', 'of', 'options'])
        const infoModule = computed(() => store.state.infoModules.typeTable[props.apiModule])
        const dataTable = computed(() => store.state.infoModules.itemsDataTable)
        const apiServer = computed(() => store.state.infoModules.apiServer)
        const itemsDataTable = computed(() => store.state.infoModules.getItemsDataTable)
        const statusSaveForm = computed(() => store.state.infoModules.statusData)
        let itemsMedicine
        let formMedicines = ref({})
        // if (statusSaveForm) {
        //     console.log(statusSaveForm)
        //     if (props.apiModule === 'promotion' || props.apiModule === 'invoice') {
        //         console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
        //         store.dispatch('infoModules/savePromotionMedicines')

        //         console.log(itemsMedicine)
        //         filterMedicines()
        //         formMedicines = ref({})

        //         console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')

        //     }
        //     store.dispatch
        // }
        if (props.apiModule === 'promotion' || props.apiModule === 'invoice') {
            console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
            itemsMedicine = computed(() => filterMedicines(store.state.infoModules.itemsMedicine))
            store.dispatch('infoModules/getItemsMedicine')

            console.log(itemsMedicine)
            filterMedicines()
            formMedicines = ref({})

            console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')

        }

        function filterMedicines(medicines) {
            console.log('////////////////////////////////////////////////////')
            console.log(medicines)
            if (medicines) {
                console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
                return medicines.map((medicine) => {
                    return {
                        id: medicine.id, label: `${medicine.name} - ${medicine.price}`, disable: false
                    }
                })
            }
        }

        function validateInput(input) {
            let number = form.value[input.name]
            console.log('validateInput', number)
            if (number <= input.min || number >= input.max) {
                number = number.toString().slice(0, 70)
            }
            console.log('validateInput', form.value[input.name])
            console.log('validateInput', number.toString().slice(0, 70))
        }

        const {
            values,
            errors,
            resetButton,
            handleInputChange,
            onValidateForm
        } = useFormValidation();




        async function saveForm(e) {
            isOpenToast.value = false
            let formValid = {}
            infoModule.value.inputs.forEach((input, key) => {
                if (input.name != "medicines") formValid[input.name] = values.value[input.name]
            });

            const validate = await onValidateForm(values.value, props.apiModule)

            if (!validate) {
                messageToast.value = 'Type all fields correctly'
                typeMessageToast.value = 'delete'
                isOpenToast.value = true
                setTimeout(() => {
                    isOpenToast.value = false
                }, 2000);
            } else {
                if (props.idEdit) {
                    store.dispatch('infoModules/editItemsForm', { api: props.apiModule, form: { id: props.idEdit, ...formValid }, itemBefore: props.itemEdit, medicines: values.value.medicines })
                } else {
                    store.dispatch('infoModules/saveItemsForm', { api: props.apiModule, form: formValid, medicines: values.value.medicines })
                }
                console.log('status data', statusSaveForm)
                messageToast.value = 'data created'
                typeMessageToast.value = 'check'
                isOpenToast.value = true
                setTimeout(() => {
                    isOpenToast.value = false
                    emit('cancelForm')
                }, 2000);
            }
        }

        watch(props, () => {
            if (props.idEdit) {
                console.log(props.itemEdit)
                values.value = { ...values.value, ...props.itemEdit }
                console.log(' PROPS FORM CREATEEEEEEEEEEEEEEEEEEEEEEEEEEE')
                console.log(props.apiModule)
                if (props.apiModule === 'promotion' || props.apiModule === 'invoice') {
                    console.log(props.itemEdit.promotion_medicines)
                    console.log(values.value.medicines)
                    values.value.medicines = filterMedicinesForm(props.itemEdit.promotion_medicines)
                }
            }

        })

        function filterMedicinesForm(medicines) {
            console.log(medicines)
            return medicines.map((medicine) => medicine.id)
        }

        return {
            filterMedicinesForm,
            itemsMedicine,
            form,
            infoModule,
            apiServer,
            classTable,
            dataTable,
            titleModule,
            saveForm,
            optionsListMedicines,
            formMedicines,
            isOpenToast,
            messageToast,
            typeMessageToast,
            validateInput,
            values,
            errors,
            resetButton,
            handleInputChange,
        }
    },
}

</script>
<style>
.dp__input {
    border-radius: 20px !important;
    line-height: 2rem !important;
    border: 1px solid #e8eaed !important;
}

/* 
.focus_green:hover {
    border-radius: 3px !important;
    border-color: rgb(57, 144, 0) !important;
}

.focus_red:hover {
    border-radius: 3px !important;
    border-color: rgb(57, 144, 0) !important;
} */

.focus_green:focus {
    border-color: rgb(57, 144, 0) !important;
}

.focus_red:focus {
    border-color: rgb(255, 0, 0) !important;
}

/* 
.focus_green {
    border-radius: 3px !important;
    border-color: rgb(57, 144, 0) !important;
    padding-bottom: 30px;
}

.focus_red {
    border-radius: 3px !important;
    border-color: rgb(155, 7, 7) !important;
} */
</style>

<style src="@vueform/multiselect/themes/default.css">
</style>