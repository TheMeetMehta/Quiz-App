const get = async (REQ_URL) => {

    try {
        const res = await fetch(`http://localhost:3030/${REQ_URL}`, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        });
    const response = await res.json();

    return response;
}
catch(err){
    console.error(err);
}
};

export default get;