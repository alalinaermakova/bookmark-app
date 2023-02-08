const urlExist = async url => {
    const isExist = await fetch(url, { 
        mode: 'no-cors'
        })
        .then(response => {
            return response !== undefined && (response.status < 400 || response.status >= 500)
        });

	return isExist
}

export default urlExist;