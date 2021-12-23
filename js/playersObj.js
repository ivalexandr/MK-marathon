class Player{
  constructor(props){
    const {player, name, hp, img} = props
    this.player = player
    this.name = name
    this.hp = hp
    this.img = img
  }
  changeHp = (hp) => {
    this.hp -= hp
  if(this.hp <= 0){ 
    this.hp = 0
  }
  }
  #elHP = () => document.querySelector(`.player${this.player} .life`)
  renderHP = () => this.#elHP().style.width = `${this.hp}%`
}

const player1 = new Player({
  player:1,
    name:'Scorpion',
    hp:100,
    img:'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
})
const player2 = new Player({
  player:2,
  name:'Kitana',
  hp:100,
  img:'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
})

export {
  player1,
  player2
}