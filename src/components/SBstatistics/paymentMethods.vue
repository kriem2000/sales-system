<template>
  <div class="d-flex flex-row justify-content-between mt-5">
    <h1 class="mainTitle">طرق الدفع الاخرى</h1>
    <button
      class="btn btn-ss-blue text-white"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapsepaymentMethods"
      aria-expanded="false"
      aria-controls="collapsepaymentMethods"
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
    id="collapsepaymentMethods"
    v-if="!in_submission"
  >
    <div class="col-4">
      <div class="contianer border border-1 shadow-sm p-3">
        <div class="d-flex justify-content-between">
          <div>
            <p class="display-8 fw-bold">إجمالي النقدي مع المردودات</p>
            <small class="text-muted fw-bold"
              >{{ PaymentMethodStatistics.total_cash }} LYD</small
            >
          </div>

          <img class="w-25" src="/img/cash-svgrepo-com.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="contianer border border-1 shadow-sm p-3">
        <div class="d-flex justify-content-between">
          <div>
            <p class="display-8 fw-bold">إجمالي حوالات مصرفية مع المردودات</p>
            <small class="text-muted fw-bold"
              >{{ PaymentMethodStatistics.total_transfer }} LYD</small
            >
          </div>
          <img class="w-25" src="/img/transfer-arrows-svgrepo-com.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="contianer border border-1 shadow-sm p-3">
        <div class="d-flex justify-content-between">
          <div>
            <p class="display-8 fw-bold">
              إجمالي دفع آجل (في الانتظار + مدفوع) مع المردودات
            </p>
            <small class="text-muted fw-bold"
              >{{ PaymentMethodStatistics.total_fragments }} LYD</small
            >
          </div>
          <img class="w-25" src="/img/pay-money-svgrepo-com.svg" alt="" />
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
      PaymentMethodStatistics: [],
      in_submission: false,
    };
  },
  async activated() {
    this.in_submission = true;
    await axiosConfig
      .get("paymentMethods-Statistics", this.config)
      .then((res) => {
        this.PaymentMethodStatistics = res.data.info;
        this.in_submission = false;
      })
      .catch(() => {
        this.in_submission = false;
        return;
      });
  },
};
</script>
