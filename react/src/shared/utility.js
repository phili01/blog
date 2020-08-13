export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}


export const dataURLtoBlob = (dataurl) => {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}


export const engStrings = {
    suffixAgo: 'ago',
    seconds: 'sec',
    minute: '%d min',
    minutes: '%d min',
    hour: '%d hr',
    hours: '%d hrs',
    day: '%d day',
    days: '%d days',
    month: '%d month',
    months: '%d months',
    year: '%d yr',
    years: '%d yrs'
  };


export const getImageURL = image => {
    let canvas = document.createElement('canvas');
    return new Promise((resolve, reject) => {
        if (canvas.getContext) {
                canvas.width = image.videoWidth;
                canvas.height = image.videoHeight;
                canvas.getContext('2d').drawImage(image, 0, 0);
                let snapShot = canvas.toDataURL('image/png');
                resolve(snapShot);;
        } else {
            reject('Please update your Browser')
        }
    })
}


export const checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
        return true;
    }

    if (rules.required) {
        isValid =  value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid =  value.length >= rules.minLength  && isValid
    }

    return isValid;
}