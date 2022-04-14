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
      v-model="ticket.responsable"
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
import { Responsable, Ticket } from "@/utils/defaultObject";
import { PropType } from "vue";

@Component({})
export default class FormCreateTicket extends Vue {
  @VModel({ type: Object as PropType<Ticket> })
  public ticket!: Ticket;

  public loadResponsable: Responsable[] = [
    { firstName: "John", lastName: "Doe" },
    { firstName: "Jane", lastName: "Doe" },
    { firstName: "Jack", lastName: "Doe" },
  ];

  public nameRules = [
    (value: string | undefined): string | true =>
      (value != undefined && value.length > 0) || "Ce champ est requis",
  ];

  public numberRules = [
    (value: number | undefined): string | true =>
      (value != undefined && value > 0) || "Ce champ est requis",
  ];
}
</script>
