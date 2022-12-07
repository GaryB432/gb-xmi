export type VisibilityKind = 'public' | 'private' | 'package';

export type ParameterDirectionKind = 'in' | 'inout' | 'out' | 'return';

// export interface IElement {
// }

export interface INamedElement {
  // name: string;
  typeName: string;
}

export interface IFeature extends INamedElement {
  isStatic: boolean;
}

export interface IProperty extends IFeature {
  isReadOnly: boolean;
  visibility: VisibilityKind;
  multi: boolean;
}

export interface IParamter extends INamedElement {
  direction: ParameterDirectionKind;
  multi: boolean;
}

export interface IOperation extends IFeature {
  isQuery: boolean;
  isAbstract: boolean;
  isReadOnly: boolean;
  parameters: { [name: string]: IParamter };
  visibility: VisibilityKind;
}

export interface IClass {
  annotation?: string[];
  ownedOperation: { [name: string]: IOperation };
  attribute: { [name: string]: IProperty };
  isAbstract: boolean;
  visibility: VisibilityKind;
}

export interface IModel {
  packages: { [name: string]: IPackage };
}

export interface IPackage {
  classes: { [name: string]: IClass };
}
