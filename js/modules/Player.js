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
    if(this.hp <= 0)this.hp = 0
  }
  #elHP = () => document.querySelector(`.player${this.player} .life`)
  renderHP = () => this.#elHP().style.width = `${this.hp}%`
}

export default Player