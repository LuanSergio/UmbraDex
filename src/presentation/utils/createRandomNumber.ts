export default function createRandomNumber(limit = 10) {
  return Math.floor(Math.random() * limit) + 1;
}
