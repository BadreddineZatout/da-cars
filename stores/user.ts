import { defineStore } from "pinia";

interface IState {
  isLogged: boolean;
  user: IUser | null;
  token: string;
}

interface IUser {
  id: number;
  name: string;
  email: string;
}

export const useStore = defineStore("user", {
  state: (): IState => {
    return {
      isLogged: false,
      user: null,
      token: "",
    };
  },
  persist: true,
});
