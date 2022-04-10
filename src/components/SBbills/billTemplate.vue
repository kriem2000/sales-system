<template>
  <div class="container h-100">
    <div class="card mt-3">
      <div class="card-body">
        <div id="invoice">
          <div class="toolbar hidden-print">
            <div class="text-end">
              <button type="button" class="btn btn-outline-dark">
                <i class="fa fa-print"></i> طباعة
              </button>
              <button
                @click="download"
                type="button"
                class="btn btn-outline-danger mx-1"
              >
                <i class="fas fa-file-pdf mx-1"></i> تنزيل بصيغة PDF
              </button>
              <button
                @click.prevent="beginBillProcess(true, false)"
                type="button"
                class="btn btn-outline-warning mx-1"
              >
                <i class="fas fa-clipboard-check"></i> انهاء
              </button>
            </div>
            <hr />
          </div>

          <vue3-simple-html2pdf
            ref="vue3SimpleHtml2pdf"
            :options="pdfOptions"
            :filename="exportFilename"
          >
            <div class="invoice">
              <div style="min-width: 600px">
                <header>
                  <div class="row justify-content-center">
                    <div class="col-6 text-center">
                      <img
                        class="img-fluid"
                        :src="`data:image/png;base64,${file}`"
                      />
                      <p>{{ bill.bill_barcode }}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col text-end me-3">
                      <img
                        class="img-fluid w-40"
                        src="/img/invoice-logo.jpeg"
                      />
                    </div>
                    <div class="col company-details text-start m-3">
                      <h2 class="name">
                        <a target="_blank"> WASFAT ALSHIFA </a>
                      </h2>
                      <div>benghazi,libya</div>
                      <div>913898107 218 (+)</div>
                      <div>ibrahim@wasfat-alshifa.com</div>
                    </div>
                  </div>
                </header>
                <main>
                  <div class="row contacts">
                    <div class="col invoice-to text-end">
                      <div class="d-flex flex-row justify-content-between">
                        <div class="info-holder">
                          <div class="text-gray-light fs-5 fw-bold">
                            فاتورة بإسم : {{ bill.company_name }}
                          </div>
                          <div class="address">
                            العنوان : {{ bill.company_address }}
                          </div>
                          <div class="email">
                            <a>اسم المُشتري : {{ bill.buyer_name }}</a>
                          </div>
                          <div class="email">
                            <a>رقم الجهة المعنية : {{ bill.company_phone }}</a>
                          </div>
                        </div>
                        <div class="info-holder">
                          <div class="text-gray-light fs-5 fw-bold">
                            معلومات أخرى :
                          </div>
                          <div class="email">
                            <a>اسم الكفيل : {{ bill.sponsor_name }}</a>
                          </div>
                          <div class="email">
                            <a v-if="bill.payment_method_id == 1"
                              >طريقة الدفع : نقدي</a
                            >
                            <a v-if="bill.payment_method_id == 2"
                              >طريقة الدفع : حوالة مصرفية</a
                            >
                            <a v-if="bill.payment_method_id == 3"
                              >طريقة الدفع : دفع آجل</a
                            >
                          </div>
                          <template v-if="bill.delegate_name.length > 0">
                            <div class="email">
                              <a>اسم المندوب : {{ bill.delegate_name }}</a>
                            </div>
                            <div class="email">
                              <a>رقم المندوب : {{ bill.delegate_phone }}</a>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                    <div class="col invoice-details text-start">
                      <h1 class="invoice-id">N-INVOICE {{ bill.id }}</h1>
                      <div class="date">
                        حالة الفاتورة :
                        {{
                          bill.bill_status_id == 1 ? "مدفوع" : "في انتظار الدفع"
                        }}
                      </div>
                      <template v-if="bill.payment_method_id == 3">
                        <div class="date">
                          يتم الدفع :
                          {{ bill.payment_period == "weekly" ? "اسبوعيا" : "" }}
                          {{ bill.payment_period == "monthly" ? "شهريا" : "" }}
                          {{ bill.payment_period == "daily" ? "يوميا" : "" }}
                        </div>
                        <div class="date">
                          عدد الدفعات : {{ bill.fragments_number }}
                        </div>
                      </template>
                    </div>
                  </div>
                  <table id="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th class="text-end fs-5">اسم الصنف</th>
                        <th class="text-end fs-5">سعر القطعة</th>
                        <th class="text-end fs-5">الكمية</th>
                        <th class="text-end fs-5">الإجمالي</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(product, index) in products"
                        :key="product.id"
                      >
                        <td class="no">
                          {{ index >= 10 ? index : `0${index}` }}
                        </td>
                        <td class="text-end">
                          <h3>{{ product.name }}</h3>
                        </td>
                        <td class="unit">{{ product.sale_price }}</td>
                        <td class="qty">{{ product.pivot.quantity }}</td>
                        <td class="total">
                          {{
                            (
                              product.sale_price * product.pivot.quantity
                            ).toFixed(2)
                          }}
                          LYD
                        </td>
                      </tr>
                    </tbody>
                    <div class="html2pdf__page-break"></div>
                    <tfoot id="footer">
                      <tr>
                        <td colspan="2"></td>
                        <td colspan="2">الإجمالي :</td>
                        <td>{{ bill.original_total }} LYD</td>
                      </tr>
                      <tr v-if="bill.returned == 1">
                        <td colspan="2"></td>
                        <td colspan="2">تم إرجاع :</td>
                        <td>{{ bill.total_returned }} LYD</td>
                      </tr>
                      <tr>
                        <td colspan="2"></td>
                        <td colspan="2">التخفيض</td>
                        <td>{{ bill.applied_discount * 100 }} %</td>
                      </tr>
                      <tr>
                        <td colspan="2"></td>
                        <td colspan="2">الإجمالي النهائي</td>
                        <td>
                          {{
                            (
                              bill.original_total -
                              bill.original_total * bill.applied_discount -
                              bill.total_returned
                            ).toFixed(2)
                          }}
                          LYD
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                  <div>
                    <div class="thanks" id="el-1">شكرا لك !</div>
                    <div class="notices mb-3" id="el-2">
                      <div class="fs-4">ملاحظات :</div>
                      <div class="notice">
                        {{
                          bill.desc == ""
                            ? "لا توجد ملاحظات حول هذه الفاتورة"
                            : bill.desc
                        }}
                      </div>
                    </div>
                    <div class="mb-5" id="el-3">
                      توقيع المُشتري: ___________________
                    </div>
                    <footer
                      class="d-flex flex-row justify-content-between"
                      id="el-4"
                    >
                      <div>
                        تاريخ الفاتورة : {{ formatDate(bill.created_at) }}
                      </div>
                      <div>Invoice was created on a computer</div>
                    </footer>
                  </div>
                </main>
              </div>
            </div>
          </vue3-simple-html2pdf>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/template1.css";

export default {
  props: {
    beginBillProcess: {
      type: Function,
      required: true,
    },
    dataToInvoice: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      products: this.dataToInvoice.sale.products,
      bill: this.dataToInvoice,
      file: this.dataToInvoice.file,
      pdfOptions: {
        margin: 5,
        image: {
          type: "jpeg",
          quality: 1,
        },
        pagebreak: {
          avoid: ["#footer", "#el-1", "#el-2", "#el-3", "#el-4"],
        },
        html2canvas: {
          scale: 3,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "p",
        },
      },
      exportFilename: "my-custom-file.pdf",
    };
  },
  methods: {
    formatDate(date) {
      let aux = new Date(date);
      return `${aux.getFullYear()}-${aux.getMonth() + 1}-${aux.getDate()}`;
    },
    download() {
      this.$refs.vue3SimpleHtml2pdf.download();
    },
  },
};
</script>

<style scoped>
.w-40 {
  width: 40% !important;
}
</style>
