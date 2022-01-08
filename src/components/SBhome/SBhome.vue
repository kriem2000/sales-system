<template>
  <div class="container-fluid" v-show="!generatingBill">
    <div class="row">
      <!--greeting bar-->
      <div class="col-lg-12 col-md-12 col-sm-12 mb-2">
        <h4 class="text-end mt-5 ps-5 dbh-title">مرحبا {{ user.name }}</h4>
      </div>
    </div>
    <br />
    <div class="row">
      <!--right col-->
      <div class="col-lg-8 col-md-12 col-sm-12">
        <div
          class="
            conatainer-fluid
            shadow
            border
            table-responsive
            h-100
            border-0
            rounded
          "
        >
          <!-- no scanned products message -->
          <div
            v-show="allScannedProducts.length == 0"
            class="w-100 text-center top-50 position-relative"
          >
            <small class="text-muted"
              >لا توجد مُنتجات تم قٍرائتها حتي الان</small
            >
          </div>
          <!--items scanned table-->
          <table
            v-show="allScannedProducts.length > 0"
            class="table table-borderless text-center"
            id="scannedItems"
          >
            <thead class="ss-table-blue">
              <tr>
                <td>اسم المنتج</td>
                <td>الكمية المطلوبة</td>
                <td>الكمية المتوفرة</td>
                <td>سعر القطعة</td>
                <td>الأجمالي</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr
                class="m-2"
                v-for="product in allScannedProducts"
                :key="product.id"
              >
                <td>{{ product.name }}</td>
                <td>
                  <button
                    @click.prevent="
                      dec(product.id, product.price, product.quantity)
                    "
                    class="btn btn-sm btn-outline-ss-blue-table"
                  >
                    <i class="fas fa-minus"></i>
                  </button>
                  <input
                    class="
                      w-auto
                      focus-none
                      text-center
                      border-0
                      form-control
                      m-1
                      d-inline
                    "
                    :id="`ProductQuantity${product.id}`"
                    type="number"
                    min="1"
                    :max="product.quantity"
                    value="1"
                    @change="
                      getTotalPrice(product.id, product.price, product.quantity)
                    "
                  />
                  <button
                    @click.prevent="
                      inc(product.id, product.price, product.quantity)
                    "
                    class="btn btn-sm btn-outline-ss-blue-table"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </td>
                <td>{{ product.quantity }}</td>
                <td>{{ product.price }}</td>
                <td :id="`totalCol${product.id}`">
                  {{
                    getTotalPrice(
                      product.id,
                      product.price,
                      product.quantity
                    ) || "1"
                  }}
                </td>
                <td @click="removeProduct(product.id)">
                  <i class="text-danger me-4 fas fa-trash-alt"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--options button-->
        <div
          v-if="allScannedProducts.length > 0"
          class="row justify-content-between mx-2 my-4"
        >
          <div class="col">
            <button
              @click.prevent="passProductsToBasket"
              class="
                btn btn-sm btn-ss-blue
                text-white
                font-bold
                d-inline
                float-end
              "
            >
              إنهاء و إصدار الفاتورة
              <i class="fas fa-shopping-cart"></i>
            </button>
            <button
              @click.prevent="restart"
              class="
                btn btn-sm btn-warning
                text-white
                font-bold
                d-inline
                float-start
              "
            >
              البدء من جديد
              <i class="fas fa-power-off"></i>
            </button>
          </div>
        </div>
      </div>
      <!--left col-->
      <div class="col-lg-4 col-md-12 col-sm-12">
        <div class="row">
          <!--input for scanned items-->
          <div class="col-sm-12 col-md-12 col-lg-12 mb-2">
            <div class="container shadow rounded m-1 d-flex flex-row">
              <input
                name="productId"
                type="text"
                class="form-control border-0 p-1 my-2 focus-none d-inline"
                placeholder="الرقم التعريفي للمُنتج"
              />
              <button
                @click="axiosScan"
                class="btn btn-sm btn-ss-light-blue d-inline text-white my-3"
                :disabled="scanBtn_in_submission"
              >
                <i class="fas fa-qrcode"></i>
              </button>
            </div>
          </div>
          <!--calculator box-->
          <div class="col">
            <calculator />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="generatingBill">
    <new-bill
      :beginBillProcess="beginBillProcess"
      :productsInBasket="productsInBasket"
      :scanProcess="scanProcess"
    />
  </div>
</template>

<script>
import Calculator from "@/components/SBhome/Calculator.vue";
import { mapGetters } from "vuex";
import axiosConfig from "@/includes/axiosConfig";
import newBill from "@/components/SBbills/newBill.vue";

