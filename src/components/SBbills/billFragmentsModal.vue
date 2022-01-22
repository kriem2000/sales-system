<template>
  <!-- Scrollable modal -->
  <div
    class="modal fade"
    id="staticBackdrop2"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdrop2Label"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <!-- title and close button -->
          <h5 class="modal-title" id="staticBackdrop2Label">
            قائمة الدفعات الآجلة (فاتورة رقم
            {{ currentFragmentBillInModal.id }})
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
                <table
                  class="table table-primary table-striped"
                  v-if="emptyFragmentModal"
                >
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">تاريخ الدفع</th>
                      <th scope="col">قيمة الدفع</th>
                      <th scope="col">حالة الدُفعة</th>
                      <th scope="col">تم الدفع بتاريخ</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(
                        fragment, index
                      ) in currentFragmentBillInModal.fragmented_bill"
                      :key="fragment.id"
                    >
                      <td>
                        {{ index + 1 }}
                      </td>
                      <td>{{ fragment.next_payment_date }}</td>
                      <td>{{ fragment.payment_amount }}</td>
                      <td>
                        <span
                          v-if="fragment.fragment_bill_status_id == 1"
                          class="badge bg-success"
                          >تم الدفع</span
                        >
                        <span v-else class="badge bg-warning">
                          في الانتظار</span
                        >
                      </td>
                      <td>
                        {{ fragment.payment_date || "لم يتم الدفع بعد" }}
                      </td>
                      <td>
                        <button
                          v-if="fragment.fragment_bill_status_id == 2"
                          class="btn btn-sm btn-outline-success"
                          :class="{
                            disabled: fragment.fragment_bill_status_id == 1,
                            'cursos-poionter':
                              fragment.fragment_bill_status_id == 1,
                          }"
                          @click.prevent="changeFragmentBillStatus(fragment.id)"
                        >
                          تم الدفع
                        </button>
                      </td>
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
import axiosConfig from "../../includes/axiosConfig";
export default {
  name: "billModal",
  props: {
    changeFragmentedBillData: {
      type: Function,
      required: true,
    },
    fetchBills: {
      type: Function,
      required: true,
    },
    currentFragmentBillInModal: {
      type: Object,
      required: true,
    },
    emptyFragmentModal: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    ...mapGetters({
      config: "config",
    }),
  },
  methods: {
    async changeFragmentBillStatus(id) {
      await axiosConfig
        .get(`changeFragmentBillStatus/${id}`, this.config)
        .then((res) => {
          this.changeFragmentedBillData(res.data.info[0]);
          this.fetchBills();
        })
        .catch((err) => {
          console.log(err.response);
          return;
        });
    },
  },
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
