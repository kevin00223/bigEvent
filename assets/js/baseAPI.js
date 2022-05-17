
$.ajaxPrefilter(function (options) {
    // 之前: /api/login
    options.url = `http://www.liulongbin.top:3007${options.url}`
    // options.url = `http://api-breakingnews-web.itheima.net${options.url}`
    // 之后: http://www.liulongbin.top:3007/api/login

    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    options.complete = function (res) {
        console.log(res.responseJSON);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = './login.html'
        }
    }
})



