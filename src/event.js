export default {
    on(event, handler) {
        document.addEventListener(event, (e) => {
            handler(e.detail);
        });
    },

    emit(event, data) {
        const evt = new CustomEvent(event, { detail: data });
        document.dispatchEvent(evt);
    },
};
