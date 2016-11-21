import fs from 'fs';
import R from 'ramda';
import Task from 'data.task';

/**
 * (String, String) -> Task(String, String)
 */
function writeOutput(to, content) {
  return new Task((reject, resolve) => {
    fs.writeFile(to, 'utf8', content);
  });
}

export default R.curry(writeOutput);
