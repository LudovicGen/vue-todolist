<template>
  <v-card elevation="0" height="100%">
    <v-card-title>{{ title }}</v-card-title>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class AppColumn extends Vue {
  @Prop({ type: String, required: true })
  private readonly title!: string;
}
</script>
