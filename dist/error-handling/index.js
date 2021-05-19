"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app) => {
    app.use((req, res) => {
        res.status(404).json({ errorMessage: 'This route does not exist' });
    });
    app.use((err, req, res) => {
        console.error('ERROR', req.method, req.path, err);
        if (!res.headersSent) {
            res.status(500).json({
                errorMessage: 'Internal server error. Check the server console',
            });
        }
    });
};
//# sourceMappingURL=index.js.map