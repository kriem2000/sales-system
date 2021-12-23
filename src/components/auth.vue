<template>
  <div id="auth-card">
    <div
      class="
        w-50
        position-absolute
        top-50
        start-50
        translate-middle
        container
        border
        rounded
        text-center
        bg-white
      "
    >
      <div class="row justify-content-center bg-white p-3">
        <div class="col-12 text-end">
          <span
            class="float-right close-auth-card"
            @click.prevent="toggleAuthModalAction"
            ><i class="fas fa-times"></i
          ></span>
        </div>
        <div class="col-12">
          <h2 class="py-2 fw-bold-800">سجل الدخول الي حسابك</h2>
          <!--auth from-->
          <vee-form class="p-4" @submit="signIn" :validationSchema="authSchema">
            <div class="form-floating mb-3">
              <vee-field
                name="email"
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label for="floatingInput">البريد الالكتروني</label>
              <div class="text-start text-danger fw-bold p-2">
                <ErrorMessage name="email" />
              </div>
            </div>
            <div class="form-floating">
              <vee-field
                name="password"
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label for="floatingPassword">كلمة المرور</label>
            </div>
            <div class="text-start text-danger fw-bold p-2">
              <ErrorMessage name="password" />
            </div>
            <div class="form-check text-start py-2">
              <vee-field
                name="rememberMe"
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault">
                تذكرني
              </label>
            </div>
            <button
              type="submit"
              class="btn btn-lg btn-ss-blue text-white px-4 w-100"
              :disabled="in_submition"
            >
              تسجيل الدخول
            </button>
            <div
              :class="alert_class"
              class="text-start w-50 p-2 d-flex flex-row mt-2"
              v-show="show_alert"
            >
              <loading v-show="loading" />
              <span>{{ alert_massage }}</span>
            </div>
          </vee-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import loading from "./loading.vue";

export default {
  name: "auth",
  components: {
    loading,
  },
  data() {
    return {
      signInUrl: "auth/signIn",
      authSchema: {
        email: "required|email",
        password: "required|min:5|max:20",
      },
      in_submition: false,
      show_alert: false,
      alert_class: "",
      alert_massage: "",
      loading: false,
    };
  },
  computed: {
    ...mapState(["toggleAuthModal", "token"]),
  },
  methods: {
    ...mapActions(["toggleAuthModalAction"]),
    async signIn(values) {
      this.in_submition = true;
      this.show_alert = true;
      this.loading = true;
      this.alert_class = "text-primary font-bold";
      this.alert_massage = "الرجاء الانتظار";
      values.rememberMe = values.rememberMe != null ? true : false;
      values.url = this.signInUrl;

      await this.$store
        .dispatch("axiosPost", values)
        .then((res) => {
          console.log(res);
          let data = [];
          data["user"] = res.data.info.data;
          data["token"] = res.data.info.token;
          this.$store.commit("setAuthenticated", data);
          /* after submition is success*/
          this.in_submition = false;
          this.show_alert = false;
          this.loading = false;
          this.alert_class = "";
          this.alert_massage = "";
          this.toggleAuthModalAction();
          this.$router.push({ name: "dashboard" });
        })
        .catch((error) => {
          console.log(error.toJSON());
          /*if the submition failed*/
          this.in_submition = false;
          this.loading = false;
          this.alert_class = "text-danger font-bold";
          this.alert_massage = "حدث خطأ ما! ";
          return;
        });
    },
  },
};
</script>
