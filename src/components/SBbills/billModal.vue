<template>
  <!-- Scrollable modal -->
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <!-- title and close button -->
          <h5 class="modal-title" id="staticBackdropLabel">
            قائمة المشتريات (فاتورة رقم {{ currentBillInModal.id }})
          </h5>
          <button
            type="button"
            class="btn-close m-0"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <!-- modal body -->
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col">
                <table
                  class="table table-primary table-striped"
                  v-if="emptyModal"
                >
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">اسم الصنف</th>
                      <th scope="col">الكمية المباعة</th>
                      <th scope="col">سعر القطعة الاصلي</th>
                      <th scope="col">سعر البيع</th>
                      <th scope="col">الاجمالي</th>
                      <th scope="col">حدد عدداً لإرجاعة</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(product, index) in currentBillInModal.sale
                        .products"
                      :key="product.id"
                    >
                      <td>
                        <input
                          @change="activateRetunButton"
                          type="checkbox"
                          :id="`checkNum${index}`"
                          :value="product.id"
                        />
                      </td>
                      <td>{{ product.name }}</td>
                      <td>{{ product.pivot.quantity }}</td>
                      <td>{{ product.sale_price }}</td>
                      <td>
                        {{
                          getIndividualPrice(
                            product.sale_price,
                            currentBillInModal.applied_discount
                          )
                        }}
                      </td>
                      <td>
                        {{
                          getTotalPerProduct(
                            product.pivot.quantity,
                            getIndividualPrice(
                              product.sale_price,
                              currentBillInModal.applied_discount
                            )
                          )
                        }}
                      </td>
                      <td class="w-18">
                        <input
                          class="form-control"
                          type="number"
                          min="1"
                          :max="product.pivot.quantity"
                          :id="`returnQuantity${index}`"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <!-- modal footer -->
        <div class="modal-footer float-end w-100 justify-content-start">
          <button
            @click.prevent="showReturnButton = false"
            type="button"
            class="btn btn-outline-ss-blue"
            data-bs-dismiss="modal"
            id="closeModal"
          >
            اغلاق
          </button>
          <button
            @click="checkIfHasQuantity"
            v-if="showReturnButton"
            type="button"
            class="btn btn-outline-danger"
            :disabled="in_submission"
          >
            تأكيد وإرجاع
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axiosConfig from "@/includes/axiosConfig";
export default {
  name: "billModal",
  props: {
    currentBillInModal: {
      type: Object,
      required: true,
    },
    fetchBills: {
      type: Function,
      required: true,
    },
    emptyModal: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      showReturnButton: false,
      in_submission: false,
    };
  },
  computed: {
    ...mapGetters({
      config: "config",
    }),
  },
  methods: {
    /* to get the final price of an product if there's a discount on it */
    getIndividualPrice(price, dicsount) {
      return (price - price * dicsount).toFixed(2);
    },
    /* get the total quantity of an product after the discount if exists */
    getTotalPerProduct(quantity, finalPrice) {
      return (quantity * finalPrice).toFixed(2);
    },
    activateRetunButton() {
      let checkBoxes = document.querySelectorAll("input[type=checkbox]");
      var empty = [].filter.call(checkBoxes, function (el) {
        return !el.checked;
      });
      if (checkBoxes.length == empty.length) {
        this.showReturnButton = false;
      } else {
        this.showReturnButton = true;
      }
    },
    /* to make sure that all input have a value and only if checked */
    checkIfHasQuantity() {
      let textInputs = document.querySelectorAll("input[type=number]");
      /* elements with checked set to true but has a empty value */
      var emptyWithChecked = [].filter.call(textInputs, function (el) {
        if (
          document.getElementById(`checkNum${el.id.slice(-1)}`).checked &&
          el.value <= 0
        ) {
          return el;
        }
      });
      emptyWithChecked.map((val) => {
        val.classList.toggle("border-danger", true);
      });
      /* ******** */
      /* elements with checked set to false and deosn't matter if has a value or not*/
      var emptyWithOutChecked = [].filter.call(textInputs, function (el) {
        if (
          document.getElementById(`checkNum${el.id.slice(-1)}`).checked == false
        ) {
          return el;
        }
      });
      emptyWithOutChecked.map((val) => {
        val.classList.toggle("border-danger", false);
      });
      /* ********** */
      /* elements with checked set to true and has a value */
      var fillen = [].filter.call(textInputs, function (el) {
        if (
          document.getElementById(`checkNum${el.id.slice(-1)}`).checked &&
          el.value > 0
        ) {
          return el;
        }
      });
      fillen.map((val) => {
        val.classList.toggle("border-danger", false);
      });
      /* ******** */
      /* now to sent the fillen to the backend and let him do his work */ 7;
      if (emptyWithChecked.length == 0 && fillen.length != 0) {
        this.beginReturnProcess(fillen);
      }
      /* ******* */
    },
    beginReturnProcess(quantityInputs) {
      let products = [];
      let ob = {};
      quantityInputs.forEach((el) => {
        ob.quantity = el.value;
        ob.product = document.getElementById(
          `checkNum${el.id.slice(-1)}`
        ).value;
        products.push(ob);
        ob = {};
      });
      var error = false;
      let currentProducts = this.currentBillInModal.sale.products;
      for (let i = 0; i < currentProducts.length; i++) {
        for (let j = 0; j < products.length; j++) {
          if (currentProducts[i]["id"] == products[j]["product"]) {
            if (
              products[j]["quantity"] > currentProducts[i]["pivot"].quantity
            ) {
              error = true;
              break;
            }
          }
        }
      }
      error
        ? this.swalMsg("error", "الرجاء مراجعة الكميات المراد إرجاعها")
        : this.sendToBackEnd(products);
    },
    swalMsg(icon, msg) {
      this.$swal({
        icon: icon,
        text: msg,
        confirmButtonText: "حسنا",
        confirmButtonColor: "#5db1ff",
      });
    },
    async sendToBackEnd(products) {
      products.map((val) => {
        val.bill = this.currentBillInModal.id;
        val.sale = this.currentBillInModal.sale.id;
      });
      this.in_submission = true;
      await axiosConfig
        .post("returnProduct", products, this.config)
        .then((res) => {
          this.swalMsg(
            "success",
            `المبلغ الذي تم إرجاعه هو :  ${res.data.info} LYD`
          );
          document.getElementById("closeModal").click();
          this.fetchBills();
          this.in_submission = false;
        })
        .catch((err) => {
          this.swalMsg("error", "لقد حدث خطأ ما الرجاء الراجعة المدخلات");
          console.log(err.response);
          this.in_submission = false;
        });
    },
  },
};
</script>

<style scoped>
.modal-title {
  color: #216bae;
  font-weight: bold;
}

.table-primary {
  --bs-table-bg: #f1f6ff;
  --bs-table-striped-bg: #d7e7ff;
  --bs-table-striped-color: #000;
  --bs-table-active-bg: #ffffff;
  --bs-table-active-color: #000;
  --bs-table-hover-bg: #e4efff;
  --bs-table-hover-color: #000;
  color: #000;
  border-color: #bacbe6;
}
.w-18 {
  width: 18% !important;
}
</style>
