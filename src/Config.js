export default class Config {
    constructor() {
        this.defaults = this.initDefaults();
    }

    initDefaults() {
        return {
            trackerURL: 'http://qa.roiback.com:8000/track',
            trackerActionsURL: 'http://qa.roiback.com:8000/actions',
            version: '1.0.0'
        };
    }
}
