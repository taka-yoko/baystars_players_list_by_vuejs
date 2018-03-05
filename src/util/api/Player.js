import Base from './Base'

export default class Player extends Base{
  constructor() {
    super()
  }

  getPlayer() {
    return this.client.get('/players')
  }
}
