<template>
  <div class="container mt-5" v-if="!showInvoice">
    <div class="d-flex flex-row p-3 pb-5 w-50">
      <!-- من
      <input
        type="date"
        class="form-control m-3 d-inline"
        id="from"
        placeholder="من"
      />
      الي <input type="date" class="form-control m-3" id="to" />
      <button class="btn btm-sm btn-outline-ss-blue m-3">بحث</button> -->
    </div>
    <div class="row">
      <div
        class="card border-0 border-end border-5 mx-3"
        style="width: 18rem"
        v-for="bill in allBills"
        :key="bill.id"
      >
        <div class="card-body">
          <div class="d-flex flex-row justify-content-between w-100">
            <!-- title -->
            <h5
              class="card-title fs-4"
              @click.prevent="changeDataToInvoice(bill)"
            >
              فاتورة رقم ({{ bill.id }})
            </h5>
            <!-- action button -->
            <div class="dropdown">
              <button
                class="btn btn-white border-0 dropdown-toggle text-secondary"
                type="button"
                id="dropdownMenuButton2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fas fa-ellipsis-v"></i>
              </button>
              <ul
                class="dropdown-menu dropdown-menu-light text-end"
                aria-labelledby="dropdownMenuButton2"
              >
                <!-- action num 1 change bill status-->
                <li v-if="bill.bill_status_id != 1">
                  <a
                    @click.prevent="changeBillStatus(bill.id)"
                    class="dropdown-item"
                    href="#"
                    >تغيير الحالة الي
                    {{
                      bill.bill_status_id == 1 ? "في انتظار الدفع" : "تم الدفع"
                    }}</a
                  >
                </li>
                <!-- action num 2 see and products list for an bill-->
                <li>
                  <a
                    @click.prevent="
                      resetModal();
                      changeDataInModal(bill);
                    "
                    class="dropdown-item"
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                    >قائمة المُشتريات</a
                  >
                </li>
                <!-- action num 3 see the fragments bill (only if the bill is fragmented) -->
                <li v-if="bill.fragmented_bill.length > 0">
                  <a
                    @click.prevent="changeDataInFragmentModal(bill)"
                    class="dropdown-item"
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop2"
                    >الدفعات الآجلة</a
                  >
                </li>
                <!-- action num 4 see the returned products list if exists -->
                <li v-if="bill.returned == 1">
                  <a
                    @click.prevent="changeDataInReturnsModal(bill)"
                    class="dropdown-item"
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop3"
                    >قائمة المردودات</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <!-- company name -->
          <h6 class="card-subtitle mb-2 text-muted">
            <b>فاتورة بإسم : </b>{{ bill.company_name }}
          </h6>
          <!-- number of products -->
          <h6 class="card-subtitle mb-2 text-muted">
            <b>عدد المشتريات : </b>{{ bill.sale.products.length }}
          </h6>
          <!-- payment method -->
          <h6 class="card-subtitle mb-2 text-muted">
            <b>طريقة الدفع : </b>{{ bill.payment_method.name }}
          </h6>
          <!-- payment status -->
          <h6 class="card-subtitle mb-2 text-muted">
            <b>حالة الدفع : </b>
            <span v-if="bill.bill_status_id == 1" class="badge bg-success"
              >تم الدفع</span
            >
            <span v-else class="badge bg-warning"> في الانتظار</span>
          </h6>
          <!-- discount -->
          <h6 class="card-subtitle mb-2 text-muted">
            <b>التخفيض : </b>
            {{ bill.applied_discount * 100 }}%
          </h6>
          <!-- returned -->
          <h6 class="card-subtitle mb-2 text-muted">
            <b>تم الارجاع : </b>
            <p class="d-inline" v-if="bill.returned == 1">نعم</p>
            <p class="d-inline" v-else>لا</p>
          </h6>
          <!-- description -->
          <p class="card-text">
            {{ bill.desc || `لا توجد ملاحظات حول هذه الفاتورة` }}
          </p>
          <!-- total -->
          <small class="float-end text-muted"
            ><b>الإجمالي : </b
            >{{
              (
                bill.original_total -
                bill.original_total * bill.applied_discount -
                bill.total_returned
              ).toFixed(2)
            }}
            LYD</small
          >
          <!-- create at -->
          <small class="float-start text-muted"
            ><b>{{ formatDate(bill.created_at) }}</b></small
          >
          <!-- barcode and barcode PNG -->
          <div
            class="d-flex flex-column justify-content-center text-center w-100"
          >
            <img
              :src="bill.barcodePNG_path"
              class="mt-2 img-fluid w-50 align-self-center"
              alt=""
            />
            <small>{{ bill.bill_barcode }}</small>
          </div>
        </div>
      </div>
      <!-- pagination buttons -->
      <div
        class="d-flex justify-content-start bottom-0"
        v-if="allLinks.length > 3"
      >
        <div class="">
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-end">
              <li
                class="page-item"
                v-for="(link, index) in allLinks"
                :key="link.label"
              >
                <a
                  class="page-link"
                  v-if="index == 0"
                  @click.prevent="fetchBills(link.url)"
                  :class="{ 'd-none': link.url == null }"
                  >السابق</a
                >
                <a
                  v-if="index != 0 && index != allLinks.length - 1"
                  @click.prevent="fetchBills(link.url)"
                  class="page-link"
                  :class="{ 'active-link': link.active }"
                  >{{ link.label }}</a
                >
                <a
                  class="page-link"
                  v-if="index == allLinks.length - 1"
                  @click.prevent="fetchBills(link.url)"
                  :class="{ 'd-none': link.url == null }"
                  >التالي</a
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <!-- loading screen -->
    <div class="position-relative mt-5 text-center">
      <div class="position-absolute top-50 start-50 translate-middle">
        <loading v-if="allBills.length == 0 && in_submission" />
        <div class="mt-5" v-if="allBills.length == 0 && !in_submission">
          <img
            src="/img/404 error with person looking for-rafiki.png"
            class="img-fluid w-50"
          />
          <p class="text-muted">لاتوجد فواتير لحد الان</p>
        </div>
      </div>
    </div>
  </div>
  <!-- modal component to get all products list of an bill -->
  <billModal
    v-show="currentBillInModal.length > 0"
    :currentBillInModal="currentBillInModal"
    :fetchBills="fetchBills"
    :emptyModal="emptyModal"
  />
  <!-- modal component to get all fragmented bill list-->
  <bill-fragments-modal
    :currentFragmentBillInModal="currentFragmentBillInModal"
    :emptyFragmentModal="emptyFragmentModal"
    :changeFragmentedBillData="changeFragmentedBillData"
    :fetchBills="fetchBills"
  />
  <!-- modal component to get all returned products list of an bill -->
  <bill-returns-modal
    :currentReturnsInBillInModal="currentReturnsInBillInModal"
    :emptyReturnModal="emptyReturnModal"
  />
  <!-- component to generate pdf -->
  <bill-template
    v-if="showInvoice"
    :beginBillProcess="beginBillProcess"
    :dataToInvoice="dataToInvoice"
  />
