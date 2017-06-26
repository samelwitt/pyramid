const gameData = require('./scratch')
const fs = require('fs')
//let output = []
let output = gameData.split(',').reduce((prev, next, id) => prev + (id % 8 ? '\',\'' : '\'],\n\n[\'') + next)

/*
gameData.map((question, i, arr) => {
  let newArr = []
  question.map((item, j, arrr) => {
    if (j <= 2 || j === 6 || j === 10 || j === 14 || j === 18 || j === 22 || j === 26 ) {
      newArr.push(question[j])
    }
  })
  //console.log(newArr)
  output.push(newArr)
})
let json = {data: output}
json = JSON.stringify(json)
*/

/*gameData.data.map((question,i, arr) => {
  output[i] = {
    title : question[0],
    description : question[1],
    items : question.slice(2)
  }
})

let json = JSON.stringify(output)*/

fs.writeFileSync('./output.js', output, {})