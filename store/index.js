import { RolesEnum } from "@/core/enums/roles.enum";

export const state = () => ({
})

export const mutations = {}

export const getters = {
    isAuthenticated(state) {
        return state.auth.loggedIn
    },

    loggedInUser(state) {
        return state.auth.user
    },
    isAdmin(state) {
        return state.auth.user && state.auth.user.roles && state.auth.user.roles.includes(RolesEnum.ADMIN);
    }
}
