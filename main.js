'use strict'

const $arenas = document.querySelector('.arenas')

const player1 = {
  name:'Scorpion',
  hp:80,
  img:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon:['Гарпун'],
  attack:function(){
    console.log(`${this.name} Fight...`)
  }
}

const player2 = {
  name:'Kitana',
  hp:30,
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

const createPlayer = (playerName, playerObj) => {
  const $player = createElement('div', playerName)
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

$arenas.append(createPlayer('player1', player1))
$arenas.append(createPlayer('player2', player2))