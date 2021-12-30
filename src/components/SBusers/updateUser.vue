<template>
  <div
    :id="`updateuserFormContainer-${user.id}`"
    class="row justify-content-center d-none updateuserFormContainer"
  >
    <div
      class="col-lg-6 col-sm-12 bg-light py-5 px-5 rounded height-fit-content"
      v-if="true"
    >
      <!--update user form-->
      <vee-form @submit="updateUser" :validationSchema="updateUserSchema">
        <div class="d-flex flex-row align-items-center mb-4 text-end">
          <i class="fas fa-user ms-3"></i>
          <div class="form-floating flex-fill mb-0">
            <vee-field
              name="name"
              type="text"
              class="form-control"
              :id="`name${user.id}`"
              placeholder="name"
              v-model="user.name"
            />
            <ErrorMessage class="text-danger font-bold" name="name" />
            <label for="floatingInput">الاسم</label>
          </div>
        </div>
        <div class="d-flex flex-row align-items-center mb-4 text-end">
          <i class="fas fa-user-friends ms-3"></i>
          <div class="form-floating flex-fill mb-0">
            <vee-field
              name="lastname"
              type="text"
              class="form-control"
              :id="`lastname${user.id}`"
              placeholder="lastname"
              v-model="user.lastname"
            />
            <ErrorMessage class="text-danger font-bold" name="lastname" />
            <label for="floatingInput">اللقب</label>
          </div>
        </div>

        <div class="d-flex flex-row align-items-center mb-4 text-end">
          <i class="fas fa-phone-alt ms-3 fa-fw"></i>
          <div class="form-floating flex-fill mb-0">
            <vee-field
              name="phone"
              type="text"
              class="form-control"
              :id="`phone${user.id}`"
              placeholder="Phone number"
              v-model="user.phone"
            />
            <ErrorMessage class="text-danger font-bold" name="phone" />
            <label for="floatingInput">رقم الهاتف</label>
          </div>
        </div>

        <div class="d-flex flex-row align-items-center mb-4 text-end">
          <i class="fas fa-key ms-3 fa-fw"></i>
          <div class="form-floating flex-fill mb-0">
            <vee-field
              name="password"
              type="password"
              class="form-control"
              :id="`password${user.id}`"
              placeholder="Phone number"
            />
            <ErrorMessage class="text-danger font-bold" name="password" />
            <label for="floatingInput">تغيير كلمة السر</label>
          </div>
        </div>

        <div class="d-flex flex-row align-items-center mb-4 text-end">
          <i class="fas fa-user-tag ms-3 fa-fw"></i>
          <!-- user with roles -->
          <vee-field
            v-if="user.roles.length > 0"
            name="role"
            as="select"
            class="form-select font-bold p-3"
            aria-label="Default select example"
            v-model="user.roles[0].name"
          >
            <option selected disabled>اختيار صلاحية المستخدم</option>
            <option v-for="role in currentAllRoles" :key="role" :value="role">
              {{ role }}
            </option>
          </vee-field>
          <!-- user without roles -->
          <vee-field
            v-else
            name="role"
            as="select"
            class="form-select font-bold p-3"
            aria-label="Default select example"
          >
            <option selected disabled>اختيار صلاحية المستخدم</option>
            <option v-for="role in currentAllRoles" :key="role" :value="role">
              {{ role }}
            </option>
          </vee-field>
          <ErrorMessage class="text-danger font-bold" name="role" />
        </div>
        <vee-field name="userid" type="hidden" :value="user.id" />

        <div class="d-flex justify-content-between me-5 pb-2 text-end">
          <button
            type="sumbit"
            class="btn btn-ss-blue text-white btn-lg"
            :class="{ 'btn-light': in_submission }"
            :disabled="in_submission"
          >
            <p v-if="!in_submission" class="m-0">تحديث بيانات المستخدم</p>
            <loading v-else />
          </button>
          <button
            @click.prevent="showHideUPdateForm(user.id)"
            type="sumbit"
            class="btn btn-danger text-white btn-lg"
          >
            <p v-if="!in_submission" class="m-0">اغلاق</p>
            <loading v-else />
          </button>
          <button
            type="reset"
            class="d-none"
            :id="`resetForm${user.id}`"
          ></button>
        </div>
      </vee-form>
      <div :class="alert_class" class="text-center m-3" v-if="show_alert">
        <i :class="alert_icon"></i>
        {{ alert_message }}
      </div>
    </div>
  </div>
</template>

<script>
import loading from "../loading.vue";
import axiosConfig from "../../includes/axiosConfig";
import { mapGetters } from "vuex";

export default {
  name: "updateUser",
  components: {
    loading,
  },
  props: {
    currentUser: {
      type: Object,
      required: true,
    },
    currentAllRoles: {
      required: true,
    },
    showHideUPdateForm: {
      type: Function,
      required: true,
    },
    fetchAllUsers: {
      type: Function,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      config: "config",
    }),
  },
  data() {
    return {
      user: this.currentUser,
      allRoles: this.currentAllRoles,
      updateUserSchema: {
        name: "required|alpha|max:100",
        lastname: "alpha|max:100",
        password: "min:5|max:20",
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
  methods: {
    async updateUser(values) {
      console.log(values);
      this.in_submission = true;
      await axiosConfig
        .post(`updateUser/${values.userid}`, values, this.config)
        .then((res) => {
          console.log(res);
          this.in_submission = false;
          this.show_alert = true;
          this.alert_icon = "fas fa-check-circle ms-1";
          this.alert_class = "alert alert-primary";
          this.alert_message = "تم تحديث بيانات المستخدم";
          this.fetchAllUsers();
        })
        .catch((err) => {
          console.log(err);
          this.in_submission = false;
          this.show_alert = true;
          this.alert_class = "alert alert-danger";
          this.alert_icon = "fas fa-exclamation-circle me-1";
          this.alert_message = "لقد حدث خطأ";
        });
      setTimeout(() => {
        this.show_alert = false;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.updateuserFormContainer {
  width: 100% !important;
  height: 100%;
  background: rgba(12, 12, 12, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  overflow: auto;
}
</style>
