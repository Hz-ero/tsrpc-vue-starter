import { defineStore } from "pinia";

export const mainStore = defineStore("mainStore", {
    state: () => {
        return {
            data: 'data'
        };
    },
    getters: {},
    actions: {},
});