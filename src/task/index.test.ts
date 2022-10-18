import 'jest';
import { run, runToEnd, serial, parallel, empty } from '.';

import { sequenceEqual } from '@d31t4/linq.ts/dist/utils';
import range from '@d31t4/linq.ts/dist/utils/range';

describe(empty, () => {
    it('should return an empty generator', () => {
        expect(sequenceEqual(
            [...empty()],
            []
        )).toBe(true);
    });
});

describe(serial, () => {
    it('should have concated generators', () => {
        function* f() {
            yield* range(3);
            return 10;
        }

        expect(sequenceEqual(
            [...serial(f, f, f())],
            [0, 1, 2, 0, 1, 2, 0, 1, 2]
        )).toBe(true);
    });
});

describe(parallel, () => {
    it('should run in parallel', () => {
        function* f() {
            yield* range(3);
            return 10;
        }

        expect(sequenceEqual(
            [...parallel(f, f, f())],
            [0, 0, 0, 1, 1, 1, 2, 2, 2]
        )).toBe(true);
    });
});

describe(run, () => {
    it('should run', () => {
        function* f() {
            yield* range(10);
            return 10;
        }

        const ref = { value: 0 };
        
        expect(sequenceEqual(
            run(f(), ref),
            range(10)
        )).toBe(true);

        expect(ref.value).toBe(10);
    });
});

describe(runToEnd, () => {
    it('should return the returned value of the task', () => {
        function* f() {
            yield* range(3);
            return 10;
        }

        expect(runToEnd(f())).toBe(10);
    });
});