//$(document).ready(function(){
//    $(".dropdown").hover(
//        function() {
//            $('.dropdown-menu', this).stop( true, true ).slideDown("slow");
//            $(this).toggleClass('open');
//        },
//        function() {
//            $('.dropdown-menu', this).stop( true, true ).slideUp("slow");
//            $(this).toggleClass('open');
//        }
//    );
//});
$(window).on('load', function() {
    console.log('%cSTOP!', 'background: #fff; color: red; font-size: 50px');
    console.log('%cMy name`s SONH. I`m a developer. I recommend you do not use F12. Your information can lost!!!', 'color: #222; font-size: 25px');
});
var $item = $('.carousel .item');
var $wHeight = $(window).height();
$item.eq(0).addClass('active');
$item.height($wHeight);
$item.addClass('full-screen');

$('.carousel img').each(function() {
    var $src = $(this).attr('src');
    var $color = $(this).attr('data-color');
    $(this).parent().css({
        'background-image': 'url(' + $src + ')',
        'background-color': $color
    });
    $(this).remove();
});

$(window).on('resize', function() {
    $wHeight = $(window).height();
    $item.height($wHeight);
});

$('.carousel').carousel({
    interval: 6000,
    pause: "false"
});

$(document).ready(() => {
        var sh_btn_add_new_brand = true;
        $(".sh_btn_add_new_brand").click(() => {
            if (sh_btn_add_new_brand) {
                $(".sh_add_new_brand").css('display', 'block')
                sh_btn_add_new_brand = false
            } else {
                $(".sh_add_new_brand").css('display', 'none')
                sh_btn_add_new_brand = true;
            }
        })
        $("#sh_input_name_brand").keyup((e) => {
            e.preventDefault()
            var str = $("#sh_input_name_brand").val();
            str = str.toLowerCase();
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            str = str.replace(/đ/g, "d");
            str = str.replace(/!|@|\$|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\'| |\"|\&|\#|\[|\]|~/g, "-");
            str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
            str = str.replace(/^\-+|\-+$/g, ""); //cắt bỏ ký tự - ở đầu và cuối chuỗi
            $("#sh_input_alias_brand").val(str)
        })
        $("#form_add_new_brand").on('submit', (function(e) {
            e.preventDefault()
            $.ajax({
                url: "./res_st.php?a=sh_add_new_brand",
                type: "POST",
                data: new FormData(this),
                contentType: false,
                cache: false,
                processData: false,
                success: ((data) => {
                    if (data != 'THAT_BAI') {
                        $("#table_list_brand").prepend(data)
                        $(".sh_add_new_brand").css('display', 'none')
                        sh_btn_add_new_brand = true;
                        $("#sh_alert_action").css("display", "block")
                        setTimeout((() => {
                            $("#sh_alert_action").css({ 'display': 'none', 'transition': 'all .3s' })
                        }), 3000)
                    }
                })
            })
        }))
        $("#sh_btn_cancel_new_brand").click((e) => {
            e.preventDefault()
            $(".sh_add_new_brand").css('display', 'none')
            sh_btn_add_new_brand = true;
        })

        var pg_brands = 1;
        $("#pg_brand_next").click((e) => {
            pg_brands = pg_brands + 1;
            e.preventDefault()
            console.log(pg_brands)
            $.get(`./res_st.php?a=sh_brands&page=${pg_brands}`, data => {
                if (data != "") {
                    $("#table_list_brand").html(data)
                } else {
                    pg_brands = pg_brands - 1;
                    $("#sh_pg_alert_action").css("display", "block")
                    setTimeout((() => {
                        $("#sh_pg_alert_action").css({ 'display': 'none', 'transition': 'all .3s' })
                    }), 3500)
                }
            })
        })
        $("#pg_brand_pre").click((e) => {
            pg_brands = pg_brands - 1;
            if (pg_brands > 0) {
                console.log(pg_brands)
                e.preventDefault()
                $.get(`./res_st.php?a=sh_brands&page=${pg_brands}`, data => {
                    if (data != "") {
                        $("#table_list_brand").html(data)
                    } else {
                        $("#sh_pg_alert_action").css("display", "block")
                        setTimeout((() => {
                            $("#sh_pg_alert_action").css({ 'display': 'none', 'transition': 'all .3s' })
                        }), 1500)
                    }
                })
            } else {
                pg_brands = 1;
                $("#sh_pg_alert_action").css("display", "block")
                setTimeout((() => {
                    $("#sh_pg_alert_action").css({ 'display': 'none', 'transition': 'all .3s' })
                }), 1500)
            }
        })

    })
    //delete multi brand
var array_id_brand = []

function DeleteBrandId(id) {
    console.log(id)
    var text_id_brand = "";
    if (document.getElementById('brand_' + id).checked == true) {
        array_id_brand.push(id)
        for (var i = 0; i < array_id_brand.length; i++) {
            text_id_brand = text_id_brand + array_id_brand[i] + ","
        }
    } else {
        if (document.getElementById('brand_' + id).checked == false) {
            for (var i = 0; i < array_id_brand.length; i++) {
                if (array_id_brand[i] == id) {
                    for (var j = i; j < array_id_brand.length; j++) {
                        array_id_brand[j] = array_id_brand[j + 1]
                    }
                }
            }
            text_id_brand = "";
            array_id_brand.length--;
            for (var i = 0; i < array_id_brand.length; i++) {
                text_id_brand = text_id_brand + array_id_brand[i] + ","
            }
        }
    }
    document.getElementById('sh_delete_brand').value = text_id_brand.substr(0, (text_id_brand.length - 1))
}

var trang = 1;

function Load_More_Prd(alias = "", choose1 = "", choose2 = "", choose3 = "") {
    var alias_prd = alias
    var price = choose1
    var sex = choose2
    trang = trang + 1;
    $('.pulse').css("display", "flex")
    $('.container').css("opacity", ".4")
    $.get(`./res_st.php?a=load_more_prds&page=${trang}`, {
        alias_prd: alias_prd,
        price_prd: price,
        sex_prd: sex,
        custom_smart_filter: choose3

    }, data => {
        if (data != "") {
            setTimeout((() => {
                $('.pulse').css("display", "none")
                $('.container').css("opacity", "1")
                $(".list-products").append(data)
                console.log(data)
            }), 2000)
        } else {
            setTimeout((() => {
                $('.pulse').css("display", "none")
                $('.container').css("opacity", "1")
            }), 3000)
        }
    })
}
$(document).ready(() => {
    $(".btn_close").click(() => {
        console.log("OK")
    })
})

//xu lý action input on search bar
var code_search_product = ""
$(window).on('load', function() {
    code_search_product = $("#box_filter_search_prd").val()
});
$(document).ready(() => {
    var value_search = "";
    $("#box_filter_search_prd").click(() => {
        value_search = $("#check_input-search_bar").val()
        code_search_product = $("#box_filter_search_prd").val()
        $("#search_bar").attr('action', './tim-kiem/' + code_search_product + '/' + value_search)
    })
    $("#search_bar").keyup(function(e) {
        e.preventDefault()
        value_search = $("#check_input-search_bar").val()
        console.log(value_search)
        $("#search_bar").attr('action', './tim-kiem/' + code_search_product + '/' + value_search)
    })
})

//hien an form lien he
$(document).ready(() => {
        var checkShowHiddenFormContact = false;
        $("#add_call_me").click(() => {
                if (checkShowHiddenFormContact == false) {
                    $(".form_content_contact_me").css("display", "block")
                    $("#add_call_me").css({ "font-size": "12px", "background": "var(--second-color)" })
                    $("#add_call_me").html("ĐÓNG LIÊN HỆ")
                    checkShowHiddenFormContact = true
                } else {
                    $(".form_content_contact_me").css("display", "none")
                    $("#add_call_me").html("LIÊN HỆ")
                    $("#add_call_me").css({ "font-size": "12px", "background": "var(--primary-color)" })
                    checkShowHiddenFormContact = false
                }
            })
            /***help***/
        $("#form_submit_contact_info").on('submit', (function(e) {
            e.preventDefault()
            $.ajax({
                url: "./res_st.php?a=add_to_contact",
                type: "POST",
                data: new FormData(this),
                contentType: false,
                cache: false,
                processData: false,
                success: ((data) => {
                    if (data != 'NOT') {
                        $(".form_content_contact_me").css("display", "none")
                        $("#add_call_me").html("LIÊN HỆ")
                        $("#your_name_contact").val('')
                        $("#your_email_phone_contact").val('')
                        $("#add_call_me").css({ "font-size": "12px", "background": "var(--primary-color)" })
                        $('.toast').addClass('on');
                        setTimeout(function(next) {
                            $('.toast').removeClass('on')
                        }, 2500);
                        checkShowHiddenFormContact = false
                    }
                })
            })
        }))
    })
    //make fixed menu
$(document).on('scroll', function() {
        const heightWindows = 5
        const currentHeightWindows = $(window).scrollTop()
        const screen_window = $(window).width();
        if (screen_window > 769) {
            if (currentHeightWindows > heightWindows) {
                $(".content_top_main_menu").removeClass("menu_normal_mobile_top")
                $(".content_top_main_menu").removeClass("menu_static_top")
                $(".content_top_main_menu").addClass("menu_fixed_top")
            } else {
                $(".content_top_main_menu").removeClass("menu_normal_mobile_top")
                $(".content_top_main_menu").removeClass("menu_fixed_top")
                $(".content_top_main_menu").addClass("menu_static_top")
            }
        } else {
            if (screen_window < 769) {
                $(".content_top_main_menu").removeClass("menu_static_top")
                $(".content_top_main_menu").removeClass("menu_fixed_top")
                $(".content_top_main_menu").addClass("menu_normal_mobile_top")
            }
        }
    })
    //res main menu

$(window).on("load", function() {
    var Button_OnOff = false
    var screen_window = $(window).width()
    if (screen_window <= 768) {
        $(".content_top_main_menu").css("display", "none")
        $(".content_top_main_menu").animate({
            width: '0'
        }, 250);
        $(".menu_collapse").click(function() {
            console.log("status" + Button_OnOff)
            if (screen_window <= 768) {
                if (Button_OnOff === false) {
                    $(".content_top_main_menu").css({
                        "display": "block"
                    })
                    $(".content_top_main_menu").animate({
                        width: '60%'
                    }, 200);
                    Button_OnOff = true
                } else {
                    if (Button_OnOff === true) {
                        $(".content_top_main_menu").css({
                            "display": "none",
                        })
                        $(".content_top_main_menu").animate({
                            width: '0%'
                        }, 200);
                        Button_OnOff = false
                    }
                }
            }
        })
        $(document).click(function(e) {
            $(".content_top_main_menu").css({
                "display": "none",
            })
            $(".content_top_main_menu").animate({
                width: '0%'
            }, 200);
        })
        $(".menu_collapse").click(function(e) {
            e.stopPropagation()
        })
    } else {
        if (screen_window > 768) {
            $(".content_top_main_menu").css({
                    "display": "block"
                })
                //             $(".content_top_main_menu").animate({
                //                 width: '100%'
                //             }, 200);
            Button_OnOff = true
        }
    }
})
$(window).resize(function() {
    var Button_OnOff = false
    var screen_window = $(window).width()
    if (screen_window > 768) {
        console.log("lon hon 768")
        $(".content_top_main_menu").css({
            "display": "block"
        })
        $(".content_top_main_menu").animate({
            width: '100%'
        }, 200);
    } else {
        if (screen_window <= 768) {
            console.log("be hon 768")
            $(".content_top_main_menu").css("display", "none")
            $(".content_top_main_menu").animate({
                width: '0'
            }, 250);
            $(".menu_collapse").click(function() {
                console.log("status" + Button_OnOff)
                if (screen_window <= 768) {
                    if (Button_OnOff === false) {
                        $(".content_top_main_menu").css({
                            "display": "block"
                        })
                        $(".content_top_main_menu").animate({
                            width: '60%'
                        }, 200);
                        Button_OnOff = true
                    } else {
                        if (Button_OnOff === true) {
                            $(".content_top_main_menu").css({
                                "display": "none",
                            })
                            $(".content_top_main_menu").animate({
                                width: '0%'
                            }, 200);
                            Button_OnOff = false
                        }
                    }
                }
            })
        }
    }
})
$(document).ready(() => {
        var pg_order = 1; //trang dau la bang 1, la da load roi
        $("#sh_load_more_order_next").click((e) => {
            e.preventDefault()
            pg_order = pg_order + 1
            $.get(`./res_st.php?a=load_more_order&page=${pg_order}`, data => {
                if (data != "") {
                    var show = `<tr class="sh_border_table" width="100%">
                                        <td width="5%" class="text-center">#</td>
                                        <td width="45%">Khách hàng</td>
                                        <td width="35%">Giá tiền</td>
                                        <td width="15%">Tình trạng</td>
                                    </tr>` + data
                    $('.sh_table_list_order').html(show)
                } else {
                    pg_order = pg_order - 1;
                }
            })
        })
        $("#sh_load_more_order_pre").click((e) => {
            e.preventDefault()
            pg_order = pg_order - 1
            if (pg_order > 0) {
                $.get(`./res_st.php?a=load_more_order&page=${pg_order}`, data => {
                    var show = `<tr class="sh_border_table" width="100%">
                                                <td width="5%" class="text-center">#</td>
                                                <td width="45%">Khách hàng</td>
                                                <td width="35%">Giá tiền</td>
                                                <td width="15%">Tình trạng</td>
                                            </tr>` + data
                    $('.sh_table_list_order').html(show)
                })
            } else {
                pg_order = 1;
            }
        })
    })
    //xu ly sale trong them san pham
$(document).ready(() => {
    $("#sh_sale_prd").keyup(() => {
        var price_of_sale = $("#sh_price_prd").val() - (($("#sh_price_prd").val() * $("#sh_sale_prd").val()) / 100)
        $("#price_of_sale").val(new Intl.NumberFormat().format(price_of_sale))
    })
})

//xoa loc san pham trong trang admin
function Sh_Exit_Filtter_Prd() {
    var current_link = window.location.href.split("&")[0]
    window.location = current_link;
}

$(document).ready(() => {
    var status_modal = false
    $(".disable_btn").click(() => {
        if (status_modal) {
            $(".analog_modal_content").show()
            $(".analog_modal").show()
            status_modal = true
        } else {
            $(".analog_modal_content").hide()
            $(".analog_modal").hide()
            $(".analog_modal").css({
                "width": '',
                "height": ''
            })
            status_modal = false
        }
    })
    $("#large_img_prd_1").click(() => {
        if (status_modal) {
            $(".analog_modal_content").hide()
            $(".analog_modal").hide()
            $(".analog_modal").css({
                "width": '',
                "height": ''
            })
            status_modal = true
        } else {
            $(".analog_modal_content").show()
            $(".analog_modal").show()
            var src = $("#large_img_prd_1").prop('src')

            $(".analog_modal").css({
                "width": ($("#large_img_prd_1").width()) * 1.2,
                "height": ($("#large_img_prd_1").height()) * 1.2
            })
            $(".modal_img").attr('src', src)
            status_modal = false
        }
    })

})