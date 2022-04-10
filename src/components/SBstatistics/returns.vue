<template>
  <div class="d-flex flex-row justify-content-between mt-5">
    <h1 class="mainTitle">المردودات</h1>
    <button
      class="btn btn-ss-blue text-white"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapseReturns"
      aria-expanded="false"
      aria-controls="collapseReturns"
      :disabled="in_submission"
    >
      <i class="fas fa-caret-down"></i>
    </button>
  </div>

  <hr />
  <div class="text-center" v-show="in_submission">
    <loading />
  </div>
  <div class="row collapse show" id="collapseReturns" v-if="!in_submission">
    <div class="col-3">
      <div class="contianer border border-1 shadow-sm p-3">
        <div class="d-flex justify-content-between">
          <div>
            <p class="display-8 fw-bold">مردودات اليوم</p>
            <small class="text-muted fw-bold"
              >{{ returnsStatistics.dailyReturns }} LYD</small
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
            <p class="display-8 fw-bold">مردودات الاسبوع</p>
            <small class="text-muted fw-bold"
              >{{ returnsStatistics.weeklyReturns }} LYD</small
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
            <p class="display-8 fw-bold">مردودات الشهر</p>
            <small class="text-muted fw-bold"
              >{{ returnsStatistics.monthlyReturns }} LYD</small
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
            <p class="display-8 fw-bold">مردودات السنة</p>
            <small class="text-muted fw-bold"
              >{{ returnsStatistics.annualyReturns }} LYD</small
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
            <p class="display-8 fw-bold">المردودوات في جميع الاوقات</p>
            <small class="text-muted fw-bold"
              >{{ returnsStatistics.allReturns }} LYD</small
            >
          </div>
          <img
            class="w-25"
            src="/img/bills-check-bill-invoice-svgrepo-com.svg"
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
  name: "returns",
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
      returnsStatistics: [],
      in_submission: false,
    };
  },
  async activated() {
    this.in_submission = true;
    await axiosConfig
      .get("returns-Statistics", this.config)
      .then((res) => {
        this.returnsStatistics = res.data.info;
        this.in_submission = false;
      })
      .catch(() => {
        this.in_submission = false;
        return;
      });
  },
};
</script>
