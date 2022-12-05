import { VisibilityKind } from "../enumerations";

import { Element } from "./";

export abstract class NamedElement extends Element {
  public name: string;
  public qualifiedName: string;
  public visibility: VisibilityKind;
}
