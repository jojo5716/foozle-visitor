export default class Log {
    constructor() {
        this.visitorEvents = {
            page: {},
            visitor: {},
            enviroment: {}
        };
    }

    all(category) {
       return this.visitorEvents[category];
    }

    add(category, obj) {
        this.visitorEvents[category] = obj;
    }
}
