const isUrlValid = (link) => {
    let url;
    try {
        url = new URL(link);
    } catch (error) {
      return false;  
    }
    return url.protocol === "http:" || url.protocol === "https:";
}

export default isUrlValid;