export const state = () => ({
    discordServers: [],
    prefix:"!"
})

export const getters = {
    getDiscordServers(state) {
        return state.discordServers;
    },
    getDiscordServer: state => id => state.discordServers.find(s => s.id === id),
    getPrefix : state => state.prefix
}

export const mutations = {
    setDiscordServers(state, discordServers) {
        state.discordServers = discordServers;
    },
    updateDiscordServer(state,discordServer){
        const idDiscordServer = state.discordServers.findIndex(ds => ds.id.localeCompare(discordServer.id) === 0);
        state.servers[idDiscordServer] = discordServer;
    }
}

export const actions = {

    async fetchAll({ commit }) {
        const { data } = await this.$axios.get(`discord-servers`);
        commit('setDiscordServers', data);
        return data;
    },

    async updateDiscordServer({ commit }, query){
        const { data } = await this.$axios.put(`discord-servers`, query.discordServer);
        commit('updateDiscordServer',data);
        return data;
    },

    async send({ commit }, query){
        const { data } = await this.$axios.post(`bots/send`, query.directMessage);
        return data;
    }
}
