<template>
  <div class="container-fluid p-0">
    <div class="row justify-content-center">
      <button
        class="btn btn-ss-blue text-white d-xl-none float-start"
        @click.prevent="showSideBar"
      >
        <i class="fas fa-bars"></i>
      </button>
      <div class="col-lg-2 m-0 p-0 d-none d-xl-block" id="sidebarContainer">
        <!--sidebar-->
        <sidebar
          :dynamic_component="dynamic_component"
          :changeDynamicComponent="changeDynamicComponent"
        />
      </div>
      <div class="col-sm-12 col-md-12 col-lg-10 col-xl-8 w-75">
        <!--dynamic content goes here-->
        <keep-alive>
          <component
            :is="dynamic_component"
            :changeDynamicComponent="changeDynamicComponent"
          ></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import sidebar from "@/components/sidebar";
import SBhome from "@/components/SBhome/SBhome.vue";
import SBdashboard from "@/components/SBdashboard.vue";
import newUser from "@/components/SBusers/newUser.vue";
import usersList from "@/components/SBusers/usersList.vue";
import newProduct from "@/components/SBproducts/newProduct.vue";

export default {
  name: "dashboard",
  components: { sidebar, SBhome, SBdashboard, newUser, usersList, newProduct },
  data() {
    return {
      dynamic_component: "SBhome",
    };
  },
  methods: {
    changeDynamicComponent(val) {
      this.dynamic_component = val;
    },
    showSideBar() {
      let sideBar = document.getElementById("sidebarContainer");
      sideBar.classList.toggle("d-none");
      sideBar.classList.toggle("position-absolute");
      sideBar.classList.toggle("w-auto");
    },
  },
  beforeRouteEnter(to, from, next) {
    if (store.state.authenticated) {
      next();
    } else {
      next({ name: "home" });
    }
  },
};
</script>

<style scoped>
.w-100-imp {
  width: 100% !important;
}
</style>
