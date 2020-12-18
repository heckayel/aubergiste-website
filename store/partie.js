import Partie from "@/models/Partie";

export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {

    async createPartie({ commit },query) {
        const { data } = await this.$axios.post(`/parties`,query.partie);
        await Partie.insert({ data });
        return data;
    }
}
