import { createStore } from 'vuex'
import config from '@/data/page_config.json'

export default createStore({
    state: {
        lang: config["lang"]["default"],
        getUrlExtension: function() {
            let lang_opt = (this.lang != config["lang"]["default"]) ? "lang=" + this.lang : "";
            let str_ = lang_opt;
            return str_;
        }
    },
    mutations: {

    },
    actions: {},
    modules: {}
})