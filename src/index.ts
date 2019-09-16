interface Human {
  name: String
  age: Number
  gender: String
}

const person = {
  name: "haneul",
  age: 23,
  gender: "female"
}



// const sayHi = (name: string, age: number, gender: string): string => {
const sayHi = (person: Human): string => {
    return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}!`;
  };
  
  console.log(sayHi(person));
  
  export {};