import { serialize } from './helpers/utils';


export default class MetaData {
    constructor() {
        this.metaData = [];
    }

    add(key, value) {
        this.metaData.push({ key, value });
    }

    clean() {
        this.metaData = [];
    }

    report() {
        const index = [];

        for (let i = 0; i < this.metaData.length; i += 1) {
            const obj = this.metaData[i];
            index.push({
                key: obj.key,
                value: serialize(obj.value)
            });
        }
        return index;
    }
}
