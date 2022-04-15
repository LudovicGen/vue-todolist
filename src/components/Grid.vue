<template>
  <v-container style="height: 100%">
    <v-toolbar elevation="0" class="mb-4">
      <h1 class="text-h3 mt-3 mr-3">Vue todo</h1>
      <v-avatar size="36" color="primary" class="white--text">{{
        baseTicket.length
      }}</v-avatar>
      <v-spacer></v-spacer>

      <v-autocomplete
        v-model="option"
        class="mr-3"
        label="Trié par"
        style="width: 30px"
        outlined
        dense
        hide-details="false"
        :items="sorts"
        item-text="name"
        item-value="value"
        @change="sort"
      />

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
        <v-col
          cols="3"
          v-for="(responsable, index) in loadResponsable"
          :key="'responsable' + index"
        >
          <v-card elevation="0" height="100%">
            <v-card-title>{{
              `${responsable.firstName} ${responsable.lastName}`
            }}</v-card-title>
            <div
              class="red--text"
              v-for="(ticket, index) in responsable.tickets"
              :key="'ticket' + index"
            >
              <TheCard
                :item="ticket"
                @completed="completed(index, ticket)"
                @selected="selected(index)"
              />
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TheCard from "@/components/TheCard.vue";
import ModalsTheTicket from "@/components/Modals/TheTicket.vue";
import { Ticket } from "@/utils/defaultObject";
import { ResponsableModel } from "@/store/models";
import { responsablesData } from "@/store/seed";

@Component({ components: { TheCard, ModalsTheTicket } })
export default class Grid extends Vue {
  public showMethod = false;

  public newTicket = {} as Ticket;

  public baseTicket: Ticket[] = [];

  public totalSelected: number[] = [];

  public loadResponsable: ResponsableModel[] = [];

  public sorts = [
    { name: "Nom", value: ".name" },
    { name: "Responsable", value: ".responsable.fistName" },
    { name: "Temps", value: ".nbHours" },
  ];

  public option = { name: "Nom", value: "name" };

  public close(): void {
    this.showMethod = false;
    this.newTicket = {} as Ticket;
  }

  public save(): void {
    const falseNb = this.baseTicket.reduce(
      (n, e) =>
        e.responsable_id === this.newTicket.responsable_id ? e.nbHours + n : n,
      0
    );

    const filtered = this.baseTicket.filter(
      (e) => e.responsable_id !== this.newTicket.responsable_id
    );

    if (
      this.newTicket.name &&
      this.newTicket.nbHours &&
      this.newTicket.responsable_id &&
      falseNb <= 10 &&
      filtered.length <= 3
    ) {
      this.baseTicket.push(this.newTicket);
      this.showMethod = false;
      this.newTicket = {} as Ticket;
    }
  }

  public async created(): Promise<void> {
    const initialData = responsablesData;
    ResponsableModel.insert({ data: initialData });

    this.loadResponsable = ResponsableModel.query().withAll().get();
  }

  public completed(index: number, item: Ticket): void {
    this.baseTicket.splice(index, 1, { ...item, completed: true });
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

  public sort(): void {
    this.baseTicket = this.baseTicket.sort((a, b) => {
      const A = a.name;
      const B = b.name;

      console.log(A);
      if (A < B) {
        return -1;
      }
      if (A > B) {
        return 1;
      }
      return 0;
    });
  }
}
</script>

<style>
.no-uppercase {
  text-transform: none;
}
</style>
