import Left from './Left';

export default class Right<L, A> {
  readonly value: A;

  constructor(value: A) {
    this.value = value;
  }

  isLeft: () => this is Left<L, A> = () => {
    return false;
  };

  isRight: () => this is Right<L, A> = () => {
    return true;
  };
}
