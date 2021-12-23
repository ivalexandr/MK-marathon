import { $chat, $arenas } from './DOMelements.js'
import { player1, player2 } from './playersObj.js'
import { renderLogs, generateLogs } from './logger.js'
import { playerAttack, enemyAttack } from './attacksFunc.js' 
import { selectWin } from './selectWin.js'
import { createReloadButton } from './creatorsFunc.js'

const submitFormFigthHandler = (e) => {
  e.preventDefault()

  const { value:pValue, hit:pHit, defence:pDefence} = playerAttack(e.target)
  const { value:eValue, hit: eHit, defence: eDefence } = enemyAttack()

  if(pHit !== eDefence){
    player2.changeHp(pValue)
    player2.renderHP()
    renderLogs($chat, generateLogs('hit', player1, player2, pValue))
  }else{ 
    renderLogs($chat, generateLogs('defence', player1, player2, pValue))
  }
  if(eHit !== pDefence){
    player1.changeHp(eValue)
    player1.renderHP()
    renderLogs($chat, generateLogs('hit', player2, player1, eValue))
  }else{
    renderLogs($chat, generateLogs('defence', player2, player1, eValue))
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