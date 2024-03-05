const os = require("os")

console.log("Free Memory", os.freemem() / 1024 / 1024 / 1024)
console.log("Total Memory", os.totalmem() / 1024 / 1024 / 1024)

// 1kb => 1024 bytes => 1mb => 1024 kb => 1gb => 1024 mb

console.log("Version", os.version())
console.log("Platform", os.platform())
console.log("Arch", os.arch())
console.log("Cpus", os.cpus())

console.log("Types", os.type())
console.log("release", os.release())
console.log("Cores", os.cpus().length)

console.log(`Cores, ${os.cpus().length} Core`)
console.log("Cpu speed", os.cpus()[0].speed)

const homeDir = os.homedir()
console.log("Home dir", homeDir)