<template>
  <div class="container p-0">
    <div class="row justify-content-center">
      <div class="col-lg-2 d-block" id="sidebarContainer">
        <!--sidebar-->
        <sidebar
          :dynamic_component="dynamic_component"
          :changeDynamicComponent="changeDynamicComponent"
        />
      </div>
      <div class="col-lg-10">
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
import newImportedBill from "@/components/SBbills/newImportedBill.vue";
import billsList from "@/components/SBbills/billsList.vue";

export default {
  name: "dashboard",
  components: {
    sidebar,
    SBhome,
    SBdashboard,
    newUser,
    usersList,
    newProduct,
    newImportedBill,
    billsList,
  },
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
