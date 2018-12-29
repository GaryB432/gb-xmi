import { expect, test } from '@oclif/test';

describe('meta', () => {
  test
    .stdout()
    .command(['meta'])
    .it('runs hello', ctx => {
      expect(ctx.stdout).to.contain('<xmi:Documentation exporter="GB-XMI" exporterVersion="1.0"/>');
    });
});
