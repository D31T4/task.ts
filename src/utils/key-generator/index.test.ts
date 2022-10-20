import 'jest';
import KeyGenerator from '.';
import range from '@d31t4/linq.ts/dist/utils/range';

describe(KeyGenerator, () => {

    it('should generate an int seq starting at 0', () => {
        const kg = new KeyGenerator();
        
        for (const num of range(10))
            expect(kg.generateKey()).toBe(num);
    });
});