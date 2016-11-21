import R from 'ramda';
import Either from 'data.either';
import resources from './resources';

/*
 * * -> [*]
 * Checks if the input is an array or not.
 * If it is not an array, returns an array with a single
 * element.
 */
const toArray = R.ifElse(R.isArrayLike, R.identity, a => [a]);

/**
 * Object -> Either(String, Object)
 * Takes the args object parsed by yargs or similar,
 * validates the requirements of easy-config-writer
 * and returns either a string indicating an error or
 * an object containing the values that are meaningful to rest
 * of the process.
 */
function parseArgs(args = {}) {
  if (!args.input) {
    return Either.Left(resources.ERR_MISSING_INPUT);
  }

  if (!args.namespace || args.namespace.length < 1) {
    return Either.Left(resources.ERR_MISSING_NAMESPACE);
  }

  return Either.Right({
    input: args.input,
    namespaces: toArray(args.namespace),
    outFile: args.outFile || '$namespace$.config'
  });
}

export default parseArgs;
