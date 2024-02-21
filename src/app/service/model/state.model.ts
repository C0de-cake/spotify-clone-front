export type StatusNotification = 'OK' | 'ERROR' | 'INIT';

export class State<T, V> {
  value?: T;
  error?: V;
  status: StatusNotification;

  constructor(status: StatusNotification, value?: T, error?: V) {
    this.value = value;
    this.error = error;
    this.status = status;
  }

  static Builder<T, V>() {
    return new StateBuilder<T, V>();
  }
}

class StateBuilder<T, V> {
  private status: StatusNotification = 'INIT';
  private value?: T;
  private error?: V;

  public forError(error: any): StateBuilder<T, V> {
    this.error = error;
    this.status = "ERROR";
    return this;
  }

  public forSuccess(value: T): StateBuilder<T, V> {
    this.value = value;
    this.status = "OK";
    return this;
  }

  public forInit(): StateBuilder<T, V> {
    this.status = "INIT";
    return this;
  }

  build(): State<T, V> {
    return new State<T, V>(this.status, this.value, this.error);
  }
}
