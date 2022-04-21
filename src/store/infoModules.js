import apiTable from '../scripts/api/apiDataTable'

const state = {
    apiServer: import.meta.env.VITE_SERVER_BACKEND,
    typeTable: {
        invoice:
            {
                headerTable: ['Date payment', 'Full payment', 'Created at'],
                api: 'invoice',
                columns: ['date_payment', 'full_payment', 'created_at'],
                inputs: [
                  {
                      name: 'date_payment',
                      type: 'date',
                      placeholder: 'date payment'
                  },
                  {
                      name: 'full_payment',
                      type: 'number',
                      placeholder: 'full payment'
                  },
                  {name: 'medicines', type: 'multiselect', placeholder: 'medicines'}
                ]
            },
        promotion:
            {
                headerTable:  ['Description', 'Percentage', 'Date start', 'Date end'],
                api: 'promotion',
                columns: ['description', 'percentage', 'start_date', 'end_date'],
                inputs: [
                  {name: 'description', type: 'text', placeholder: 'description', rules:'rules="required|minMax:3,100"'},
                  {name: 'percentage', type: 'number', placeholder: 'percentage', rules:'rules="required|minMax:0.1,70"'},
                  {name: 'start_date', type: 'date', placeholder: 'start date', rules:'rules="required"'},
                  {name: 'end_date', type: 'date', placeholder: 'end date', rules:'rules="required"'},
                  {name: 'medicines', type: 'multiselect', placeholder: 'medicines', rules:'rules="required"'}
                ]
            },
        medicine:
            {
                headerTable:['Name', 'Price', 'Location'],
                api: 'medicine',
                columns: ['name', 'price', 'location'],
                inputs: [
                  {
                      name: 'name',
                      type: 'text',
                      placeholder: 'name'
                  },
                  {
                      name: 'price',
                      type: 'number',
                      placeholder: 'price'
                  },
                  {
                      name: 'location',
                      type: 'text',
                      placeholder: 'location'
                  },
                ]
            }
    },
    itemsDataTable: [],
    statusData: false,
    itemsMedicine: []
}

// getters
const getters = {
  getApiServer: (state, getters) => {
    return state.apiServer
  },
  getTypeTable: (state, getters) => {
    return getters.typeTable
  },
  getItemsDataTable: (state, getters) => {
    return getters.itemsDataTable
  },
  getStatusSaveForm: (state, getters) => {
    return state.statusData
  },
  getItemsMedicines: (state, getters) =>{
    return getters.itemsMedicine
  }
}


// actions
const actions = {
  async statusMedicineShop ({ commit }, {medicine, isShop}) {
    console.log(medicine)
    console.log(isShop)
    console.log('****************************----------------------------')


    commit('statusMedicineShop', {medicine,isShop})
  },
  async getItemsMedicine  ({ commit }) {
    const items = await apiTable.getItems(state.apiServer,'medicine')
    commit('setItemsMedicine', items.data)
  },
  async addItemsTable ({ commit, state }, apiTypeTable) {
    console.log(apiTypeTable)
    const items = await apiTable.getItems(
      state.apiServer,
      apiTypeTable,
    )
    commit('pushItemsTable', items.data)
  },
  async saveItemsForm({ commit, state }, data) {
    console.log(data)
    const saveData = await apiTable.saveItems(
      state.apiServer,
      data.api,
      data.form
    )
    if (data.api === 'promotion' || data.api === 'medicine') {
      console.log(saveData)
      // SAVE MEDICINES FROM PROMOTION
      const idData = saveData.data.id
      data.medicines.forEach(async element => {
        console.log(element)
        const saveData = await apiTable.saveItems(
          state.apiServer,
          data.api === 'promotion' ? 'promotion_medicines' : 'factura_medicines',
          {promotion_id: idData, invoice_id: idData, medicine_id: element}
        )
        console.log(' MEDICINA GUARDADA ', saveData)
      });
    }
      commit('saveItemForm')
  },

  async editItemsForm({ commit, state }, data) {
    console.log(data)
    // const saveData = await apiTable.editItems(
    //   state.apiServer,
    //   data.api,
    //   data.form
    // )
    if (data.api === 'promotion' || data.api === 'medicine') {
      // SAVE MEDICINES FROM PROMOTION
      const {id} = data.form
      const {itemBefore} = data
      console.log(id)
      console.log(itemBefore)
      let medicinesToSave = []
      let medicinesToDelete = []
      data.medicines.forEach(async element => {
        console.log(element)
        const item = await itemBefore.promotion_medicines.find((medicine) => medicine.id === element)
        console.log(item)
        if(!item){
          medicinesToSave.push(element)
        } else {
          medicinesToDelete.push(element)
        }
      });
      console.log('medicien to dsave', medicinesToSave)
      console.log('medicien to dsave', medicinesToDelete)
    }
      commit('saveItemForm')
  },
  
  async savePromotionMedicines({commit, state}, data) {
    console.log('.................................')
    console.log(data)
    // const saveData = await apiTable.saveItems(
    //   state.apiServer,
    //   data.api,
    //   data.form
    // )
    // commit('saveItemForm')
  }
}



// mutations
const mutations = {
  statusMedicineShop(state, {medicine, isShop}) {
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++')
    const item = state.itemsMedicine.find((item) => item.id === medicine.id)
    if (item) item.isShop = isShop 
    console.log(item)
    
    console.log(item, '++++++++++++++++++++++++++++++++++++++++++++++++++')
    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++')
    
  },
  setItemsMedicine(state, data) {
    state.itemsMedicine = data
  },
  pushItemsTable (state, data) {
    state.itemsDataTable = data
  },
  saveItemForm(state){
    state.statusData = true
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}