<template>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-12">
        <div class="card main-text border-0">
          <div class="card-body">
            <div class="row justify-content-center">
              <!-- title -->
              <p
                class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"
                id="registrationTitle"
              >
                إضافة مستخدم جديد
              </p>
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <!-- user add form -->
                <vee-form
                  class="mx-1 mx-md-4"
                  @submit="addNewUser"
                  :validationSchema="registerSchema"
                >
                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user ms-3"></i>
                    <div class="form-floating flex-fill mb-0">
                      <vee-field
                        name="name"
                        type="text"
                        class="form-control"
                        id="name"
                        placeholder="name"
                      />
                      <ErrorMessage class="text-danger font-bold" name="name" />
                      <label for="floatingInput">الاسم</label>
                    </div>
                  </div>
                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user-friends ms-3"></i>
                    <div class="form-floating flex-fill mb-0">
                      <vee-field
                        name="lastname"
                        type="text"
                        class="form-control"
                        id="lastname"
                        placeholder="lastname"
                      />
                      <ErrorMessage
                        class="text-danger font-bold"
                        name="lastname"
                      />
                      <label for="floatingInput">اللقب</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope ms-3 fa-fw"></i>
                    <div class="form-floating flex-fill mb-0">
                      <vee-field
                        name="email"
                        type="email"
                        class="form-control"
                        id="email"
                        placeholder="User's email"
                      />
                      <ErrorMessage
                        class="text-danger font-bold"
                        name="email"
                      />
                      <label for="floatingInput">بريد الالكتروني</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-phone-alt ms-3 fa-fw"></i>
                    <div class="form-floating flex-fill mb-0">
                      <vee-field
                        name="phone"
                        type="text"
                        class="form-control"
                        id="phone"
                        placeholder="Phone number"
                      />
                      <ErrorMessage
                        class="text-danger font-bold"
                        name="phone"
                      />
                      <label for="floatingInput">الهاتف</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key ms-3 fa-fw"></i>
                    <div class="form-floating flex-fill mb-0">
                      <vee-field
                        name="password"
                        type="password"
                        class="form-control"
                        id="password"
                        placeholder="Phone number"
                      />
                      <ErrorMessage
                        class="text-danger font-bold"
                        name="password"
                      />
                      <label for="floatingInput">كلمة السر</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user-tag ms-3 fa-fw"></i>
                    <div class="form-floating flex-fill mb-0">
                      <vee-field
                        name="role"
                        as="select"
                        class="form-select font-bold p-3"
                        aria-label="Default select example"
                        v-model="selected"
                      >
                        <option
                          v-for="role in allRoles"
                          :key="role"
                          :value="role"
                        >
                          {{ role }}
                        </option>
                      </vee-field>

                      <ErrorMessage class="text-danger font-bold" name="role" />
                      <label for="floatingSelect">صلاحية المستخدم</label>
                    </div>
                  </div>

                  <div class="d-flex justify-content-center me-5 mb-3 mb-lg-4">
                    <button
                      type="sumbit"
                      class="btn btn-ss-blue text-white btn-lg w-100"
                      :class="{ 'btn-light': in_submission }"
                      :disabled="in_submission"
                    >
                      <p v-if="!in_submission" class="m-0">اضافة مستخدم جديد</p>
                      <loading v-else />
                    </button>
                    <button type="reset" class="d-none" id="resetForm"></button>
                  </div>
                </vee-form>
              </div>
              <div
                class="
                  col-md-10 col-lg-6 col-xl-7
                  d-flex
                  align-items-center
                  order-1 order-lg-2
                "
              >
                <img
                  src="img/undraw_authentication_fsn5.png"
                  class="img-fluid"
                  alt="Sample image"
                />
              </div>
            </div>
            <!-- alert message -->
            <div :class="alert_class" class="text-center" v-show="show_alert">
              <i :class="alert_icon"></i> {{ alert_message }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosConfig from "@/includes/axiosConfig";
import loading from "../loading.vue";
import { mapGetters } from "vuex";

export default {
  name: "newUser",
  components: {
    loading,
  },
  data() {
    return {
      registerSchema: {
        name: "required|alpha|max:100",
        lastname: "alpha|max:100",
        email: "required|email",
        password: "required|min:5|max:20",
        phone: "digits:10",
        role: "required",
      },
      in_submission: false,
      show_alert: false,
      alert_class: "",
      alert_message: "",
      alert_icon: "",
    };
  },
  computed: {
    ...mapGetters({
      allRoles: "allRoles",
      config: "config",
    }),
  },
  methods: {
    async addNewUser(values) {
      this.in_submission = true;
      await axiosConfig
        .post("adduser", values, this.config)
        .then((res) => {
          console.log(res.data);
          this.in_submission = false;
          this.show_alert = true;
          this.alert_icon = "fas fa-check-circle ms-1";
          this.alert_class = "alert alert-primary";
          this.alert_message = "تم تسجيل المستخدم بنجاح";
          document.getElementById("resetForm").click();
        })
        .catch((error) => {
          console.log(error.response);
          this.in_submission = false;
          this.show_alert = true;
          this.alert_class = "alert alert-danger";
          this.alert_icon = "fas fa-exclamation-circle ms-1";
          this.alert_message = "لقد حدث خطأ او المستخدم موجود بالفعل";
        });
      setTimeout(() => {
        this.show_alert = false;
      }, 4000);
    },
  },
  async created() {
    console.log(this.config);
    await this.$store.dispatch("getAllRole");
  },
};
</script>

<style scoped>
.main-text {
  font-style: normal;
  font-weight: 600;
}

input::placeholder {
  color: gery;
}

#registrationTitle {
  color: #216bae;
  font-size: 35px;
}

div svg {
  color: #004f99;
}

.form-floating > label {
  right: 0 !important;
}
</style>
