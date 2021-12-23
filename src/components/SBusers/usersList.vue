<template>
  <!--cards options-->
  <div class="row text-center my-5 mx-3">
    <div class="col-sm-12 col-xl-12 col-lg-12 col-md-12 text-end pb-1">
      <strong class="fs-4">معلومات حول الحساب</strong>
    </div>
    <div class="col m-1">
      <div
        class="contianer border border-1 rounded shadow-sm px-3 py-1 me-3 h-100"
      >
        <b class="text-dark fw-900 fs-4 pb-3 d-block">جميع المنتجات المُدخلة</b>
        <b class="fs-3 text-ss-blue fw-900">120,000</b>
      </div>
    </div>
    <div class="col m-1">
      <div
        class="contianer border border-1 rounded shadow-sm px-3 py-1 me-3 h-100"
      >
        <b class="text-dark fw-900 fs-4 pb-3 d-block">جميع ما تم بيعة</b>
        <b class="fs-3 text-ss-blue fw-900">111,220 ly</b>
      </div>
    </div>
    <div
      class="col m-1"
      @click.prevent="changeDynamicComponent('newUser')"
      style="cursor: pointer"
    >
      <div
        class="contianer border border-2 rounded shadow-sm px-3 py-1 me-3 h-100"
      >
        <p class="text-secondary fs-5 pb-3">إضافة مستخدم جديد</p>
        <i class="fas fa-plus text-secondary fs-3 mb-4"></i>
      </div>
    </div>
  </div>
  <!--separator-->
  <hr class="mx-5 my-2" />
  <!--all users section-->
  <div class="row mx-3">
    <div class="col-sm-12 col-md-12 col-lg-12 table-responsive">
      <!--filters-->
      <div class="my-3 me-5">
        <b class="d-block mb-2 fs-4">قائمة المستخديمن </b>
        <p class="d-inline ms-2">
          <label for="filterBy">البحث بواسطة </label>
        </p>
        <select name="filterBy" id="filterBy" @change.prevent="filterusers">
          <option value="%">الكل</option>
          <option v-for="role in allRoles" :key="role" :value="role">
            {{ role }}
          </option>
        </select>
      </div>
      <!--all users table-->
      <div class="ms-2 me-5">
        <table
          class="
            table table-borderless
            text-start
            shadow-sm
            border border-1
            w-100
            h-100
          "
          id="allusersTable"
        >
          <thead class="ss-table-blue">
            <tr>
              <th scope="col">الصلاحية</th>
              <th scope="col">الاسم</th>
              <th scope="col">البريد الالكتروني</th>
              <th scope="col">رقم الهاتف</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in allUsersWithRoles" :key="user.id">
              <!-- user role -->
              <th>
                <span
                  v-if="user.roleName == 'superAdmin'"
                  class="badge rounded-pill bg-success w-auto"
                  >{{ user.roleName }}</span
                >
                <span
                  v-else-if="user.roleName == 'seller'"
                  class="badge rounded-pill bg-warning w-auto"
                  >{{ user.roleName }}</span
                >
                <span v-else class="badge rounded-pill bg-secondary w-auto">
                  {{ user.roleName }}
                </span>
              </th>
              <!-- user name -->
              <td>{{ user.name }}</td>
              <!-- user email -->
              <td>{{ user.email }}</td>
              <!-- user phone -->
              <td>{{ user.phone }}</td>
              <!-- upate and delete options -->
              <td>
                <!--dropdown menu options-->
                <div class="btn-group dropdown w-auto">
                  <button
                    type="button"
                    class="btn"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="fas fa-ellipsis-v"></i>
                  </button>
                  <ul class="dropdown-menu text-center">
                    <li>
                      <button
                        @click.prevent="showHideUPdateForm(user.id)"
                        class="btn btn-sm text-dark py-1"
                        :id="`editUser-${index}`"
                      >
                        <i class="fas fa-user-edit ps-1"></i> edit
                      </button>
                    </li>
                    <li>
                      <button
                        class="btn btn-sm text-dark py-1"
                        @click.prevent="showDeleteAlert(user.id)"
                      >
                        <i class="fas fa-user-minus ps-1"></i> delete
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
              <updateUser
                :currentUser="user"
                :currentAllRoles="allRoles"
                :showHideUPdateForm="showHideUPdateForm"
              />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import updateUser from "./updateUser.vue";
import axiosConfig from "@/includes/axiosConfig";
import { mapGetters } from "vuex";

export default {
  name: "usersList",
  props: {
    changeDynamicComponent: {
      type: Function,
      required: true,
    },
  },
  components: {
    updateUser,
  },
  data() {
    return {
      registerSchema: {
        name: "required|alpha|max:100",
        lastname: "alpha|max:100",
        password: "min:5|max:20",
        phone: "digits:10",
        role: "required",
      },
      allUsersWithRoles: null,
      userslength: 0,
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
  async created() {
    this.fetchAllUsers();
  },
  async activated() {
    this.fetchAllUsers();
  },
  methods: {
    async fetchAllUsers() {
      /*to get all the users with roles*/
      await axiosConfig
        .get("allUsers/%", this.config)
        .then((res) => {
          console.log(res.data);
          this.allUsersWithRoles = res.data.info || "no results found";
          this.userslength = res.data.message;
        })
        .catch((err) => {
          console.log(err.toJSON());
        });
      await this.$store.dispatch("getAllRole");
    },
    showHideUPdateForm(id) {
      document
        .getElementById("updateuserFormContainer-" + id)
        .classList.toggle("d-none");
    },
    async filterusers() {
      this.allUsersWithRoles = null;
      this.userslength = 0;
      let role = document.getElementById("filterBy").value;
      await axiosConfig.get(`allUsers/${role}`, this.config).then((res) => {
        console.log(res.data);
        this.allUsersWithRoles = res.data.info || "no results found";
        this.userslength = res.data.message;
      });
    },
    showDeleteAlert(id) {
      this.$swal
        .fire({
          title: "هل تريد حذف هذا المستخدم ؟",
          text: "لن تستطيع التراجع عن هذا الاجراء !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#216bae",
          cancelButtonColor: "#d33",
          cancelButtonText: "تراجع",
          confirmButtonText: "نعم , حذف",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.deleteUser(id);
            this.$swal.fire({
              title: "تم الحذف !",
              text: "تمت عملية الحذف بنجاح",
              confirmButtonColor: "#198754",
              confirmTextButton: "حسنا",
            });
          }
        });
    },
    async deleteUser(id) {
      await axiosConfig.get(`deleteUser/${id}`, this.config).then((res) => {
        console.log(res);
        this.fetchAllUsers();
      });
    },
  },
};
</script>

<style scoped>
#filterBy {
  background-color: #216bae;
  border: 0;
  border-radius: 2px;
  padding: 5px;
  color: #fff;
}
</style>
