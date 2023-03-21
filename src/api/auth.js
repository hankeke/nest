import store from "@/store";
import {getStore} from "@/util/store";

export function getToken() {
  return store.getters.access_token ? store.getters.access_token : ''
}
