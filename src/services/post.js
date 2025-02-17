const post = async (payload, REQ_URL) => {

    try {
        const res = await fetch(`http://localhost:3030/${REQ_URL}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
                body: payload
        });

        const response = await res.json();
        return response;
    }
    catch(err){
        console.error(err);
    }
};

export default post;