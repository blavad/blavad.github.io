module.exports = {
    publicPath: '/',
    pages: {
        "index": {
            entry: 'src/pages/Home/main.js',
            title: 'Home - David Albert',
        },
        "research": {
            entry: 'src/pages/Research/main.js',
            title: 'Research - David Albert',
        },
        // -----------------
        // --- PROJECTS
        // -----------------
        "projects": {
            entry: 'src/pages/Projects/main.js',
            title: 'Projects - David Albert',
        },
        "projects/ernest": {
            entry: 'src/pages/Projects/Ernest/main.js',
            title: 'Ernest - David Albert',
        },
        // -----------------
        "bidule": {
            entry: 'src/pages/Bidule/main.js',
            title: 'Bidule - David Albert',
        },

        "travels": {
            entry: 'src/pages/Travels/main.js',
            title: 'Travels - David Albert',
        },

    }

}