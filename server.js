const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const port = Number(process.env.PORT || 8000);
const mimeTypes = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".ico": "image/x-icon",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".js": "text/javascript; charset=utf-8",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".webp": "image/webp"
};

if (!Number.isInteger(port) || port < 1 || port > 65535) {
    console.error("A porta informada e invalida.");
    process.exit(1);
}

const server = http.createServer((request, response) => {
    if (request.method !== "GET" && request.method !== "HEAD") {
        response.writeHead(405, { Allow: "GET, HEAD" });
        response.end("Method not allowed");
        return;
    }

    let pathname;
    try {
        pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    } catch (error) {
        response.writeHead(400);
        response.end("Bad request");
        return;
    }

    const segments = pathname.split(/[\\/]+/).filter(Boolean);
    if (segments.some(segment => segment.startsWith("."))) {
        response.writeHead(404);
        response.end("Not found");
        return;
    }

    const filePath = path.resolve(root, `.${pathname}`);
    const relativePath = path.relative(root, filePath);
    if (relativePath === ".." || relativePath.startsWith(`..${path.sep}`) || path.isAbsolute(relativePath)) {
        response.writeHead(404);
        response.end("Not found");
        return;
    }

    fs.stat(filePath, (statError, stats) => {
        if (statError || (!stats.isFile() && !stats.isDirectory())) {
            response.writeHead(404);
            response.end("Not found");
            return;
        }

        const target = stats.isDirectory() ? path.join(filePath, "index.html") : filePath;
        fs.readFile(target, (readError, content) => {
            if (readError) {
                response.writeHead(404);
                response.end("Not found");
                return;
            }

            response.writeHead(200, {
                "Cache-Control": "no-store",
                "Content-Length": content.length,
                "Content-Type": mimeTypes[path.extname(target).toLowerCase()] || "application/octet-stream"
            });
            response.end(request.method === "HEAD" ? undefined : content);
        });
    });
});

server.on("error", error => {
    console.error(`Nao foi possivel iniciar o servidor: ${error.message}`);
    process.exitCode = 1;
});

server.listen(port, "0.0.0.0", () => {
    console.log(`LifeHub disponivel na porta ${port}. Use Ctrl+C para encerrar.`);
});