export default {
  props: {
    changeDynamicComponent: {
      type: Function,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      user: "user",
      config: "config",
    }),
  },
  name: "SBHome",
  components: { Calculator, newBill },
  data() {
    return {
      lastScannedId: "",
      allScannedProducts: [],
      productsInBasket: [],
      scanBtn_in_submission: false,
      restartBtn: false,
      generatingBill: false,
    };
  },
  methods: {
    async scanProcess(e) {
      console.log(e);
      let currentElement = document.getElementsByName("productId")[0];
      /* check if the current focused element is not the input for the product code */
      if (document.activeElement !== currentElement) {
        let currentCode = e.key;
        /* to check that the enter key is pressed and the operation is done */
        if (currentCode === "Enter") {
          console.log(this.lastScannedId);
          await this.axiosScan(this.lastScannedId);
          this.lastScannedId = "";
        } else {
          this.lastScannedId += currentCode != "Shift" ? currentCode : "";
        }
      }
    },
    async axiosScan(id) {
      /* check if where the id coming from ? input or scanner device */
      if (id.type == "click") {
        this.scanBtn_in_submission = true;
        console.log(id.type);
        id = document.getElementsByName("productId")[0].value;
        document.getElementsByName("productId")[0].value = "";
      }
      id.length > 0
        ? await axiosConfig
            .get(`product/${id}`, this.config)
            .then((res) => {
              console.log(res);
              /* prevent duplication in the products list */
              !this.containsObject(res.data.info, this.allScannedProducts)
                ? this.allScannedProducts.push(res.data.info)
                : this.errorMessage("هذا العنصر موجود مسبقاً");
              this.scanBtn_in_submission = false;
            })
            .catch((err) => {
              this.scanBtn_in_submission = false;
              console.log(err.response);
              /* display a error message for products that not found */
              this.errorMessage("هذا العنصر غير موجود, او تم نفاذ الكمية");
              return;
            })
        : (this.scanBtn_in_submission = false);
    },
    getTotalPrice(id, price, quantity) {
      let input = document.getElementById(`ProductQuantity${id}`);
      let number = input != null ? input.value : 1;
      let totalcol = document.getElementById(`totalCol${id}`);
      if (number <= quantity) {
        if (totalcol != null) {
          input.classList.contains("is-invalid")
            ? input.classList.toggle("is-invalid", false)
            : "";

          totalcol.innerText = (number * price).toFixed(2);
          return (number * price).toFixed(2);
        } else {
          return (number * price).toFixed(2);
        }
      } else if (input != null) {
        input.classList.toggle("is-invalid", true);
      }
    },
    inc(id, price, quantity) {
      console.log(quantity);
      let number = document.getElementById(`ProductQuantity${id}`);
      if (number.value < quantity) {
        number.value = parseInt(number.value) ? parseInt(number.value) + 1 : 1;
        this.getTotalPrice(id, price, quantity);
      }
    },
    dec(id, price, quantity) {
      let number = document.getElementById(`ProductQuantity${id}`);
      if (parseInt(number.value) > 1 && parseInt(number.value) <= quantity) {
        number.value = parseInt(number.value) - 1;
        this.getTotalPrice(id, price, quantity);
      }
    },
    containsObject(obj, list) {
      let i;
      for (i = 0; i < list.length; i++) {
        if (list[i].id == obj.id) {
          return true;
        }
      }

      return false;
    },
    removeProduct(id) {
      let i;
      for (i = 0; i < this.allScannedProducts.length; i++) {
        if (this.allScannedProducts[i].id == id) {
          this.allScannedProducts.splice(i, 1);
          return;
        }
      }
    },
    async restart() {
      await this.confirmMessage("سيتم البدء من جديد");
      console.log(this.restartBtn);
      if (this.restartBtn) {
        this.allScannedProducts = [];
        this.generatingBill = false;
      }
    },
    errorMessage(msg) {
      this.$swal.fire({
        icon: "error",
        title: "خطأ !",
        text: msg,
        confirmButtonText: "حسنا",
        confirmButtonColor: "#216bae",
      });
    },
    async confirmMessage(msg) {
      await this.$swal
        .fire({
          title: "هل انت متأكد ؟",
          text: msg,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#198754",
          cancelButtonColor: "#dc3545",
          confirmButtonText: "نعم",
          cancelButtonText: "لا",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.restartBtn = true;
          }
        });
    },
    passProductsToBasket() {
      this.productsInBasket = [];
      let aux;
      this.allScannedProducts.map((val) => {
        aux = document.getElementById(`ProductQuantity${val.id}`).value;
        if (aux <= val.quantity) {
          val.salesQuantity = aux;
          this.productsInBasket.push(val);
        }
      });
      this.allScannedProducts.length == this.productsInBasket.length
        ? this.beginBillProcess()
        : this.errorMessage(
            "الرجاء مراجعة المدخلات قبل البدء في تصدير الفاتورة"
          );
    },
    beginBillProcess(fromScratch = false, fromScratchWithBill = true) {
      if (fromScratch == true) {
        this.restart();
      }
      if (fromScratchWithBill == true) {
        this.generatingBill = !this.generatingBill;
      }
    },
  },
  activated() {
    document.onkeydown = this.scanProcess;
  },
  deactivated() {
    document.onkeydown = () => {};
  },
};
</script>

<style scoped>
#scannedItems tr td button {
  font-size: 8px;
}

#scannedItems tr td svg {
  font-size: 15px;
  cursor: pointer;
}

input[type="number"] {
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
</style>
