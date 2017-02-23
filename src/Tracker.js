import VisitorWatcher from './VisitorWatcher';
import Log from './Log';
import Config from './Config';
import Transmitter from './Transmitter';
import Enviroment from './Enviroment';
import MetaData from './MetaData';
import Session from './Session';
import Page from './Page';

import { bind } from './helpers/utils';


export default class Tracker {
    constructor(window, project) {
        this.loadedOn = new Date().getTime();

        const config = new Config();
        const onReport = bind(this.report, this);

        // Session token
        this.session = new Session(window);

        this.log = new Log();
        this.metaData = new MetaData();
        this.actions = new MetaData();
        this.userInfo = new MetaData();

        this.transmitter = new Transmitter(project, config);

        // Recovery data
        this.enviroment = new Enviroment(window, this.log);
        this.page = new Page(window, this.log);

        this.windowWatcher = new VisitorWatcher(window, this.log, config, onReport);
    }

    sessionTemp() {
        const valueSession =  new Date().getTime();
        let valueSessionTemp = this.session.getTempSession('lastVisit');

        if (!valueSessionTemp || valueSessionTemp === '') {
            valueSessionTemp = this.session.setTempSession('lastVisit', valueSession);
        }

        return valueSessionTemp;
    }

    report(timeStamp) {
        const loadedOn = this.loadedOn;
        const sessionTemp = this.sessionTemp();
        const session = this.session.get_or_create();

        const data = {
            loadedOn,
            sessionTemp,
            session,
            page: this.log.all('page'),
            enviroment: this.log.all('enviroment'),
            leaveAt: timeStamp,
            metaData: this.metaData.report(),
            actions: this.actions.report(),
            userInfo: this.userInfo.report()
        };

        try {
            this.transmitter.sendTracker(data);
        } catch (error) {
            console.log(error);
        }

        return true;

    }
}
