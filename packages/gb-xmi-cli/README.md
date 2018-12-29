gb-xmi-cli
==========

cli for gb-xmi

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/gb-xmi-cli.svg)](https://npmjs.org/package/gb-xmi-cli)
[![Downloads/week](https://img.shields.io/npm/dw/gb-xmi-cli.svg)](https://npmjs.org/package/gb-xmi-cli)
[![License](https://img.shields.io/npm/l/gb-xmi-cli.svg)](https://github.com/GaryB432/gb-xmi/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g gb-xmi-cli
$ gb-xmi-cli COMMAND
running command...
$ gb-xmi-cli (-v|--version|version)
gb-xmi-cli/2.0.0-alpha.0 win32-x64 node-v9.3.0
$ gb-xmi-cli --help [COMMAND]
USAGE
  $ gb-xmi-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`gb-xmi-cli hello [FILE]`](#gb-xmi-cli-hello-file)
* [`gb-xmi-cli help [COMMAND]`](#gb-xmi-cli-help-command)
* [`gb-xmi-cli meta [FILE]`](#gb-xmi-cli-meta-file)

## `gb-xmi-cli hello [FILE]`

describe the command here

```
USAGE
  $ gb-xmi-cli hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ gb-xmi-cli hello
  hello world from ./src/hello.ts!
```

_See code: [src\commands\hello.ts](https://github.com/GaryB432/gb-xmi/blob/v2.0.0-alpha.0/src\commands\hello.ts)_

## `gb-xmi-cli help [COMMAND]`

display help for gb-xmi-cli

```
USAGE
  $ gb-xmi-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.4/src\commands\help.ts)_

## `gb-xmi-cli meta [FILE]`

describe the command here

```
USAGE
  $ gb-xmi-cli meta [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src\commands\meta.ts](https://github.com/GaryB432/gb-xmi/blob/v2.0.0-alpha.0/src\commands\meta.ts)_
<!-- commandsstop -->
