$(function () {
    let layer = layui.layer
    let form = layui.form

    getArticleCates()

    function getArticleCates() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        });
    }

    let indexAdd = null
    $('#add_cate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-form').html()
          });    
    })

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        console.log($(this).serialize());
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('添加分类失败')
                }
                layer.msg('添加分类成功')
                getArticleCates()
                layer.close(indexAdd)
            }
        });
    })

    // 编辑按钮绑定点击事件
    let indexEdit
    $('tbody').on('click', '#btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '编辑文章分类',
            area: ['500px', '250px'],
            content: $('#edit-form').html()
        });
        console.log(this.dataset.id);
        $.ajax({
            type: "GET",
            url: `/my/article/cates/${this.dataset.id}`,
            success: function (res) {
                form.val('edit-form', res.data)
            }
        });
    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败')
                }
                layer.msg('更新分类数据成功')
                layer.close(indexEdit)
                getArticleCates()
            }
        });
    })

    $('tbody').on('click', '#btn-delete', function () {
        let id = this.dataset.id
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            
            $.ajax({
                type: "GET",
                url: `/my/article/deletecate/${id}`,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章分类失败')
                    }
                    layer.msg('删除文章分类成功')
                    layer.close(index);
                    getArticleCates()
                }
            });
          });
        
    })

})