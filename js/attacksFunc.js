import { ATTACK, HIT } from "./loggerConst.js"
import { randomChanger } from "./randomGenerator.js"

const enemyAttack = () => {
  const hit = ATTACK[randomChanger(3) - 1]
  const defence = ATTACK[randomChanger(3) - 1]
  return {
    value:randomChanger(HIT[hit]),
    hit,
    defence
  }
}
const playerAttack = (form) => {
  const attack = {}
  for(const item of form){
    if(item.checked === true && item.name === 'hit'){
      attack.value = randomChanger(HIT[item.value])
      attack.hit = item.value
    }
    if(item.checked === true && item.name === 'defence'){
      attack.defence = item.value
    }
    item.checked = false
  }
  return attack
}
export { enemyAttack, playerAttack }