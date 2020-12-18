import Reponse from "@/models/Reponse";
import Scenario from "@/models/Scenario";

export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {

    async post({ commit }, query) {
        try{
            const { data } = await this.$axios.post(`/reponses`, query.reponse);
            data.etapeId = query.reponse.etape.id;
            await Reponse.insert({ data });
            return data;
        } catch(error){
            return Promise.reject(error.response);
        }
    },
    async put({ commit }, query) {
        try{
            const { data } = await this.$axios.put(`/reponses/${query.reponse.id}`, query.reponse);
            await Reponse.update({ data });
            return data;
        } catch(error){
            return Promise.reject(error.response);
        }
    },
    async delete({ commit }, query) {
        const { data } = await this.$axios.delete(`/reponses/${ query.id }`);
        await Reponse.delete(query.id);
        return data;
    }

}
