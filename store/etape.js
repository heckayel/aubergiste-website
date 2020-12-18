import Scenario from "@/models/Scenario";
import Etape from "@/models/Etape";
import Reponse from "@/models/Reponse";
import { CleanObject } from "@/core/CleanObject";

export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {

    async post({ commit }, query) {
        try{
            const { data } = await this.$axios.post(`/etapes`, query.etape);
            data.scenarioId = query.etape.scenario.id;
            await Etape.insert({ data });
            return data;
        } catch(error){
            return Promise.reject(error.response);
        }
    },
    async put({ commit }, query) {
        try{
            delete query.etape.scenarioId;
            const { data } = await this.$axios.put(`/etapes/${query.etape.id}`, CleanObject.clean$id(query.etape));
            await Etape.update({ data });
            return data;
        } catch(error){
            return Promise.reject(error.response);
        }
    },
    async delete({ commit }, query) {
        const { data } = await this.$axios.delete(`/etapes/${ query.id }`);
        await Etape.delete(query.id);
        return data;
    }

}
