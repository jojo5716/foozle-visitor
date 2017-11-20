import { v4 } from 'uuid';

import VisitorWatcher from './VisitorWatcher';
import Log from './Log';
import Config from './Config';
import Transmitter from './Transmitter';
import Enviroment from './Enviroment';
import MetaData from './MetaData';
import Session from './Session';
import Page from './Page';

import { bind } from './helpers/utils';
import { trackError } from './helpers/errors';

export default class Tracker {
    constructor(window, initialConfig) {
        this.window = window;

        this.loadedOn = new Date().getTime();
        const config = new Config();
        this.sendTrack = bind(this.track, this);
        this.sendActions = bind(this.trackActions, this);
        this.sendScrollActions = bind(this.trackScrollActions, this);

        // Session token
        this.session = new Session(window);
        this.pageToken = v4();

        this.log = new Log();
        this.metaData = new MetaData();
        this.actions = new MetaData();
        this.scrollAction = new MetaData();
        this.userInfo = new MetaData();
        this.booking = new MetaData();
        this.availability = new MetaData();

        // Trackign errors with foozlejs
        this.pageTracker = initialConfig.url || config.defaults.trackerURL;
        this.actionTracker = initialConfig.actionsURL || config.defaults.trackerActionsURL;
        this.errorToken = initialConfig.errorToken;

        this.transmitter = new Transmitter(initialConfig, config);

        // Recovery data
        this.enviroment = new Enviroment(window, this.log);
        this.page = new Page(window, this.log);

        // If we want to track any event
        if (!!initialConfig.event) {
            this.windowWatcher = new VisitorWatcher(window, this.sendTrack, initialConfig.event);
        }
    }

    sessionTemp() {
        const currentDate = new Date().getTime();
        const valueSession = currentDate;
        let valueSessionTemp = currentDate;

        try {
            valueSessionTemp = this.session.getTempSession('lastVisit');

            if (!valueSessionTemp || valueSessionTemp === '') {
                valueSessionTemp = this.session.setTempSession('lastVisit', valueSession);
            }
        } catch (err) {
            console.error(err);
        }

        return valueSessionTemp;
    }

    track(timeStamp) {
        const loadedOn = this.loadedOn;
        const sessionTemp = this.sessionTemp();
        let session = new Date().getTime();

        try {
            session = this.session.get_or_create();
        } catch (err) {
            console.error(err);
        }


        const data = {
            loadedOn,
            sessionTemp,
            session,
            pageToken: this.pageToken,
            page: this.log.all('page'),
            enviroment: this.log.all('enviroment'),
            eventTime: timeStamp || loadedOn,
            metaData: this.metaData.report(),
            availability: this.availability.report(),
            actions: this.actions.report(),
            userInfo: this.userInfo.report(),
            booking: this.booking.report()
        };

        this.send(data, this.pageTracker);

        return true;
    }

    trackActions() {
        const actions = this.actions.report();
        this.sendTrackAction('actions', actions);
        this.actions.clean();
    }

    trackScrollActions() {
        const scrollActions = this.scrollAction.report();

        this.sendTrackAction('scrollActions', scrollActions);
        this.scrollAction.clean();
    }

    sendTrackAction(actionKeyName, actionReport) {
        const data = {
            pageToken: this.pageToken,
            sessionTemp: this.sessionTemp(),
            session: this.session.get_or_create(),
            page: this.log.all('page')
        };

        data[actionKeyName] = actionReport;

        this.send(data, this.actionTracker);

        return true;
    }

    send(data, url) {
        try {
            this.transmitter.sendTracker(data, url);
        } catch (error) {
            trackError(this.errorToken, this.window, error);
        }
    }

}
