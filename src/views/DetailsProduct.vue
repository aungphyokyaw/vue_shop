<template lang="">
  <v-row>
    <v-col cols="12">
      <v-card v-if="!loader">
        <div class="text-center">
          <img :src="product.image"  />
        </div>
        <v-card-title>
          {{ product.title }}
        </v-card-title>
        <v-card-subtitle>
            {{ product.description }}
        </v-card-subtitle>
        <v-card-text>
          <v-chip color="primary">{{product.category}}</v-chip> Price - ${{product.price}}
        </v-card-text>
        <v-divider class="mx-5"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" dark @click="addCart">Add to cart</v-btn>
        </v-card-actions>
      </v-card>
      <div class="loader" v-else>
        <v-progress-circular :size="70" color="success" indeterminate>
        </v-progress-circular>
      </div>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props:['id'],
  computed:{
    product(){
      return this.$store.state.product
    },
    loader(){
      return this.$store.state.loader
    }
  },
  created() {
    this.$store.dispatch("fetchProductDetail",this.id)
    // fetch(`https://fakestoreapi.com/products/${this.id}`)
    //     .then(res=>res.json())
    //     .then(data=>{
    //       this.product=data
    //       this.loader=false
    //     })
  },
  methods:{
    addCart(){
      this.$store.dispatch( 'addToCart',this.product)
    }
  }

};
</script>
<style>
  .loader{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 300;
    justify-content: center;
    align-items: center;
    display: flex;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3));
  }

</style>
