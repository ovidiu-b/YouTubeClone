import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

@Module({
    name: "DefaultStore",
    stateFactory: true,
    namespaced: true
})
export default class DefaultStore extends VuexModule {
    navigationAlwaysHidden: boolean = false;

    @Mutation
    setNavigationAlwaysHidden(yesOrNo: boolean) {
        this.navigationAlwaysHidden = yesOrNo;
    }
}
