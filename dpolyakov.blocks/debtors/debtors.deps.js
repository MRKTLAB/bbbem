([
    {
        tech: 'js',
        mustDeps: {block: 'i-bem', elems: 'html'}
    },
    {
        mustDeps: [
            {
                block: 'i-bem',
                elems: {
                    elem: 'dom',
                    mods: {
                        init: 'auto'
                    }
                }
            },
            {
                block: 'debtors-model'
            }
        ]
    },
    {
        shouldDeps: [
            {
                block: 'underscore'
            },
            {
                block: 'debtors-list'
            },
            {
                block: 'debtors-total'
            }
        ]
    }
])
