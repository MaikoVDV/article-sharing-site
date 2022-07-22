export const state = () => ({
    profile: {
        name: "",
        picture: "",
        id: ""
    }
})
export const mutations = {
    setProfile(state, profileData) {
        state.profile.name = profileData.username,
        state.profile.picture = profileData.profilePicture,
        state.profile.id = profileData.userId
    }
}