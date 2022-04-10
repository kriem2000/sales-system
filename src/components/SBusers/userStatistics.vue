<template>
  <!--cards options-->
  <div class="row text-center my-5 mx-3">
    <div class="col-sm-12 col-xl-12 col-lg-12 col-md-12 text-end pb-1">
      <strong class="mainTitle">معلومات حول {{ user.name }}</strong>
    </div>
    <div class="col m-1">
      <div
        class="contianer border border-1 rounded shadow-sm px-3 py-1 me-3 h-100"
      >
        <b class="text-dark fw-900 fs-4 pb-3 d-block">جميع المنتجات المُدخلة</b>
        <b class="fs-3 text-ss-blue fw-900">{{ createdProducts }}</b>
      </div>
    </div>
    <div class="col m-1">
      <div
        class="contianer border border-1 rounded shadow-sm px-3 py-1 me-3 h-100"
      >
        <b class="text-dark fw-900 fs-4 pb-3 d-block">جميع ما تم بيعه</b>
        <b class="fs-3 text-ss-blue fw-900">{{ totalSales }} LYD</b>
      </div>
    </div>
    <div class="col m-1">
      <div
        class="contianer border border-1 rounded shadow-sm px-3 py-1 me-3 h-100"
      >
        <b class="text-dark fw-900 fs-4 pb-3 d-block">جميع ما تم إرجاعه</b>
        <b class="fs-3 text-ss-blue fw-900">{{ totalReturned }} LYD</b>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axiosConfig from "../../includes/axiosConfig";
export default {
  name: "userStatistics",
  computed: {
    ...mapGetters({
      user: "user",
      config: "config",
    }),
  },
  data() {
    return {
      createdProducts: 0,
      totalSales: 0,
      totalReturned: 0,
    };
  },
  methods: {
    async fetchUserInfo() {
      await axiosConfig
        .get("user", this.config)
        .then((res) => {
          console.log(res);
          this.createdProducts = res.data.createdProducts;
          this.totalSales = res.data.totalSales;
          this.totalReturned = res.data.totalReturned;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  activated() {
    this.fetchUserInfo();
  },
};
</script>
