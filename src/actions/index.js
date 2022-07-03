export const add = (id,title,body,date) => {
    return {
        type: "ADD",
        payload: {
            id:id,
            title: title,
            body: body,
            date: date
        }
    }
}

export const remove = (id) => {
    return {
        type: "REMOVE",
        payload: {
            id: id
        }
    }
}

export const remove_all = () => {
    return {
        type: "REMOVE_ALL"
    }
}

export const titleChange = (string) => {
    return {
        type: "CHANGE-TITLE",
        payload: {
            string: string
        }
    }
}

export const bodyChange = (string) => {
    return {
        type: "CHANGE-BODY",
        payload: {
            string: string
        }
    }
}