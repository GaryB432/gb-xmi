import { AttrubuteMap, BuilderElement, ClassifierMap } from '../utils';
import { XmiClassifier } from './classifier';
import { XmiComponent } from './component';
import { XmiDependency } from './dependency';
import { XmiNamedElement } from './namedelement';
import { XmiParameter } from './parameter';

export interface IPackageAttributes {}
export class XmiPackage extends XmiNamedElement {
  private classifiers: XmiClassifier[] = [];
  private packages: XmiPackage[] = [];
  private components: XmiComponent[] = [];
  private dependencies: XmiDependency[] = [];
  private cmap: ClassifierMap = {};
  public addClassifier(classifier: XmiClassifier) {
    this.classifiers.push(classifier);
    this.cmap[classifier.name] = classifier;
  }
  public addComponent(child: XmiComponent) {
    this.components.push(child);
  }
  public addPackage(child: XmiPackage) {
    this.packages.push(child);
    // this.cmap[child.name] = child;
  }
  public addDependency(child: XmiDependency) {
    this.dependencies.push(child);
  }
  public appendXmi(container: BuilderElement): BuilderElement {
    const elem = container.ele('packagedElement', this.xmi());

    this.packages.forEach(p => p.appendXmi(elem));

    this.dependencies.forEach(dep => {
      elem.ele('packagedElement', dep.xmi());
    });

    const classifs = [...this.components, ...this.classifiers];

    classifs.forEach(classifier => {
      const e = elem.ele('packagedElement', classifier.xmi());
      classifier.generals.forEach(g => {
        if (!!g) {
          e.ele('generalization', {
            general: g.xmiId,
            'xmi:id': `${classifier.xmiId}_${g.xmiId}`,
            'xmi:type': 'uml:Generalization',
          });
        }
      });
      classifier.properties.forEach(cp => {
        cp.appendXmi(e, this.cmap);
        // const q = e.ele("ownedAttribute", cp.xmi());
      });
      classifier.operations.forEach(op => {
        const opEle = op.appendXmi(e, this.cmap);
        // const opEle = e.ele("ownedOperation", op.xmi());
        op.parameters.forEach(p => p.appendXmi(opEle, this.cmap));

        const rp = new XmiParameter('return', op.typeName);
        rp.appendXmi(opEle, this.cmap);
      });
    });
    return elem;
  }
  public xmi(): AttrubuteMap {
    const atts: AttrubuteMap = {};
    atts['xmi:type'] = 'uml:Package';
    atts['name'] = this.name;
    atts['xmi:id'] = this.xmiId;
    atts['visibility'] = 'public';
    return atts;
  }
}
