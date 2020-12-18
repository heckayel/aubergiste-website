import Monde from "@/models/Monde";

export const state = () => ({
    currentMondeId: null,
})

export const getters = {
    getCurrentMondeId: state => state.currentMondeId
}

export const mutations = {
    setCurrentMondeId(state, id) {
        state.currentMondeId = id;
    }
}

export const actions = {

    async fetchAll({ commit }) {
        const { data } = await this.$axios.get(`/mondes`);
        await Monde.deleteAll();
        await Monde.insert({ data });
        return data;
    },

    async fetchById({ commit }, query) {
        const { data } = await this.$axios.get(`/mondes/${ query.id }`);
        await Monde.insert({ data });
        return data;
    },

    async fetchAllScenariosLight({ commit },query) {
        const { data } = await this.$axios.get(`/mondes/${ query.id }/scenarios-light`);
        return data;
    },

    async post({ commit }, query) {
        const { data } = await this.$axios.post(`/mondes`, query.monde);
        await Monde.insert({ data });
        commit('setCurrentMondeId', data.id);
        return data;
    },

    async remove({ commit }, query) {
        const { data } = await this.$axios.delete(`/mondes/${ query.id }`);
        await Monde.delete(query.id);
    }

}
