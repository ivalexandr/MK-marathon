'use strict'

const $arenas = document.querySelector('.arenas')
const $formFigth = document.querySelector('.control')
const $chat = document.querySelector('.chat')
const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
}

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
    this.hp -= hp
    if(this.hp <= 0){ 
      this.hp = 0
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
const getTime = () => {
  return `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`
}
const generateStringInLogs = (logs,type,kickPlayer, defPlayer) => {
  return logs[type][randomChanger(logs[type].length) - 1]
  .replace('[playerKick]', kickPlayer.name)
  .replace('[playerDefence]', defPlayer.name)
}

const generateLogs = (type, kickPlayer, defPlayer, changeHp) => {
  switch(type){
    case 'start':
      const startText = logs[type].replace('[time]', getTime())
      .replace('[player1]', kickPlayer.name)
      .replace('[player2]', defPlayer.name)
      return `<p>${startText}</p>`
    case 'hit':
      return `<p>${getTime()} - ${generateStringInLogs(logs, type, kickPlayer, defPlayer)} -${changeHp} [${defPlayer.hp}/100]</p>`
    case 'defence':
      return `<p>${getTime()} - ${generateStringInLogs(logs, type, kickPlayer, defPlayer)}</p>`
    case 'end':
      const endText = logs[type][randomChanger(logs[type].length) - 1]
      .replace('[playerWins]', kickPlayer.name)
      .replace('[playerLose]', defPlayer.name)
      return `<p>${endText}</p>`
    case 'draw':
      return `<p>${logs[type]}</p>`
  }
}

const renderLogs = (el, logText) => {
el.insertAdjacentHTML('afterbegin', logText)
}

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

renderLogs($chat, generateLogs('start', player1, player2))

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

$formFigth.addEventListener('submit', submitFormFigthHandler)


