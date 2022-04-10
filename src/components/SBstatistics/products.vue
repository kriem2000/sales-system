<template>
  <div class="d-flex flex-row justify-content-between mt-5">
    <h1 class="mainTitle">حول المنتجات</h1>
    <button
      class="btn btn-ss-blue text-white"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapseProducts"
      aria-expanded="false"
      aria-controls="collapseProducts"
      :disabled="in_submission"
    >
      <i class="fas fa-caret-down"></i>
    </button>
  </div>

  <hr />
  <div class="text-center" v-show="in_submission">
    <loading />
  </div>
  <div class="row collapse show" id="collapseProducts" v-if="!in_submission">
    <div class="col-4 my-2">
      <div class="contianer border border-1 shadow-sm p-3">
        <div class="d-flex justify-content-between">
          <div>
            <p class="display-8 fw-bold">إجمالي المشتريات في جميع الاوقات</p>
            <small class="text-muted fw-bold"
              >{{ ProductsStatistics.totalPurchase || "" }} LYD</small
            >
          </div>

          <img class="w-25" src="/img/purchase-books-svgrepo-com.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="col-4 my-2">
      <div class="contianer border border-1 shadow-sm p-3">
        <div class="d-flex justify-content-between">
          <div>
            <p class="display-8 fw-bold">إجمالي المشتريات في المخزن</p>
            <small class="text-muted fw-bold"
              >{{ ProductsStatistics.totalPurchaseInventory || "" }} LYD</small
            >
          </div>
          <img class="w-25" src="/img/stock-svgrepo-com.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="col-4 my-2">
      <div class="contianer border border-1 shadow-sm p-3">
        <div class="d-flex justify-content-between">
          <div>
            <p class="display-8 fw-bold">قيمة مبيعات المنتجات في المخزن</p>
            <small class="text-muted fw-bold"
              >{{ ProductsStatistics.totalSalesInventory || "" }} LYD</small
            >
          </div>
          <img class="w-25" src="/img/treasure-svgrepo-com.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="col-4 my-2">
      <div class="contianer border border-1 shadow-sm p-3">
        <div class="d-flex justify-content-between">
          <div>
            <p class="display-8 fw-bold">إجمالي المكسب في جميع الاوقات</p>
            <small class="text-muted fw-bold"
              >{{ (ProductsStatistics.totalGained || 0).toFixed(2) }} LYD</small
            >
          </div>
          <img class="w-25" src="/img/coins-svgrepo-com.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="col-4 my-2">
      <div class="contianer border border-1 shadow-sm p-3">
        <div class="d-flex justify-content-between">
          <div>
            <p class="display-8 fw-bold">قيمة المكسب المقدرة في المخزن</p>
            <small class="text-muted fw-bold"
              >{{ ProductsStatistics.totalGainedInventory || "" }} LYD</small
            >
          </div>
          <img class="w-25" src="/img/coins-svgrepo-com1.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosConfig from "@/includes/axiosConfig";
import { mapGetters } from "vuex";
import loading from "@/components/loading.vue";

export default {
  name: "paymentMethods",
  computed: {
    ...mapGetters({
      config: "config",
    }),
  },
  components: {
    loading,
  },
  data() {
    return {
      ProductsStatistics: [],
      in_submission: false,
    };
  },
  async activated() {
    this.in_submission = true;
    await axiosConfig
      .get("products-Statistics", this.config)
      .then((res) => {
        console.log(res);
        this.ProductsStatistics = res.data.info;
        this.in_submission = false;
      })
      .catch((err) => {
        console.log(err.response);
        this.in_submission = true;
        return;
      });
  },
};
</script>
