import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "@/store";

@Module({ dynamic: true, namespaced: true, store, name: "NomineeModule" })
class NomineeModule extends VuexModule {
  nominees: any[] = [];

  @Mutation
  private setNominees(nominees: any[]) {
    this.nominees = nominees;
  }

  @Action
  public updateNomineeList(nominees: any[]) {
    this.context.commit("setNominees", nominees);
  }
}
export default getModule(NomineeModule);
