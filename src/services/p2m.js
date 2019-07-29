const CustomException = require('../utils/exception');

class P2M {
    async p2m() {
        throw new CustomException('Dock');
    }
}

module.exports = P2M;
