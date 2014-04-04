﻿export = Semaphore;


class Semaphore {
    constructor(private n: number) {
        this._avail = n;
    }

    enter(fn: () => void) {
        if (this._avail > 0) {
            --this._avail;
            fn();
        } else {
            this._queued.push(fn);
        }
    }

    leave() {
        if (this._queued.length > 0) {
            var fn = this._queued.pop();
            fn();
        } else {
            ++this._avail;
        }
    }

    private _avail: number;
    private _queued: Function[] = [];
}
