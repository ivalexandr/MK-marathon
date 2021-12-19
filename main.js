'use strict'

const $arenas = document.querySelector('.arenas')
const $formFigth = document.querySelector('.control')

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
}

const ATTACK = ['head', 'body', 'foot']

const player1 = {
  player:1,
  name:'Scorpion',
  hp:100,
  img:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon:['Гарпун'],
  attack:function(){
    console.log(`${this.name} Fight...`)
  },
  changeHp,
  elHP,
  renderHP,
}

const player2 = {
  player:2,
  name:'Kitana',
  hp:100,
  img:'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  weapon:['Веера'],
  attack:function(){
    console.log(`${this.name} Fight...`)
  },
  changeHp,
  elHP,
  renderHP,
}

const createElement = (tag, className) => {
  const $el = document.createElement(tag)
  tag !== 'img' && $el.classList.add(className)

  return $el
}

const createPlayer = (playerObj) => {
  const $player = createElement('div', `player${playerObj.player}`)
  const $progressbar = createElement('div', 'progressbar')
  const $life = createElement('div', 'life')
  const $name = createElement('div', 'name')
  const $character = createElement('div', 'character')
  const $img = createElement('img')

  $player.append($progressbar)
  $progressbar.append($life)
  $life.style.width = `${playerObj.hp}%`
  $progressbar.append($name)
  $name.textContent = playerObj.name
  $player.append($character)
  $character.append($img)
  $img.src = playerObj.img

  return $player
}

$arenas.append(createPlayer(player1))
$arenas.append(createPlayer(player2))

const randomChanger = (num) => {
  return Math.ceil(Math.random() * num)
}


function changeHp(hp){
  if(this.hp <= 0){ 
    this.hp = 0
  }
  else{
    this.hp -= hp
  } 
  }

function elHP(){
  return document.querySelector(`.player${this.player} .life`)
}

function renderHP(){
  this.elHP().style.width = `${this.hp}%`
}

const playerWinCreator = (name) => {
  const $winTitle = createElement('div', 'loseTitle')
  if(name){
    $winTitle.textContent = `${name} wins!`
  }else{
    $winTitle.textContent = `draw`
  }
  return $winTitle
  }

const selectWin = (player1, player2) => {
  if(player1.hp > 0 && player2.hp <= 0){
    $arenas.append(playerWinCreator(player1.name))
  } else if(player2.hp > 0 && player1.hp <= 0){
    $arenas.append(playerWinCreator(player2.name))
  }else if(player1.hp <= 0 && player1.hp <= 0){
    $arenas.append(playerWinCreator())
  }
  if(player1.hp <= 0 || player2.hp <= 0){
    $formFigth.remove()
    return true
  }
}  
const createReloadButton = () => {
  const $reloadWrap = createElement('div', 'reloadWrap')
  const $button = createElement('button', 'button')
  $button.textContent = 'Restart'
  $reloadWrap.append($button)
  return $reloadWrap
}

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
const submitFormFigthHandler = (e) => {
  e.preventDefault()
  const player = playerAttack(e.target)
  const enemy = enemyAttack()
  
  if(player.hit !== enemy.defence){
    player2.changeHp(player.value)
    player2.renderHP()
  }
  if(enemy.hit !== player.hit){
    player1.changeHp(enemy.value)
    player1.renderHP()
  }
  const isOver = selectWin(player1, player2)
  if(isOver){
        $arenas.append(createReloadButton())
        document.querySelector('.reloadWrap .button').addEventListener('click', () => window.location.reload())
      }
}

$formFigth.addEventListener('submit', submitFormFigthHandler)


