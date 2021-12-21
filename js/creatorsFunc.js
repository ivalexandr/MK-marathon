const createElement = (tag, className) => {
  const $el = document.createElement(tag)
  tag !== 'img' && $el.classList.add(className)

  return $el
}
const createPlayer = ({player, hp, name, img}) => {
  const $player = createElement('div', `player${player}`)
  const $progressbar = createElement('div', 'progressbar')
  const $life = createElement('div', 'life')
  const $name = createElement('div', 'name')
  const $character = createElement('div', 'character')
  const $img = createElement('img')
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
export {
  createPlayer,
  playerWinCreator,
  createReloadButton
}