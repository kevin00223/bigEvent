$(function () {
    $('#link-reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    });

    $('#link-login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
})