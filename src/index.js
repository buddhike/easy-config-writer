import R from 'ramda';
import Task from 'data.task';
import { argv } from 'yargs';
import parseArgs from './parseArgs';
import readInputFile from './readInputFile';
import parseProperties from './parseProperties';
import writeOutput from './writeOutput';

const eitherT = either => either.fold(Task.rejected, Task.of);
const propT = id => R.pipe(R.prop(id), Task.of);
const waitAll = R.traverse(Task.of, R.identity);

const extract = R.curry(function(namespaces, properties) {
  const mapper = namespace => ({ namespace, content: properties[namespace] });
  return R.map(mapper, namespaces);
});

const buildFiles = R.curry((outputFilename, extracts) => {
  console.log(outputFilename);
  return R.map(e => ({
    file: R.replace('$namespace$', e.namespace, outputFilename),
    content: e.content
  }), extracts);
});

const extractT = eitherArgs => {
  return eitherArgs.fold(Task.rejected,
    a => R.pipe(extract(a.namespaces), Task.of));
};

const buildFilesT = eitherArgs => {
  return eitherArgs.fold(Task.rejected,
    a => R.pipe(buildFiles(a.outFile), Task.of));
};

/* Setup the pipeline and execute it to observe the side effects */
const parsed = parseArgs(argv);

const pipeline = R.pipe(eitherT, R.pipeK(
  propT('input'),
  readInputFile,
  R.pipe(buffer => buffer.toString('utf8'), Task.of),
  R.pipe(parseProperties, eitherT),
  extractT(parsed),
  buildFilesT(parsed),
  R.pipe(R.map(writeOutput), waitAll)));

pipeline(parsed).fork(console.log, console.log);
