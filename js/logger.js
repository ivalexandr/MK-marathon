import { LOGS } from "./loggerConst.js"
import { randomChanger } from "./randomGenerator.js"
import { $chat } from "./DOMelements.js"
import { player1, player2 } from "./playersObj.js"

const getTime = () => {
  const hours = new Date().getHours()
  const minutes = new Date().getMinutes()
  const seconds = new Date().getSeconds() < 10 ? `0${new Date().getSeconds()}` : new Date().getSeconds()
  return `${hours}:${minutes}:${seconds}`
}

const generateStringInLogs = (LOGS,type,{name:kickName}, {name:defName}) => {
  return LOGS[type][randomChanger(LOGS[type].length) - 1]
  .replace('[playerKick]', kickName)
  .replace('[playerDefence]', defName)
}

const generateLogs = (type, kickPlayer, defPlayer, changeHp) => {
  const { name:kickName } = kickPlayer
  const { name:defName, hp:defHp } = defPlayer
  switch(type){
    case 'start':
      const startText = LOGS[type].replace('[time]', getTime())
      .replace('[player1]', kickName)
      .replace('[player2]', defName)
      return `<p>${startText}</p>`
    case 'hit':
      return `<p>${getTime()} - ${generateStringInLogs(LOGS, type, kickPlayer, defPlayer)} -${changeHp} [${defHp}/100]</p>`
    case 'defence':
      return `<p>${getTime()} - ${generateStringInLogs(LOGS, type, kickPlayer, defPlayer)}</p>`
    case 'end':
      const endText = LOGS[type][randomChanger(LOGS[type].length) - 1]
      .replace('[playerWins]', kickName)
      .replace('[playerLose]', defName)
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