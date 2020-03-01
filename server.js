var cfg = require("./server.cfg");
var server = require("./src/backend/routes")();

server.listen(cfg.port, cfg.address, function () {
    console.log('Server listening on: ' + cfg.address + ":" + cfg.port + "!");
});
