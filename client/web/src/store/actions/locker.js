export const changeLockStatus = (status) => {
    return {
        type: "CHANGELOCK",
        payload: {
            status
        }
    }
}