export const randomNumBetween = (min, max) => {
  return Math.random() * (max - min) + min
}

export const hypotenuse = (innerWidth, innerHeight) => {
  return Math.sqrt(Math.pow(innerWidth, 2) + Math.pow(innerHeight, 2))
}