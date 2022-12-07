/* eslint-disable @typescript-eslint/no-inferrable-types */
export class Cat {
  whiskers = 0;
  private color: string;
  protected parent: SampleModule.Animal;
  meow(duration: number, volume: number): void {
    console.log(this.color, duration * volume);
  }
}

export module SampleModule {
  export class Animal {
    name: string;
    feet: number;
  }
}
