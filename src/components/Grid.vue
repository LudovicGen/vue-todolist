<template>
  <v-container style="height: 100%">
    <v-toolbar elevation="0" class="mb-4">
      <h1 class="text-h3 mt-3 mr-3">Vue todo</h1>
      <v-avatar size="36" color="primary" class="white--text">{{
        tickets.length
      }}</v-avatar>
      <v-spacer></v-spacer>

      <!-- <v-autocomplete
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
      /> -->

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
                @completed="completed(ticket)"
                @selected="selected(ticket.id)"
              />
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import TheCard from "@/components/TheCard.vue";
import ModalsTheTicket from "@/components/Modals/TheTicket.vue";
import { Ticket } from "@/utils/defaultObject";
import { ResponsableModel, TicketModel } from "@/store/models";
import { responsablesData } from "@/store/seed";

@Component({ components: { TheCard, ModalsTheTicket } })
export default class Grid extends Vue {
  public showMethod = false;

  public newTicket = {} as Ticket;

  public tickets: TicketModel[] = [];

  public totalSelected: string[] = [];

  public loadResponsable: ResponsableModel[] = [];

  public close(): void {
    this.showMethod = false;
    this.newTicket = {} as Ticket;
  }

  public save(): void {
    // const falseNb = this.tickets.reduce(
    //   (n, e) =>
    //     e.responsable_id === this.newTicket.responsable_id ? e.nbHours + n : n,
    //   0
    // );

    // const filtered = this.baseTicket.filter(
    //   (e) => e.responsable_id !== this.newTicket.responsable_id
    // );

    if (
      this.newTicket.name &&
      this.newTicket.nbHours &&
      this.newTicket.responsable_id
    ) {
      console.log(this.newTicket);
      TicketModel.insert({
        data: {
          ...this.newTicket,
          responsable_id: this.newTicket.responsable_id.id,
          assignee: this.newTicket.responsable_id,
        },
      }).then(() => {
        this.close();
        this.loadData();
      });
    }
  }

  public loadData(): void {
    this.tickets = TicketModel.all();
    this.loadResponsable = ResponsableModel.query().withAll().get();
  }

  public async created(): Promise<void> {
    const initialData = responsablesData;
    ResponsableModel.insert({ data: initialData });

    this.loadData();
  }

  public completed(item: Ticket): void {
    TicketModel.update({
      data: {
        ...item,
        completed: true,
      },
      where: item.id,
    });

    this.loadData();
  }

  public multipleDestroy(): void {
    this.totalSelected.forEach((id) => {
      TicketModel.delete(id);
    });
    this.totalSelected = [];
    this.loadData();
  }

  public selected(index: string): void {
    this.totalSelected.push(index);
  }
}
</script>

<style>
.no-uppercase {
  text-transform: none;
}
</style>
