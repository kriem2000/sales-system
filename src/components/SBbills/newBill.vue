<template>
  <!-- bill form && checkout -->
  <div
    class="container-fluid bg-light m-2 border border-1 shadow-sm rounded"
    v-if="!showInvoice"
  >
    <div class="container">
      <!-- title and image -->
      <div class="py-5 text-center">
        <img
          class="d-inline mx-auto mb-4"
          src="/img/Cash-Payment-bro.png"
          alt=""
          width="92"
          height="92"
        />
        <h2 class="d-inline font-bold main-title">الفاتورة</h2>
      </div>

      <div class="row">
        <!-- basket and discount -->
        <div class="col-md-4 order-md-2 mb-4">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted pe-5">قائمة المشتريات</span>
            <span class="badge bg-secondary rounded-pill">{{
              productsInBasket.length
            }}</span>
          </h4>
          <ul class="list-group mb-3">
            <li
              class="
                list-group-item
                d-flex
                justify-content-between
                lh-condensed
              "
              v-for="product in productsInBasket"
              :key="product.id"
            >
              <div>
                <h6 class="my-0">{{ product.name }}</h6>
                <small class="text-muted"
                  >الكمية : {{ product.salesQuantity }}</small
                >
              </div>
              <span class="text-muted">
                {{ getTotalPrice(product.salesQuantity, product.price) }}
                <b> LYD</b>
              </span>
            </li>
            <li class="list-group-item d-flex justify-content-between">
              <span class="fw-bold">الإجمالي</span>
              <strong>{{ totalInvoice }} LYD</strong>
            </li>
          </ul>
          <div class="text-end pe-4 d-flex flex-column">
            <h6 class="d-block my-0 main-title fs-4 pe-4 text-muted mb-3">
              نسبة التخفيض
            </h6>
            <small class="pe-4"
              ><input
                id="discount"
                type="number"
                placeholder="0"
                min="0"
                value="0"
                class="form-control d-inline w-25 rounded-0 p-1"
              />
              <span
                class="
                  text-white
                  h-50
                  rounded-0
                  badge
                  bg-secondary
                  position-relative
                  p-2
                  fw-bold
                  fs-6
                "
                style="bottom: 1px; padding-bottom: 10px !important"
                >%</span
              ></small
            >
            <div class="pe-4 my-3">
              <button
                @click.prevent="applydiscount"
                class="btn btn-sm mx-1 btn-outline-ss-blue"
                :disabled="discountApplied"
              >
                تفعيل
              </button>
              <button
                @click="discarddiscount"
                class="btn btn-sm mx-1 btn-outline-danger"
                :disabled="!discountApplied"
              >
                إالغاء
              </button>
            </div>
          </div>
        </div>
        <!-- bill form -->
        <div class="col-md-8 order-md-1">
          <h4 class="mb-3 fs-bold main-title fs-4">معلومات حول المُشْتَرِي</h4>
          <veeForm
            @submit="generateBill"
            class="needs-validation"
            :validationSchema="generateBillSchema"
          >
            <div class="row">
              <!-- company name -->
              <div class="col-md-6 mb-3">
                <label for="companyname">اسم الجهة المعنية</label>
                <veeField
                  type="text"
                  class="form-control"
                  name="companyname"
                  id="companyname"
                  placeholder="اسم الجهة المعنية"
                />
                <ErrorMessage class="text-danger" name="companyname" />
              </div>
              <!-- buyer name -->
              <div class="col-md-6 mb-3">
                <label for="buyername">اسم المُشْتَرِي</label>
                <veeField
                  type="text"
                  class="form-control"
                  id="buyername"
                  name="buyername"
                  placeholder="اسم المُشْتَرِي إذا وُجد"
                />
                <ErrorMessage class="text-danger" name="buyername" />
              </div>
            </div>

            <div class="row">
              <!-- company address -->
              <div class="col-md-6 mb-3">
                <label for="companyaddress">عنوان الجهة المعنية</label>
                <veeField
                  type="text"
                  name="companyaddress"
                  class="form-control"
                  id="companyaddress"
                  placeholder="عنوان الجهة المعنية"
                />
                <ErrorMessage class="text-danger" name="companyaddress" />
              </div>
              <!-- delegate name -->
              <div class="col-md-6 mb-3">
                <label for="delegatename">اسم المندوب </label>
                <veeField
                  type="text"
                  name="delegatename"
                  class="form-control"
                  id="delegatename"
                  placeholder="اسم المندوب إذا وُجد"
                />
                <ErrorMessage class="text-danger" name="delegatename" />
              </div>
            </div>

            <hr class="mb-4" />

            <!-- paymentmethods -->
            <h4 class="mb-3 fs-bold main-title fs-4">طريقة الدفع</h4>
            <!-- radio buttons to check the paymentmethod -->
            <div class="d-block my-3">
              <div
                class="custom-control custom-radio"
                v-for="paymentMethod in allPaymentMethods"
                :key="paymentMethod.id"
              >
                <veeField
                  :id="paymentMethod.name"
                  name="paymentMethod"
                  type="radio"
                  :value="paymentMethod.id"
                  class="custom-control-input"
                  @change="fragmentSelected"
                />
                <label class="custom-control-label px-1" for="credit">{{
                  paymentMethod.name
                }}</label>
              </div>
              <ErrorMessage class="text-danger" name="paymentMethod" />
            </div>
            <!-- fargment payment options (if selected only) -->
            <div class="row" v-if="fragmentPayment">
              <div class="col-md-4 mb-3">
                <label for="fragmentnumber">عدد الاقساط</label>
                <veeField
                  as="select"
                  name="fragmentnumber"
                  class="form-control"
                >
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="6">6</option>
                  <option value="8">8</option>
                </veeField>
                <ErrorMessage class="text-danger" name="fragmentnumber" />
              </div>
              <div class="col-md-4 mb-3">
                <label for="Paymentperiod">فترة السداد</label>
                <veeField as="select" name="Paymentperiod" class="form-control">
                  <option value="daily">يومياً</option>
                  <option value="weekly">اسبوعياً</option>
                  <option value="monthly">شهرياً</option>
                </veeField>
                <ErrorMessage class="text-danger" name="Paymentperiod" />
              </div>
              <div class="col-md-4 mb-3">
                <label for="sponsorname">اسم الكفيل</label>
                <veeField
                  type="text"
                  name="sponsorname"
                  class="form-control"
                  id="sponsorname"
                  placeholder="اسم الكفيل إذا وُجد"
                />
              </div>
            </div>
            <hr class="mb-4" />
            <!-- submit button -->
            <button
              class="
                btn btn-ss-blue
                text-white
                font-bold
                d-inline
                float-end
                btn-sm btn-block
                mb-3
                mx-2
              "
              type="submit"
            >
              إنهاء و تنزيل
              <i class="fas fa-hand-holding-usd"></i>
            </button>
            <!-- back button -->
            <button
              @click.prevent="beginBillProcess(false, true)"
              class="
                btn btn-success
                text-white
                font-bold
                d-inline
                float-end
                btn-sm btn-block
                mb-3
              "
            >
              الرجوع للخلف
              <i class="fas fa-undo-alt"></i>
            </button>
          </veeForm>
        </div>
      </div>
    </div>
  </div>
  <!-- invoice template -->
  <billTemplate
    v-if="showInvoice"
    :beginBillProcess="beginBillProcess"
    :dataToInvoice="dataToInvoice"
  />
