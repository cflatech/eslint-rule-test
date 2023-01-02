if (process.env.NODE_ENV === "development") {
  console.log("env is development!");
} else {
  console.log("env is production");
}

class Hoge {
  #field: number;
  private hoge: string;

  constructor() {
    this.#field = 5;
  }

  #log() {
    console.log(this.#field);
  }
}
