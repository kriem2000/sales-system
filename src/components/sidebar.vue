<template>
  <main>
    <div
      class="d-flex flex-column flex-shrink-0 p-4 text-white bg-ss-blue"
      id="sidebar"
    >
      <!--sidebar brand-->
      <router-link
        :to="{ name: 'home' }"
        class="
          d-flex
          align-iteme-center
          mb-3 mb-md-0
          ms-md-auto
          text-white text-decoration-none
        "
      >
        <span class="fs-4">لوحة التحكم</span>
      </router-link>
      <hr />
      <!--primary menu iteme-->
      <ul class="nav nav-pills flex-column mb-auto text-end p-0">
        <!--sidebar home-->
        <li
          class="nav-item my-1"
          v-if="
            hasRole('seller') || hasRole('admin') || hasRole('sales manager')
          "
        >
          <a
            href="#"
            class="nav-link active-route text-white"
            aria-current="page"
            @click.prevent="
              changeDynamicComponent('SBhome');
              changeActiveComponent($event);
            "
          >
            <i class="fas fa-home mx-1"></i>
            الرئيسية
          </a>
        </li>
        <!--sidebar dashboard-->
        <li class="my-1" v-if="hasRole('admin') || hasRole('accountant')">
          <a
            href="#"
            class="nav-link text-white"
            @click.prevent="
              changeDynamicComponent('SBdashboard');
              changeActiveComponent($event);
            "
          >
            <i class="fas fa-tachometer-alt mx-1"></i>
            لوحة التحكم
          </a>
        </li>
        <!--sidebar bills-->
        <li
          class="my-1"
          v-if="
            hasRole('admin') ||
            hasRole('sales manager') ||
            hasRole('accountant')
          "
        >
          <a href="#" class="nav-link text-white">
            <i class="fas fa-wallet mx-1"></i>
            <button
              class="btn btn-toggle rounded text-white p-0 ps-1 mb-1"
              data-bs-toggle="collapse"
              data-bs-target="#bills-collapse"
              aria-expanded="true"
            >
              الفواتير
            </button>
            <div class="collapse" id="bills-collapse">
              <ul class="btn-toggle-nav list-unstyled fw-normal small p-0 pe-2">
                <!-- add a new imported bill -->
                <li v-if="hasRole('admin') || hasRole('sales manager')">
                  <a
                    href="#"
                    class="link-light rounded"
                    @click.prevent="
                      changeDynamicComponent('newImportedBill');
                      changeActiveComponent($event);
                    "
                  >
                    <i class="fas fa-plus m-1"></i>
                    إضافة فاتورة مستوردة
                  </a>
                </li>
                <!-- all the bills list -->
                <li>
                  <a
                    href="#"
                    class="link-light rounded"
                    @click.prevent="
                      changeDynamicComponent('billsList');
                      changeActiveComponent($event);
                    "
                  >
                    <i class="fas fa-list-alt mx-1"></i>
                    قائمة الفواتير
                  </a>
                </li>
              </ul>
            </div>
          </a>
        </li>
        <!--sidebar products-->
        <li
          class="my-2 me-3 Collapsible-item"
          v-if="
            hasRole('seller') || hasRole('admin') || hasRole('sales manager')
          "
        >
          <i class="fas fa-th mx-1"></i>
          <button
            class="btn btn-toggle rounded text-white p-0 ps-1 mb-1"
            data-bs-toggle="collapse"
            data-bs-target="#product-collapse"
            aria-expanded="true"
          >
            المنتجات
          </button>
          <div class="collapse" id="product-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal small p-0 pe-2">
              <!-- add a new product -->
              <li v-if="hasRole('admin') || hasRole('sales manager')">
                <a
                  href="#"
                  class="link-light rounded"
                  @click.prevent="
                    changeDynamicComponent('newProduct');
                    changeActiveComponent($event);
                  "
                >
                  <i class="fas fa-plus m-1"></i>
                  اضافة عنصر جديد
                </a>
              </li>
              <!-- index and search for products -->
              <li
                v-if="
                  hasRole('seller') ||
                  hasRole('admin') ||
                  hasRole('sales manager')
                "
              >
                <a
                  @click.prevent="
                    changeDynamicComponent('productsList');
                    changeActiveComponent($event);
                  "
                  href="#"
                  class="link-light rounded"
                >
                  <i class="fas fa-capsules m-1"></i>
                  قائمة المنتجات</a
                >
              </li>
            </ul>
          </div>
        </li>
        <!--sidebar users-->
        <li class="my-2 me-3 Collapsible-item" v-if="hasRole('admin')">
          <i class="fas fa-users mx-1"></i>
          <button
            class="btn btn-toggle rounded text-white p-0 ps-1 mb-1"
            data-bs-toggle="collapse"
            data-bs-target="#user-collapse"
            aria-expanded="true"
          >
            المستخدمين
          </button>
          <div class="collapse" id="user-collapse">
            <ul class="btn-toggle-nav list-unstyled fw-normal small p-0 pe-2">
              <!--add new user-->
              <li>
                <a
                  href="#"
                  class="link-light rounded"
                  @click.prevent="
                    changeDynamicComponent('newUser');
                    changeActiveComponent($event);
                  "
                >
                  <i class="fas fa-user-plus m-1"></i>
                  اضافة مستخدم جديد
                </a>
              </li>
              <li>
                <!--Users List-->
                <a
                  href="#"
                  class="link-light rounded"
                  @click.prevent="
                    changeDynamicComponent('usersList');
                    changeActiveComponent($event);
                  "
                >
                  <i class="fas fa-address-book m-1"></i>
                  قائمة المستخدمين
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <!--secondary menu iteme-->
      <ul class="bottom-0 nav nav-pills flex-column text-end p-0">
        <!--sidebar setting-->
        <li class="my-1">
          <a href="#" class="nav-link text-white">
            <i class="fas fa-cog mx-1"></i>
            الاعدادات
          </a>
        </li>
        <!--sidebar profile-->
        <li class="my-1">
          <a
            href="#"
            class="nav-link text-white"
            @click.prevent="
              changeDynamicComponent('userStatistics');
              changeActiveComponent($event);
            "
          >
            <i class="far fa-user-circle mx-1"></i>
            الملف الشخصي
          </a>
        </li>
        <!--sidebar logout button-->
        <li class="my-1" @click.prevent="signOut">
          <a
            href="#"
            id="sidebarLogoutBtn"
            class="me-3 btn btn-white rounded-pill"
          >
            <i class="fas fa-sign-out-alt mx-1"></i>
            تسجيل الخروج
          </a>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import axiosConfig from "@/includes/axiosConfig";
import { mapGetters } from "vuex";
export default {
  name: "sidebar",
  data() {
    return {
      signOutUrl: "signOut",
    };
  },
  computed: {
    ...mapGetters({
      config: "config",
      user: "user",
    }),
  },
  props: {
    dynamic_component: {
      type: String,
      required: true,
    },
    changeDynamicComponent: {
      type: Function,
      required: true,
    },
  },
  methods: {
    async signOut() {
      await axiosConfig
        .get(this.signOutUrl, this.config)
        .then((response) => {
          console.log(response);
          this.$store.commit("setUnAuthenticated");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.toJSON());
        });
    },
    changeActiveComponent(e) {
      var as = document.querySelectorAll("#sidebar a");
      for (let i = 0; i < as.length; i++) {
        as[i].classList.toggle("active-route", false);
      }
      e.currentTarget.classList.toggle("active-route");
    },
    hasRole(roleName) {
      let hasRole = false;
      let allRoles = this.user.roles;
      allRoles.map((val) => {
        if (val.name == roleName) {
          hasRole = true;
        }
      });
      return hasRole;
    },
  },
};
</script>
