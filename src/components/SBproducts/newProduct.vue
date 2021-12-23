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
                  @submit="addNewProduct"
                  :validationSchema="ProductSchema"
                >
                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-barcode ms-3"></i>
                    <div class="form-floating flex-fill mb-0">
                      <vee-field
                        name="id"
                        type="text"
                        class="form-control"
                        id="id"
                        placeholder="id"
                      />
                      <ErrorMessage class="text-danger font-bold" name="id" />
                      <label for="floatingInput">الرقم التعريفي</label>
                    </div>
                  </div>
                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fab fa-product-hunt ms-3"></i>
                    <div class="form-floating flex-fill mb-0">
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
                      <vee-field
                        name="detail"
                        type="text"
                        class="form-control"
                        id="detail"
                        placeholder="detail"
                      />
                      <ErrorMessage
                        class="text-danger font-bold"
                        name="email"
                      />
                      <label for="floatingInput">معلومات حول المنتج</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-cubes ms-3"></i>
                    <div class="form-floating flex-fill mb-0">
                      <vee-field
                        name="type"
                        type="text"
                        class="form-control"
                        id="type"
                        placeholder="product type"
                      />
                      <ErrorMessage class="text-danger font-bold" name="type" />
                      <label for="floatingInput">نوع المنتج</label>
                    </div>
                    <button
                      @click.prevent="productTypeInfo"
                      type="button"
                      class="btn btn-light pe-2"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="only cream,injection or tab"
                    >
                      <span class="badge rounded-pill bg-info"
                        ><i class="fas fa-question-circle"></i
                      ></span>
                    </button>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-filter ms-3"></i>
                    <div class="form-floating flex-fill mb-0">
                      <vee-field
                        name="dose"
                        type="dose"
                        class="form-control"
                        id="dose"
                        placeholder="product dose"
                      />
                      <ErrorMessage class="text-danger font-bold" name="dose" />
                      <label for="floatingInput">الجرعة</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="far fa-calendar-minus ms-3"></i>
                    <div class="form-floating flex-fill mb-0">
                      <vee-field
                        name="expiry_date"
                        type="date"
                        class="form-control"
                        id="expiry_date"
                        placeholder="Phone number"
                      />
                      <ErrorMessage
                        class="text-danger font-bold"
                        name="expiry_date"
                      />
                      <label for="floatingInput"> تاريخ انتهاء الصلاحية</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="far fa-calendar-plus ms-3"></i>
                    <div class="form-floating flex-fill mb-0">
                      <vee-field
                        name="production_date"
                        type="date"
                        class="form-control"
                        id="production_date"
                        placeholder="Phone number"
                      />
                      <ErrorMessage
                        class="text-danger font-bold"
                        name="production_date"
                      />
                      <label for="floatingInput">تاريخ الاانتاج</label>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-list-ol ms-3"></i>
                    <div class="form-floating flex-fill mb-0">
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
                      <vee-field
                        name="company_name"
                        type="numeric"
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

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-object-ungroup ms-3"></i>
                    <div class="form-floating flex-fill mb-0">
                      <vee-field
                        as="select"
                        name="category_id"
                        type="numeric"
                        class="form-select"
                        id="category_id"
                        placeholder="category_id"
                      >
                        <option selected disabled>اختار تصنيف المنتج</option>
                        <option value="1">category 1</option>
                        <option value="2">category 2</option>
                        <option value="3">category 3</option>
                        <option value="4">category 4</option>
                      </vee-field>
                      <ErrorMessage
                        class="text-danger font-bold"
                        name="category_id"
                      />
                    </div>
                  </div>

                  <div class="d-flex justify-content-center ms-5 mb-3 mb-lg-4">
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
export default {
  name: "newProduct",
  data() {
    return {
      ProductSchema: {
        id: "required",
      },
    };
  },
  methods: {
    productTypeInfo() {
      this.$swal.fire({
        title: "<strong>الانواع المتاحة<u></u></strong>",
        icon: "info",
        html:
          "You can use <b>bold text</b>, " +
          '<a href="//sweetalert2.github.io">links</a> ' +
          "and other HTML tags",
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> حسنا !',
      });
    },
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
</style>
