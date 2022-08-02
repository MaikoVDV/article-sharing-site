export default {
    methods: {
        // Create a new modal.
        createModal(title, description, options) {
            let modalData = {
                title: title,
                description: description,
                options: options
            }
            this.$store.commit('modal/setModalData', modalData)
            this.$store.commit('modal/changeModalVisibility', true)
        },
        // Hides the modal and clears all data.
        removeModal() {
            let modalData = {
                title: "",
                description: "",
                options: [
                    {
                        text: "",
                        type: "",
                        action: null
                    }
                ]
            }
            this.$store.commit('modal/setModalData', modalData)
            this.$store.commit('modal/changeModalVisibility', false)
        }
    }
}