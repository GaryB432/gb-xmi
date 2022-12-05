#!/usr/bin/env node
/* This is a generated file. Make changes to cli.config.json and run "nx sync cli" */
import sade = require('sade');
import { showTsCommand } from './app/commands';
const prog = sade('cli');
prog
  .version('0.0.1-0')
  .option('--dryRun, -d', 'Do not write to disk')
  .option('--verbose', 'Show extra information')
  .option('-c, --config', 'Provide path to config file', 'cli.config.js');
prog
  .command('show-ts <file>')
  .describe('show-ts description')
  .option('--outpath', 'Description of outpath')
  .action(async (file, opts) => {
    await showTsCommand({ file, opts });
  });
prog.parse(process.argv);
