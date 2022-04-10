<template>
  <div class="container shadow rounded me-1 mt-3">
    <div class="row">
      <!-- quick serach input -->
      <div class="col-12">
        <div class="d-flex flex-row">
          <input
            name="productId"
            type="text"
            class="form-control border-0 p-1 my-2 focus-none d-inline"
            placeholder="البحث السريع"
            v-model="currentSearch"
            autocomplete="off"
          />
          <button
            class="
              btn btn-sm btn-ss-light-blue
              d-inline
              text-white
              my-3
              boxshadow-unset
            "
          >
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
      <!-- table for the results -->
      <div class="col">
        <table class="table" v-if="products.length > 0">
          <thead>
            <tr>
              <th scope="col">الصنف</th>
              <th scope="col">السعر</th>
              <th scope="col">الكمية</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <th scope="col">{{ product.name }}</th>
              <th scope="col">{{ product.sale_price }}</th>
              <th scope="col">{{ product.quantity }}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axiosConfig from "@/includes/axiosConfig.js";
import { mapGetters } from "vuex";

export default {
  name: "QuickSearch",
  data() {
    return {
      currentSearch: null,
      products: [],
      in_submission: false,
    };
  },
  computed: {
    ...mapGetters({
      config: "config",
    }),
  },
  methods: {
    async searchForProduct(codeOrName) {
      await axiosConfig
        .get(`quickSearch/${codeOrName}`, this.config)
        .then((res) => {
          console.log(res);
          this.products = res.data.info;
        })
        .catch((err) => {
          console.log(err);
          return;
        });
      this.in_submission = false;
    },
  },
  watch: {
    async currentSearch(newSearch) {
      /* search only if the new Search has a value and it's not empty also don't search if the previus search has not been finished yet*/
      if (newSearch != "" && this.in_submission != true) {
        this.in_submission = true;
        this.searchForProduct(newSearch);
      }
    },
  },
};
</script>

<style scoped>
.form-control:focus {
  box-shadow: unset;
}

.table {
  color: #216bae !important;
}

.boxshadow-unset {
  box-shadow: unset !important;
}
</style>
