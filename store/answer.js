export const state = () => ({
    answers: []
})

export const getters = {
    getAnswers(state) {
        return state.answers;
    },
    getAnswer: state => id => state.answers.find(s => s.id === id),
}

export const mutations = {
    setAnswers(state, answers) {
        state.answers = answers;
    },
    updateAnswer(state,answer){
        const idAnswer = state.answers.findIndex(ds => ds.id.localeCompare(answer.id) === 0);
        state.answers[idAnswer] = answer;
    }
}

export const actions = {

    async fetchAll({ commit }) {
        const { data } = await this.$axios.get(`answers`);
        commit('setAnswers', data);
        return data;
    },

    async putAnswer({ commit }, query){
        const { data } = await this.$axios.put(`answers/${query.answer.id}`, query.answer);
        commit('updateAnswer',data);
        return data;
    }
}
