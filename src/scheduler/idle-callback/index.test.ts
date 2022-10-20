/**
 * @jest-environment jsdom
 */

import 'jest';
import IdleCallbackScheduler from '.';

describe(IdleCallbackScheduler, () => {
    let originalFunc: any;

    beforeAll(() => {
        originalFunc = window.requestIdleCallback;
        
        window.requestIdleCallback ??= function(handler) {
            let startTime = Date.now();
        
            return setTimeout(function() {
                handler({
                    didTimeout: false,
                    timeRemaining: function() {
                        return Math.max(0, 50.0 - (Date.now() - startTime));
                    }
                });
            }, 1) as any;
        }
    });

    afterAll(() => {
        window.requestIdleCallback = originalFunc;
    });

    it('should run all tasks', async () => {
        const scheduler = new IdleCallbackScheduler();
    
        let index = 0;
        let tasksList = new Array<boolean>(5).fill(false);
    
        scheduler.queueTask(() => {
            tasksList[index++] = true
        });

        scheduler.queueTask(() => {
            tasksList[index++] = true
        });

        scheduler.queueTask(function* () {
            for (let i = 0; i < 3; ++i) {
                yield;
                tasksList[index++] = true
            }
        });
    
        await new Promise<void>(resolve => {
            scheduler.queueTask(() => resolve());
        });

        expect(scheduler.pendingTasks).toBe(0);
        expect(tasksList.every(el => el)).toBe(true);
    });
});