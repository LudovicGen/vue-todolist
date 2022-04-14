<template>
  <v-card elevation="0" outlined @click="selected" :disabled="item.completed">
    <v-card-title>{{ item.name ? item.name : "Non renseigné" }}</v-card-title>
    <v-card-text>
      <p>Temps: {{ item.nbHours ? item.nbHours : "Non renseigné" }} heure(s)</p>
      <p>
        Auteur:
        {{
          item.responsable.firstName
            ? item.responsable.firstName
            : "Non renseigné"
        }}
        {{
          item.responsable.lastName
            ? item.responsable.lastName
            : "Non renseigné"
        }}
      </p>
    </v-card-text>
    <v-card-actions v-if="!item.completed">
      <v-row>
        <v-col cols="6">
          <ModalsTheTicket
            v-model="item"
            :dialog="showMethod"
            title="Modifier un ticket"
            @close="close"
            @action="close"
          >
            <v-btn
              block
              elevation="0"
              class="no-uppercase text-body-1 mr-2"
              color="primary"
              @click.stop="showMethod = true"
              >Mettre à jour</v-btn
            >
          </ModalsTheTicket>
        </v-col>
        <v-col cols="6">
          <v-btn
            block
            elevation="0"
            class="text-capitalize text-body-1 mr-2"
            color="success"
            @click.stop="completed"
            >Terminé ✓</v-btn
          >
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Ticket } from "@/utils/defaultObject";
import { PropType } from "vue";
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import ModalsTheTicket from "@/components/Modals/TheTicket.vue";

@Component({ components: { ModalsTheTicket } })
export default class TheCard extends Vue {
  @Prop({ type: Object as PropType<Ticket> })
  public item!: Ticket;

  public showMethod = false;

  public close(): void {
    this.showMethod = false;
  }

  @Emit("destroy")
  public destroy(): void {
    // This is intentional
  }

  @Emit("selected")
  public selected(): void {
    // This is intentional
  }

  @Emit("completed")
  public completed(): void {
    // This is intentional
  }
}
</script>
