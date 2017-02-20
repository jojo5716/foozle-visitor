import Tracker from '../src/index';

((win) => {
    const project = win.foozleTracker;
    win.tracker = new Tracker(win, project);
    tracker.metaData.add('Country', 'Spain');
})(window);

