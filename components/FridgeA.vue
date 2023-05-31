<template>
  <div>
    <h1>Fridge</h1>
    <ul>
      <li v-for="item in fridgeA" :key="item.name">
        {{ item.name }} - {{ item.expirationDate }} - {{ item.quantity }} - ${{ item.cost }}
        <button @click="startUpdate(item)">
          Update
        </button>
        <button @click="removeItem(item.name)">
          Remove
        </button>
      </li>
    </ul>
    <div v-if="updateItem">
      <input v-model="updateItem.name" placeholder="Item name">
      <input v-model="updateItem.cost" placeholder="Item cost">
      <input v-model="updateItem.expirationDate" placeholder="Expiration Date">
      <input v-model="updateItem.quantity" placeholder="Quantity">
      <button @click="commitUpdate">
        Update Item
      </button>
      <button @click="cancelUpdate">
        Cancel
      </button>
    </div>
    <div v-else>
      <input v-model="newItem.name" placeholder="Item name">
      <input v-model="newItem.cost" placeholder="Item cost">
      <input v-model="newItem.expirationDate" placeholder="Expiration Date">
      <input v-model="newItem.quantity" placeholder="Quantity">
      <button @click="addItem">
        Add Item
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  data () {
    return {
      newItem: {
        name: '',
        cost: 0,
        expirationDate: '',
        quantity: 0
      },
      updateItem: null,
      oldName: null
    }
  },
  computed: {
    ...mapState(['fridgeA'])
  },
  methods: {
    ...mapMutations(['addToFridge', 'removeFromFridge', 'updateFridgeItem']),
    ...mapActions(['saveToLocalStorage']),
    addItem () {
      if (this.newItem.name !== '' && this.newItem.cost > 0 && this.newItem.expirationDate !== '' && this.newItem.quantity > 0) {
        this.addToFridge(this.newItem)
        this.newItem = { name: '', cost: 0, expirationDate: '', quantity: 0 }
        this.saveToLocalStorage()
      }
    },
    removeItem (itemName) {
      this.removeFromFridge(itemName)
      this.saveToLocalStorage()
    },
    startUpdate (item) {
      this.oldName = item.name
      this.updateItem = { ...item }
    },
    commitUpdate () {
      if (this.updateItem.name !== '' && this.updateItem.cost > 0 && this.updateItem.expirationDate !== '' && this.updateItem.quantity > 0) {
        this.updateFridgeItem({ oldName: this.oldName, newItem: this.updateItem })
        this.updateItem = null
        this.oldName = null
        this.saveToLocalStorage()
      }
    },
    cancelUpdate () {
      this.updateItem = null
      this.oldName = null
    }
  }
}
</script>
