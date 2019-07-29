require('chai').should();
const CustomExpection = require('../exceptions/customException');

const Validate = require('../utils/validate');

describe('Testando o modulo de validações', () => {
    describe('Testando a validação do token', () => {
        it('Precisa lançar \'Token not informed\' quando o token for undefined', () => {
            () => Validate.token(undefined).should.throw(CustomExpection).with.property('msg', 'Token not informed');
        });

        it('Precisa lançar \'Token can`t be blank\' quando o token não for passado', () => {
            () => Validate.token().should.throw(CustomExpection).with.property('msg', 'Token can`t be blank');
        });

        it('Precisa lançar \'Token can`t be blank\' quando o token não for passado em branco', () => {
            () => Validate.token('').should.throw(CustomExpection).with.property('msg', 'Token can`t be blank');
        });
    });
});
