import { Todos } from "@/services/request";

class User {
  id?: number;
  countCompleted?: number;
  countTrue?: number;
  countFalse?: number;
  titles?: Array<Todos>;

  constructor(
    id: number,
    countCompleted: number,
    countTrue: number,
    countFalse: number,
    titles: Array<Todos>
  ) {
    this.id = id;
    this.countCompleted = countCompleted;
    this.countTrue = countTrue;
    this.countFalse = countFalse;
    this.titles = titles;
  }
}

export const getUserInfo = (arr: Array<Todos>): Array<User> => {
  const result: User[] = [];
  let id = 1;
  let countCompleted = 1;
  let countTrue = 1;
  let countFalse = 1;
  let titles: Array<Todos> = [];

  arr
    .sort((a, b) => a.id - b.id)
    .forEach((elem) => {
      if (elem.userId === id) {
        countCompleted++;
        elem.completed ? countTrue++ : countFalse++;
        titles.push(elem);
      } else {
        result.push(new User(id, countCompleted, countTrue, countFalse, titles));
        id++;
        countCompleted = 1;
        countTrue = 1;
        countFalse = 1;
        titles = [];
      }
    });
  return result;
};
