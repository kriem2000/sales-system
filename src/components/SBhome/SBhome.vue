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
      <!--items scanned table-->
      <div class="conatainer-fluid shadow border table-responsive">
        <table class="table table-borderless text-center" id="scannedItems">
          <thead class="ss-table-blue">
            <tr>
              <td>Item name</td>
              <td>Quantity</td>
              <td>Individual price</td>
              <td>Total price</td>
              <td></td>
            </tr>
          </thead>
          <tr class="m-2">
            <td>tidilor 10mg</td>
            <td>
              <button class="btn btn-sm btn-outline-ss-blue-table">
                <i class="fas fa-minus"></i>
              </button>
              <input
                class="w-25 focus-none text-center border-0 border-info m-1"
                type="text"
                value="89"
              />
              <button class="btn btn-sm btn-outline-ss-blue-table">
                <i class="fas fa-plus"></i>
              </button>
            </td>
            <td>12</td>
            <td>55</td>
            <td>
              <i class="text-danger me-4 fas fa-minus-circle"></i>
            </td>
          </tr>
          <tr class="m-2">
            <td>topferol 50000 IU</td>
            <td>
              <button class="btn btn-sm btn-outline-ss-blue-table">
                <i class="fas fa-minus"></i>
              </button>
              <input
                class="w-25 focus-none text-center border-0 border-info m-1"
                type="text"
                value="40"
              />
              <button class="btn btn-sm btn-outline-ss-blue-table">
                <i class="fas fa-plus"></i>
              </button>
            </td>
            <td>10</td>
            <td>100</td>
            <td>
              <i class="text-danger me-4 fas fa-minus-circle"></i>
            </td>
          </tr>
          <tr class="m-2">
            <td>cefix 10mg DS</td>
            <td>
              <button class="btn btn-sm btn-outline-ss-blue-table">
                <i class="fas fa-minus"></i>
              </button>
              <input
                class="w-25 focus-none text-center border-0 border-info m-1"
                type="text"
                value="50"
              />
              <button class="btn btn-sm btn-outline-ss-blue-table">
                <i class="fas fa-plus"></i>
              </button>
            </td>
            <td>56</td>
            <td>200</td>
            <td>
              <i class="text-danger me-4 fas fa-minus-circle"></i>
            </td>
          </tr>
          <tr class="m-2">
            <td>delor 00.5% cream</td>
            <td>
              <button class="btn btn-sm btn-outline-ss-blue-table">
                <i class="fas fa-minus"></i>
              </button>
              <input
                class="w-25 focus-none text-center border-0 border-info m-1"
                type="text"
                value="23"
              />
              <button class="btn btn-sm btn-outline-ss-blue-table">
                <i class="fas fa-plus"></i>
              </button>
            </td>
            <td>19</td>
            <td>165</td>
            <td>
              <i class="text-danger me-4 fas fa-minus-circle"></i>
            </td>
          </tr>
          <tr class="m-2">
            <td>delor 00.5% cream</td>
            <td>
              <button class="btn btn-sm btn-outline-ss-blue-table">
                <i class="fas fa-minus"></i>
              </button>
              <input
                class="w-25 focus-none text-center border-0 border-info m-1"
                type="text"
                value="10"
              />
              <button class="btn btn-sm btn-outline-ss-blue-table">
                <i class="fas fa-plus"></i>
              </button>
            </td>
            <td>19</td>
            <td>165</td>
            <td>
              <i class="text-danger me-4 fas fa-minus-circle"></i>
            </td>
          </tr>
          <tr class="m-2">
            <td>delor 00.5% cream</td>
            <td>
              <button class="btn btn-sm btn-outline-ss-blue-table">
                <i class="fas fa-minus"></i>
              </button>
              <input
                class="w-25 focus-none text-center border-0 border-info m-1"
                type="text"
                value="35"
              />
              <button class="btn btn-sm btn-outline-ss-blue-table">
                <i class="fas fa-plus"></i>
              </button>
            </td>
            <td>19</td>
            <td>165</td>
            <td>
              <i class="text-danger me-4 fas fa-minus-circle"></i>
            </td>
          </tr>
        </table>
      </div>
      <!--options button-->
      <div class="row justify-content-between mx-2 my-4">
        <div class="col">
          <button
            class="btn btn-ss-blue text-white font-bold d-inline float-end"
          >
            Finish & check out
            <i class="fas fa-shopping-cart"></i>
          </button>
          <button
            class="btn btn-warning text-white font-bold d-inline float-start"
          >
            Restart
            <i class="fas fa-power-off"></i>
          </button>
        </div>
      </div>
    </div>
    <!--left col-->
    <div class="col-lg-4 col-md-12 col-sm-12">
      <div class="row m-0">
        <!--input for scanned items-->
        <div class="col-sm-12 col-md-12 col-lg-12">
          <div class="container shadow rounded m-1 d-flex flex-row">
            <input
              type="text /"
              class="form-control border-0 p-1 my-2 focus-none d-inline"
              placeholder="product code"
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
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["user"]),
  },
  name: "DBHome",
  components: { Calculator },
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
</style>
