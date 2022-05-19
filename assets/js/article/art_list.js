$(function () {
    let layer = layui.layer
    let form = layui.form
    let laypage = layui.laypage

    // 时间格式化过滤器
    template.defaults.imports.dateFormate = function (date) {
        let dateStr = new Date(date)
        let y = dateStr.getFullYear()
        let m = padZero(dateStr.getMonth() + 1)
        let d = padZero(dateStr.getDate())
        let hh = padZero(dateStr.getHours())
        let mm = padZero(dateStr.getMinutes())
        let ss = padZero(dateStr.getSeconds())

        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }

    function padZero(n) {
        return n > 9 ? n : `0${n}`
    }



    // 插叙文章列表的接口参数
    let q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    getArtList()
    getArtCates()

    // 获取文章列表
    function getArtList() {
        $.ajax({
            type: "GET",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }
                layer.msg('获取文章列表成功')
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)

                //渲染分页
                renderPage(res.total)
            }
        });
    }

    // 获取文章分类列表
    function getArtCates() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function (res) {
                console.log(res);
                let htmlStr = template('tpl-cateList', res)
                console.log(htmlStr);
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        });
    }

    // 筛选事件监听
    $('#form-select').on('submit', function (e) {
        e.preventDefault()
        let cate_id = $('[name=cate_id]').val()
        let state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        console.log(q);
        getArtList()
    })


    // 分页
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total, // total
            limit: q.pagesize,
            curr: q.pagenum,
            limits: [2, 3, 5, 10],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function (obj, first) {
                console.log(obj.curr);
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    getArtList()
                }
            }
        });
    }

    // 从列表中删除数据
    $('tbody').on('click', '#btn-delete', function () {
        layer.confirm('确定要删除么?', { icon: 3, title: '提示' }, function (index) {
            let id = $('#btn-delete')[0].dataset.id
            console.log(id);
            let count = $('#btn-delete').length
            $.ajax({
                type: "GET",
                url: `/my/article/delete/${id}`,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败')
                    }
                    layer.msg('删除文章成功')
                    if (count === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum-1
                    }
                    getArtList()
                }
            });

            layer.close(index);
        });
    })

})