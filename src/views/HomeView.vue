<template>
  <div class="home" style="height: 100%">
    <Grid />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Grid from "@/components/Grid.vue"; // @ is an alias to /src

@Component({
  components: {
    Grid,
  },
})
export default class HomeView extends Vue {}
</script>
