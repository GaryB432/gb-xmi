import { NamedElement, type Element } from './';

export abstract class Namespace extends NamedElement {
  public ownedElement: Element;
}
