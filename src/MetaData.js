import { serialize } from './helpers/utils';


export default class MetaData {
    constructor() {
        this.metaData = {};
    }

    add(key, value) {
        this.metaData[key] = value;
    }

    remove(key) {
        delete this.metaData[key];
    }

    report() {
        const index = [];
        let i;

        for (i in this.metaData) {
            index.push({
                key: i,
                value: serialize(this.metaData[i])
            });
        }
        return index;
    }
}
