import {
  SET_SUM
} from './mutation-types'

export default {
  [SET_SUM] (state, payload) {
    state.sum = payload
  }
}
