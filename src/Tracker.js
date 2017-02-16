import VisitorWatcher from './VisitorWatcher';
import Log from './Log';
import Config from './Config';
import Transmitter from './Transmitter';
import Enviroment from './Enviroment';
import MetaData from './MetaData';

import { bind } from './helpers/utils';


export default class Tracker {
    constructor(window) {
        const config = new Config();
        const onReport = bind(this.report, this);

        this.log = new Log();
        this.metaData = new MetaData();

        this.transmitter = new Transmitter(config);
        this.enviroment = new Enviroment(window, this.log);
        this.windowWatcher = new VisitorWatcher(window, this.log, config, onReport);
    }

    report() {
        const data = {
            page: this.log.all('page'),
            visitor: this.log.all('visitor'),
            enviroment: this.log.all('enviroment'),
            metaData: this.metaData.report()
        };

        try {
            this.transmitter.sendTracker(data);
        } catch (error) {}

        return true;

    }
}
