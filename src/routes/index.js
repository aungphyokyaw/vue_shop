import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Dashboard from "../views/Dashboard";
import Cart from "../views/Cart";
import DetailsProduct from "../views/DetailsProduct";

let routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/details/:id",
    props: true,
    name: "DetailsProduct",
    component: DetailsProduct,
  },
];

let router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
