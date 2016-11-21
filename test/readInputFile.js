import fs from 'fs';
import Task from 'data.task';

/**
 * String -> Task(String, String)
 */
function readInputFile(path) {
  return new Task((reject, resolve) => {
    fs.readFile(path, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

export default readInputFile;
