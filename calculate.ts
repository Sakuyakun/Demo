export function add(a: number, b: number) {
  let c, d, e
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  return (e = Math.pow(10, Math.max(c, d))), (mul(a, e) + mul(b, e)) / e
}

export function sub(a: number, b: number) {
  let c, d, e
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  return (e = Math.pow(10, Math.max(c, d))), (mul(a, e) - mul(b, e)) / e
}

export function mul(a: number, b: number) {
  let c = 0
  const d = a.toString()
  const e = b.toString()
  try {
    c += d.split('.')[1].length
  } catch (f) {}
  try {
    c += e.split('.')[1].length
  } catch (f) {}
  return (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / Math.pow(10, c)
}

export function div(a: number, b: number) {
  if (a === 0 || b === 0) return 0
  let c,
    d,
    e = 0,
    f = 0
  try {
    e = a.toString().split('.')[1].length
  } catch (g) {}
  try {
    f = b.toString().split('.')[1].length
  } catch (g) {}
  return (
    (c = Number(a.toString().replace('.', ''))),
    (d = Number(b.toString().replace('.', ''))),
    mul(c / d, Math.pow(10, f - e))
  )
}
