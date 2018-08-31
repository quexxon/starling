'use strict';

import evt from './event';
import h from 'virtual-dom/h';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import createElement from 'virtual-dom/create-element';

// Polyfill `Object.assign`
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
if (typeof Object.assign != 'function') {
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) {
            'use strict';
            if (target == null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) {
                    for (var nextKey in nextSource) {
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}

const newAction = (msg, data = {}) => {
    evt.emit('new_action', { msg, data });
};

const createApp = (init, update, view) => {
    const globals = {};
    const actionQueue = [];
    const state = {};

    const invoke = (f) => f();

    const renderView = () => {
        const newTree = view(state);
        const patches = diff(globals.tree, newTree);
        globals.rootNode = patch(globals.rootNode, patches);
        globals.tree = newTree;
    };

    const updateState = () => {
        if (actionQueue.length > 0) {
            const result = update(state, actionQueue.shift());

            Object.assign(state, result.diff);

            return result.tasks;
        }
    };

    const registerAction = (action) => {
        actionQueue.push(action);
        evt.emit('action_registered');
    };

    const act = () => {
        const tasks = updateState();
        renderView();
        tasks.forEach(invoke);

        if (actionQueue.length > 0) {
            act();
        }
    };

    return {
        embed(container, env = {}) {
            const { diff, tasks } = init(env);

            Object.assign(state, diff);

            evt.on('new_action', registerAction);
            evt.on('action_registered', act);

            globals.tree = view(state);
            globals.rootNode = createElement(globals.tree);
            container.appendChild(globals.rootNode);

            tasks.forEach(task => task());
        },
    };
};

export default {
    createApp,
    h,
    newAction,
};
