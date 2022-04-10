<template>
  <div class="d-flex flex-row justify-content-between mt-5">
    <h1 class="mainTitle">الدفعات الآجلة</h1>
    <button
      class="btn btn-ss-blue text-white"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapsefragmentPayments"
      aria-expanded="false"
      aria-controls="collapsefragmentPayments"
      :disabled="in_submission"
    >
      <i class="fas fa-caret-down"></i>
    </button>
  </div>

  <hr />
  <div class="text-center" v-show="in_submission">
    <loading />
  </div>
  <div
    class="row collapse show"
    id="collapsefragmentPayments"
    v-if="!in_submission"
  >
    <div class="col-3">
      <div class="contianer border border-1 shadow-sm p-3">
        <div class="d-flex justify-content-between">
          <div>
            <p class="display-8 fw-bold">إجمالي المدفوع بدون مردودات</p>
            <small class="text-muted fw-bold"
              >{{ fragmentPaymentsStatistics.total_paid }} LYD</small
            >
          </div>

          <img class="w-25" src="/img/mobile-payment-svgrepo-com.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="contianer border border-1 shadow-sm p-3">
        <div class="d-flex justify-content-between">
          <div>
            <p class="display-8 fw-bold">إجمالي في الانتظار</p>
            <small class="text-muted fw-bold"
              >{{
                (fragmentPaymentsStatistics.total_unpaid || 0).toFixed(2)
              }}
              LYD</small
            >
          </div>
          <img
            class="w-25"
            src="/img/currency-exchange-svgrepo-com.svg"
            alt=""
          />
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
  name: "fragmentPayments",
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
      fragmentPaymentsStatistics: [],
      in_submission: false,
    };
  },
  async activated() {
    this.in_submission = true;
    await axiosConfig
      .get("fragmentPayments-Statistics", this.config)
      .then((res) => {
        this.fragmentPaymentsStatistics = res.data.info;
        this.in_submission = false;
      })
      .catch(() => {
        this.in_submission = false;
        return;
      });
  },
};
</script>
