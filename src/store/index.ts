import Vue from "vue";
import Vuex from "vuex";
import VuexORM from "@vuex-orm/core";
import { ResponsableModel, TicketModel } from "./models";

Vue.use(Vuex);

const database = new VuexORM.Database();

database.register(ResponsableModel);
database.register(TicketModel);

const store = new Vuex.Store({
  plugins: [VuexORM.install(database)],
});

export default store;
