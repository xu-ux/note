const gitalk = new Gitalk({
    clientID: '78e34bb02c5fb25c725a',
    clientSecret: '43de20bafaed0534c3a78435c1f5460f3848de21',
    repo: 'note',
    owner: 'xu-ux',
    admin: ['xu-ux'],
    title: 'comment-'+location.pathname,
    id: md5(location.pathname),
    // facebook-like distraction free mode
    distractionFreeMode: false
})