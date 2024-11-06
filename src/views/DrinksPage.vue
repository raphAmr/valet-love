<template>
  <div class="drinks">
    <p>
      ACTION = {{ action }}<br />
      ID = {{ id }}<br />
      <a href="/#/drinks/list/all">Back to the list</a><br />
      <a href="/#/drinks/edit/0">Add a new drink</a><br />
    </p>

    <!-- Display drink details -->
    <table v-if="action === 'show'" class="table table-striped table-bordered table-hover">
      <tr><td>ID</td><td>{{ oneDrink.id_drink }}</td></tr>
      <tr><td>NAME</td><td>{{ oneDrink.name_drink }}</td></tr>
      <tr><td>PRODUCTION COST</td><td>{{ oneDrink.price_production_drink }}</td></tr>
      <tr><td>SELLING PRICE</td><td>{{ oneDrink.price_selling_drink }}</td></tr>
      <tr><td>INGREDIENTS</td><td>{{ oneDrink.ingredient_drink }}</td></tr>
      <tr><td>QUANTITY</td><td>{{ oneDrink.quantity_drink }}</td></tr>
    </table>

    <!-- Form to edit or add a drink -->
    <table v-if="action === 'edit'" class="table table-striped table-bordered table-hover">
      <tr><td>NAME</td>
        <td><input type="text" v-model="oneDrink.name_drink" /></td></tr>
      <tr><td>PRODUCTION COST</td>
        <td><input type="number" v-model="oneDrink.price_production_drink" /></td></tr>
      <tr><td>SELLING PRICE</td>
        <td><input type="number" v-model="oneDrink.price_selling_drink" /></td></tr>
      <tr><td>INGREDIENTS</td>
        <td><input type="text" v-model="oneDrink.ingredient_drink" /></td></tr>
      <tr><td>QUANTITY</td>
        <td><input type="number" v-model="oneDrink.quantity_drink" /></td></tr>
      <tr><td colspan="2">
        <input type="button" value="SEND" @click="sendEditRequest()" />
      </td></tr>
    </table>

    <!-- List of all drinks -->
    <table v-if="action === 'list'" class="table table-striped table-bordered table-hover">
      <tr>
        <td>ID</td><td>NAME</td><td>PRODUCTION COST</td><td>SELLING PRICE</td><td>INGREDIENTS</td><td>QUANTITY</td><td>SHOW DETAILS</td><td>EDIT</td><td>DELETE</td>
      </tr>
      <tr v-for="d of drinks" :key="d.id_drink">
        <td>{{ d.id_drink }}</td>
        <td>{{ d.name_drink }}</td>
        <td>{{ d.price_production_drink }}</td>
        <td>{{ d.price_selling_drink }}</td>
        <td>{{ d.ingredient_drink }}</td>
        <td>{{ d.quantity_drink }}</td>
        <td><a :href="'/#/drinks/show/' + d.id_drink">[SHOW]</a></td>
        <td><a :href="`/#/drinks/edit/${d.id_drink}`">[EDIT]</a></td>
        <td><input type="button" value="DELETE" @click="sendDeleteRequest(d.id_drink)" /></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'DrinksPage',
  props: ['action', 'id'],
  data() {
    return {
      drinks: [], // Initialize as an empty array to hold the drinks data
      oneDrink: {
        id_drink: 0,
        name_drink: '',
        price_production_drink: 0,
        price_selling_drink: 0,
        ingredient_drink: '',
        quantity_drink: 0
      }
    }
  },
  methods: {
    async getAllData() {
      try {
        const response = await fetch('/source/json/drinks.json');
        this.drinks = await response.json();
      } catch (error) {
        console.error("Error loading data from drinks.json:", error);
      }
      this.refreshOneDrink();
    },
    refreshOneDrink() {
      if (this.$props.id === 'all' || this.$props.id === '0') return;
      this.oneDrink = this.drinks.find(drink => drink.id_drink == this.$props.id);
    },
    sendDeleteRequest(drinkId) {
      this.drinks = this.drinks.filter(drink => drink.id_drink !== drinkId);
    },
    sendEditRequest() {
      const index = this.drinks.findIndex(d => d.id_drink === this.oneDrink.id_drink);
      if (index !== -1) {
        this.drinks.splice(index, 1, { ...this.oneDrink });
      } else {
        this.drinks.push({ ...this.oneDrink });
      }
    }
  },
  watch: {
    id(newVal, oldVal) {
      this.refreshOneDrink();
    }
  },
  created() {
    this.getAllData();
  }
}
</script>

<style scoped>
a {
  color: #42b983;
}
p {
  color: darkgray;
}
.table {
  width: 95%;
  margin: 20px;
}
.table td {
  text-align: left;
}
</style>
