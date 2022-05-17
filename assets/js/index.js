$(function () {
    getUserInfo()

    let layer = layui.layer
    // 退出按钮监听
    $('#btnLogout').on('click', function () {
        // 弹confirm框
        layer.confirm('确定要退出么?', { icon: 3, title: '提示' }, function (index) {
            // 清空本地存储的token
            localStorage.removeItem('token')
            // 返回到登录页
            location.href = './login.html'
            layer.close(index);
          });
    })
})

function getUserInfo() {
    // console.log(localStorage.getItem('token'));
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status !== 0) return layui.layer.msg('用户信息获取失败')
            renderUserInfo(res.data)
        }
    });
}

function renderUserInfo(data) {
    let name = data.nickname || data.username
    $('.welcome').html(name)

    if (data.user_pic !== null) {
        $('.layui-nav-img').attr('src', data.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.text-avatar').html(name[0].toUpperCase()).show()
    }
}



