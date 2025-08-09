

async function urls(urlpath) {
    // let urlpath = 'https://9animetv.to/watch/demon-slayer-kimetsu-no-yaiba-swordsmith-village-arc-18056?ep=101711';
    // let response = await fetch('https://9animetv.to/watch/demon-slayer-kimetsu-no-yaiba-swordsmith-village-arc-18056?ep=101711');
    // let data = await response.json();
    const url = new URL(urlpath);
    console.log(url)
    console.log("Protocol:", url.protocol);         // https:
    console.log("Host:", url.host);                 // 9animetv.to
    console.log("Hostname:", url.hostname);         // 9animetv.to
    console.log("Port:", url.port);                 // (empty if not specified)
    console.log("Pathname:", url.pathname);         // /watch/demon-slayer-kimetsu-no-yaiba-swordsmith-village-arc-18056
    console.log("Search:", url.search);             // ?ep=101711
    console.log("Search Params:", url.searchParams.get("ep")); // 101711
    console.log("Hash:", url.hash);
}

urls('https://www.linkedin.com/notifications/?filter=all');