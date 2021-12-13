'use strict'

const $arenas = document.querySelector('.arenas')
const $button = document.querySelector('.button')

const player1 = {
  player:1,
  name:'Scorpion',
  hp:100,
  img:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon:['Гарпун'],
  attack:function(){
    console.log(`${this.name} Fight...`)
  }
}

const player2 = {
  player:2,
  name:'Kitana',
  hp:100,
  img:'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
  weapon:['Веера'],
  attack:function(){
    console.log(`${this.name} Fight...`)
  }
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

const randomChanger = () => {
  return Math.ceil(Math.random() * 20)
}

const changeHp = (player) => {
  const $playerLife = document.querySelector(`.player${player.player} .life`)
  if(player.hp === 0 || player.hp < 0){ 
    player.hp = 0
  }
  else{
    player.hp -= randomChanger()
  } 
  $playerLife.style.width = `${player.hp}%`
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
  if(player1.hp <= 0 || player2.hp <= 0){
    $button.disabled = true
  }
  if(player1.hp > 0 && player2.hp <= 0){
    $arenas.append(playerWinCreator(player1.name))
  } else if(player2.hp > 0 && player1.hp <= 0){
    $arenas.append(playerWinCreator(player2.name))
  }else if(player1.hp <= 0 && player1.hp <= 0){
    $arenas.append(playerWinCreator())
  }
}  

const clickRandomButtonHandler = () => {
  changeHp(player1)
  changeHp(player2)
  selectWin(player1, player2)
}

$button.addEventListener('click', clickRandomButtonHandler)