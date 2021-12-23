import { player1, player2 } from './Player.js'

class Game {
  constructor(props) {
    const { player1, player2 } = props
    this.player1 = player1
    this.player2 = player2

    this.$arenas = document.querySelector('.arenas')
    this.$formFigth = document.querySelector('.control')
    this.$chat = document.querySelector('.chat')

    this.LOGS = {
      start:
        'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
      end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца'
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
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.'
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
    this.HIT = {
      head: 30,
      body: 25,
      foot: 20
    }
    this.ATTACK = ['head', 'body', 'foot']
  }
  #createElement = (tag, className) => {
    const $el = document.createElement(tag)
    tag !== 'img' && $el.classList.add(className)

    return $el
  }
  #playerWinCreator = name => {
    const $winTitle = this.#createElement('div', 'loseTitle')
    if (name) {
      $winTitle.textContent = `${name} wins!`
    } else {
      $winTitle.textContent = `draw`
    }
    return $winTitle
  }
  #createPlayer = playerObj => {
    const { player, hp, img, name } = playerObj
    const $player = this.#createElement('div', `player${player}`)
    const $progressbar = this.#createElement('div', 'progressbar')
    const $life = this.#createElement('div', 'life')
    const $name = this.#createElement('div', 'name')
    const $character = this.#createElement('div', 'character')
    const $img = this.#createElement('img')
    $player.append($progressbar)
    $progressbar.append($life)
    $life.style.width = `${hp}%`
    $progressbar.append($name)
    $name.textContent = name
    $player.append($character)
    $character.append($img)
    $img.src = img
    return $player
  }
  #createReloadButton = () => {
    const $reloadWrap = this.#createElement('div', 'reloadWrap')
    const $button = this.#createElement('button', 'button')
    $button.textContent = 'Restart'
    $reloadWrap.append($button)
    return $reloadWrap
  }
  #addPlayers = () => {
    this.$arenas.append(this.#createPlayer(this.player1))
    this.$arenas.append(this.#createPlayer(this.player2))
  }
  randomChanger = num => Math.ceil(Math.random() * num)
  #enemyAttack = () => {
    const hit = this.ATTACK[this.randomChanger(3) - 1]
    const defence = this.ATTACK[this.randomChanger(3) - 1]
    return {
      value: this.randomChanger(this.HIT[hit]),
      hit,
      defence
    }
  }
  #playerAttack = form => {
    const attack = {}
    for (const item of form) {
      if (item.checked === true && item.name === 'hit') {
        attack.value = this.randomChanger(this.HIT[item.value])
        attack.hit = item.value
      }
      if (item.checked === true && item.name === 'defence') {
        attack.defence = item.value
      }
      item.checked = false
    }
    return attack
  }
  #getTime = () => {
    const hours = new Date().getHours()
    const minutes = new Date().getMinutes()
    const seconds =
      new Date().getSeconds() < 10
        ? `0${new Date().getSeconds()}`
        : new Date().getSeconds()
    return `${hours}:${minutes}:${seconds}`
  }
  #generateStringInLogs = (LOGS, type, kickName, defName) => {
    return LOGS[type][this.randomChanger(LOGS[type].length) - 1]
      .replace('[playerKick]', kickName)
      .replace('[playerDefence]', defName)
  }
  #generateLogs = (type, kickPlayer, defPlayer, changeHp) => {
    const { name: kickName } = kickPlayer
    const { name: defName, hp: defHp } = defPlayer
    switch (type) {
      case 'start':
        const startText = this.LOGS[type]
          .replace('[time]', this.#getTime())
          .replace('[player1]', kickName)
          .replace('[player2]', defName)
        return `<p>${startText}</p>`
      case 'hit':
        return `<p>${this.#getTime()} - ${this.#generateStringInLogs(
          this.LOGS,
          type,
          kickName,
          defName
        )} -${changeHp} [${defHp}/100]</p>`
      case 'defence':
        return `<p>${this.#getTime()} - ${this.#generateStringInLogs(
          this.LOGS,
          type,
          kickName,
          defName
        )}</p>`
      case 'end':
        const endText = this.LOGS[type][
          this.randomChanger(this.LOGS[type].length) - 1
        ]
          .replace('[playerWins]', kickName)
          .replace('[playerLose]', defName)
        return `<p>${endText}</p>`
      case 'draw':
        return `<p>${this.LOGS[type]}</p>`
    }
  }
  #renderLogs = logText => this.$chat.insertAdjacentHTML('afterbegin', logText)
  #selectWin = () => {
    const { hp: playerHp, name: playerName } = this.player1
    const { hp: enemyHp, name: enemyName } = this.player2
    if (playerHp > 0 && enemyHp === 0) {
      this.$arenas.append(this.#playerWinCreator(playerName))
      this.#renderLogs(this.#generateLogs('end', this.player1, this.player2))
    } else if (playerHp > 0 && enemyHp === 0) {
      this.$arenas.append(this.#playerWinCreator(enemyName))
      this.#renderLogs(this.#generateLogs('end', this.player2, this.player1))
    } else if (playerHp === 0 && enemyHp === 0) {
      this.$arenas.append(this.#playerWinCreator())
      this.#renderLogs(this.#generateLogs('draw'))
    }
    if (playerHp === 0 || enemyHp === 0) {
      this.$formFigth.remove()
      return true
    }
  }
  #submitHandler = e => {
    e.preventDefault()

    const {
      value: pValue,
      hit: pHit,
      defence: pDefence
    } = this.#playerAttack(e.target)
    const { value: eValue, hit: eHit, defence: eDefence } = this.#enemyAttack()

    if (pHit !== eDefence) {
      this.player2.changeHp(pValue)
      this.player2.renderHP()
      this.#renderLogs(
        this.#generateLogs('hit', this.player1, this.player2, pValue)
      )
    } else {
      this.#renderLogs(
        this.#generateLogs('defence', this.player1, this.player2, pValue)
      )
    }
    if (eHit !== pDefence) {
      this.player1.changeHp(eValue)
      this.player1.renderHP()
      this.#renderLogs(
        this.#generateLogs('hit', this.player2, this.player1, eValue)
      )
    } else {
      this.#renderLogs(
        this.#generateLogs('defence', this.player2, this.player1, eValue)
      )
    }
    const isOver = this.#selectWin(this.player1, this.player2)
    if (isOver) {
      this.$arenas.append(this.#createReloadButton())
      document
        .querySelector('.reloadWrap .button')
        .addEventListener('click', () => window.location.reload())
    }
  }
  start = () => {
    this.#addPlayers()
    this.#renderLogs(this.#generateLogs('start', this.player1, this.player2))
    this.$formFigth.addEventListener('submit', this.#submitHandler)
  }
}

export default new Game({player1, player2})
