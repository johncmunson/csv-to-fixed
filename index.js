const fs = require('fs')
const Fixy = require('fixy')
const Papa = require('papaparse')
const fixySchema = require('./fixySchema.js')

const csvData = fs.readFileSync('./data.csv').toString()
const parsedData = Papa.parse(csvData).data

const headers = parsedData.shift()

const mappingFunc = row => {
  let dataObj = {}
  for (let i = 0; i < headers.length; i++) {
    dataObj[headers[i]] = row[i]
  }
  return dataObj
}

const fixyData = parsedData.map(mappingFunc)

const flatData = Fixy.unparse(fixySchema, fixyData)

console.log(flatData)
