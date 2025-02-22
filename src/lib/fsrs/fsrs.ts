import { FSRS, generatorParameters } from "ts-fsrs";

const fsrsParams = generatorParameters({ maximum_interval: 1000 });
const f = new FSRS(fsrsParams);

export { f, fsrsParams };
