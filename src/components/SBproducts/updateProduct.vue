<template>
  <!--update product form-->
  <div
    class="modal fade"
    id="updateProduct"
    tabindex="-1"
    aria-labelledby="updateProduct"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header d-flex flex-row justify-content-between w-100">
          <h5 class="modal-title" id="updateProduct">تحديث بيانات المنتج</h5>
          <button class="btn" type="button" data-bs-dismiss="modal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <!-- the form goes here -->
        <div class="modal-body">
          <div class="row justify-content-center">
            <div class="col-lg-12 order order-lg-1">
              <vee-form
                class="mx-1 mx-md-4"
                :validationSchema="ProductSchema"
                :initialValues="productValues"
                @submit="UpdateProduct"
              >
                <div class="row">
                  <!-- col num 1 -->
                  <div class="d-flex flex-row p-2">
                    <div
                      class="d-flex flex-row align-items-center mb-4 mx-2 w-100"
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
                          disabled="true"
                          v-model="product.id"
                        />
                        <ErrorMessage class="text-danger font-bold" name="id" />
                        <label for="floatingInput">الرقم التعريفي</label>
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4 w-100">
                      <i class="fab fa-product-hunt ms-1"></i>
                      <div class="form-floating flex-fill mb-0">
                        <!-- product name -->
                        <vee-field
                          name="name"
                          type="text"
                          class="form-control"
                          id="name"
                          placeholder="name"
                          v-model="product.name"
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
                      class="d-flex flex-row align-items-center mb-4 mx-2 w-100"
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
                          v-model="product.detail"
                        />
                        <ErrorMessage
                          class="text-danger font-bold"
                          name="detail"
                        />
                        <label for="floatingInput">معلومات حول المنتج</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4 w-100">
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
                          v-model="product.type_id"
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
                      class="d-flex flex-row align-items-center mb-4 mx-2 w-100"
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
                          v-model="product.dose"
                        />
                        <ErrorMessage
                          class="text-danger font-bold"
                          name="dose"
                        />
                        <label for="floatingInput">الجرعة</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4 w-100">
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
                          v-model="product.purchase_price"
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
                      class="d-flex flex-row align-items-center mb-4 mx-2 w-100"
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
                          v-model="product.purchase_date"
                        />
                        <ErrorMessage
                          class="text-danger font-bold"
                          name="purchase_date"
                        />
                        <label for="floatingInput">تاريخ الشراء</label>
                      </div>
                    </div>

                    <div
                      class="d-flex flex-row align-items-center mb-4 mx-2 w-100"
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
                          v-model="product.expiry_date"
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
                      class="d-flex flex-row align-items-center mb-4 mx-2 w-100"
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
                          v-model="product.quantity"
                        />
                        <ErrorMessage
                          class="text-danger font-bold"
                          name="quantity"
                        />
                        <label for="floatingInput">الكمية</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4 w-100">
                      <i class="fas fa-building ms-1"></i>
                      <div class="form-floating flex-fill mb-0">
                        <!-- company name -->
                        <vee-field
                          name="company_name"
                          class="form-control"
                          id="company_name"
                          placeholder="company name"
                          v-model="product.company_name"
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
                      class="d-flex flex-row align-items-center mb-4 mx-2 w-100"
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
                          v-model="product.sale_price"
                        />
                        <ErrorMessage
                          class="text-danger font-bold"
                          name="salesPrice"
                        />
                        <label for="floatingInput">سعر البيع</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4 w-100">
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
                          <option value="" selected>الحالية</option>
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
                    class="
                      d-flex
                      justify-content-center
                      ms-2
                      mb-3 mb-lg-4
                      w-100
                    "
                  >
                    <button
                      type="button"
                      class="btn btn-danger mx-2 w-100"
                      data-bs-dismiss="modal"
                    >
                      إغلاق
                    </button>
                    <button
                      type="sumbit"
                      class="btn btn-ss-blue text-white btn-lg w-100"
                      :class="{ 'btn-light': in_submission }"
                      :disabled="in_submission"
                    >
                      <p v-if="!in_submission" class="m-0">حفظ و تحديث</p>
                      <loading v-else />
                    </button>
                    <button type="reset" class="d-none" id="resetForm"></button>
                  </div>
                </div>
                <div
                  :class="alert_class"
                  class="text-center"
                  v-show="show_alert"
                >
                  <i :class="alert_icon"></i> {{ alert_message }}
                </div>
              </vee-form>
            </div>
          </div>
        </div>
        <!-- the form ends here -->
      </div>
    </div>
  </div>
</template>

<script>
import axiosConfig from "@/includes/axiosConfig";
import { mapGetters } from "vuex";
export default {
  name: "updateProduct",
  props: {
    currentProductInModal: {
      required: true,
      type: Object,
    },
    fetchProduct: {
      required: true,
      type: Function,
    },
  },
  computed: {
    ...mapGetters({
      config: "config",
    }),
    product() {
      return this.currentProductInModal;
    },
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
        bill_id: "numeric",
      },
      productValues: {
        bill_id: "",
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
    async UpdateProduct(val) {
      this.in_submission = true;
      await axiosConfig
        .post("updateProduct", val, this.config)
        .then(() => {
          this.show_alert = true;
          this.alert_icon = "fas fa-check-square";
          this.alert_message = "تم تحديث المنتج بنجاح";
          this.alert_class = "alert alert-primary px-1";
          this.in_submission = false;
        })
        .catch((err) => {
          console.log(err.response);
          this.show_alert = true;
          this.alert_icon = "fas fa-exclamation-triangle";
          this.alert_message = err.response.data.message + "لقد حدث خطأ ما";
          this.alert_class = "alert alert-danger px-1";
          this.in_submission = false;
        });
      setTimeout(() => {
        this.show_alert = false;
      }, 2000);
      this.fetchProduct();
    },
  },
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

<style></style>
