import { LOGS } from "./loggerConst.js"
import { randomChanger } from "./randomGenerator.js"
import { $chat } from "./DOMelements.js"
import { player1, player2 } from "./playersObj.js"

const getTime = () => {
  return `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
}
const generateStringInLogs = (LOGS,type,kickPlayer, defPlayer) => {
  return LOGS[type][randomChanger(LOGS[type].length) - 1]
  .replace('[playerKick]', kickPlayer.name)
  .replace('[playerDefence]', defPlayer.name)
}
const generateLogs = (type, kickPlayer, defPlayer, changeHp) => {
  switch(type){
    case 'start':
      const startText = LOGS[type].replace('[time]', getTime())
      .replace('[player1]', kickPlayer.name)
      .replace('[player2]', defPlayer.name)
      return `<p>${startText}</p>`
    case 'hit':
      return `<p>${getTime()} - ${generateStringInLogs(LOGS, type, kickPlayer, defPlayer)} -${changeHp} [${defPlayer.hp}/100]</p>`
    case 'defence':
      return `<p>${getTime()} - ${generateStringInLogs(LOGS, type, kickPlayer, defPlayer)}</p>`
    case 'end':
      const endText = LOGS[type][randomChanger(LOGS[type].length) - 1]
      .replace('[playerWins]', kickPlayer.name)
      .replace('[playerLose]', defPlayer.name)
      return `<p>${endText}</p>`
    case 'draw':
      return `<p>${LOGS[type]}</p>`
  }
}
const renderLogs = (el, logText) => {
  el.insertAdjacentHTML('afterbegin', logText)
  }

renderLogs($chat, generateLogs('start', player1, player2))

export {
  generateLogs,
  renderLogs
}