<template>
    <!-- <section class="w-full h-96 min-h-min[200px]  px-40 bg-gray-100 xl:px-8"> -->
    <section class="bg-gray-100 ">
        <!-- This is an example component -->
        <div id="menu" class="mx-auto px-2  lg:pb-20">
            <div
                class=" overflow-auto px-56 py-10 min-h-90 max-h-[500px] grid grid-cols-1  sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-3">
                <template class=" " v-for="medicine in shopList">


                    <div class="col-span-2 sm:col-span-1 xl:col-span-1">
                        <img alt="..." src="https://mv.com.br/storage/blog/253.730x312.jpg"
                            class="h-24 w-24 rounded  mx-auto" />
                    </div>
                    <div class="col-span-2 sm:col-span-4 xl:col-span-4">
                        <!-- NAME -->
                        <h3 class="font-semibold text-black">{{ medicine.name }}</h3>
                        <p>
                            {{ medicine.location }}
                        </p>
                        <!-- //! OFERTA ESPECIAL -->
                        <div class="" v-if="medicine.promotion_medicines.length">
                            <p v-for="promotion in medicine.promotion_medicines" class="text-xs mt-0 ">
                            <div v-if="new Date(promotion.end_date).getTime() >= new Date().getTime()">
                                <!-- PRECIO CON DESCUENTO -->
                                <a class=" text-black mt-0 mr-3">$ {{
                                    medicine.price - (medicine.price * (promotion.percentage /
                                        100))
                                }}</a>

                                <!-- DESCUENTO -->
                                <a class=" text-green-700 mt-0 mr-3   "> {{ promotion.percentage }}% OFF</a>
                                <!-- PRECIO ORIGINAL -->
                                <a class="text-sm text-gray-400 mt-0 mb-5 line-through"> $ {{ medicine.price }}</a>
                                <!-- FECHAS DESCUENTO -->
                                · <span class="mx-1">{{
                                    new Date(promotion.start_date).toLocaleDateString('en-us', {
                                        year: "numeric", month: "short",
                                        day: 'numeric'
                                    })
                                }}</span> -
                                <span class="mx-1">{{
                                    new Date(promotion.end_date).toLocaleDateString('en-us', {
                                        year: "numeric", month: "short",
                                        day: 'numeric'
                                    })
                                }}</span>
                            </div>

                            </p>
                            <!-- <p class="text-4sm pb-4 text-gray-400  line-through  ">$ {{ medicine.price }}</p> -->
                        </div>
                    </div>


                    <!-- !ELIMINAR MEDICINA -->

                    <div class="col-span-2 sm:col-span-1 xl:col-span-1 italic ">$ {{ medicine.price }}

                        <button @click="$emit('deleteItem', medicine)"
                            class="px-2 py-2 ml-4 mt-3 font-medium text-white bg-red-700 rounded-full">

                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </template>

            </div>

            <div class="max-w-full mx-auto mt-10 pt-3">
                <div class="text-center justify-center flex flex-col  md:flex-row">

                    <div class="w-full mt-10 md:mt-0 md:w-2/4">
                        <div
                            class=" z-10 h-auto p-2 py-10 overflow-hidden bg-white border-b-2 border-gray-300 shadow-2xl px-7 rounded-3xl">
                            <span class="font-semibold mr-3">Full Pay:</span> $ {{ full_payment.toFixed(2) }}
                        </div>

                        <div
                            class=" z-10 h-auto p-2 py-10 overflow-hidden bg-white border-b-2 border-gray-300 shadow-2xl px-7 rounded-3xl">
                            <Datepicker
                                class="py-1 mb-2 md:h-2/3 dp__main dp__theme_light block border-gray-200 focus:ring focus:ring-blue-700 focus:outline-none rounded-full"
                                :minDate="new Date()" :placeholder="'date buy'" v-model="date_payment" />
                            {{ totalPagar }}
                            <button @click="Payment"
                                class="md:w-2/6 text-center justify-center py-4 font-medium text-white bg-blue-700 rounded-full">
                                Payment </button>

                        </div>


                        {{ date }}
                    </div>

                </div>
            </div>
        </div>
        <Toast v-if="isOpenToast" :isOpenToast="isOpenToast" :messageToast="messageToast"
            :typeToast="typeMessageToast" />
    </section>
</template>


<script>


import { computed, ref, watch } from "vue"


export default {
    name: 'ShopList',
    emits: ['deleteItem'],
    props: {
        shopList: {
            default: [],
            type: Array
        },
        isShopLists: Boolean

    },

    setup(props) {
        const date_payment = ref('')
        const full_payment = ref(0)

        const shopList = ref(props.shopList)
        const totalPagar = ref('')


        const isOpenToast = ref(false)
        const messageToast = ref('data created')
        const typeMessageToast = ref('please complete all the fields')

        async function validateDate() {
            if (props.isShopLists && !date_payment.value) {
                isOpenToast.value = true
                messageToast.value = " Select date payment"
                typeMessageToast.value = "delete"
                setTimeout(() => {
                    isOpenToast.value = false
                }, 2000);
                return false
            } else if (props.isShopLists && date_payment.value) {
                return true
            }
            return false
        }
        async function Payment() {
            if (!date_payment.value) {
                isOpenToast.value = true
                messageToast.value = " Select date payment"
                typeMessageToast.value = "delete"
                setTimeout(() => {
                    isOpenToast.value = false
                }, 2000);
            }
        }

        async function fullPayment() {
            const validate = await validateDate()
            console.log('valida', validate)
            if (validate) {
                await props.shopList.forEach(async medicine => {
                    console.log("==================================")
                    console.log(medicine)
                    if (medicine.promotion_medicines) {
                        let payCalculate = 0
                        await medicine.promotion_medicines.forEach(prom => {
                            const dateSelect = new Date(date_payment.value).getTime()
                            const end_date = new Date(prom.end_date).getTime()
                            const start_date = new Date(prom.start_date).getTime()
                            console.log('DATESELECT,', dateSelect)
                            console.log('DATESELECT,', end_date)
                            console.log('DATESELECT,', start_date)
                            if (end_date >= dateSelect ||
                                start_date <= dateSelect
                            ) {
                                payCalculate = medicine.price - (medicine.price * (prom.percentage / 100))
                                console.log('fecha pago', payCalculate)
                            }
                        });
                        full_payment.value = full_payment.value + (payCalculate ? payCalculate : medicine.price)
                        console.log('full_payment.value', full_payment.value)
                    } else {
                        full_payment.value = (medicine.price + medicine.price)
                    }
                    console.log(full_payment.value)
                });
                console.log(".................................")

                console.log(full_payment.value)
                full_payment.value = full_payment.value
            }
        }

        watch(date_payment, async () => {
            console.log(' IS PROPSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS')
            // getItems()
            fullPayment()
        })
        watch(props, async () => {
            console.log(' IS PROPSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS')
            // getItems()
            fullPayment()
        })
        return {
            full_payment, date_payment, totalPagar, fullPayment,
            isOpenToast,
            messageToast,
            typeMessageToast,
            Payment
        }
    }
}
</script>