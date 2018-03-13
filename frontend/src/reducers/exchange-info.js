const initialState = {
    currency_list: [],
};

export default function reducer(state=initialState, action) {
    switch (action.type) {

        case 'UPDATE_CURRENCY_LIST':
            return { ...state, currency_list: [...action.payload] }

        default:
            return state;
    }
}