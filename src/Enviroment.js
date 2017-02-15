export default class Enviroment {
    constructor(window, log) {
        this.window = window;
        this.log = log;

        this.initialize();
    }


    initialize() {
        const window = this.window || {};
        const document = window.document || {};

        this.log.add('enviroment', {
            userAgent: window.navigator ? window.navigator.userAgent : null,
            viewportHeight: document ? document.documentElement.clientHeight : null,
            viewportWidth: document ? document.documentElement.clientWidth : null
        });
    }
}
