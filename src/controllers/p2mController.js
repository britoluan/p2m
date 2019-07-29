const Exception = require('../utils/exception');
const Validate = require('../utils/validate');
const service = require('../services/p2m');

class P2MController {
    async p2m(req, res) {
        try {
            this.parametersHandler(req);
            Validate.p2mParameters(this.parameters);
            //   const service = P2MFactory.getInstance(this.parameters.qrCode)
            await service.executeP2M(this.parameters);
            this.responseSucesso();
        } catch (err) {
            Exception.check(err, res);
        }
    }

    parametersHandler(req) {
        this.parameters.qrCode = req.body.qrCode;
        this.parameters.idSourceAccount = req.body.idSourceAccount;
        this.parameters.amount = req.body.amount;
    }
}

module.exports = new P2MController();
