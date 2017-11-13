export default class Config {
    constructor() {
        this.defaults = this.initDefaults();
    }

    initDefaults() {
        return {
            trackerURL: 'http://localhost:8000/track',
            trackerActionsURL: 'http://localhost:8000/actions',
            version: '1.0.0'
        };
    }
}
