import Tracker from '../src/index';

((win) => {
    const project = win.foozleTracker;
    win.tracker = new Tracker(win, project);
})(window);

