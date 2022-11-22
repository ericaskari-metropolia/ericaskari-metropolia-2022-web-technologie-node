const pug = require('pug');
const { resolve } = require('path');

module.exports = function renderWelcomePage({ name }) {
    const compiledFunction = pug.compileFile(
        resolve(__dirname, 'welcome.pug'),
        {}
    );

    return compiledFunction({
        name
    });
};