</template>

<script>
import axiosConfig from "@/includes/axiosConfig";
import billTemplate from "@/components/SBbills/billTemplate.vue";
import BillFragmentsModal from "@/components/SBbills/billFragmentsModal.vue";
import billModal from "@/components/SBbills/billModal.vue";
import billReturnsModal from "@/components/SBbills/billReturnsModal.vue";
import loading from "@/components/loading.vue";
import { mapGetters } from "vuex";

export default {
  name: "billsList",
  components: {
    loading,
    billTemplate,
    billModal,
    BillFragmentsModal,
    billReturnsModal,
  },
  props: ["changeDynamicComponent"],
  computed: {
    ...mapGetters({
      config: "config",
    }),
  },
  data() {
    return {
      allBills: [],
      allLinks: [],
      currentBillInModal: [],
      currentFragmentBillInModal: [],
      currentReturnsInBillInModal: [],
      emptyModal: false,
      emptyFragmentModal: false,
      emptyReturnModal: false,
      dataToInvoice: {},
      showInvoice: false,
      in_submission: false,
      currentPage: 1,
    };
  },
  methods: {
    formatDate(date) {
      let aux = new Date(date);
      return `${aux.getFullYear()}-${aux.getMonth() + 1}-${aux.getDate()}`;
    },
    async fetchBills(
      baseURL = `http://sales-system-api.com/api/allBills?page=${this.currentPage}`
    ) {
      this.in_submission = true;
      await axiosConfig({
        method: "get",
        baseURL: baseURL,
        ...this.config,
      })
        .then((res) => {
          this.in_submission = false;
          console.log(res);
          this.allBills = res.data.info.data;
          this.allLinks = res.data.info.links;
          this.currentPage = res.data.info.current_page;
        })
        .catch((err) => {
          this.in_submission = false;
          console.log(err.response);
        });
    },
    changeDataToInvoice(data) {
      this.dataToInvoice = data;
      this.beginBillProcess();
    },
    changeDataInModal(bill) {
      this.currentBillInModal = bill;
      this.emptyModal = true;
    },
    changeDataInFragmentModal(bill) {
      this.currentFragmentBillInModal = bill;
      this.emptyFragmentModal = true;
    },
    changeFragmentedBillData(data) {
      this.currentFragmentBillInModal = data;
    },
    changeDataInReturnsModal(bill) {
      this.currentReturnsInBillInModal = bill;
      this.emptyReturnModal = true;
    },
    changeReturnsData(data) {
      this.currentReturnsInBillInModal = data;
    },
    /* i named it like so becuase the newBill components uses the billTemplate too and pass that func as props.. */
    beginBillProcess() {
      this.showInvoice = !this.showInvoice;
    },
    resetModal() {
      let textInputs = document.querySelectorAll("input[type=number]");
      textInputs.forEach((el) => {
        el.classList.toggle("border-danger", false);
        el.value = "";
      });
      let checkBoxes = document.querySelectorAll("input[type=checkbox]");
      checkBoxes.forEach((el) => {
        el.checked = false;
      });
    },
    async changeBillStatus(id) {
      await axiosConfig
        .get(`changeBillStatus/${id}`, this.config)
        .then((res) => {
          console.log(res);
          this.fetchBills();
        })
        .catch((err) => {
          this.swalMsg("error", err.response.data.message);
        });
    },
    swalMsg(icon, msg) {
      this.$swal({
        icon: icon,
        text: msg,
        confirmButtonText: "حسنا",
        confirmButtonColor: "#5db1ff",
      });
    },
  },
  async activated() {
    this.fetchBills();
  },
};
</script>

<style scoped>
.card {
  border-color: #5db1ff !important;
  transition: all 500ms;
}

.card:hover {
  border: 1px solid rgba(0, 0, 0, 0.125) !important;
  transition: all 0s;
}

.card-title {
  color: #216bae;
  font-weight: bold;
}

.dropdown-toggle::after {
  display: none;
}

.btn:focus {
  box-shadow: unset;
}

.page-link {
  cursor: pointer;
  color: #0d6efd;
}

.active-link {
  background: #216bae !important;
  color: white !important;
}

.dropdown-item.active,
.dropdown-item:active {
  color: #fff;
  text-decoration: none;
  background-color: #216bae;
}

.card-title:hover {
  cursor: pointer;
  text-shadow: 5px;
}
</style>
