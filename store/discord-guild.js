import DiscordGuild from "@/models/DiscordGuild";

export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {

    async fetchMyGuilds({ commit }) {
        const { data } = await this.$axios.get(`/discord/my-guilds`);
        await DiscordGuild.deleteAll();
        await DiscordGuild.insert({ data });
        return data;
    },

    async put({ commit }, query) {
        try{
            const { data } = await this.$axios.put(`/discord-guild/${query.discordGuild.id}`, query.discordGuild);
            await DiscordGuild.update({ data });
            return data;
        } catch(error){
            return Promise.reject(error.response);
        }
    },
}
