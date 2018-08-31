const h = starling.h;
const newAction = starling.newAction;

//-------------------------------------------------------------------------------
// DATA
//-------------------------------------------------------------------------------

const initialState = {
    counter: 0,
    step: 1,
};

//-------------------------------------------------------------------------------
// INIT
//-------------------------------------------------------------------------------

const init = (_environment) => {
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
                diff: { counter: state.counter - state.step },
                tasks: [],
            };

        case 'INCREMENT':
            return {
                diff: { counter: state.counter + state.step },
                tasks: [],
            };

        case 'SET_STEP':
            return {
                diff: { step: parseInt(action.data.step) },
                tasks: [],
            };

        case 'RESET':
            return {
                diff: initialState,
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
        counter(state),
        stepInput(state),
        h('button', { onclick: () => newAction('RESET') }, 'Reset'),
    ]);
};

const counter = (state) => {
    return h('div', { className: 'counter' }, [
        h('button', { onclick: () => newAction('DECREMENT') }, '-'),
        h('span', {}, state.counter),
        h('button', { onclick: () => newAction('INCREMENT') }, '+'),
    ]);
};

const stepInput = (state) => {
    return h('label', {}, [
        h('span', {}, 'Step:'),
        h('input', {
            type: 'number',
            value: state.step,
            oninput: (e) => {
                newAction('SET_STEP', { step: e.target.value });
            }
        }, []),
    ]);
};

//-------------------------------------------------------------------------------
// BOOTSTRAP
//-------------------------------------------------------------------------------


// Use `environment` for external state that you'd like to provide to the
// application when `init` is called. The `environment` argument to `embed` is
// optional and is provided here solely as documentation. The default value is
// `{}`.
const environment = {};
const root = document.getElementById('app');
starling.createApp(init, update, view).embed(root, environment);
