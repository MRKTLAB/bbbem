const techs = {
    fileProvider: require('enb/techs/file-provider'),
    borschik: require('enb-borschik/techs/borschik'),
    borschikJsIncludeTech: require('enb-borschik/techs/js-borschik-include'),
    js: require('enb-js/techs/browser-js'),
    css: require('enb-stylus/techs/stylus'),
}

const enbBemTechs = require('enb-bem-techs');

module.exports = function(config) {
    config.node('desktop.bundles/common');
    config.node('desktop.bundles/index');
    config.node('desktop.bundles/index-bem');

    const isProd = process.env.YENV === 'production';

    config.nodes('*.bundles/*', function (nodeConfig) {
        nodeConfig.addTechs([
            [techs.fileProvider, { target: '?.bemdecl.js' }],
            [enbBemTechs.levels, { levels: getLevels(config) }],
            [enbBemTechs.depsOld],
            [enbBemTechs.files],

            [techs.borschikJsIncludeTech, { target: '?.pre.js' }],
            [techs.css, { target: '?.pre.css' }],

            [techs.borschik, { source: '?.pre.js', target: '?.min.js', minify: isProd }],
            [techs.borschik, { source: '?.pre.css', target: '?.min.css', minify: isProd }]
        ]);

        nodeConfig.addTargets(['?.min.css', '?.min.js']);
    });
};

function getLevels(config) {
    return [
        'node_modules/bem-bl/blocks-common',
        'node_modules/bem-bl/blocks-desktop',
        'desktop.libs',
        'desktop.modules',
        'desktop.mvc',
        'desktop.blocks',
        'desktop.widgets'
    ].map(function(level) {
        return config.resolvePath(level);
    });
}