</template>

<script>
import { mapGetters } from "vuex";
import axiosConfig from "@/includes/axiosConfig";
import billTemplate from "@/components/SBbills/billTemplate.vue";

export default {
  name: "newBill",
  props: {
    beginBillProcess: {
      type: Function,
      required: true,
    },
    scanProcess: {
      Type: Function,
      required: true,
    },
    productsInBasket: {
      type: Array,
      required: true,
    },
  },
  components: {
    billTemplate,
  },
  data() {
    return {
      generateBillSchema: {
        companyname: "required",
        paymentMethod: "required|numeric",
      },
      discount: 0,
      totalInvoice: 0,
      discountApplied: false,
      allPaymentMethods: [],
      fragmentPayment: false,
      showInvoice: false,
      dataToInvoice: [],
    };
  },
  computed: {
    ...mapGetters({
      config: "config",
    }),
  },
  methods: {
    getTotalPrice(quantity, price) {
      return (quantity * price).toFixed(2);
    },
    getTotalInvoice() {
      this.totalInvoice = 0;
      this.productsInBasket.map((val) => {
        this.totalInvoice += val.price * val.salesQuantity;
      });
      this.totalInvoice = this.totalInvoice.toFixed(2);
    },
    applydiscount() {
      if (!this.discountApplied) {
        this.discount = document.getElementById("discount").value;
        this.discount = this.discount / 100;
        this.totalInvoice = (
          this.totalInvoice -
          this.discount * this.totalInvoice
        ).toFixed(2);
      }
      this.discountApplied = true;
    },
    discarddiscount() {
      /* reset all values */
      this.getTotalInvoice();
      this.discount = 0;
      this.discountApplied = false;
    },
    fragmentSelected(e) {
      if (e.currentTarget.value == 3) {
        this.fragmentPayment = true;
        this.generateBillSchema.fragmentnumber = "required|numeric";
        this.generateBillSchema.Paymentperiod = "required";
      } else {
        this.fragmentPayment = false;
        this.generateBillSchema.fragmentnumber = "";
        this.generateBillSchema.Paymentperiod = "";
      }
    },
    async generateBill(val) {
      /* adding all product in the basket to the request */
      val.productsInBasket = this.productsInBasket;
      /* adding the discount% if exists to the request otherwise add 0 */
      val.discount = this.discount;
      console.log(val);
      /* start the sale process from the backend */
      await axiosConfig
        .post("saleProduct", val, this.config)
        .then((res) => {
          console.log(res);
          this.showInvoice = true;
          this.dataToInvoice = res.data.info;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  async created() {
    //bring all the payment methods from the database
    await axiosConfig
      .get("paymentMethods", this.config)
      .then((res) => {
        console.log(res);
        this.allPaymentMethods = res.data.info;
      })
      .catch((err) => {
        console.log(err.response);
        return;
      });
  },
  mounted() {
    //get the total invoice price
    this.getTotalInvoice();
    //to deactive the scann event
    document.onkeydown = () => {};
  },
  beforeUnmount() {
    document.onkeydown = this.scanProcess;
  },
};
</script>

<style scoped>
.main-title {
  color: #216bae;
  font-size: 35px;
}
</style>
