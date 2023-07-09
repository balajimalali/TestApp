let a = "Sat Jul 01 2023 00:13:23 GMT";
let b = Date();
// console.log(Date.parse(b) - Date.parse(a));

a = { a: 'balu', c: b };
b = JSON.stringify(a)
console.log(JSON.parse(b)['c']);