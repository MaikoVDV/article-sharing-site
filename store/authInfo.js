export const state = () => ({
    challenge: "",
    verifier: "",
    authCode: "",
    accessToken: "",
    userInfo: {},
    loggedIn: false,
})
export const mutations = {
    addAuthChallenge(state, challenge) {
        state.challenge = challenge;
    },
    addAuthVerifier(state, verifier) {
        state.verifier = verifier;
    },
    addAuthCode(state, authCode) {
        state.authCode = authCode;
    },
    addAccessToken(state, accessToken) {
        state.accessToken = accessToken;
    },
    setUserInfo(state, userInfo) {
        state.userInfo = userInfo;
    },
    setLoggedIn(state, loggedIn) {
        state.loggedIn = loggedIn;
    }
}