<template>
  <v-dialog v-model="dialog" width="35vw" persistent>
    <template #activator="{}">
      <slot> </slot>
    </template>
    <v-card style="overflow: hidden" justify="start">
      <v-card-title class="text-h5 font-weight-bold">
        {{ title }}
        <v-spacer />
      </v-card-title>
      <v-card-text class="text-body-1" align="start">
        <v-form ref="form">
          <FormCreateTicket v-model="ticket" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-row>
          <v-col cols="6">
            <v-btn
              block
              elevation="0"
              class="text-capitalize text-body-1"
              color="error"
              @click="close"
            >
              Annuler
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              elevation="0"
              class="text-capitalize text-body-1"
              color="primary"
              @click="action"
            >
              Confirmer
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { PropType } from "vue";
import { Component, Emit, Prop, VModel, Vue } from "vue-property-decorator";
import { Ticket } from "@/utils/defaultObject";
import FormCreateTicket from "@/components/Form/CreateTicket.vue";

@Component({ components: { FormCreateTicket } })
export default class ModalsTheTicket extends Vue {
  @VModel({ type: Object as PropType<Ticket> })
  public ticket!: Ticket;

  @Prop({ type: Boolean, default: false })
  public dialog!: boolean;

  @Prop({ type: String, required: true })
  public title!: string;

  @Emit("close")
  public close(): void {
    // This is intentional
  }

  @Emit("action")
  public action(): void {
    if ((this.$refs.form as Vue & { validate: () => boolean }).validate()) {
      this.action;
    } else {
      console.error("dommage");
    }
  }
}
</script>
