<template>
  <div class="container shadow rounded p-2">
    <input
      type="text /"
      class="form-control border-0 my-2 focus-none"
      placeholder="0"
      disabled
    />
    <table class="table table-borderless" id="calculator">
      <tr>
        <td>
          <button>AC</button>
        </td>
        <td>
          <button>+/-</button>
        </td>
        <td>
          <button>%</button>
        </td>
        <td>
          <button>÷</button>
        </td>
      </tr>
      <tr>
        <td>
          <button>7</button>
        </td>
        <td>
          <button>8</button>
        </td>
        <td>
          <button>9</button>
        </td>
        <td>
          <button>×</button>
        </td>
      </tr>
      <tr>
        <td>
          <button>4</button>
        </td>
        <td>
          <button>5</button>
        </td>
        <td>
          <button>6</button>
        </td>
        <td>
          <button>-</button>
        </td>
      </tr>
      <tr>
        <td>
          <button>1</button>
        </td>
        <td>
          <button>2</button>
        </td>
        <td>
          <button>3</button>
        </td>
        <td>
          <button>+</button>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <button class="text-start">0</button>
        </td>
        <td>
          <button>.</button>
        </td>
        <td>
          <button>=</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  mounted() {
    var btns = document.querySelectorAll("#calculator button");
    var trs = document.querySelectorAll("#calculator tr");
    /*to manage the buttons*/
    for (let i = 0; i < btns.length; i++) {
      btns[i].classList.add(
        "btn",
        "rounded",
        "p-2",
        "m-0",
        "w-100",
        "text-center"
      );
      if (i <= 2) {
        btns[i].classList.add("btn-ss-light-blue", "text-white");
      }
    }
    /*to manage the buttons on the last middle*/
    for (let i = 0; i < trs.length - 1; i++) {
      trs[i].lastChild.firstChild.classList.add("btn-ss-blue", "text-white");
      let tds = trs[i + 1].childNodes != undefined ? trs[i + 1].childNodes : "";
      for (let j = 0; j < tds.length - 1; j++) {
        tds[j].firstChild.classList.add("btn-ss-smoke");
        if (tds.length == 3) {
          tds[tds.length - 1].lastChild.classList.add(
            "btn-ss-blue",
            "text-white"
          );
        }
      }
    }
  },
};
</script>

<style>
.dbh-title {
  font-weight: 700;
}

#calculator tr td button {
  font-size: 18px;
  font-weight: 500;
}

.focus-none:focus {
  border: none !important;
  border-color: transparent !important;
  box-shadow: unset !important;
  color: black;
}

.focus-none:disabled {
  cursor: not-allowed;
  background: transparent !important;
}
</style>
