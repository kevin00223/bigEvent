$(function () {

    let layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)



    $('#uploadBtn').on('click', function () {
        $('#file').click()
    })

    $('#file').on('change', function (e) {
        console.log(e);
        let fileList = e.target.files
        if (fileList.length === 0) {
            return layer.msg('请选择图片')
        }
        let imageURL = URL.createObjectURL(fileList[0])

        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', imageURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域s
    })

    $('#confirmBtn').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        
        $.ajax({
            type: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('更换图片失败')
                }
                window.parent.getUserInfo()
            }
        });
    })
})