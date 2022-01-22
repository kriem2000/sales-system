<template>
  <!-- Scrollable modal -->
  <div
    class="modal fade"
    id="staticBackdrop3"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdrop3Label"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <!-- title and close button -->
          <h5 class="modal-title" id="staticBackdrop3Label">
            قائمة المردودات (فاتورة رقم
            {{ currentReturnsInBillInModal.id }})
          </h5>
          <button
            type="button"
            class="btn-close m-0"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <!-- modal body -->
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col">
                <b class="m-2"
                  >اجمالي المردود :
                  {{ currentReturnsInBillInModal.total_returned }}</b
                >
                <table
                  class="table table-primary table-striped"
                  v-if="emptyReturnModal"
                >
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">المنتج</th>
                      <th scope="col">الكمية</th>
                      <th scope="col">التاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(
                        product, index
                      ) in currentReturnsInBillInModal.returns"
                      :key="product.id"
                    >
                      <td>
                        {{ index + 1 }}
                      </td>
                      <td>{{ product.product.name }}</td>
                      <td>{{ product.quantity }}</td>
                      <td>{{ product.created_at }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <!-- modal footer -->
        <div class="modal-footer float-end w-100 justify-content-start">
          <button
            type="button"
            class="btn btn-outline-ss-blue"
            data-bs-dismiss="modal"
            id="closeModal"
          >
            اغلاق
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "billModal",
  props: {
    currentReturnsInBillInModal: {
      type: Object,
      required: true,
    },
    emptyReturnModal: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      config: "config",
    }),
  },
  methods: {},
};
</script>

<style scoped>
.modal-title {
  color: #216bae;
  font-weight: bold;
}

.table-primary {
  --bs-table-bg: #f1f6ff;
  --bs-table-striped-bg: #d7e7ff;
  --bs-table-striped-color: #000;
  --bs-table-active-bg: #ffffff;
  --bs-table-active-color: #000;
  --bs-table-hover-bg: #e4efff;
  --bs-table-hover-color: #000;
  color: #000;
  border-color: #bacbe6;
}
.w-18 {
  width: 18% !important;
}

.cursos-poionter {
  cursor: pointer;
}
</style>
