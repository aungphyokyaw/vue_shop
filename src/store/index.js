import Vue from "vue";
import Vuex from "vuex";
import fireStore from "@/firebase/firebase";
Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    products: [],
    product: {},
    loader: false,
    carts: [],
  },
  mutations: {
    setLoader(state, payload) {
      state.loader = payload;
      state.no = payload;
    },
    fetchProduct(state, payload) {
      state.products = payload;
      state.loader = false;
    },
    fetchProductDetail(state, payload) {
      state.product = payload;
      state.loader = false;
    },
    addToCart(state, product) {
      state.carts.push(product);
    },
    increase(state, payload) {
      let cart = state.carts.find((c) => c.title === payload.title);
      cart.qty++;
    },
    decrease(state, payload) {
      let cart = state.carts.find((c) => c.title === payload.title);
      if (cart.qty === 1) return;
      cart.qty--;
    },
    delCart(state, deleteId) {
      let index = state.carts.findIndex((cart) => cart.id === deleteId);
      state.carts.splice(index, 1);
    },
    retrieveCarts(state, payload) {
      state.carts.push(payload);
      state.loader = false;
    },
    updateCart(state, payload) {
      let updateIndex = state.carts.findIndex((cart) => {
        cart.id === payload.id;
      });
      Object.assign(state.carts[updateIndex], payload.update);
    },
  },
  actions: {
    fetchProduct(context) {
      context.commit("setLoader", true);
      fetch("https://fakestoreapi.com/products/")
        .then((res) => res.json())
        .then((data) => {
          context.commit("fetchProduct", data);
        });
    },
    fetchProductDetail(context, payload) {
      context.commit("setLoader", true);
      fetch(`https://fakestoreapi.com/products/${payload}`)
        .then((res) => res.json())
        .then((data) => {
          context.commit("fetchProductDetail", data);
        });
    },
    addToCart(context, product) {
      let isInCart = context.state.carts.find(
        (cart) => cart.title === product.title
      );
      if (isInCart) {
        fireStore
          .collection("carts")
          .doc(isInCart.productId)
          .update({
            qty: (isInCart.qty += 1),
          })
          .then(
            context.commit("updateCart", {
              id: isInCart.id,
              update: {
                qty: isInCart.qty + 1,
              },
            })
          );
      } else {
        let newProduct = { ...product, qty: 1 };
        fireStore
          .collection("carts")
          .add({
            ...newProduct,
            timestamp: Date.now(),
          })
          .then((docRef) => {
            let localCart = { ...newProduct, productId: docRef.id };
            context.commit("addToCart", localCart);
          });
      }
    },
    fetchCarts(context) {
      context.commit("setLoader", true);
      fireStore
        .collection("carts")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let ftCart = { ...doc.data(), productId: doc.id };
            context.commit("retrieveCarts", ftCart);
          });
        });
      context.commit("setLoader", false);
    },
    increase(context, payload) {
      fireStore
        .collection("carts")
        .doc(payload.productId)
        .update({
          qty: payload.qty + 1,
        });
      context.commit("increase", payload);
    },
    decrease(context, payload) {
      if (payload.qty > 1) {
        fireStore
          .collection("carts")
          .doc(payload.productId)
          .update({
            qty: payload.qty - 1,
          });
      }
      context.commit("decrease", payload);
    },
    delCart(context, payload) {
      fireStore
        .collection("carts")
        .doc(payload.productId)
        .delete();
      context.commit("delCart", payload.id);
    },
  },
  getters: {
    carts(state) {
      return state.carts;
    },
  },
});

export default store;
