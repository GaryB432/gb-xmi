import { Element, NamedElement } from "./";

export abstract class Namespace extends NamedElement {
  public ownedElement: Element;
}
