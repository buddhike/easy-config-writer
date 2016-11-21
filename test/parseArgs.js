import parseArgs from '../src/parseArgs';
import resources from '../src/resources';

describe('parseArgs', () => {
  it('should validate the input', () => {
    parseArgs({ namespace: 'a' }).leftMap(e => {
      e.should.equal(resources.ERR_MISSING_INPUT);
    });
  });

  it('should not accept an empty input', () => {
    parseArgs({input: ''}).leftMap(e => {
      e.should.equal(resources.ERR_MISSING_INPUT);
    });
  });

  it('should validate the namespace', () => {
    parseArgs({ input: 'a' }).leftMap(e => {
      e.should.equal(resources.ERR_MISSING_NAMESPACE);
    });
  });

  it('should not accept an empty namespace', () => {
    parseArgs({ input: 'a' }).leftMap(e => {
      e.should.equal(resources.ERR_MISSING_NAMESPACE);
    });
  });

  it('should convert a single namespace to an array', () => {
    parseArgs({ input: 'a', namespace: 'b' }).map(args => {
      args.namespaces.should.eql(['b']);
    });
  });

  it('should not modify an array of namespaces', () => {
    parseArgs({ input: 'a', namespace: ['b', 'c'] }).map(args => {
      args.namespaces.should.eql(['b', 'c']);
    });
  });

  it('should use the specified out file', () => {
    parseArgs({ input: 'a', namespace: 'b', outFile: 'c' }).map(args => {
      args.outFile.should.equal('c');
    });
  });

  it('should use the default out file when it is not specified', () => {
    parseArgs({ input: 'a', namespace: 'b' }).map(args => {
      args.outFile.should.equal('$namespace$.config');
    });
  });
});
