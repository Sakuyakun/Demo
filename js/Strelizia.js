function CheckProgarm(target) {
  console.log('loading system source data...')
  console.log('loading system interface...')
  console.log('loading injection system...')
  console.log('loading resources')
  target.resources = Math.round(Math.random() * 100)
  console.log('class ready, system online')
}

function MechaCurrDriver (target, name, descriptor) {
  const method = descriptor.value
  const driverStatus = Math.round(Math.random() * 100) ? 'Online' : 'Offline'
  console.log(`***driver Status: ${driverStatus}***`)
  descriptor.value = (...args) => {
    if (driverStatus === 'Online') {
      method.apply(this, args)
    } else {
      console.log('Error, Driver Offline')
    }
  }
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
  useWeapons(command) {
    return 'init weapons done'
  }
  @MechaCurrDriver
  useShield(command) {
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
BASE.useWeapons('spear')
