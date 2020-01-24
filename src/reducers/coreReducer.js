import { LOADING_START, LOADING_END } from '../actions/types';

const coreReducerInitialState = {
  loading: false
};

export default (state = coreReducerInitialState, action) => {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        loading: true
      };
    case LOADING_END:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
