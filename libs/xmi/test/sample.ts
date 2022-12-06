/* eslint-disable @typescript-eslint/no-inferrable-types */
export class Cat {
  whiskers: number = 0;
  private color: string;
  public parent: Node;
  meow(duration: number, volume: number): void {
    console.log(this.color, duration * volume);
  }
}
