import args from 'yargs';
import R from 'ramda';
import parseArgs from './parseArgs';
import readInputFile from './readInputFile';
import parseProperties from './parseProperties';

const parsedArgs = parseArgs(args.argv);

function processRequest(request) {
  const extract = R.map(R.prop, request.namespaces);
  const readProperties = R.compose(parseProperties, readInputFile);

  const data = extractors.map(e => e(request.namespaces));
}

