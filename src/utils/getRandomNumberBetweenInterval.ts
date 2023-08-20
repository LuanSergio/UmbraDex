export default function getRandomNumberBetweenInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
