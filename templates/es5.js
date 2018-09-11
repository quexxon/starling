(function () {
    'use strict';

    //---------------------------------------------------------------------------
    // SETUP
    //---------------------------------------------------------------------------

    var h = starling.h;
    var newAction = starling.newAction;

    //---------------------------------------------------------------------------
    // DATA
    //---------------------------------------------------------------------------

    // Remember:
    // - Describe ALL of your initial application state.
    // - If you neglect to provide a default value, you probably have a bug that
    //   JavaScript can't help you find.
    // - Make illegal states unrepresentable. Ref: https://youtu.be/IcgmSRJHu_8
    var initialState = {};

    //---------------------------------------------------------------------------
    // INIT
    //---------------------------------------------------------------------------

    function init(env) {
        return {
            diff: initialState,
            tasks: [],
        };
    }

    //---------------------------------------------------------------------------
    // UPDATE
    //---------------------------------------------------------------------------

    // Remember:
    // - Don't mutate `state`.
    // - Only include new (modified) values for `state` in `diff`.
    // - Don't call tasks; Pass them as values.
    function update(state, action) {
        switch (action.msg) {
            case 'NO_OP':
                return { diff: {}, tasks: [] };

            default:
                throw (
                    'Unknown message (' + action.msg + '): '
                        + 'This is usually due to a typo '
                        + 'or an incomplete case analysis.'
                );
        }
    }

    //---------------------------------------------------------------------------
    // TASKS
    //---------------------------------------------------------------------------

    // Remember:
    // - A task MUST be a thunk.
    // - A task SHOULD always call `newAction`.
    // - Any return value from a task will be ignored.
    function exampleTask() {
        newAction('NO_OP');
    }

    //---------------------------------------------------------------------------
    // VIEW
    //---------------------------------------------------------------------------

    // Remember:
    // - Treat `state` as a read-only value.
    // - Event handlers SHOULD call `newAction`.
    function view(state) {
        return h('div', {}, [ 'Hello, World!' ]);
    }

    //---------------------------------------------------------------------------
    // BOOTSTRAP
    //---------------------------------------------------------------------------

    var environment = {};
    var root = document.getElementById('app');
    starling.createApp(init, update, view).embed(root, environment);
})();
