export const state = () => ({
    commands: []
})

export const getters = {
    getCommands(state) {
        return state.commands;
    },
    getCommand: state => id => state.commands.find(s => s.id === id),
}

export const mutations = {
    setCommands(state, commands) {
        state.commands = commands;
    },
    updateCommand(state,command){
        const idCommand = state.commands.findIndex(ds => ds.id.localeCompare(command.id) === 0);
        state.commands[idCommand] = command;
    },
    addCommand(state,command){
        state.commands.push(command);
    }
}

export const actions = {

    async fetchAll({ commit }) {
        const { data } = await this.$axios.get(`commands`);
        commit('setCommands', data);
        return data;
    },

    async putCommand({ commit }, query){
        const { data } = await this.$axios.put(`commands/${query.command.id}`, query.command);
        commit('updateCommand',data);
        return data;
    },

    async postCommand({ commit }, query){
        const { data } = await this.$axios.post(`commands`, query.command);
        commit('addCommand',data);
        return data;
    }
}
