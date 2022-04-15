import { Model } from "@vuex-orm/core";
import { TicketModel } from "./ticket.model";

export class ResponsableModel extends Model {
  static entity = "responsable";
  // static primaryKey = ["id"];

  static fields() {
    return {
      id: this.uid(),
      firstName: this.string(""),
      lastName: this.string(""),
      tickets: this.hasMany(TicketModel, "responsable_id"),
    };
  }
}
