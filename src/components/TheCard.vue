<template>
  <v-card
    elevation="0"
    outlined
    @click="selected"
    :disabled="item.completed"
    class="mb-5"
  >
    <v-card-title>{{ item.name ? item.name : "Non renseigné" }}</v-card-title>
    <v-card-text>
      <p>Temps: {{ item.nbHours ? item.nbHours : "Non renseigné" }} heure(s)</p>
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
import { PropType } from "vue";
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import ModalsTheTicket from "@/components/Modals/TheTicket.vue";
import { TicketModel } from "@/store/models";

@Component({ components: { ModalsTheTicket } })
export default class TheCard extends Vue {
  @Prop({ type: Object as PropType<TicketModel> })
  public item!: TicketModel;

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
