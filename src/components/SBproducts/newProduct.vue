<template>
  <div class="container h-100 mt-3">
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
              <div class="col-lg-6 order order-lg-1">
                <vee-form
                  class="mx-1 mx-md-4"
                  @keydown.enter="$event.preventDefault()"
                  @submit="registerProduct"
                  :validationSchema="ProductSchema"
                >
                  <div class="row">
                    <!-- col num 1 -->
                    <div class="d-flex flex-row p-2">
                      <div
                        class="
                          d-flex
                          flex-row
                          align-items-center
                          mb-4
                          mx-2
                          w-100
                        "
                      >
                        <i class="fas fa-barcode ms-1"></i>
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
                          <ErrorMessage
                            class="text-danger font-bold"
                            name="id"
                          />
                          <label for="floatingInput">الرقم التعريفي</label>
                        </div>
                      </div>
                      <div
                        class="d-flex flex-row align-items-center mb-4 w-100"
                      >
                        <i class="fab fa-product-hunt ms-1"></i>
                        <div class="form-floating flex-fill mb-0">
                          <!-- product name -->
                          <vee-field
                            name="name"
                            type="text"
                            class="form-control"
                            id="name"
                            placeholder="name"
                          />
                          <ErrorMessage
                            class="text-danger font-bold"
                            name="name"
                          />
                          <label for="floatingInput">اسم المنتج</label>
                        </div>
                      </div>
                    </div>

                    <!-- col num 2 -->
                    <div class="d-flex flex-row p-2">
                      <div
                        class="
                          d-flex
                          flex-row
                          align-items-center
                          mb-4
                          mx-2
                          w-100
                        "
                      >
                        <i class="fas fa-info-circle ms-1"></i>
                        <div class="form-floating flex-fill mb-0">
                          <!-- product info -->
                          <vee-field
                            name="detail"
                            as="textarea"
                            class="form-control"
                            id="detail"
                            placeholder="detail"
                            rows="5"
                          />
                          <ErrorMessage
                            class="text-danger font-bold"
                            name="detail"
                          />
                          <label for="floatingInput">معلومات حول المنتج</label>
                        </div>
                      </div>

                      <div
                        class="d-flex flex-row align-items-center mb-4 w-100"
                      >
                        <i class="fas fa-cubes ms-1"></i>
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
                          <ErrorMessage
                            class="text-danger font-bold"
                            name="type"
                          />
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
                    </div>

                    <!-- col num 3 -->
                    <div class="d-flex flex-row p-2">
                      <div
                        class="
                          d-flex
                          flex-row
                          align-items-center
                          mb-4
                          mx-2
                          w-100
                        "
                      >
                        <i class="fas fa-filter ms-1"></i>
                        <div class="form-floating flex-fill mb-0">
                          <!-- product dose -->
                          <vee-field
                            name="dose"
                            type="text"
                            class="form-control"
                            id="dose"
                            placeholder="product dose"
                          />
                          <ErrorMessage
                            class="text-danger font-bold"
                            name="dose"
                          />
                          <label for="floatingInput">الجرعة</label>
                        </div>
                      </div>

                      <div
                        class="d-flex flex-row align-items-center mb-4 w-100"
                      >
                        <i class="fas fa-dollar-sign ms-1"></i>
                        <div class="form-floating flex-fill mb-0">
                          <!-- product purchase price -->
                          <vee-field
                            :rules="{ regex: /^\d*\.?\d*$/ }"
                            name="purchasePrice"
                            type="number"
                            class="form-control"
                            id="purchasePrice"
                            placeholder="purchase price"
                          />
                          <ErrorMessage
                            class="text-danger font-bold"
                            name="purchasePrice"
                          />
                          <label for="floatingInput">سعر الشراء</label>
                        </div>
                      </div>
                    </div>

                    <!-- col num 4 -->
                    <div class="d-flex flex-row p-2">
                      <div
                        class="
                          d-flex
                          flex-row
                          align-items-center
                          mb-4
                          mx-2
                          w-100
                        "
                      >
                        <i class="far fa-calendar-plus ms-1"></i>
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

                      <div
                        class="
                          d-flex
                          flex-row
                          align-items-center
                          mb-4
                          mx-2
                          w-100
                        "
                      >
                        <i class="far fa-calendar-minus ms-1"></i>
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
                          <label for="floatingInput">
                            تاريخ انتهاء الصلاحية</label
                          >
                        </div>
                      </div>
                    </div>

                    <!-- col num 5 -->
                    <div class="d-flex flex-row p-2">
                      <div
                        class="
                          d-flex
                          flex-row
                          align-items-center
                          mb-4
                          mx-2
                          w-100
                        "
                      >
                        <i class="fas fa-list-ol ms-1"></i>
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

                      <div
                        class="d-flex flex-row align-items-center mb-4 w-100"
                      >
                        <i class="fas fa-building ms-1"></i>
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
                          <label for="floatingInput">اسم الشركة المُصنعة</label>
                        </div>
                      </div>
                    </div>

                    <!-- col num 6 -->
                    <div class="d-flex flex-row p-0 w-100">
                      <div
                        class="
                          d-flex
                          flex-row
                          align-items-center
                          mb-4
                          mx-2
                          w-100
                        "
                      >
                        <i class="fas fa-hand-holding-usd ms-1"></i>
                        <div class="form-floating flex-fill mb-0">
                          <!-- product sales price -->
                          <vee-field
                            :rules="{ regex: /^\d*\.?\d*$/ }"
                            name="salesPrice"
                            type="numeric"
                            class="form-control"
                            id="salesPrice"
                            placeholder="salesPrice"
                          />
                          <ErrorMessage
                            class="text-danger font-bold"
                            name="salesPrice"
                          />
                          <label for="floatingInput">سعر البيع</label>
                        </div>
                      </div>

                      <div
                        class="d-flex flex-row align-items-center mb-4 w-100"
                      >
                        <i class="fas fa-object-ungroup ms-1"></i>
                        <div class="form-floating flex-fill mb-0">
                          <vee-field
                            as="select"
                            name="bill_id"
                            class="form-select"
                            id="bill_id"
                            placeholder="bill_id"
                            :disabled="allExportedBills.length == 0"
                          >
                            <option
                              v-for="bill in allExportedBills"
                              :key="bill.id"
                              :value="bill.id"
                            >
                              {{ bill.bill_name }}
                            </option>
                          </vee-field>
                          <label for="floatingInput">الفاتورة المُصدرة</label>
                          <ErrorMessage
                            class="text-danger font-bold"
                            name="bill_id"
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      class="d-flex justify-content-center ms-2 mb-3 mb-lg-4"
                    >
                      <button
                        type="sumbit"
                        class="btn btn-ss-blue text-white btn-lg w-100"
                        :class="{ 'btn-light': in_submission }"
                        :disabled="in_submission"
                      >
                        <p v-if="!in_submission" class="m-0">إضافة</p>
                        <loading v-else />
                      </button>
                      <button
                        type="reset"
                        class="d-none"
                        id="resetForm"
                      ></button>
                    </div>
                  </div>
                </vee-form>
              </div>
              <div
                class="col-lg-6 d-flex align-items-center order-1 order-lg-2"
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
        salesPrice: "required|min_value:0.1",
        purchasePrice: "required|min_value:0.1",
        expiry_date: "required",
        purchase_date: "required",
        quantity: "required|numeric",
        company_name: "alpha_spaces",
        bill_id: "required|numeric",
      },
      allTypes: [],
      allExportedBills: [],
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
    /*get all exported bills */
    await axiosConfig
      .get("allExportedBills", this.config)
      .then((res) => {
        this.allExportedBills = res.data.info;
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

input[type="date" i] {
  align-items: center;
  display: flex;
  font-family: unset;
  padding-inline-start: 0px !important;
  cursor: default;
  overflow: hidden;
}
</style>
