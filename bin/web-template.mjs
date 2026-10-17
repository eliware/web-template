#!/usr/bin/env node
import { runtimeDependencies } from "../src/backend/runtime-wiring.mjs";
import { startWebApplication } from "../src/backend/main.mjs";

await startWebApplication(runtimeDependencies);
