<template>
  <v-container style="height: 100%">
    <v-toolbar elevation="0" class="mb-4">
      <h1 class="text-h3 mt-3">Vue todo</h1>
      <v-spacer></v-spacer>
      <ModalsTheTicket
        v-model="newTicket"
        :dialog="showMethod"
        title="Ajouter un ticket"
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
        <v-col cols="3" v-for="(ticket, index) in baseTicket" :key="index"
          ><AppColumn :item="ticket" @destroy="destroy(index)" />
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

  public baseTicket: Ticket[] = [];

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
    if (
      this.newTicket.name &&
      this.newTicket.nbHours &&
      this.newTicket.responsable
    ) {
      this.baseTicket.push(this.newTicket);
      this.showMethod = false;
      this.newTicket = {} as Ticket;
    }
    console.log(this.baseTicket);
  }

  public destroy(index: number): void {
    this.baseTicket.splice(index, 1);
  }
}
</script>
