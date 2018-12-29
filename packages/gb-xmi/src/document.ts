import * as fs from 'fs';
import * as builder from 'xmlbuilder';

import { XmiClass } from './elements/class';
import { XmiComponent } from './elements/component';
import { XmiOperation } from './elements/operation';
import { XmiPackage } from './elements/package';
import { XmiParameter } from './elements/parameter';
import { XmiProperty } from './elements/property';
import { XmiUsage } from './elements/usage';

export class Document {
  private ended = false;
  private model: builder.XMLElementOrXMLNode;
  private package: XmiPackage;
  private root: builder.XMLElementOrXMLNode = builder.create('xmi:XMI');

  constructor(modelName: string) {
    this.root.att('xmlns:uml', 'http://www.omg.org/spec/UML/20110701');
    this.root.att('xmlns:xmi', 'http://www.omg.org/spec/XMI/20110701');
    this.root.att('xmlns:mofext', 'http://www.omg.org/spec/MOF/20110701');
    this.root.ele('xmi:Documentation', {
      exporter: 'GB-XMI',
      exporterVersion: '1.0',
    });

    this.model = this.root.ele('uml:Model', {
      name: 'GB_Model',
      visibility: 'public',
      'xmi:id': 'M0',
      'xmi:type': 'uml:Model',
    });
    this.package = new XmiPackage(modelName);
  }

  public end(): string {
    if (!this.ended) {
      this.package.appendXmi(this.model);
      // this.packages.forEach(p => p.appendXmi(this.model));
    }
    this.ended = true;
    return this.root.end({ pretty: true });
  }

  public addPackage(name: string): XmiPackage {
    const newPkg = new XmiPackage(name);
    // newPkg.appendXmi(this.model);
    this.package.addPackage(newPkg);
    return newPkg;
  }

  public async writeFile(path: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fs.writeFile(path, this.end(), 'utf-8', err => {
        if (err) {
          reject(err);
        }
        resolve();
        // process.stdout.write('done');
      });
    });
  }
}
