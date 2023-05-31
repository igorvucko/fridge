<template>
  <div>
    <h1>Fridge</h1>

    <v-data-table :headers="headers" :items="fridgeA" class="elevation-1">
      <!-- eslint-disable vue/valid-v-slot -->
      <template #item.name="{ item }">
        {{ item.name }}
      </template>
      <template #item.cost="{ item }">
        {{ item.cost }}
      </template>
      <template #item.expirationDate="{ item }">
        {{ item.expirationDate }}
      </template>
      <template #item.quantity="{ item }">
        {{ item.quantity }}
      </template>
      <!-- eslint-disable vue/valid-v-slot -->
      <template #item.action="{ item }">
        <v-icon small class="mr-2" @click="startUpdate(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="removeItem(item.name)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <div v-if="updateItem">
      <input v-model="updateItem.name" placeholder="Item name">
      <input v-model="updateItem.cost" placeholder="Item cost">
      <input v-model="updateItem.expirationDate" placeholder="Expiration Date">
      <input v-model="updateItem.quantity" placeholder="Quantity">
      <v-btn color="primary" @click="commitUpdate">
        Update Item
      </v-btn>
      <v-btn color="red" @click="cancelUpdate">
        Cancel
      </v-btn>
    </div>

    <div v-else>
      <input v-model="newItem.name" placeholder="Item name">
      <input v-model="newItem.cost" placeholder="Item cost">
      <input v-model="newItem.expirationDate" placeholder="Expiration Date">
      <input v-model="newItem.quantity" placeholder="Quantity">
      <v-btn color="primary" dark @click="addItem">
        Add Item
      </v-btn>
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
      oldName: null,
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Expiration Date', value: 'expirationDate' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Cost', value: 'cost' },
        { text: 'Actions', value: 'action', sortable: false }
      ]
    }
  },
  computed: {
    ...mapState(['fridgeA'])
  },
  methods: {
    ...mapMutations(['addToFridge', 'removeFromFridge', 'updateFridgeItem']),
    ...mapActions(['saveToLocalStorage']),
    startUpdate (item) {
      // Logic for starting the update process
    },
    commitUpdate () {
      // Logic for committing the update
    },
    cancelUpdate () {
      // Logic for cancelling the update
    },
    removeItem (itemName) {
      // Logic for removing an item
    },
    addItem () {
      // Logic for adding an item to the fridgeA array
      const newItem = {
        name: this.newItem.name,
        cost: this.newItem.cost,
        expirationDate: this.newItem.expirationDate,
        quantity: this.newItem.quantity
      }

      // Dispatch the addToFridge mutation from Vuex store
      this.$store.commit('addToFridge', newItem)

      // Clear the input fields after adding the item
      this.newItem.name = ''
      this.newItem.cost = 0
      this.newItem.expirationDate = ''
      this.newItem.quantity = 0
    }
  }
}
</script>
