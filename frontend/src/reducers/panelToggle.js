const initialState = {
    exchangeResult: false,
    pastRecord: false
};

export default function reducer(state=initialState, action) {
    switch (action.type) {

        case 'RESULT_LOADING_STATUS':
            return {...state, exchangeResult: action.payload};

        default:
            return state;
    }
}