function CheckProgarm(target: object) {
  console.log('loading system source data...')
  console.log('loading system interface...')
  console.log('loading injection system...')
  console.log('loading resources')
  target.resources = Math.round(Math.random() * 100)
  console.log('class ready, system online')
}

function MechaCurrDriver (target: object, name: string, descriptor: object): any {
  const method: object = descriptor.value
  const driverStatus: string = Math.round(Math.random()) ? 'Health' : 'Dead'
  console.log(`***driver Life Status: ${driverStatus}***`)
  
  descriptor.value = (...args) => {
    if (driverStatus === 'Online') {
      method.apply(this, args)
    } else {
      console.log('Error, Driver Offline')
    }
  }
}

interface MechaIF {
  mecha_hp: number,
  status: status
}

@CheckProgarm
class Strelizia implements MechaIF {
  private mecha_hp = 100
  private status = 'done'
  
  public constructor(mainName: string, viceName: string) {
    this.main = mainName
    this.vice = viceName
    console.log('Driver Injection')
  }
  public driverConnection() {
    console.log(`${this.main} connected`)
    console.log(`${this.vice} connected`)
  }
  @MechaCurrDriver
  public useWeapons(command: string) {
    return 'init weapons done'
  }
  @MechaCurrDriver
  public useShield(command: string) {
    return 'init shield done'
  }
  public systemInstruction (command: string) {
    console.log('analyze command')
    console.log('execute')
  }
  public INIT() {
    this.driverConnection()
    console.log('Send Instructions: Strelizia Ready')
  }
}

const BASE = new Strelizia('ZeroTwo', 'Hiro')
BASE.INIT()
BASE.useWeapons('spear')
