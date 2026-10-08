import http from "http";
import https from "https";
import url from "url";
import { logger } from "./logger-service";

const CLIENT_ID = "26014";
const CLIENT_SECRET = "XPbozfRNSyo72orH";
const LOCAL_PORT = 32845;
const REDIRECT_URI = `http://localhost:${LOCAL_PORT}/callback`;

class LocalAuthServer {
    #server;
    #onTokenReceived;

    constructor() {
        this.#server = null;
        this.#onTokenReceived = null;
    }

    start(onTokenReceived) {
        this.#onTokenReceived = onTokenReceived;
        if (this.#server) {
            try { this.#server.close(); } catch (e) {}
        }

        this.#server = http.createServer((req, res) => {
            const reqUrl = url.parse(req.url, true);
            if (reqUrl.pathname === "/callback") {
                const authCode = reqUrl.query.code;
                const error = reqUrl.query.error_description || reqUrl.query.error;

                if (error) {
                    res.writeHead(400, { "Content-Type": "text/html" });
                    res.end(`<html><body style="font-family:sans-serif;padding:20px;text-align:center;"><h2>Authentication Error</h2><p>${error}</p></body></html>`);
                    return;
                }

                if (authCode) {
                    // Exchange code for token
                    this.#exchangeCodeForToken(authCode).then((tokenData) => {
                        res.writeHead(200, { "Content-Type": "text/html" });
                        res.end(`<html><body style="font-family:sans-serif;padding:40px;text-align:center;color:#2e7d32;">
                            <h2>✓ Mendeley Connected Successfully!</h2>
                            <p style="color:#555;">You can close this tab and return to ONLYOFFICE Desktop.</p>
                            <script>setTimeout(() => window.close(), 1500);</script>
                        </body></html>`);
                        if (this.#onTokenReceived && tokenData.access_token) {
                            this.#onTokenReceived(tokenData.access_token);
                        }
                        this.stop();
                    }).catch((err) => {
                        res.writeHead(500, { "Content-Type": "text/html" });
                        res.end(`<html><body style="font-family:sans-serif;padding:20px;text-align:center;"><h2>Token Exchange Failed</h2><p>${err.message}</p></body></html>`);
                    });
                }
            }
        });

        this.#server.listen(LOCAL_PORT, "127.0.0.1", () => {
            logger.info("AUTH_SERVER_STARTED", { port: LOCAL_PORT });
        });
    }

    stop() {
        if (this.#server) {
            try {
                this.#server.close();
                this.#server = null;
                logger.info("AUTH_SERVER_STOPPED", {});
            } catch (e) {}
        }
    }

    #exchangeCodeForToken(code) {
        return new Promise((resolve, reject) => {
            const postData = new URLSearchParams({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: REDIRECT_URI
            }).toString();

            const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

            const req = https.request({
                hostname: "api.mendeley.com",
                path: "/oauth/token",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Content-Length": Buffer.byteLength(postData),
                    "Authorization": `Basic ${basicAuth}`
                }
            }, (res) => {
                let body = "";
                res.on("data", chunk => body += chunk);
                res.on("end", () => {
                    try {
                        const parsed = JSON.parse(body);
                        if (parsed.access_token) {
                            resolve(parsed);
                        } else {
                            reject(new Error(parsed.message || "Failed to get access token"));
                        }
                    } catch (e) {
                        reject(new Error("Invalid response from Mendeley server"));
                    }
                });
            });

            req.on("error", reject);
            req.write(postData);
            req.end();
        });
    }
}

export const localAuthServer = new LocalAuthServer();
export { LocalAuthServer, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI };
