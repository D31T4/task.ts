import type { Constructor } from "../types";

const GeneratorFunction = function*(){}.constructor as Constructor<Generator>;

export { GeneratorFunction };