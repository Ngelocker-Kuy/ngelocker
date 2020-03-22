export const ADDNEWGUEST = (guest) => {
    return {
        type: "NEWGUEST",
        payload: {
            guest
        }
    }
}