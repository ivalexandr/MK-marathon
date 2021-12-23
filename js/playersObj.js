const player1 = {
  player:1,
  name:'Scorpion',
  hp:100,
  img:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon:['Гарпун'],
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
  changeHp,
  elHP,
  renderHP,
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

export {
  player1,
  player2
}