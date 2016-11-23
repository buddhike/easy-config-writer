import R from 'ramda';
import Task from 'data.task';
import { argv } from 'yargs';
import parseArgs from './parseArgs';
import readInputFile from './readInputFile';
import parseProperties from './parseProperties';
import writeOutput from './writeOutput';

const eithert = either => either.fold(Task.rejected, Task.of);
const propt = id => R.pipe(R.prop(id), Task.of);

const waitAll = R.traverse(Task.of, R.identity);

const extractConfigs = R.curry(function(namespaces, properties) {
  const mapper = namespace => ({ namespace, content: properties[namespace] });
  return R.map(mapper, namespaces);
});

const write = targets => {
  const outputFilename = parsed.get().output;

  const files = R.map(t => ({
    file: R.replace(outputFilename, t.namespace),
    content: t.content
  }));

  const f = R.pipe(files, writeOutput, waitAll);
  return f(targets);
};

const parsed = parseArgs(argv);
const extractConfigsT = R.pipe(R.prop('namespaces'), extractConfigs, Task.of);

const pipeline = R.pipe(eithert, R.pipeK(
  propt('input'),
  readInputFile,
  R.pipe(buffer => buffer.toString('utf8'), Task.of),
  R.pipe(parseProperties, eithert),
  extractConfigsT(parsed)));

pipeline(parsed).fork(console.log, console.log);
