export const state = () => ({
    listedArticles: []
})
export const mutations = {
    addArticles(state, newArticles) {
        state.listedArticles.push(...newArticles);
    }
}