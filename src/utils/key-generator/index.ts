import type { uint } from '../../types';

class KeyGenerator {
    private count: uint = 0;

    public generateKey(): uint {
        return this.count++;
    }
}

export default KeyGenerator;
