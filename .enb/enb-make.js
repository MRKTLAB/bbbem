module.exports = function(config) {
    config.node('desktop.bundles/common');
    config.node('desktop.bundles/index');

    config.nodeMask(/desktop\.bundles\/.*/, function(nodeConfig) {
        nodeConfig.addTechs([
            new (require('enb/techs/file-provider'))({ target: '?.bemdecl.js' }),
            new (require('enb/techs/levels'))({ levels: getLevels(config) }),
            new (require('enb/techs/deps-old'))(),
            new (require('enb/techs/files'))(),
            new (require('enb/techs/js'))({ target: '?.pre.js' }),
            new (require('enb/techs/css'))(),
            new (require('enb-xjst/techs/bemhtml'))({ target: '?.bemhtml.js', devMode: false}),
            new (require('enb/techs/file-merge'))({sources: ['?.pre.js', '?.bemhtml.js'], target: '?.js'})
        ]);

        nodeConfig.addTargets([
            '?.js', '_?.js', '?.css', '_?.css'
        ]);
    });

    config.mode('development', function() {
        config.nodeMask(/desktop\.bundles\/.*/, function(nodeConfig) {
            nodeConfig.addTechs([
                new (require('enb/techs/js-expand-includes'))({ sourceTarget: '?.js', destTarget: '_?.js' }),
                new (require('enb/techs/file-copy'))({ sourceTarget: '?.css', destTarget: '_?.css' })
            ]);
        });
    });

    config.mode('production', function() {
        config.nodeMask(/desktop\.bundles\/.*/, function(nodeConfig) {
            nodeConfig.addTechs([
                new (require('enb/techs/borschik'))({ sourceTarget: '?.js', destTarget: '_?.js' }),
                new (require('enb/techs/borschik'))({ sourceTarget: '?.css', destTarget: '_?.css' })
            ]);
        });
    });
};

function getLevels(config) {
    return [
        'libs/bem-bl/blocks-common',
        'libs/bem-bl/blocks-desktop',
        'desktop.blocks',
        'desktop.modules',
        'dpolyakov.blocks'
    ].map(function(level) {
        return config.resolvePath(level);
    });
}
