export function getDistance(p1, p2) {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y

  return Math.sqrt(dx * dx + dy * dy)
}

export function getAngle(p1, p2) {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y

  return Math.atan2(dy, dx)
}