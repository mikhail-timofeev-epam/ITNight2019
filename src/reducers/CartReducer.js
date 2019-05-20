import { CartActionTypes } from "./../actions/actionsTypes";

const initialState = {
    randomStaff: [],
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case CartActionTypes.PUSH_RANDOM_STAFF_TO_CART:
          let newrandomStaff = state.randomStaff;
          newrandomStaff.push(action.payload);
          return {
            ...state,
            randomStaff: newrandomStaff,
          };
        case CartActionTypes.REMOVE_RANDOM_STAFF_FROM_CART:
          return {
            ...state,
            randomStaff: [],
          };
        case CartActionTypes.REMOVE_RANDOM_STAFF_FROM_CART_BY_POLICE:
          return {
            ...state,
            randomStaff: [],
          };
        default:
            return state;
    }
}