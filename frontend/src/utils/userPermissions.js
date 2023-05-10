//quick frontend validations for hide/show behavior
//actual validations happen in the backend

export const canWrite = (user) => {
    if (user.userClass === 'Writer' || user.userClass === 'Editor' || user.userClass === 'Admin') {
        return true;
    }
    return false;
}

export const canManageUsers = (user) => {
    if (user.userClass === 'Admin') {
        return true;
    }
    return false;
}

export const canPublish = (user) => {
    if (user.userClass === 'Admin' || user.userClass === 'Editor') {
        return true;
    }
    return false;
}