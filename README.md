# Starling

Starling is a set of architectural conventions for building web apps, disguised
as a framework. It is primarily inspired by [The Elm
Archicture](https://guide.elm-lang.org/architecture/), but the concepts map
fairly directly to an opinionated subset of React. If you squint, Starling is
like a naive React (plus Redux) without life-cycle methods, component state, or
JSX.

## Getting Started

Run the following commands:

```
npm install
npm run build
```

Load the resulting file (`dist/starling.min.js`) prior to your own to add
Starling to the global namespace. For a small sample application, check out the
`example` directory.

## API

Starling exposes three functions bound to `starling` in the global namespace
(the current build targets the browser).

### `starling.createApp`

Bootstraps a Starling application. `createApp` takes as its arguments three
functions (`init`, `update`, `view`) that form the backbone of Starling's
(stolen) architectural conventions. See the sample application for more
information.

#### Usage

```javascript
const container = document.getElementById('app');
starling.createApp(init, update, view).embed(container);
```


### `starling.newAction`

Register a new action. This is how you make things happen in Starling. See the
sample application for more information.

#### Usage

```javascript
// starling.newAction : ( String, ?Object = {} ) -> ()
starling.newAction('SET_INTERVAL', { value: 5 });
```

### `starling.h`

Convenienently exposes `virtual-dom/h`. Read its documentation
[here](https://github.com/Matt-Esch/virtual-dom/blob/master/virtual-hyperscript/README.md).
