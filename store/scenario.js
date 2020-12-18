import Scenario from "@/models/Scenario";

export const state = () => ({
    currentScenarioId: null
})

export const getters = {
    getCurrentScenarioId: state => state.currentScenarioId
}

export const mutations = {
    setCurrentScenarioId(state, id) {
        state.currentScenarioId = id;
    }
}

export const actions = {

    async fetchAll({ commit }) {
        const { data } = await this.$axios.get(`/scenarios-light`);
        return data;
    },

    async fetchById({ commit }, query) {
        const { data } = await this.$axios.get(`/scenarios/${ query.id }`);
        await Scenario.insert({ data });
        return data;
    },

    async post({ commit }, query) {
        try{
            const { data } = await this.$axios.post(`/scenarios`, query.scenario);
            data.mondeId = query.scenario.monde.id;
            await Scenario.insert({ data });
            return data;
        } catch(error){
            return Promise.reject(error.response);
        }
    },

    async put({ commit }, query) {
        try{
            const { data } = await this.$axios.put(`/scenarios/${query.scenario.id}`, query.scenario);

            // Update the store
            if(query.scenario.monde){
                data.mondeId = query.scenario.monde.id;
            }
            await Scenario.update({ data });
            return data;
        } catch(error){
            return Promise.reject(error.response);
        }
    },

    async delete({ commit }, query) {
        const { data } = await this.$axios.delete(`/scenarios/${ query.id }`);
        await Scenario.delete(query.id);
        return data;
    }

}
