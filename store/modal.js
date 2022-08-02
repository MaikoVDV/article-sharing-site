export const state = () => ({
    modalData: {
        title: "", // Shown at top of modal
        description: "", // Shown below title
        options: [ // Either a button or a text input
            {
                text: "", // Text placed over button or input field.
                type: "", // The kind of option - TextInput, Confirm, Danger, Cancel, Default
                action: null // Function called on option click (only applies if option is a button)
            }
        ]
    },
    active: false // If the modal is visible or not
})
export const mutations = {
    setModalData(state, modalData) {
        state.modalData = modalData;
    },
    changeModalVisibility(state, modalVisibility) {
        state.active = modalVisibility
    }
}