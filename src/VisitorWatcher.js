import Transmitter from './Transmitter';

import { bind } from './helpers/utils';


export default class VisitorWatcher {
    constructor(window, onReport, event = "beforeunload") {
        this.window = window;
        this.onReport = onReport;
        this.event = event;
        this.initialize();
    }

    initialize() {
        const onWindowLeave = bind(this.onWindowLeave, this);

        if (this.window.addEventListener) {
            this.window.addEventListener(this.event, onWindowLeave, true);
        } else if (this.window.attachEvent) {
            this.window.attachEvent(this.event, onWindowLeave);
        }
    }

    onWindowLeave(event) {
        this.onReport(event.timeStamp);
    }
}
