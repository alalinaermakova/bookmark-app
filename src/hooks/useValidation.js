import urlExist from '../utils/utils';
import { useState, useEffect } from 'react';

// created custom hook to use link validation at the stage of adding bookmark and at the stage of editting
const useValidation = (link) => {
    const [showError, setShowError] = useState(true);

    const isUrlValid = () => {
        let url;
        try {
            url = new URL(link);
        } catch (error) {
          return false;  
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }

    const handleCheckUrl = () => {
        if (isUrlValid(link)) {
            setShowError(false)
        } else {
            setShowError(true)
        }
    }

    useEffect(() => { handleCheckUrl() }, [link]);

    async function checkUrlExists() {
        return urlExist(link);
    }

    return [showError, checkUrlExists];
};

export default useValidation;