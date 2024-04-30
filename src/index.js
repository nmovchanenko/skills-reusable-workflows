import axios from 'axios';

async function run() {
    const {
        ENV,
        REPO_OWNER,
        REPO_NAME,
        GITHUB_TOKEN,
    } = process.env;

    let payload = {
        event_type: "PromoteToStaging/randomEvent",
        client_payload: {
            passed: 9,
            failed: 1
        }
    };

    if(!REPO_OWNER || !REPO_NAME || !GITHUB_TOKEN) {
        throw new Error('Owner and repo required');
    }

    const [owner, repo] = REPO_NAME.split('/');
    const dispatchUrl = `https://api.github.com/repos/${owner}/${repo}/dispatches`;

    console.log(`Dispatching ${dispatchUrl} with payload`, payload);

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