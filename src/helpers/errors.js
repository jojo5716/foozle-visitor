import FoozleJS from 'foozle-tracker';

let foozleInstance = null;


function initializeErrorTracker(token, config, window) {
    if (token) {
        try {
            foozleInstance = new FoozleJS({ token, ...config.settings }, window, window.document);

            addMetaDatas(config.metaDatas || {});

            foozleInstance.initAPI();

            return foozleInstance;
        } catch (err) {
            console.log(err);
        }
    }
    console.log(error);

    return foozleInstance;
}

function addMetaDatas(metaDatas) {
    const metaDataNames = Object.keys(metaDatas);

    metaDataNames.forEach(metaDataKey => foozleInstance.metadata.addMetadata(metaDataKey, metaDatas[metaDataKey]));
}

function trackError(error) {
    if (foozleInstance) {
        try {
            foozle.api.track(error);
        } catch (err) {
            console.log(error);
        }
    }
}

module.exports = {
    initializeErrorTracker,
    trackError
};
