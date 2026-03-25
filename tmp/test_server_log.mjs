import { spawn } from 'child_process';
import fs from 'fs';

async function test() {
    const logFile = 'd:\\IIAP-REPOS\\fonoteca-landing\\tmp\\astro_log.txt';
    fs.writeFileSync(logFile, ''); // clear log

    console.log("Starting Astro dev on 127.0.0.1:4322...");
    const server = spawn('npx', ['astro', 'dev', '--port', '4322', '--host', '127.0.0.1'], {
        cwd: 'd:\\IIAP-REPOS\\fonoteca-landing',
        shell: true
    });

    server.stdout.on('data', (data) => {
        fs.appendFileSync(logFile, data.toString());
    });

    server.stderr.on('data', (data) => {
        fs.appendFileSync(logFile, data.toString());
    });

    // Wait 15 seconds for server to fully boot
    await new Promise(resolve => setTimeout(resolve, 15000));

    console.log("Curling http://127.0.0.1:4322/es/species ...");
    try {
        const res = await fetch('http://127.0.0.1:4322/es/species');
        const text = await res.text();
        console.log("Curl loaded HTML successfully.");
    } catch (e) {
        console.error("Curl failed:", e);
    }

    server.kill();

    const logContent = fs.readFileSync(logFile, 'utf8');
    console.log("\n--- Astro Server Logs ---");
    console.log(logContent);
}

test();
