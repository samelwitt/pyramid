const gameData = require('./scratch')
const fs = require('fs')
let output = []
//let output = gameData.split(',').reduce((prev, next, id) => prev + (id % 8 ? '\',\'' : '\'],\n\n[\'') + next)
/*let output = gameData.split(',').reduce((prev, next, id) => {
  let item = gameData[id].trim()
  //console.log(next)
  if (next.indexOf(' ') === 0) {
    return prev + ('\'],\n[\'') + next.trim()
  }
  else return prev + ('\',\'') + next.trim()
})*/

//let l = gameData.length/6
//
//for (let i = 0; i <= l; i++) {
//  output.push(gameData.slice(i*6,(i+1)*6))
//}
let gamesArr = []
gameData.map((game, i, games) => {
  let gameArr = []
  game.map((category, j, categories) => {
    gameArr.push({
      title: category[0],
      description: category[1],
      items: category.slice(3)
    })
  })
  gamesArr.push(gameArr)
})

//output = gameData.slice(0,6)

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
let json = JSON.stringify(gamesArr)

fs.writeFileSync('./output.js', json, {})