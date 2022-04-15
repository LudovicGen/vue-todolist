import { Model } from "@vuex-orm/core";
import { ResponsableModel } from "./reponsable.model";

export class TicketModel extends Model {
  static entity = "ticket";

  static fields() {
    return {
      id: this.uid(),
      name: this.string(""),
      responsable_id: this.string(null).nullable(),
      nbHours: this.number(0),
      completed: this.boolean(false),
      assignee: this.belongsTo(ResponsableModel, "responsable_id"),
    };
  }
}
