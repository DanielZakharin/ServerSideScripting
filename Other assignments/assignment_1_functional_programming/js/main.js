const text = `Programmers are in the enviable position of not only getting to do 
what they want to, but because the end result is so important they get paid to do 
it. There are other professions like that, but not that many. I have Added some new 
stuff at the end of this. Animals are An amazing Abstract Architecture.`

let textSplit = text.split(new RegExp('[?.!, ]', 'g'));

//print only single words, no punctuation
textSplit = textSplit.filter(word => word.length > 1);
console.log("Only words, no punctuation: " + textSplit.join(" "));

//print only words with upper case A
const upperCaseA = textSplit.filter(word => word.charAt(0) == "A");
console.log("Only words with uppercase A: " + upperCaseA);

//print only words with letter a
const upperCaseA2 = textSplit.filter(word => word.charAt(0) == "A" || word.charAt(0) == "a");
console.log("Only words with any case a: " + upperCaseA2);

//count the words
const sumOfWords = textSplit.reduce((sum, word) => sum += 1, 0);
console.log("This many words in the array: " + sumOfWords);

//remove all vowels, count consonants
const vowellessSplit = textSplit.map(function (word) {
    return word.split(new RegExp("[aeioöäåy]", "g")).join("");
});
//total number of consonants
const totalConsonants = vowellessSplit.reduce((sum, word) => sum += word.length,0)
console.log("Removed all vowels: " + vowellessSplit.join(" ") + "\nTotal consonants: " + totalConsonants);

/*
 ASSIGNMENT 2
 */

const villains = [
    {number: 1, villain: "Dr. Julius No", year: 1962, movie: "Dr No"},
    {number: 2, villain: "Ernst Stavro Blofeld", year: 1963, movie: "From Russia with Love"},
    {number: 3, villain: "Auric Goldfinger", year: 1964, movie: "Goldfinger"},
    {number: 4, villain: "Emilio Largo", year: 1965, movie: "Thunderball"},
    {number: 5, villain: "Mr.Big", year: 1973, movie: "Live and Let Die"},
    {number: 6, villain: "Francisco Scaramanga", year: 1974, movie: "The Man with the Golden Gun"},
    {number: 7, villain: "Karl Stromberg", year: 1977, movie: "The Spy Who Loved Me"},
    {number: 8, villain: "Hugo Drax", year: 1979, movie: "Moonraker"},
    {number: 9, villain: "Aristotle Kristatos", year: 1981, movie: "For Your Eyes Only"},
    {number: 10, villain: "General Gogol", year: 1981, movie: "For Your Eyes Only"}
];

//all villains from 1970's
const villains_1970 = villains.filter(villain => villain.year < 1980 && villain.year > 1969);
console.log("Villains from 70's" + JSON.stringify(villains_1970));

//average time between movies
const avgTime = villains.reduce((total, villain, index) => {
    if (index > 0) {
        const firstYear = villains[index - 1].year;
        const secondYear = villain.year;
        const difference = secondYear - firstYear;
        total = total + difference;
    }
    return total;
},0);
console.log("Average time between movies: " + (avgTime/villains.length));

//all actors with e in
const villainsWithE = villains.filter(villain => villain.villain.match("e"));
console.log("Villains with e in their name:" + JSON.stringify(villainsWithE));

//all actors with name longer than 15 letters
const villainsWithLongName = villains.filter(villain => villain.villain.length > 15);
console.log("Villains with long name:" + JSON.stringify(villainsWithLongName));

//modified json, no numbers or years
const modifiedArray = villains.map(villainToParse => {
    return newObj = {
        villain: villainToParse.villain, movie: villainToParse.movie
    }
});
console.log("Modified array: " + JSON.stringify(modifiedArray));
