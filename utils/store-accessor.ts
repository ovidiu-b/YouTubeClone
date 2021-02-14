import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import IndexStore from "@/store/IndexStore";

let indexStore: IndexStore;

function initialiseStores(store: Store<any>): void {
    indexStore = getModule(IndexStore, store);
}

export { initialiseStores, indexStore };
