$(function () {

    // 登录注册模块切换
    $('#link-reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    });

    $('#link-login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    let layer = layui.layer
    // 表单校验
    let form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value, item) {
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码输入不一致'
            }

        }
    })

    // 注册表单提交
    $('#form-reg').on('submit', function (e) {
        e.preventDefault()
        let data = {
            username: $('.reg-box [name=username]').val(),
            password: $('.reg-box [name=password]').val()
        }
        $.post("/api/reguser",
            data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功')
                $('#link-login').click()
            }
        );
    })

    // 登录表单提交
    $('#form-login').on('submit', function (e) {
        console.log(e);
        e.preventDefault()
        let data = $(this).serialize()
        $.post("/api/login", data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                localStorage.setItem('token', res.token)
                layer.msg('登录成功')
                location.href = './index.html'
            }
        );
    })
})