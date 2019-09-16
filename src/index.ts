class Human {
  public name: string;
  public age: number; //private
  public gender: string;
  constructor(name: string, age: number, gender: string) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}

const haneul = new Human("Haneul", 30, "female");

// const sayHi = (name: string, age: number, gender: string): string => {
const sayHi = (person: Human): string => {
    return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}!`;
  };
  
  console.log(sayHi(haneul));
  
  export {};