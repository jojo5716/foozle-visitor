export default class Page {
    constructor(window, log) {
        this.window = window;
        this.log = log;
        this.initialize();
    }

    initialize() {
        const window = this.window || {};

        this.log.add('page', {
            url: window.location ? window.location.href : null,
            previousURL: window.document ? window.document.referrer : null,
        });
    }
}
