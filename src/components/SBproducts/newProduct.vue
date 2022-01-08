<template>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-12">
        <div class="card main-text border-0">
          <div class="card-body">
            <div class="row justify-content-center">
              <p
                class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4"
                id="registrationTitle"
              >
                إضافة منتج جديد
              </p>
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <vee-form
                  class="mx-1 mx-md-4"
                  @keydown.enter="$event.preventDefault()"
                  @submit="registerProduct"
                  :validationSchema="ProductSchema"
                >
                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-barcode ms-3"></i>
                    <div class="form-floating flex-fill mb-0">
                      <!-- product id -->
                      <vee-field
                        name="id"
                        type="text"
                        class="form-control"
                        id="id"
                        placeholder="id"
                        autocomplete="off"
                      />
                      <ErrorMessage class="text-danger font-bold" name="id" />
                      <label for="floatingInput">الرقم التعريفي</label>
                    </div>
                  </div>
                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fab fa-product-hunt ms-3"></i>
                    <div class="form-floating flex-fill mb-0">
                      <!-- product name -->
                      <vee-field
                        name="name"
                        type="text"
                        class="form-control"
                        id="name"
                        placeholder="name"
                      />
                      <ErrorMessage class="text-danger font-bold" name="name" />
                      <label for="floatingInput">اسم المنتج</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-info-circle ms-3"></i>
                    <div class="form-floating flex-fill mb-0">
                      <!-- product info -->
                      <vee-field
                        name="detail"
                        as="textarea"
                        class="form-control"
                        id="detail"
                        placeholder="detail"
                      />
                      <ErrorMessage
                        class="text-danger font-bold"
                        name="detail"
                      />
                      <label for="floatingInput">معلومات حول المنتج</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-cubes ms-3"></i>
                    <div class="form-floating flex-fill mb-0">
                      <!-- product type -->
                      <vee-field
                        name="type"
                        as="select"
                        class="form-control"
                        id="type"
                        placeholder="product type"
                        :disabled="allTypes.length == 0"
                      >
                        <option
                          v-for="type in allTypes"
                          :key="type.id"
                          :value="type.id"
                        >
                          {{ type.name }}
                        </option>
                      </vee-field>
                      <ErrorMessage class="text-danger font-bold" name="type" />
                      <label for="floatingInput">نوع المنتج</label>
                    </div>
                    <button
                      @click.prevent="productTypeInfo"
                      type="button"
                      class="btn pe-2"
                    >
                      <span class="badge rounded-pill bg-info"
                        ><i class="fas fa-question-circle text-white"></i
                      ></span>
                    </button>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-filter ms-3"></i>
                    <div class="form-floating flex-fill mb-0">
                      <!-- product dose -->
                      <vee-field
                        name="dose"
                        type="text"
                        class="form-control"
                        id="dose"
                        placeholder="product dose"
                      />
                      <ErrorMessage class="text-danger font-bold" name="dose" />
                      <label for="floatingInput">الجرعة</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-filter ms-3"></i>
                    <div class="form-floating flex-fill mb-0">
                      <!-- product price -->
                      <vee-field
                        :rules="{ regex: /^\d*\.?\d*$/ }"
                        name="price"
                        type="number"
                        class="form-control"
                        id="price"
                        placeholder="product price"
                      />
                      <ErrorMessage
                        class="text-danger font-bold"
                        name="price"
                      />
                      <label for="floatingInput">السعر</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="far fa-calendar-plus ms-3"></i>
                    <div class="form-floating flex-fill mb-0">
                      <!-- purchase date -->
                      <vee-field
                        name="purchase_date"
                        type="date"
                        class="form-control"
                        id="purchase_date"
                        placeholder="production date"
                      />
                      <ErrorMessage
                        class="text-danger font-bold"
                        name="purchase_date"
                      />
                      <label for="floatingInput">تاريخ الشراء</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="far fa-calendar-minus ms-3"></i>
                    <div class="form-floating flex-fill mb-0">
                      <!-- product expiry date -->
                      <vee-field
                        name="expiry_date"
                        type="date"
                        class="form-control"
                        id="expiry_date"
                        placeholder="expiry date"
                      />
                      <ErrorMessage
                        class="text-danger font-bold"
                        name="expiry_date"
                      />
                      <label for="floatingInput"> تاريخ انتهاء الصلاحية</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-list-ol ms-3"></i>
                    <div class="form-floating flex-fill mb-0">
                      <!-- product quantity -->
                      <vee-field
                        name="quantity"
                        type="numeric"
                        class="form-control"
                        id="quantity"
                        placeholder="quantity"
                      />
                      <ErrorMessage
                        class="text-danger font-bold"
                        name="quantity"
                      />
                      <label for="floatingInput">الكمية</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-building ms-3"></i>
                    <div class="form-floating flex-fill mb-0">
                      <!-- company name -->
                      <vee-field
                        name="company_name"
                        class="form-control"
                        id="company_name"
                        placeholder="company name"
                      />
                      <ErrorMessage
                        class="text-danger font-bold"
                        name="company_name"
                      />
                      <label for="floatingInput">اسم الشركة المصدرة</label>
                    </div>
                  </div>

                  <!--  product category (canceld by ibrahim) -->
                  <!-- <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-object-ungroup ms-3"></i>
                    <div class="form-floating flex-fill mb-0"> 
                      <vee-field
                        as="select"
                        name="category_id"
                        type="numeric"
                        class="form-select"
                        id="category_id"
                        placeholder="category_id"
                        :disabled="allCategories.length == 0"
                      >
                        <option
                          v-for="category in allCategories"
                          :key="category.id"
                          :value="category.id"
                        >
                          {{ category.name }}
                        </option>
                      </vee-field>
                      <label for="floatingInput">تصنيف المنتج</label>
                      <ErrorMessage
                        class="text-danger font-bold"
                        name="category_id"
                      />
                    </div>
                  </div> -->

                  <div class="d-flex justify-content-center me-5 mb-3 mb-lg-4">
                    <button
                      type="sumbit"
                      class="btn btn-ss-blue text-white btn-lg w-100"
                      :class="{ 'btn-light': in_submission }"
                      :disabled="in_submission"
                    >
                      <p v-if="!in_submission" class="m-0">إضافة</p>
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
                  src="img/Novelist writing-bro.png"
                  class="img-fluid"
                  alt="Sample image"
                />
              </div>
            </div>

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
import { mapGetters } from "vuex";
import axiosConfig from "../../includes/axiosConfig";
import loading from "@/components/loading";

