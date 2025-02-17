import { FSRS, generatorParameters } from "ts-fsrs";

const params = generatorParameters({ maximum_interval: 1000 });
const f = new FSRS(params);

export { f };
