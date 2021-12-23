<template>
  <div>مرحبا {{ user.name }}</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "SBdashboard",
  computed: {
    ...mapGetters({
      user: "user",
    }),
  },
};
</script>
