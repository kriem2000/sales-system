<template>
  <router-view></router-view>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState(["token"]),
  },
  // created() {
  //   if (this.token != null) {
  //     this.$store.dispatch("checkAuthenticated");
  //   }
  // },
};
</script>
