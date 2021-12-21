import { $chat, $arenas } from './DOMelements.js'
import { player1, player2 } from './playersObj.js'
import { renderLogs, generateLogs } from './logger.js'
import { playerAttack, enemyAttack } from './attacksFunc.js' 
import { selectWin } from './selectWin.js'
import { createReloadButton } from './creatorsFunc.js'

const submitFormFigthHandler = (e) => {
  e.preventDefault()
  const player = playerAttack(e.target)
  const enemy = enemyAttack()
  
  if(player.hit !== enemy.defence){
    player2.changeHp(player.value)
    player2.renderHP()
    renderLogs($chat, generateLogs('hit', player1, player2, player.value))
    renderLogs($chat, generateLogs('defence', player1, player2, player.value))
  }
  if(enemy.hit !== player.defence){
    player1.changeHp(enemy.value)
    player1.renderHP()
    renderLogs($chat, generateLogs('hit', player2, player1, enemy.value))
    renderLogs($chat, generateLogs('defence', player2, player1, enemy.value))
  }
  const isOver = selectWin(player1, player2)
  if(isOver){
        $arenas.append(createReloadButton())
        document.querySelector('.reloadWrap .button').addEventListener('click', () => window.location.reload())
      }
}

export {
  submitFormFigthHandler
}