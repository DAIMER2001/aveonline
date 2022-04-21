import apiProducts from '../../scripts/api/apiProducts.js'

// initial state
// shape: [{ id, quantity }]
const state = {
  items: [],
  checkoutStatus: null
}

// getters
const getters = {
  cartProducts: (state, getters, rootState) => {
    return state.items.map(({ id, quantity }) => {
      const product = rootState.products.all.find(product => product.id === id)
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity
      }
    })
  },

  cartTotalPrice: (state, getters) => {
    return getters.cartProducts.reduce((total, product) => {
      return total + product.price * product.quantity
    }, 0)
  }
}

// actions
const actions = {
  checkout ({ commit, state }, products) {
    const savedCartItems = [...state.items]
    commit('setCheckoutStatus', null)
    // empty cart
    commit('setCartItems', { items: [] })
    apiProducts.buyProducts(
      products,
      () => commit('setCheckoutStatus', 'successful'),
      (res) => {
        commit('setCheckoutStatus', 'failed')
        console.log(res)
        // rollback to the cart saved before sending the request
        // commit('setCartItems', { items: savedCartItems })
      }
    )
  },

  addProductToCart ({ state, commit }, medicine) {
      if(state.items.length){
        const isShopMedicine = state.items.find((medicineShop) => medicineShop.id === medicine.id)
        if (isShopMedicine) {
        commit('setCartItems', state.items.filter((medicineShop) => medicineShop.id != medicine.id))
        } else {
          commit('pushMedicine', medicine)
        }
      } else {
        commit('pushMedicine', medicine)
      }
    }
  }

// mutations
const mutations = {
  pushMedicine (state, { items }) {
    console.log(items)
    state.items.push(items)
  },

  setCartItems (state, { items }) {
    state.items = items
  },

  incrementItemQuantity (state, { id }) {
    const cartItem = state.items.find(item => item.id === id)
    cartItem.quantity++
  },

  setCheckoutStatus (state, status) {
    state.checkoutStatus = status
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}