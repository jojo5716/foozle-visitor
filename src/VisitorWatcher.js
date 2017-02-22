import Transmitter from './Transmitter';

import { bind } from './helpers/utils';


export default class VisitorWatcher {
    constructor(window, log, config, onReport) {
        this.log = log;
        this.window = window;
        this.onReport = onReport;
        this.config = config;

        this.initialize();
    }

    initialize() {
        const onWindowLeave = bind(this.onWindowLeave, this);

        if (this.window.addEventListener) {
            this.window.addEventListener('beforeunload', onWindowLeave, true);
        }
    }

    onWindowLeave(event) {
        this.log.add('page', {
            leaveAt: event.timeStamp
        });

        this.onReport();

        event.returnValue = 'Testing...';
    }
}
