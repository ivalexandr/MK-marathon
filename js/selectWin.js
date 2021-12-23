import { playerWinCreator } from './creatorsFunc.js'
import { $arenas } from './DOMelements.js'
import { renderLogs, generateLogs } from './logger.js'
import { $formFigth, $chat } from './DOMelements.js'

const selectWin = (player1, player2) => {
  const {hp:playerHp, name:playerName} = player1
  const {hp:enemyHp, name:enemyName} = player2
  
  if(playerHp > 0 && enemyHp === 0){
    $arenas.append(playerWinCreator(playerName))
    renderLogs($chat,generateLogs('end', player1, player2))
  } else if(playerHp > 0 && enemyHp === 0){
    $arenas.append(playerWinCreator(enemyName))
    renderLogs($chat,generateLogs('end', player2, player1))
  }else if(playerHp === 0 && enemyHp === 0){
    $arenas.append(playerWinCreator())
    renderLogs($chat, generateLogs('draw'))
  }
  if(playerHp === 0 || enemyHp === 0){
    $formFigth.remove()
    return true
  }
}
export {selectWin}