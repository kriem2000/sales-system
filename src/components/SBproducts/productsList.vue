<template>
  <!--all users section-->
  <div class="row mx-3">
    <div class="col-sm-12 col-md-12 col-lg-12 table-responsive">
      <!--filters-->
      <b class="d-block mt-4 mainTitle">قائمة المنتجات </b>
      <hr />
      <div class="my-3 me-5 d-flex flex-row">
        <div>
          <p class="d-inline ms-2">
            <label for="filterBy">الترتيب بواسطة</label>
          </p>
          <select name="filterBy" id="filterBy" @change.prevent="fetchProduct">
            <option value="">الكل</option>
            <option value="sale_price">الاعلي سعراً</option>
            <option value="quantity">الكمية المتوفرة</option>
          </select>
        </div>
        <div class="d-flex flex-row">
          <input
            type="text"
            id="productName"
            class="form-control w-auto mx-2"
            placeholder="ادخل اسم المنتج للبحث"
          />
          <button class="btn btn-outline-ss-blue" @click="fetchProduct">
            بحث
          </button>
        </div>
      </div>
      <!--all products table-->
      <div class="ms-2 me-5">
        <table
          class="
            table table-borderless
            text-start
            shadow-sm
            border border-1
            w-100
            h-100
          "
          id="allusersTable"
        >
          <thead class="ss-table-blue">
            <tr>
              <th scope="col">اسم الصنف</th>
              <th scope="col">الكمية المتوفرة</th>
              <th scope="col">تاريخ انتهاء الصلاحة</th>

              <th scope="col">سعر الشراء</th>
              <th scope="col">سعر البيع</th>
              <th>مُدخل بواسطة</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in allProducts" :key="product.id">
              <!-- product name -->
              <td>{{ product.name }}</td>
              <!-- product quantity -->
              <td>
                <span v-if="product.quantity > 0" class="badge bg-success">{{
                  product.quantity
                }}</span>
                <span v-else class="badge bg-danger">تم النفاذ</span>
              </td>
              <!-- product expirty date -->
              <td>{{ product.expiry_date }}</td>
              <!-- sales price -->
              <td>{{ product.sale_price }} LYD</td>
              <!-- purchase price -->
              <td>{{ product.purchase_price }} LYD</td>
              <!-- created by -->
              <td>{{ product.user.name }}</td>
              <!-- upate and delete options -->
              <td>
                <!--dropdown menu options-->
                <div class="btn-group dropdown w-auto">
                  <button
                    type="button"
                    class="btn"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i class="fas fa-ellipsis-v"></i>
                  </button>
                  <ul class="dropdown-menu text-center">
                    <li>
                      <button
                        class="btn btn-sm text-dark py-1"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#updateProduct"
                        @click.prevent="changeCurrentProductInModal(product)"
                      >
                        <i class="fas fa-user-edit ps-1"></i> تعديل
                      </button>
                    </li>
                    <li>
                      <button class="btn btn-sm text-dark py-1">
                        <i class="fas fa-user-minus ps-1"></i> حذف
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- update product model goes here -->
        <update-product
          :currentProductInModal="currentProductInModal"
          :fetchProduct="fetchProduct"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axiosConfig from "@/includes/axiosConfig";
import updateProduct from "@/components/SBproducts/updateProduct.vue";

export default {
  components: { updateProduct },
  name: "prpductsList",
  computed: {
    ...mapGetters({
      config: "config",
    }),
  },
  data() {
    return {
      allProducts: [],
      currentProductInModal: [],
    };
  },
  methods: {
    changeCurrentProductInModal(product) {
      this.currentProductInModal = product;
    },
    async fetchProduct(filter = "", productName = "") {
      filter =
        document.getElementById("filterBy").value != ""
          ? `/${document.getElementById("filterBy").value}`
          : "/created_at";
      productName =
        document.getElementById("productName").value != ""
          ? `/${document.getElementById("productName").value}`
          : "";
      await axiosConfig
        .get(`allProducts${filter}${productName}`, this.config)
        .then((res) => {
          console.log(res);
          this.allProducts = res.data.info;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  async activated() {
    this.fetchProduct();
  },
};
</script>

<style scoped>
#filterBy {
  background-color: #216bae;
  border: 0;
  border-radius: 2px;
  padding: 5px;
  color: #fff;
}
</style>
