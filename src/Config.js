export default class Config {
    constructor() {
        this.defaults = this.initDefaults();
    }

    initDefaults() {
        return {
            trackerURL: 'http://127.0.0.1:8000/data',
            version: '1.0.0'
        };
    }
}
