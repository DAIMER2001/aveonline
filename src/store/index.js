

import { createStore, createLogger } from 'vuex'
import cart from './modules/cart.js'
import products from './modules/products'
import infoModules from './infoModules'

const debug = import.meta.env.VITE_NODE_ENV !== 'production'


const state = {
}


export default createStore({
  modules: {
    cart,
    products,
    infoModules
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})