import { serialize } from './helpers/utils';


export default class MetaData {
    constructor() {
        this.metaData = {};
    }

    add(key, value) {
        this.metaData[key] = value;
    }

    clean() {
        this.metaData = {};
    }

    report() {
        return this.metaData;
    }
}
