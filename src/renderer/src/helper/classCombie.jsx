export default function classCombie(...classes) {
  return classes.filter(Boolean).join(' ')
}
