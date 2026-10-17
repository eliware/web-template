#!/usr/bin/env node
import { runtimeDependencies, startWebApplication } from "../src/backend/main.mjs";

await startWebApplication(runtimeDependencies);
