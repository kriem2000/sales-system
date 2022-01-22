<template>
  <div class="container h-100 mt-3">
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
                إضافة فاتورة مستوردة
              </p>
              <!--new exported bill form -->
              <div
                class="
                  col-md-10 col-lg-6 col-xl-5
                  order-2 order-lg-1
                  position-relative
                "
              >
                <vee-form
                  class="
                    position-absolute
                    top-50
                    start-50
                    translate-middle
                    w-75
                  "
                  @submit="registerNewExportedBill"
                  :validationSchema="addNewExprotedBill"
                >
                  <div class="d-flex flex-row mb-4">
                    <i class="fas fa-file-invoice ms-3 mt-3"></i>
                    <div class="form-floating flex-fill mb-0">
                      <vee-field
                        name="billName"
                        type="text"
                        class="form-control"
                        id="billName"
                        placeholder="billName"
                      />
                      <ErrorMessage
                        class="text-danger font-bold"
                        name="billName"
                      />
                      <label for="floatingInput">اسم الفاتورة</label>
                    </div>
                  </div>
                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-building ms-3"></i>
                    <div class="form-floating flex-fill mb-0">
                      <vee-field
                        name="exporterName"
                        type="text"
                        class="form-control"
                        id="exporterName"
                        placeholder="exporterName"
                      />
                      <ErrorMessage
                        class="text-danger font-bold"
                        name="exporterName"
                      />
                      <label for="floatingInput">اسم الجهة المصدرة</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-phone-alt ms-3 fa-fw"></i>
                    <div class="form-floating flex-fill mb-0">
                      <vee-field
                        name="exporterPhone"
                        type="text"
                        class="form-control"
                        id="exporterPhone"
                        placeholder="exporter Phone"
                      />
                      <ErrorMessage
                        class="text-danger font-bold"
                        name="exporterPhone"
                      />
                      <label for="floatingInput">رقم الجهة المصدرة</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-calendar-alt ms-3 fa-fw"></i>
                    <div class="form-floating flex-fill mb-0">
                      <vee-field
                        name="billDate"
                        type="date"
                        class="form-control"
                        id="billDate"
                        placeholder="bill Date"
                      />
                      <ErrorMessage
                        class="text-danger font-bold"
                        name="billDate"
                      />
                      <label for="floatingInput">تاريخ الفاتورة</label>
                    </div>
                  </div>

                  <div class="d-flex justify-content-center me-5 mb-3 mb-lg-4">
                    <button
                      type="sumbit"
                      class="btn btn-ss-blue text-white btn-lg w-100"
                      :class="{ 'btn-light': in_submission }"
                      :disabled="in_submission"
                    >
                      <p v-if="!in_submission" class="m-0">اضافة</p>
                      <loading v-else />
                    </button>
                    <button type="reset" class="d-none" id="resetForm"></button>
                  </div>
                </vee-form>
              </div>
              <!-- exported bill image -->
              <div
                class="
                  col-md-10 col-lg-6 col-xl-7
                  d-flex
                  align-items-center
                  order-1 order-lg-2
                "
              >
                <img
                  src="img/Telecommuting-pana.png"
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
import loading from "@/components/loading.vue";
import axiosConfig from "@/includes/axiosConfig";
import { mapGetters } from "vuex";

export default {
  components: { loading },
  name: "newImportedBill",
  computed: {
    ...mapGetters({
      config: "config",
    }),
  },
  data() {
    return {
      addNewExprotedBill: {
        billName: "required|max:255",
        exporterName: "required|max:255",
        exporterPhone: "numeric|min:10",
      },
      in_submission: false,
      show_alert: false,
      alert_class: "",
      alert_message: "",
      alert_icon: "",
    };
  },
  methods: {
    async registerNewExportedBill(val) {
      this.in_submission = true;
      await axiosConfig
        .post("addExportedBill", val, this.config)
        .then(() => {
          this.show_alert = true;
          this.alert_icon = "fas fa-check-square";
          this.alert_message = "تم ادخال الفاتورة بنجاح";
          this.alert_class = "alert alert-primary px-1";
          this.in_submission = false;
          document.getElementById("resetForm").click();
        })
        .catch((err) => {
          console.log(err.response);
          this.show_alert = true;
          this.alert_icon = "fas fa-exclamation-triangle";
          this.alert_message = "الرجاء مراجعة المدخلات";
          this.alert_class = "alert alert-danger px-1";
          this.in_submission = false;
          return;
        });
      setTimeout(() => {
        this.show_alert = false;
      }, 5000);
    },
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
