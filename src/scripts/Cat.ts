import { Animal } from './Animal'; 

export class Cat extends Animal {
    _name: string;

    constructor(name: string){
        super();
        this._name = name;
    }

    speak(): string {
    
        return `MEeeooow!  Hi i'm ${this._name}, i'm a cat with ${this.legs} legs.`;
    }
}