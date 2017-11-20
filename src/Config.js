export default class Config {
    constructor() {
        this.defaults = this.initDefaults();
    }

    initDefaults() {
        const url = 'http://vps481681.ovh.net:8000';

        return {
            trackerURL: `${url}/track`,
            trackerActionsURL: `${url}/actions`,
            version: '1.0.0'
        };
    }
}
