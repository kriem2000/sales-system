<template>
  <div class="d-flex flex-row justify-content-between mt-5">
    <h1 class="mainTitle">المبيعات</h1>
    <button
      class="btn btn-ss-blue text-white"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapseSales"
      aria-expanded="false"
      aria-controls="collapseSales"
      :disabled="in_submission"
    >
      <i class="fas fa-caret-down"></i>
    </button>
  </div>

  <hr />
  <div class="text-center" v-show="in_submission">
    <loading />
  </div>
  <div class="row collapse show" id="collapseSales" v-if="!in_submission">
    <div class="col-3">
      <div class="contianer border border-1 shadow-sm p-3">
        <div class="d-flex justify-content-between">
          <div>
            <p class="display-8 fw-bold">مبيعات اليوم</p>
            <small class="text-muted fw-bold"
              >{{ salesStatistics.dialySales }} LYD</small
            >
          </div>

          <img
            class="w-25"
            src="/img/weekly-calendar-monthly-calendar-svgrepo-com.svg"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="contianer border border-1 shadow-sm p-3">
        <div class="d-flex justify-content-between">
          <div>
            <p class="display-8 fw-bold">مبيعات الاسبوع</p>
            <small class="text-muted fw-bold"
              >{{ salesStatistics.weeklySales }} LYD</small
            >
          </div>
          <img
            class="w-25"
            src="/img/daily-calendar-on-day-7-with-a-small-clock-symbol.svg"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="contianer border border-1 shadow-sm p-3">
        <div class="d-flex justify-content-between">
          <div>
            <p class="display-8 fw-bold">مبيعات الشهر</p>
            <small class="text-muted fw-bold"
              >{{ salesStatistics.monthlySales }} LYD</small
            >
          </div>
          <img
            class="w-25"
            src="/img/calendar-daily-page-on-day-31.svg"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="contianer border border-1 shadow-sm p-3">
        <div class="d-flex justify-content-between">
          <div>
            <p class="display-8 fw-bold">مبيعات السنة</p>
            <small class="text-muted fw-bold"
              >{{ salesStatistics.annualySales }} LYD</small
            >
          </div>
          <img
            class="w-25"
            src="/img/weekly-calendar-monthly-calendar-svgrepo-com1.svg"
            alt=""
          />
        </div>
      </div>
    </div>

    <div class="col-3 my-3">
      <div class="contianer border border-1 shadow-sm p-3">
        <div class="d-flex justify-content-between">
          <div>
            <p class="display-8 fw-bold">المبيعات في جميع الاوقات</p>
            <small class="text-muted fw-bold"
              >{{ salesStatistics.allSales }} LYD</small
            >
          </div>
          <img class="w-25" src="/img/currency-value-svgrepo-com.svg" alt="" />
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
  name: "sales",
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
      salesStatistics: [],
      in_submission: false,
    };
  },
  async activated() {
    this.in_submission = true;
    await axiosConfig
      .get("sales-Statistics", this.config)
      .then((res) => {
        this.salesStatistics = res.data.info;
        this.in_submission = false;
      })
      .catch(() => {
        this.in_submission = false;
        return;
      });
  },
};
</script>
