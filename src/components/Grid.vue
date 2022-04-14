<template>
  <v-container style="height: 100%">
    <v-toolbar elevation="0" class="mb-4">
      <h1 class="text-h3 mt-3">Vue todo</h1>
      <v-spacer></v-spacer>
      <v-btn class="no-uppercase" color="primary" @click="showMethod"
        >Ajouter une tâche</v-btn
      >
    </v-toolbar>
    <v-container style="height: 100%">
      <v-row style="height: 50vh">
        <v-col cols="4"><AppColumn title="John" /> </v-col>
        <v-divider vertical="false"></v-divider>
        <v-col cols="4"><AppColumn title="Doe" /> </v-col>
        <v-divider vertical="false"></v-divider>
        <v-col cols="4"><AppColumn title="Test" /> </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppColumn from "@/components/AppColumn.vue";

@Component({ components: { AppColumn } })
export default class Grid extends Vue {
  public showMethod() {
    console.log("showMethod");
  }
}
</script>
