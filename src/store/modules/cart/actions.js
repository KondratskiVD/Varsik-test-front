
import * as types from './mutation-types'
import {SET_SUM} from "./mutation-types";

export default {
  setNewSum ({ commit }, data) {
    commit(types.SET_SUM, data)
  }
}

