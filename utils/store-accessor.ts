import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import IndexStore from "@/store/IndexStore";
import DefaultStore from "@/store/DefaultStore";
import WatchStore from "@/store/WatchStore";

let indexStore: IndexStore;
let watchStore: WatchStore;
let defaultStore: DefaultStore;

function initialiseStores(store: Store<any>): void {
    indexStore = getModule(IndexStore, store);
    watchStore = getModule(WatchStore, store);
    defaultStore = getModule(DefaultStore, store);
}

export { initialiseStores, indexStore, watchStore, defaultStore };
