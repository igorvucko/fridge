export const state = () => ({
  fridgeA: []
})

export const mutations = {
  setFridge (state, fridge) {
    state.fridgeA = fridge
  },
  addToFridge (state, item) {
    state.fridgeA.push(item)
  },
  removeFromFridge (state, itemName) {
    state.fridgeA = state.fridgeA.filter(item => item.name !== itemName)
  },
  updateFridgeItem (state, updatedItem) {
    const index = state.fridgeA.findIndex(item => item.name === updatedItem.oldName)
    if (index !== -1) {
      state.fridgeA[index] = { ...state.fridgeA[index], ...updatedItem.newItem }
    }
  }
}

export const actions = {
  nuxtServerInit ({ dispatch }) {
    if (process.browser) {
      dispatch('loadLocalStorage')
    }
  },
  loadLocalStorage ({ commit }) {
    if (process.browser && localStorage.getItem('fridgeA')) {
      commit('setFridge', JSON.parse(localStorage.getItem('fridgeA')))
    }
  },
  saveToLocalStorage ({ state }) {
    if (process.browser) {
      localStorage.setItem('fridgeA', JSON.stringify(state.fridgeA))
    }
  }
}
