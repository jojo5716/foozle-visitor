import FoozleJS from 'foozle-tracker';


function trackError(token, window, error) {
    if (token) {
        try {
            const foozle = new FoozleJS({ token }, window, window.document);
            foozle.initAPI();
            foozle.api.track(error);
        } catch (err) {
            console.log(error);
        }
    } else {
        console.log(error);
    }
}

module.exports = {
    trackError
};
