import Session from './Session';


export default class Enviroment {
    constructor(window, log) {
        this.window = window;
        this.log = log;
        this.session = new Session(window);
        this.initialize();
    }

    initialize() {
        const window = this.window || {};
        const document = window.document || {};

        const session = this.session.get_or_create();

        this.log.add('enviroment', {
            userAgent: window.navigator ? window.navigator.userAgent : null,
            viewportHeight: document ? document.documentElement.clientHeight : null,
            viewportWidth: document ? document.documentElement.clientWidth : null,
            session,
            url: window.location ? window.location.href : null
        });
    }
}
