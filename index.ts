import { SakuClient } from "./src/SakuClient";
import "dotenv/config"; // Load environment variables

async function main() {
	const client = new SakuClient(SakuClient.getClientOptions());
    client.connect();
    client.loadEvents();
};

main();