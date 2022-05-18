$(function () {
    let form = layui.form
    let layer = layui.layer
    
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        newpwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能一致'
            }
        },
        repwd: function (value) {
            let pwd = $('[name=newPwd]').val()
            if (pwd !== value) {
                return '两次密码输入不一致'
            }
        }
    })

    // $('#resetBtn').on('click', function () {
    //     form.val('resetFilter', {
    //         'pwd': '',
    //         'newpwd': '',
    //         'repwd': ''
    //     })
    // })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        let data = $(this).serialize()
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新密码失败')
                }
                layer.msg('更新密码成功')
                // $('#resetBtn').click()
                $('.layui-form')[0].reset()
            }
        });
        
    })
})