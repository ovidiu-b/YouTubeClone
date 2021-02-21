import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import IndexStore from "@/store/IndexStore";
import DefaultStore from "@/store/DefaultStore";

let indexStore: IndexStore;
let defaultStore: DefaultStore;

function initialiseStores(store: Store<any>): void {
    indexStore = getModule(IndexStore, store);
    defaultStore = getModule(DefaultStore, store);
}

export { initialiseStores, indexStore, defaultStore };
