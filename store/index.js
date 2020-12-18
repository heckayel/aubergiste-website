import VuexORM from "@vuex-orm/core";
import Monde from "@/models/Monde";
import Scenario from "@/models/Scenario";
import Etape from "@/models/Etape";
import Reponse from "~/models/Reponse";
import ConsequencePossible from "~/models/ConsequencePossible";
import { RolesEnum } from "@/core/enums/roles.enum";
import User from "@/models/User";
import MondeUser from "@/models/MondeUser";
import Unite from "@/models/Unite";
import Effet from "@/models/Effet";
import DiscordGuild from "@/models/DiscordGuild";
import Partie from "@/models/Partie";
import DiscordGuildPartie from "@/models/DiscordGuildPartie";
import Stat from "~/models/Stat";

const database = new VuexORM.Database();

database.register(DiscordGuild, {});
database.register(Partie, {});
database.register(DiscordGuildPartie, {});
database.register(Monde, {});
database.register(Scenario, {});
database.register(Etape, {});
database.register(Effet, {});
database.register(Reponse, {});
database.register(ConsequencePossible, {});
database.register(User, {});
database.register(Unite, {});
database.register(Stat, {});
database.register(MondeUser, {});

const plugin = VuexORM.install(database);

export default {
    plugins: [ plugin ],
    getters: {
        isAuthenticated(state) {
            return state.auth.loggedIn
        },

        loggedInUser(state) {
            return state.auth.user
        },
        isAdmin(state) {
            return state.auth.user && state.auth.user.roles && state.auth.user.roles.includes(RolesEnum.ADMIN);
        },

        getPreferences(state) {
            if(state.auth.user && state.auth.user.preferences){
                return state.auth.user.preferences;
            }
            return {};
        }
    },
    mutations:{
        setPreferences(state,query){
            state.auth.user.preferences = query.preferences;
        }
    },
    actions:{
        async updatePreferences({ commit }, query) {
            const { data } = await this.$axios.put(`/users/update-preferences`, query.preferences);
            commit('setPreferences',query);
            return data;
        },
        async registerDiscord({ commit }, query) {
            const { data } = await this.$axios.post(`/discord/register`, {socialToken : query.socialToken});
            return data;
        },
        async connectDiscord({ commit }, query) {
            const { data } = await this.$axios.post(`/discord/connect`, {socialToken : query.socialToken});
            return data;
        }
    }

};
