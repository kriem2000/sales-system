<template>
  <div class="home">
    <!--auth card-->
    <auth v-show="toggleAuthModal"></auth>

    <!--heading-->
    <nav class="navbar navbar-expand-lg bg-transparent">
      <div class="container-fluid p-4">
        <!--navbar brand-->
        <span class="navbar-brand mb-0 h1 w-auto">
          <img
            class="w-auto"
            src="/img/home_logo.png"
            alt=""
            width="50"
            height="50"
          />
          <p class="fs-5 d-inline">منظومة مبيعات</p>
        </span>
        <!--header menu-->
        <div class="float-sm-start float-lg-end">
          <ul
            class="
              navbar-nav
              me-auto
              mb-2 mb-lg-0
              gap-3
              mt-3
              d-sm-flex
              flex-row
            "
          >
            <li class="nav-item">
              <a
                class="
                  nav-link
                  btn btn-ss-blue
                  rounded-pill
                  text-white
                  btn-sm
                  p-2
                "
                @click.prevent="toggleAuthModalAction"
                v-if="!authenticated"
                >تسجيل الدخول</a
              >
              <a
                class="
                  nav-link
                  btn btn-ss-blue
                  rounded-pill
                  text-white
                  btn-sm
                  p-2
                "
                v-else
                @click.prevent="signOut"
                >تسجيل الخروج</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link btn btn-sm text-dark" href="#">المزيد</a>
            </li>
            <li class="nav-item">
              <a class="nav-link btn btn-sm text-dark" href="#">En</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!--home grid-->
    <div class="container mt-2">
      <div class="row">
        <div class="col-lg-6 col-md-12 col-sm-12 pt-4">
          <div class="row text-center">
            <div class="col-12 text-center">
              <h2 class="home-col-left-title">
                شراء وبيع المنتجات على نظامنا الخاص بالمبيعات
              </h2>
            </div>
            <div class="col-12">
              <p class="home-col-left-desc">
                قم بتحرير المنتجات وإضافتها وإدارتها بنفسك
              </p>
            </div>
            <div class="col-12">
              <div class="text-center gap-3 px-5 mt-2">
                <a class="btn btn-lg btn-ss-blue text-white px-4 m-3"
                  >دليل الاستخدام</a
                >
                <router-link
                  :to="{ name: 'dashboard' }"
                  @click.prevent="sendToDB"
                  class="btn btn-lg btn-outline-ss-blue px-4 m-3"
                  >إذهب إلى لوحة التحكم</router-link
                >
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-12 col-sm-12 pt-4 text-center">
          <img src="/img/business.png" alt="" id="homeImg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import auth from "@/components/auth.vue";

export default {
  name: "home",
  data() {
    return {
      signOutUrl: "signOut",
    };
  },
  components: {
    auth,
  },
  computed: {
    ...mapState(["toggleAuthModal", "authenticated"]),
  },
  methods: {
    ...mapActions(["toggleAuthModalAction"]),
    async signOut() {
      let val = {
        url: this.signOutUrl,
      };
      await this.$store
        .dispatch("axiosPost", val)
        .then((response) => {
          console.log(response);
          this.$store.commit("setUnAuthenticated");
        })
        .catch((error) => {
          console.log(error.toJSON());
        });
      // window.location.reload();
    },
    sendToDB() {
      if (!this.authenticated) {
        this.$store.dispatch("toggleAuthModalAction");
      } else {
        return;
      }
    },
  },
};
</script>

<style scoped>
.home {
  background: url(/img/BuyAndSell.jpg) no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 100%;
  width: 100%;
  position: fixed;
  overflow: auto;
}
</style>
