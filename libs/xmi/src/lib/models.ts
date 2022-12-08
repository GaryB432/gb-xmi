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
  multi: boolean;
  visibility: VisibilityKind;
}

export interface IParamter extends INamedElement {
  direction: ParameterDirectionKind;
  multi: boolean;
}

export interface IOperation extends IFeature {
  isAbstract: boolean;
  isQuery: boolean;
  isReadOnly: boolean;
  parameters: { [name: string]: IParamter };
  visibility: VisibilityKind;
}

export interface IClass {
  annotation?: string[];
  attribute: { [name: string]: IProperty };
  isAbstract: boolean;
  ownedOperation: { [name: string]: IOperation };
  visibility: VisibilityKind;
}

export interface IModel {
  packages: { [name: string]: IPackage };
}

export interface IPackage {
  classes: { [name: string]: IClass };
}
