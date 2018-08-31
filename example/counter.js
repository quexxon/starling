const h = starling.h;
const newAction = starling.newAction;

//-------------------------------------------------------------------------------
// DATA
//-------------------------------------------------------------------------------

const initialState = {
    counter: 0,
};

//-------------------------------------------------------------------------------
// INIT
//-------------------------------------------------------------------------------

const init = () => {
    return {
        diff: initialState,
        tasks: [],
    };
};

//-------------------------------------------------------------------------------
// UPDATE
//-------------------------------------------------------------------------------

const update = (state, action) => {
    switch (action.msg) {
        case 'DECREMENT':
            return {
                diff: { counter: state.counter - 1 },
                tasks: [],
            };

        case 'INCREMENT':
            return {
                diff: { counter: state.counter + 1 },
                tasks: [],
            };

        default:
            throw 'Incomplete case analysis!';
    }
};

//-------------------------------------------------------------------------------
// VIEW
//-------------------------------------------------------------------------------

const view = (state) => {
    return h('div', {}, [
        h('button', { onclick: () => newAction('DECREMENT') }, '-'),
        h('span', {}, state.counter),
        h('button', { onclick: () => newAction('INCREMENT') }, '+'),
    ]);
};

//-------------------------------------------------------------------------------
// BOOTSTRAP
//-------------------------------------------------------------------------------

const root = document.getElementById('app');
starling.createApp(init, update, view).embed(root);
