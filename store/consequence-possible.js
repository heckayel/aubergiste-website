import ConsequencePossible from "@/models/ConsequencePossible";

export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {

    async post({ commit }, query) {
        try {
            const { data } = await this.$axios.post(`/consequence-possibles`, query.consequencePossible);
            data.reponseId = query.consequencePossible.reponse.id;
            await ConsequencePossible.insert({ data });
            return data;
        } catch (error) {
            return Promise.reject(error.response);
        }
    },
    async put({ commit }, query) {
        try {
            const { data } = await this.$axios.put(`/consequence-possibles/${ query.consequencePossible.id }`, query.consequencePossible);
            await ConsequencePossible.update({ data });
            return data;
        } catch (error) {
            return Promise.reject(error.response);
        }
    },
    async delete({ commit }, query) {
        const { data } = await this.$axios.delete(`/consequence-possibles/${ query.id }`);
        await ConsequencePossible.delete(query.id);
        return data;
    }

}
