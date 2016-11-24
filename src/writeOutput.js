import fs from 'fs';
import R from 'ramda';
import Task from 'data.task';

/**
 * {String, String} -> Task(String, String)
 */
function writeOutput(output) {
  return new Task((reject, resolve) => {
    fs.writeFile(output.file, JSON.stringify(output.content), 'utf8', err => {
      if (err) {
        reject(err);
      } else {
        resolve(output);
      }
    });
  });
}

export default R.curry(writeOutput);
