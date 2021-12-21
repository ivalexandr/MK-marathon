import { playerWinCreator } from './creatorsFunc.js'
import { $arenas } from './DOMelements.js'
import { renderLogs, generateLogs } from './logger.js'
import { $formFigth, $chat } from './DOMelements.js'

const selectWin = (player1, player2) => {
  if(player1.hp > 0 && player2.hp === 0){
    $arenas.append(playerWinCreator(player1.name))
    renderLogs($chat,generateLogs('end', player1, player2))
  } else if(player2.hp > 0 && player1.hp === 0){
    $arenas.append(playerWinCreator(player2.name))
    renderLogs($chat,generateLogs('end', player2, player1))
  }else if(player1.hp === 0 && player1.hp === 0){
    $arenas.append(playerWinCreator())
    renderLogs($chat, generateLogs('draw'))
  }
  if(player1.hp === 0 || player2.hp === 0){
    $formFigth.remove()
    return true
  }
}
export {selectWin}