import fs from 'fs';
import os from 'os';
import R from 'ramda';
import Task from 'data.task';

/**
 * {String, String} -> Task(String, String)
 */
function writeOutput(output) {
  return new Task((reject, resolve) => {
    const serialize = i => JSON.stringify(i, null, 2) + os.EOL;
    const serialized = output.content ? serialize(output.content) : '';

    fs.writeFile(output.file, serialized, 'utf8', err => {
      if (err) {
        reject(err);
      } else {
        resolve(output);
      }
    });
  });
}

export default R.curry(writeOutput);
