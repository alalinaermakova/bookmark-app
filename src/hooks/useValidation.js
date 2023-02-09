import { useState, useEffect } from 'react';
import isUrlValid from '../utils/validation';


// created custom hook to use link validation at the stage of adding bookmark and at the stage of editting
const useValidation = (link) => {
    const [showError, setShowError] = useState(true);

    const handleCheckUrl = () => {
        setShowError(!isUrlValid(link))
    }

    useEffect(() => { handleCheckUrl() }, [link]);

    return [showError];
};

export default useValidation;