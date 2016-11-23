import properties from 'properties';
import Either from 'data.either';

/**
 * String -> Either(String, Object)
 */
function parseProperties(input = '') {
  try {
    const parsed = properties.parse(input, { namespaces: true });
    return Either.Right(parsed);
  } catch (e) {
    return Either.Left(e);
  }
}

export default parseProperties;
