import fs from 'fs';
import R from 'ramda';
import Task from 'data.task';

/**
 * (String, String) -> Task(String, String)
 */
function writeOutput(output) {
  return new Task((reject, resolve) => {
    fs.writeFile(output.file, 'utf8', output.content);
  });
}

export default R.curry(writeOutput);
