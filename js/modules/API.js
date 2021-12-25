const generateStringApi = str =>  `https://reactmarathon-api.herokuapp.com/api/mk/${str}`

class API {
  constructor() {
    this.players = generateStringApi('players')
    this.randomPlayers = generateStringApi('player/choose')
    this.fight = generateStringApi('player/fight')
  }
  getAllPersons = async () => {
    try {
      const res = await fetch(this.players)
      if (!res.ok) throw new Error('Ответ не ок!')
      return await res.json()
    } catch (e) {
      console.error(e)
    }
  }
  getRandomPerson = async () => {
    try {
      const res = await fetch(this.randomPlayers)
      if (!res.ok) throw new Error('Ответ не ок!')
      return await res.json()
    } catch (e) {
      console.error(e)
    }
  }
  figthPersons = async (defence, hit) => {
    try {
      const res = await fetch(this.fight, {
        method: 'POST',
        body: JSON.stringify({ defence, hit })
      })
      if (!res.ok) throw new Error('Ответ не ок!')
      return await res.json()
    } catch (e) {
      console.error(e)
    }
  }
}

export default new API()
