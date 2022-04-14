<template>
  <v-container style="height: 100%">
    <v-toolbar elevation="0" class="mb-4">
      <h1 class="text-h3 mt-3 mr-3">Vue todo</h1>
      <v-avatar size="36" color="primary" class="white--text">{{
        baseTicket.length
      }}</v-avatar>
      <v-spacer></v-spacer>
      <v-btn
        @click="multipleDestroy"
        class="mr-3 no-uppercase"
        elevation="0"
        :disabled="totalSelected.length > 0 ? false : true"
        >Suppression
        <v-avatar size="30">{{ this.totalSelected.length }}</v-avatar>
      </v-btn>
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
          ><AppColumn
            :item="ticket"
            @destroy="destroy(index)"
            @selected="selected(index)"
          />
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

  public totalSelected: number[] = [];

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
  }

  public destroy(index: number): void {
    this.baseTicket.splice(index, 1);
  }

  public multipleDestroy(): void {
    this.totalSelected.forEach((index) => {
      this.baseTicket.splice(index, 1);
    });
    this.totalSelected = [];
  }

  public selected(index: number): void {
    if (this.totalSelected.includes(index)) {
      this.totalSelected.splice(index, 1);
    } else {
      this.totalSelected.push(index);
    }
  }
}
</script>

<style>
.no-uppercase {
  text-transform: none;
}
</style>
