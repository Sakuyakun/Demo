function CheckProgarm(target) {
  console.log('loading system source data...')
  console.log('loading system interface...')
  console.log('loading injection system...')
  console.log('loading resources')
  target.resources = Math.round(Math.random() * 100)
  console.log('class ready, system online')
}

function MechaCurrDriver (target, name, descriptor) {
  console.log('connect remote monitor console')
}

@CheckProgarm
class Strelizia {
  constructor(mainName, viceName) {
    this.mecha_hp = 100
    this.main = mainName
    this.vice = viceName
    this.status = 'done'
    console.log('constructor ready')
  }
  driverConnection() {
    console.log(`${this.main} connected`)
    console.log(`${this.vice} connected`)
  }
  @MechaCurrDriver
  useWeapons() {
    return 'init weapons done'
  }
  @MechaCurrDriver
  useShield() {
    return 'init shield done'
  }
  systemInstruction (command) {
    console.log('analyze command')
    console.log('execute')
  }
  INIT() {
    this.driverConnection()
    console.log('Send Instructions: Strelizia Ready')
  }
}

const BASE = new Strelizia('ZeroTwo', 'Hiro')
BASE.INIT()
