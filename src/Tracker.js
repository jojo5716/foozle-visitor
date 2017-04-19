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
    constructor(window, project) {
        this.window = window;

        this.loadedOn = new Date().getTime();
        const config = new Config();
        this.sendTrack = bind(this.track, this);
        this.sendActions = bind(this.trackActions, this);

        // Session token
        this.session = new Session(window);
        this.pageToken = v4();

        this.log = new Log();
        this.metaData = new MetaData();
        this.actions = new MetaData();
        this.userInfo = new MetaData();
        this.booking = new MetaData();

        this.pageTracker = window.foozleTracker.url || config.defaults.trackerURL;
        this.actionTracker = window.foozleTracker.actionsURL || config.defaults.trackerActionsURL;
        this.errorToken = window.foozleTracker.errorToken;

        this.transmitter = new Transmitter(project, config);

        // Recovery data
        this.enviroment = new Enviroment(window, this.log);
        this.page = new Page(window, this.log);

        if (!!project.event) {
            this.windowWatcher = new VisitorWatcher(window, this.sendTrack, project.event);
        }
    }

    sessionTemp() {
        const valueSession =  new Date().getTime();
        try{
          let valueSessionTemp = this.session.getTempSession('lastVisit');

          if (!valueSessionTemp || valueSessionTemp === '') {
              valueSessionTemp = this.session.setTempSession('lastVisit', valueSession);
          }
        } catch(err) {
          console.error(err);
        }

        return valueSessionTemp;
    }

    track(timeStamp) {
        const loadedOn = this.loadedOn;
        try{
          const sessionTemp = this.sessionTemp();
          const session = this.session.get_or_create();
        } catch(err) {
          console.error(err);
          const sessionTemp = new Date().getTime();
          const session = new Date().getTime();
        }


        const data = {
            loadedOn,
            sessionTemp,
            session,
            pageToken: this.pageToken,
            page: this.log.all('page'),
            enviroment: this.log.all('enviroment'),
            eventTime: timeStamp,
            metaData: this.metaData.report(),
            actions: this.actions.report(),
            userInfo: this.userInfo.report(),
            booking: this.booking.report()
        };

        this.send(data, this.pageTracker);

        return true;
    }

    trackActions() {
        const data = {
            pageToken: this.pageToken,
            sessionTemp: this.sessionTemp(),
            session: this.session.get_or_create(),
            actions: this.actions.report()
        };

        this.send(data, this.actionTracker);
        this.actions.clean();

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
