import { XmiClassifier } from './elements/classifier';

export type AttrubuteMap = { [id: string]: string };
export type BuilderElement = {
  ele: (name: string, atts: AttrubuteMap) => BuilderElement;
};
export type ClassifierMap = { [name: string]: XmiClassifier };
