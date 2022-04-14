<template>
  <v-container style="height: 100%">
    <v-toolbar elevation="0" class="mb-4">
      <h1 class="text-h3 mt-3">Vue todo</h1>
      <v-spacer></v-spacer>
      <ModalsTheTicket
        v-model="newTicket"
        :dialog="showMethod"
        @close="close"
        @action="save"
      >
        <v-btn class="no-uppercase" color="primary" @click="showMethod = true"
          >Ajouter une tâche</v-btn
        >
      </ModalsTheTicket>
    </v-toolbar>
    <v-container style="height: 100%">
      <v-row style="height: 50vh">
        <v-col
          cols="4"
          v-for="(responsable, index) in loadResponsable"
          :key="index"
          ><AppColumn
            :title="`${responsable.firstName} ${responsable.lastName}`"
          />
          <!-- <v-divider vertical></v-divider> -->
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppColumn from "@/components/AppColumn.vue";
import ModalsTheTicket from "@/components/Modals/TheTicket.vue";
import { Responsable, Ticket } from "@/utils/defaultObject";

@Component({ components: { AppColumn, ModalsTheTicket } })
export default class Grid extends Vue {
  public showMethod = false;

  public newTicket = {} as Ticket;

  public loadResponsable: Responsable[] = [
    { firstName: "John", lastName: "Doe" },
    { firstName: "Jane", lastName: "Doe" },
    { firstName: "Jack", lastName: "Doe" },
  ];

  public close(): void {
    this.showMethod = false;
    this.newTicket = {} as Ticket;
  }

  public save(): void {
    console.log("Save");
  }
}
</script>
