<template>
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
      <div class="conatainer-fluid shadow border table-responsive">
        <!-- no scanned products message -->
        <div
          v-show="allScannedProducts.length == 0"
          class="w-100 text-center p-5"
        >
          <small class="text-muted">لا توجد مُنتجات تم إدخالها حتي الان</small>
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
              <td>الكمية</td>
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
                  @click.prevent="dec(product.id)"
                  class="btn btn-sm btn-outline-ss-blue-table"
                >
                  <i class="fas fa-minus"></i>
                </button>
                <input
                  class="w-25 focus-none text-center border-0 border-info m-1"
                  :id="`ProductQuantity${product.id}`"
                  type="number"
                  min="1"
                  max="999"
                  value="1"
                  @change="getTotalPrice(product.id, product.price)"
                />
                <button
                  @click.prevent="inc(product.id)"
                  class="btn btn-sm btn-outline-ss-blue-table"
                >
                  <i class="fas fa-plus"></i>
                </button>
              </td>
              <td>{{ product.price }}</td>
              <td :id="`totalCol${product.id}`">
                {{ getTotalPrice(product.id, product.price) }}
              </td>
              <td>
                <i class="text-danger me-4 fas fa-trash-alt"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--options button-->
      <div
        v-show="allScannedProducts.length > 0"
        class="row justify-content-between mx-2 my-4"
      >
        <div class="col">
          <button
            class="
              btn btn-sm btn-ss-blue
              text-white
              font-bold
              d-inline
              float-end
            "
          >
            Finish & check out
            <i class="fas fa-shopping-cart"></i>
          </button>
          <button
            class="
              btn btn-sm btn-warning
              text-white
              font-bold
              d-inline
              float-start
            "
          >
            Restart
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
              class="btn btn-sm btn-ss-light-blue d-inline text-white my-3"
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
</template>

<script>
import Calculator from "@/components/SBhome/Calculator.vue";
import { mapGetters } from "vuex";
import axiosConfig from "@/includes/axiosConfig";
export default {
  computed: {
    ...mapGetters({
      user: "user",
      config: "config",
    }),
  },
  name: "DBHome",
  components: { Calculator },
  data() {
    return {
      lastScannedId: "",
      allScannedProducts: [],
    };
  },
  methods: {
    async scanProcess(e) {
      let currentElement = document.getElementsByName("productId")[0];
      /* check if the current focused element is not the input for the product code */
      if (document.activeElement !== currentElement) {
        let currentCode = typeof e.which == "number" ? e.which : e.keyCode;
        /* to check that the enter key is pressed and the operation is done */
        if (currentCode === 13) {
          console.log(this.lastScannedId);
          await this.axiosScan(this.lastScannedId);
          this.lastScannedId = "";
        } else {
          this.lastScannedId += String.fromCharCode(currentCode);
        }
      }
    },
    async axiosScan(id) {
      await axiosConfig
        .get(`product/${id}`, this.config)
        .then((res) => {
          console.log(res);
          this.allScannedProducts.push(res.data.info);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    getTotalPrice(id, price) {
      console.log("hi");
      let number = document.getElementById(`ProductQuantity${id}`);
      number = number != null ? number.value : 1;
      let totalcol = document.getElementById(`totalCol${id}`);
      if (totalcol != null) {
        totalcol.innerText = number * price;
      } else {
        return number * price;
      }
    },
    inc(id) {
      let number = document.getElementById(`ProductQuantity${id}`);
      number.value = parseInt(number.value) ? parseInt(number.value) + 1 : 1;
    },
    dec(id) {
      let number = document.getElementById(`ProductQuantity${id}`);
      if (parseInt(number.value) > 1) {
        number.value = parseInt(number.value) - 1;
      }
    },
  },
  mounted() {
    document.onkeydown = this.scanProcess;
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
