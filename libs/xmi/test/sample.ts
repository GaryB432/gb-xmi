/* eslint-disable */

interface Breather {
  inhale(duration: number): void;
  exhale(): number;
}

export class Animal implements Breather {
  inhale(duration: number): void {
    throw new Error('Method not implemented.');
  }
  exhale(): number {
    throw new Error('Method not implemented.');
  }
  name: string;
  feet: number;
  private seek(): number {
    return 3;
  }
}

export class Cat {
  whiskers = 0;
  private color: string;
  protected parent: Animal;
  private sleep = new Node();
  meow(duration: number, volume: number): void {
    console.log(this.color, duration * volume);
  }
}

export namespace FunOne {
  export class Apple implements Fruit {
    color = 'red';
    weight() {
      return 3;
    }
    name = 'Apple';
  }
  export interface Fruit {
    name: string;
    color: string;
    weight: () => number;
  }
}
