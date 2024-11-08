<template>
  <div class="hello">
    <p>
      ACTION = {{ action }}<br />
      ID = {{ id }}<br />
      <a href="/#/drinks/list/all">Back to the list</a><br />
      <a href="/#/drinks/edit/0">Add a new drink</a><br />
    </p>

    <!-- For Datasheet: /drinks/show/42 -->
    <table v-if="action === 'show'" class="table table-striped table-bordered table-hover">
      <tr><td>ID</td><td>{{ oneDrink.id_drink }}</td></tr>
      <tr><td>NAME</td><td>{{ oneDrink.name_drink }}</td></tr>
      <tr><td>PRODUCTION PRICE</td><td>{{ oneDrink.price_production_drink }}</td></tr>
      <tr><td>SELLING PRICE</td><td>{{ oneDrink.price_selling_drink }}</td></tr>
      <tr><td>INGREDIENTS</td><td>{{ oneDrink.ingredient_drink }}</td></tr>
      <tr><td>QUANTITY</td><td>{{ oneDrink.quantity_drink }}</td></tr>
    </table>

    <!-- For Form: /drinks/edit/23 -->
    <table v-if="action === 'edit'" class="table table-striped table-bordered table-hover">
      <tr>
        <td>NAME</td>
        <td><input type="text" name="name_drink" v-model="oneDrink.name_drink" /></td>
      </tr>
      <tr>
        <td>PRODUCTION PRICE</td>
        <td><input type="number" name="price_production_drink" v-model="oneDrink.price_production_drink" /></td>
      </tr>
      <tr>
        <td>SELLING PRICE</td>
        <td><input type="number" name="price_selling_drink" v-model="oneDrink.price_selling_drink" /></td>
      </tr>
      <tr>
        <td>INGREDIENTS</td>
        <td><input type="text" name="ingredient_drink" v-model="oneDrink.ingredient_drink" /></td>
      </tr>
      <tr>
        <td>QUANTITY</td>
        <td><input type="number" name="quantity_drink" v-model="oneDrink.quantity_drink" /></td>
      </tr>
      <tr>
        <td colspan="2"><input type="button" value="SEND" @click="sendEditRequest()" /></td>
      </tr>
    </table>

    <!-- For List: /drinks/list/all -->
    <table v-if="action === 'list'" class="table table-striped table-bordered table-hover">
  <tr>
    <td>Image</td><td>ID</td><td>NAME</td><td>SHOW DATASHEET</td><td>EDIT DRINK</td><td>DELETE DRINK</td>
  </tr>
  <tr v-for="d of drinks" :key="d.id_drink">
    <td><img :src="d.image_url" alt="Drink Image" /></td>
    <td>{{ d.id_drink }}</td>
    <td>{{ d.name_drink }}</td>
    <td><a :href="'/#/drinks/show/' + d.id_drink">[SHOW]</a></td>
    <td><a :href="`/#/drinks/edit/${d.id_drink}`">[EDIT]</a></td>
    <td><input type="button" value="DELETE" @click="sendDeleteRequest(d.id_drink)" /></td>
  </tr>
</table>
  </div>
</template>

<script>
export default {
  name: 'Drinks',
  props: ['action', 'id'],
  data() {
    return {
      drinks: [],
      oneDrink: {
        id_drink: 0,
        name_drink: '',
        price_production_drink: 0,
        price_selling_drink: 0,
        ingredient_drink: '',
        quantity_drink: 0
      }
    };
  },
  methods: {
    async getAllData() {
      try {
        
        // Simulate API response with your JSON data
        this.drinks = [
          {
            id_drink: 1,
            name_drink: "Beer",
            price_production_drink: 50,
            price_selling_drink: 100,
            ingredient_drink: "Hops, Water, Yeast",
            quantity_drink: 200,
            image_url: valet-love/image/beer.jpeg
          },
          {
            id_drink: 2,
            name_drink: "Wine",
            price_production_drink: 100,
            price_selling_drink: 200,
            ingredient_drink: "Grapes, Yeast",
            quantity_drink: 150
          },
          {
            id_drink: 3,
            name_drink: "Whiskey",
            price_production_drink: 150,
            price_selling_drink: 300,
            ingredient_drink: "Grain, Water",
            quantity_drink: 100
          },
          {
            id_drink: 4,
            name_drink: "Soda",
            price_production_drink: 20,
            price_selling_drink: 50,
            ingredient_drink: "Carbonated Water, Sugar",
            quantity_drink: 300
          }
        ];
        this.refreshOneDrink();
      } catch (ex) {
        console.log(ex);
      }
    },
    async refreshOneDrink() {
      if (this.id === "all" || this.id === "0") return;
      this.oneDrink = this.drinks.find(drink => drink.id_drink == this.id);
    },
    async sendDeleteRequest(drink_id) {
      console.log(`Delete request for drink ID ${drink_id}`);
      // Implement deletion logic here
    },
    async sendEditRequest() {
      console.log("Send edit request", this.oneDrink);
      // Implement edit logic here
    }
  },
  watch: {
    id(newVal) {
      this.refreshOneDrink();
    }
  },
  created() {
    this.getAllData();
  }
};
</script>

<style scoped>
a {
  color: #42b983;
}
p {
  color: darkgray;
}
#app table {
  width: 95%;
  margin: 20px;
}
#app td {
  text-align: left;
}
</style>
