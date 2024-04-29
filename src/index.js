import axios from 'axios';

async function run() {
    const {
        ENV,
        REPO_OWNER,
        REPO_NAME,
        GITHUB_TOKEN,
    } = process.env;

    let payload = {
        event_type: "",
        client_payload: {
            command: ""
        }
    };

    console.log(`Received ${ENV || "No"} command`);
    switch(ENV) {
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
            console.log(ENV);
    }

    if(!REPO_OWNER || !REPO_NAME || !GITHUB_TOKEN) {
        throw new Error('Owner and repo required');
    }

    const [owner, repo] = REPO_NAME.split('/');
    const dispatchUrl = `https://api.github.com/repos/${owner}/${repo}/dispatches`;

    console.log(`Dispatching ${dispatchUrl} with payload`, payload);
    console.log(`Bearer ${GITHUB_TOKEN}`);

    const res = await axios.post(dispatchUrl, payload, {
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json"
        }
    });

    return res.status;
}

run()
    .then(() => console.log('Completed running command'))
    .catch(e => {
        console.log(e.message);
        process.exit(1);
    })