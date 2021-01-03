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

  @Action
  public addNominee(nominee: any) {
    if (!nominee) {
      return;
    }

    const newNominees = [...this.nominees];
    if (!newNominees.includes((m: any) => m.imdbID === nominee.imdbID)) {
      newNominees.push(nominee);
    }
    this.context.commit("setNominees", newNominees);
  }
}
export default getModule(NomineeModule);
