import axios from 'axios';

process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});

async function run(env) {
    if(!env) {
        throw new Error('env required');
    }

    const {
        ENV,
        REPO_OWNER: owner,
        REPO_NAME: repo,
        GITHUB_TOKEN: token,
    } = process.env;

    let payload = {
        event_type: "",
        client_payload: {
            command: ""
        }
    };

    console.log(`Received ${env || "No"} command`);
    switch(env) {
        case "ping":
            payload.event_type = 'event type here ping';
            payload.client_payload.command = "pong";
            break;
        case "pong":
            payload.event_type = `event type pong`;
            payload.client_payload.command = "done";
            break;
        case "done":
            console.log('I GUESS WE ARE DONE!!! :-D');
            return;
        default:
            console.log(env);
    }

    if(!owner || !repo || !token) {
        throw new Error('Owner and repo required');
    }

    const dispatchUrl = `https://api.github.com/repos/${owner}/${repo}/dispatches`;

    console.log(`Dispatching ${dispatchUrl} with payload`, payload);
    const res = await axios.post(dispatchUrl, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json"
        }
    })
    return res.status;

}

run(ENV)
    .then(() => console.log('Completed running command'))
    .catch(e => {
        console.log(e.message);
        process.exit(1);
    })