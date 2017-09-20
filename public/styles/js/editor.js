$(document).ready(() => {
    var val_textera = $('.sh_more_info_prd').val()
    $('.tag_b').click(() => {
        val_textera = val_textera + "<b></b>"
        $('.sh_more_info_prd').append(val_textera, 'a')
    })
    $('.tag_u').click(() => {
        val_textera = val_textera + "<u></u>"
        $('.sh_more_info_prd').append(val_textera)
    })
})