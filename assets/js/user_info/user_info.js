$(function () {
    let form = layui.form
    let layer = layui.layer

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称不能超过6个字符'
            }
        }
    })

    // 获取用户信息
    getUserInfo()

    // 重置按钮监听
    $('#reset').on('click', function (e) {
        e.preventDefault()
        getUserInfo()
    })

    // 提交按钮监听
    $('#form-userinfo').on('submit', function (e){
        e.preventDefault()
        let data = $(this).serialize()
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: data,
            success: function (res) {
                if (res.status !== 0) return layer.msg('更新用户信息失败')
                layer.msg('更新用户信息成功')
                window.parent.getUserInfo()
            }
        });
    })

    function getUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) return layer.msg('用户信息获取失败')
                // 快速给表单赋值
                form.val('form-userinfo', res.data)
            }
        });
    }

    function reset() {
        $('#nickname').val('');
        $('#email').val('')
    }
})