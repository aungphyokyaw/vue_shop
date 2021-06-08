<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  ID
                </th>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Image
                </th>
                <th class="text-left">
                  Original Price
                </th>
                <th class="text-left">
                  Quantity actions
                </th>
                <th class="text-left">
                  Quantity
                </th>
                <th class="text-left">
                  Price
                </th>
                <th class="text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cart, index) in cartList" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ cart.title }}</td>
                <td>
                  <img
                    width="100"
                    height="100"
                    :src="cart.image"
                    alt="Image."
                  />
                </td>
                <td>$ {{ cart.price }}</td>
                <td class="text-no-wrap">
                  <v-btn class="purple" dark @click="increaseQty(cart)">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-btn class="pink ml-2" dark @click="decreaseQty(cart)">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </td>
                <td>{{ cart.qty }}</td>
                <td>{{ Number((cart.price * cart.qty).toFixed(2)) }}</td>
                <td>
                  <v-btn class="red" dark @click="deleteItem(cart)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr v-show="!cartList.length">
                <td colspan="8">
                  <v-banner one-line class="red--text">
                    <v-avatar slot="icon" color="warning" size="40">
                      <v-icon icon="mdi-cart" color="white">
                        mdi-cart
                      </v-icon>
                    </v-avatar>
                    There is nothing in your shopping cart.
                    <template v-slot:actions>
                      <v-btn text color="warning" :to="{ name: 'Dashboard' }">
                        Shop now
                      </v-btn>
                    </template>
                  </v-banner>
                </td>
              </tr>
              <tr>
                <td colspan="6">Total Price</td>
                <td colspan="2">$ {{ totalPrice }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <div class="loader" v-if="load">
        <v-progress-circular :size="70" color="success" indeterminate>
        </v-progress-circular>
      </div>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cartList: {},
    };
  },
  mounted() {
    this.cartList = this.$store.state.carts.sort(
      (a, b) => a.timestamp - b.timestamp
    );
  },
  computed: {
    totalPrice() {
      return this.cartList
        .reduce((total, cart) => (total += cart.qty * cart.price), 0)
        .toFixed(2);
    },
    load() {
      return this.$store.state.loader;
    },
  },
  methods: {
    increaseQty(cart) {
      this.$store.dispatch("increase", cart);
    },
    decreaseQty(cart) {
      this.$store.dispatch("decrease", cart);
    },
    deleteItem(cart) {
      this.$store.dispatch("delCart", cart);
    },
  },
};
</script>
<style scoped></style>
