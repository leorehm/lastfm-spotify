var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/leorehm/lastfm-spotify', // Update to point to your repository  
        user: {
            name: 'Leo Rehm', // update to use your name
            email: 'leorehm99@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)