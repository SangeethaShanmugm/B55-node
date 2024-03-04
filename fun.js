console.log("Hello Everyone")

const double = (a, b) => a + b

console.log(double(5, 5))

// console.log(document)
// console.log(window)
// console.log(global)

//command line argument
console.log(process.argv)

const [, , n1, n2] = process.argv

const sum = (n1, n2) => n1 + n2
console.log(sum(+n1, +n2))