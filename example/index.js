import Tracker from '../src/index';

((win) => {
    win.tracker = new Tracker(win);
    tracker.metaData.add('Country', 'Spain');
})(window);

