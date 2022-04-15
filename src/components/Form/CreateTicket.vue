<template>
  <div>
    <v-text-field
      v-model="ticket.name"
      label="Nom"
      outlined
      dense
      :rules="nameRules"
    />
    <v-text-field
      v-model.number="ticket.nbHours"
      label="Nombre d'heure"
      outlined
      dense
      type="number"
      :rules="numberRules"
    />
    <v-autocomplete
      dense
      v-model="ticket.responsable_id"
      label="Responsable"
      :items="loadResponsable"
      item-text="firstName"
      outlined
      required
      return-object
      clearable
    >
      <template #selection="data">
        <span>
          {{ data.item.firstName }}
          <strong>{{ data.item.lastName }}</strong>
        </span>
      </template>
      <template #item="data">
        <span>
          {{ data.item.firstName }}
          <strong>{{ data.item.lastName }}</strong>
        </span>
      </template>
    </v-autocomplete>
  </div>
</template>

<script lang="ts">
import { Component, VModel, Vue } from "vue-property-decorator";
import { PropType } from "vue";
import { ResponsableModel, TicketModel } from "@/store/models";

@Component({})
export default class FormCreateTicket extends Vue {
  @VModel({ type: Object as PropType<TicketModel> })
  public ticket!: TicketModel;

  public loadResponsable: ResponsableModel[] = [];

  public nameRules = [
    (value: string | undefined): string | true =>
      (value != undefined && value.length > 0) || "Ce champ est requis",
  ];

  public numberRules = [
    (value: number | undefined): string | true =>
      (value != undefined && value > 0 && typeof value === "number") ||
      "Ce champ est requis",
  ];

  public created(): void {
    this.loadResponsable = ResponsableModel.all();
  }
}
</script>
