export const state = () => ({
    profile: {
        id: "",
        name: "",
        picture: "",
        weblink: "",
        date: "",
        written: [],
        starred: [],
        voted: [],
        settings: {
            starredDocsPublic: true,
            votedDocsPublic: true
        }
    }
})
export const mutations = {
    setFullProfile(state, profileData) {
        state.profile.id = profileData.userId,
        state.profile.name = profileData.username,
        state.profile.picture = profileData.iconLink,
        state.profile.weblink = profileData.linkedWebsite,
        state.profile.date = profileData.date,
        state.profile.written = profileData.writtenDocuments,
        state.profile.starred = profileData.starredDocuments,
        state.profile.voted = profileData.votedDocuments,
        state.profile.settings = profileData.settings
    }
}