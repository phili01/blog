import * as actionTypes from './actionTypes';

export const fetchCategInit = () =>  {
    return {
        type: actionTypes.FETCH_CATEG_INIT
    }; 
}; 


export const fetchCategStart = () =>  {
    return {
        type: actionTypes.FETCH_CATEG_START
    }; 
}; 

export const fetchCategFail = (err) =>  {
    return {
        type: actionTypes.FETCH_CATEG_FAIL,
        err
    }; 
}; 

export const fetchCategReset = () =>  {
    return {
        type: actionTypes.FETCH_CATEG_RESET
    }; 
}; 

export const fetchCateg = (categ) =>  {
    return {
        type: actionTypes.FETCH_CATEG,
        categ
    }; 
}; 

export const addCategInit = (categ) =>  {
    return {
        type: actionTypes.ADD_CATEG_INIT,
        categ
    }; 
}; 

export const addCateg = (categ) =>  {
    return {
        type: actionTypes.ADD_CATEG,
        categ
    }; 
}; 

export const checkLinkInit = (link, mediaType) =>  {
    return {
        type: actionTypes.CHECK_LINK_INIT,
        link,
        mediaType
    }; 
}; 

export const checkLink = (err, media) =>  {
    return {
        type: actionTypes.CHECK_LINK,
        err,
        media
    }; 
}; 

export const resetLink = () =>  {
    return {
        type: actionTypes.RESET_LINK
    }; 
}; 

export const addSnapshot = (snapshot) => {
    return {
        type: actionTypes.ADD_SNAPSHOT,
        snapshot
    };
};

export const removeSnapshot = (snapshot) => {
    return {
        type: actionTypes.REMOVE_SNAPSHOT,
        snapshot
    };
};

export const removeMedia = (media) => {
    return {
        type: actionTypes.REMOVE_MEDIA,
        media
    };
};

export const submitMedia = (media) =>  {
    return {
        type: actionTypes.SUBMIT_MEDIA,
        media
    }; 
}; 

export const hideMediaBox = () =>  {
    return {
        type: actionTypes.HIDE_MEDIA_BOX,
    }; 
}; 

export const showMediaBox = () =>  {
    return {
        type: actionTypes.SHOW_MEDIA_BOX,
    }; 
}; 

export const inputDefaultValue = () => {
    return {
        type: actionTypes.INPUT_DEFAULT_VALUE
    };
}; 

export const submitFormInit = (formData) => {
    return {
        type: actionTypes.SUBMIT_FORM_INIT,
        formData
    };
};

export const submitFormFail = (err) => {
    return {
        type: actionTypes.SUBMIT_FORM_FAIL,
        err
    };
};

export const submitFormSuccess = (uploadPercent) => {
    return {
        type: actionTypes.SUBMIT_FORM_SUCCESS,
        uploadPercent
    };
};

export const submitFormStart = () => {
    return {
        type: actionTypes.SUBMIT_FORM_START
    };
};

export const submitForm = () => {
    return {
        type: actionTypes.SUBMIT_FORM
    };
};

export const formSubmitted = (id) => {
    return {
        type: actionTypes.FORM_SUBMITTED,
        id
    };
};

export const groupImage = (imageCapture) => {
    return {
        type: actionTypes.IMAGE_CAPTURE,
        imageCapture
    };
};


