<template>
  <v-row>
    <div class="loader" v-if="loader">
      <v-progress-circular :size="70" color="primary" indeterminate>
      </v-progress-circular>
    </div>
    <v-col cols="4" v-for="product in products" :key="product.id" v-else>
      <v-card >
        <div class="text-center">
          <img
              :src="product.image"
              width="200"
              height="200"
          />
        </div>
        <v-card-title>
          {{ product.title }}
        </v-card-title>
        <div class="d-flex">
          <v-card-subtitle>
            Price - {{ product.price }}
          </v-card-subtitle>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn color="primary" @click="detailProduct(product)">
              Detail
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" v-if="!loader">
      <div class="text-center">
        <v-pagination
            v-model="page"
            :length="paginationLength"
            circle
        ></v-pagination>
      </div>
    </v-col>
  </v-row>
</template>

<script>

export default {
  data () {
    return {
      page: 1,
    }
  },
  computed:{
    products(){
      let start = 0;
      let perPage = 6;
      if (this.page > 1){
        start = (this.page-1)*perPage
      }
      return this.$store.state.products.slice(start,perPage*this.page)
    },
    paginationLength(){
      return Math.ceil(this.$store.state.products.length / 6)
    },
    loader(){
      return this.$store.state.loader
    }
  },
  created() {
    // this.$store.commit('fetchProduct')
    this.$store.dispatch('fetchProduct')
  },
  methods:{
    detailProduct(product){
      this.$router.push('/details/'+product.id)
    }
  }
};
</script>

<style>
/*.loader{*/
/*  position: fixed;*/
/*  top: 0;*/
/*  left: 0;*/
/*  z-index: 300;*/
/*  justify-content: center;*/
/*  align-items: center;*/
/*  display: flex;*/
/*  width: 100%;*/
/*  height: 100%;*/
/*  background: linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3));*/
/*}*/

</style>
