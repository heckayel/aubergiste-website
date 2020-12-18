import { CleanObject } from "@/core/CleanObject";
import Effet from "~/models/Effet";

export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {

    async post({ commit }, query) {
        try {
            const { data } = await this.$axios.post(`/effets`, query.effet);
            data.etapeId = query.effet.etape.id;
            await Effet.insert({ data });
            return data;
        } catch (error) {
            return Promise.reject(error.response);
        }
    },
    async put({ commit }, query) {
        try {
            delete query.effet.scenarioId;
            delete query.effet.etapeId;
            delete query.effet.uniteId;
            const { data } = await this.$axios.put(`/effets/${ query.effet.id }`, CleanObject.clean$id(query.effet));
            await Effet.update({ data });
            return data;
        } catch (error) {
            return Promise.reject(error.response);
        }
    },
    async delete({ commit }, query) {
        const { data } = await this.$axios.delete(`/effets/${ query.id }`);
        await Effet.delete(query.id);
        return data;
    }

}
