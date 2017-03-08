import { serialize } from './helpers/utils';


export default class MetaData {
    constructor() {
        this.metaData = [];
    }

    add(key, value) {
        this.metaData.push({ key, value });
    }

    report() {
        const index = [];

        for (let i = 0; i < this.metaData.length; i += 1) {
            const obj = this.metaData[i];
            console.log(obj)
            index.push({
                key: obj.key,
                value: obj.value
            });
        }
        return index;
    }
}
