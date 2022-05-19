$(function () {

    let layer = layui.layer
    let form = layui.form

    getArtCates()
    // 初始化富文本编辑器
    initEditor()

    // 获取文章类别
    function getArtCates() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章类别失败')
                }
                console.log(res);
                let htmlStr = template('tpl-cates', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        });
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    let imageURL = ''
    $image.cropper(options)

    // 选择封面按钮监听
    $('#btn-cover').on('click', function () {
        $('#hidden-file').click()
    })

    // 选择文件监听
    $('#hidden-file').on('change', function (e) {
        let files = e.target.files
        if (files.length === 0) return
        var file = files[0]     // 重新初始化裁剪区域
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })


    let art_state = '已发布'
    // 存为草稿按钮监听
    $('#btn-save').on('click', function () {
        art_state = '草稿'
    })

    // 表单提交事件
    $('#pub-form').on('submit', function (e) {
        e.preventDefault()
        let fd = new FormData($(this)[0])
        fd.append('state', art_state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)

                // fd.forEach(function (v, k) {
                //     console.log(`${v} - ${k}`);
                // })

                publishArticle(fd)
            })
    })

    // 发布文章的请求
    function publishArticle(fd) {
        $.ajax({
            type: "POST",
            url: "/my/article/add",
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                console.log(`---${res}`);
                if(res.status !== 0) {
                    return layer.msg('发布文章失败')
                }
                layer.msg('发布文章成功')
                location.href = './art_list.html'
            }
        });
    }
})