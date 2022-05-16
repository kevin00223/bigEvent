
$.ajaxPrefilter(function (options) {
    // 之前: /api/login
    options.url = `http://www.liulongbin.top:3007${options.url}`
    // options.url = `http://api-breakingnews-web.itheima.net${options.url}`
    // 之后: http://www.liulongbin.top:3007/api/login
})



