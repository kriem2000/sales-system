<template>
  <div class="conainer my-3">
    <sales />
    <returns />
    <fragment-payments />
    <payment-methods />
    <products />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import sales from "@/components/SBstatistics/sales.vue";
import returns from "@/components/SBstatistics/returns.vue";
import fragmentPayments from "@/components/SBstatistics/fragmentPayments.vue";
import paymentMethods from "./SBstatistics/paymentMethods.vue";
import Products from "@/components/SBstatistics/products.vue";

export default {
  name: "SBdashboard",
  components: {
    sales,
    returns,
    fragmentPayments,
    paymentMethods,
    Products,
  },
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
};
</script>
