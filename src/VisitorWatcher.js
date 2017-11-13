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
        const sendEvent = bind(this.sendEvent, this);

        if (this.window.addEventListener) {
            this.window.addEventListener(this.event, sendEvent, true);
        } else if (this.window.attachEvent) {
            this.window.attachEvent(this.event, sendEvent);
        }
    }

    sendEvent(event) {
        this.onReport(event.timeStamp);
    }
}