export default {
  name: "newProduct",
  components: {
    loading,
  },
  computed: {
    ...mapGetters({
      config: "config",
    }),
  },
  data() {
    return {
      ProductSchema: {
        id: "required",
        name: "required",
        detail: "max:200",
        dose: "required|max:20",
        type: "required|numeric",
        price: "required|min_value:1",
        expiry_date: "required",
        purchase_date: "required",
        quantity: "required|numeric",
        company_name: "alpha_spaces",
      },
      allTypes: [],
      in_submission: false,
      show_alert: false,
      alert_class: "",
      alert_message: "",
      alert_icon: "",
    };
  },
  methods: {
    productTypeInfo() {
      /* get the selected input value */
      let productName = "";
      let currentTypeValue = document.getElementById("type").value || null;
      /* extract the selected value desc and name*/
      let html = this.allTypes
        .map((val) => {
          if (val.id == currentTypeValue) {
            productName = val.name;
            return val.desc;
          }
        })
        .filter((val) => {
          return val !== undefined;
        })[0];
      /* check if the desc is null or not */
      html != null ? (html = "<p>" + html + "</p>") : (html = "لا يوجد وصف");
      /* display the alert only if the user has select a value */
      currentTypeValue != null
        ? this.$swal.fire({
            title: `<strong>${productName}</strong>`,
            icon: "info",
            html: html,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: "حسنا ",
            confirmButtonColor: "#5db1ff",
          })
        : "";
    },
    async registerProduct(val) {
      this.in_submission = true;
      console.log(val);
      await axiosConfig
        .post("addProduct", val, this.config)
        .then((res) => {
          this.show_alert = true;
          this.alert_icon = "fas fa-check-square";
          this.alert_message = "تم ادخال المنتج بنجاح";
          this.alert_class = "alert alert-primary px-1";
          this.in_submission = false;
          document.getElementById("resetForm").click();
          console.log(res);
        })
        .catch((err) => {
          this.show_alert = true;
          this.alert_icon = "fas fa-exclamation-triangle";
          this.alert_message = err.response.data.message;
          this.alert_class = "alert alert-danger px-1";
          this.in_submission = false;
          console.log(err.response);
        });
      setTimeout(() => {
        this.show_alert = false;
      }, 5000);
    },
  },
  /* lifeCycle Hooks */
  async activated() {
    /* get all types */
    await axiosConfig
      .get("allTypes", this.config)
      .then((res) => {
        this.allTypes = res.data.info;
      })
      .catch(() => {
        return;
      });
  },
};
</script>

<style scoped>
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

.btn:focus {
  box-shadow: unset !important;
}
</style>
