/**
 * @jest-environment jsdom
 */

import 'jest';
import AnimationFrameScheduler from '.';

describe(AnimationFrameScheduler, () => {
    beforeEach(() => {
        jest.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
            setTimeout(() => cb(0));
            return 0;
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should run tasks', async () => {
        const scheduler = new AnimationFrameScheduler({ executionWindow: 50 });
    
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