import { renderHome } from "./client.mjs";

renderHome(document);

navigator.serviceWorker.register("/service-worker.js");
