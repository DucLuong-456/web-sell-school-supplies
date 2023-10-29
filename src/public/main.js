const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const slides = $$('.slide_sale_main_element');
const icons = $$('.option_icon');


icons.forEach((icon, index) => {


    var slide = slides[index];
    // click icon chuyển slide
    icon.onclick = function () {
        $('.slide_sale_main_element.active_slide').classList.remove('active_slide');
        $('.option_icon.active_slide').classList.remove('active_slide');
        this.classList.add('active_slide');
        slide.classList.add('active_slide');
    }

});


// auto chuyển slide
var index = 1;
setInterval(function () {
    $('.slide_sale_main_element.active_slide').classList.remove('active_slide');
    $('.option_icon.active_slide').classList.remove('active_slide');

    var icon = icons[index]
    var slide = slides[index]
    icon.classList.add('active_slide');
    slide.classList.add('active_slide');
    index++;

    if (index > 3) {
        index = 0;
    }

}, 3000)
//chọn loại sản phẩm muốn hiển thị
const tiltleId = ['#tiltle1', '#tiltle2']
const products = [$$('#tiltle1>.product-item '), $$('#tiltle2>.product-item ')];

for (let i = 0; i < products.length; i++) {
    products[i].forEach((product, index) => {

        product.onclick = function () {

            $(`${tiltleId[i]} >.product-item.active`).classList.remove('active');
            this.classList.add('active')
        }
    })
}

// like sản phẩm
const stars = $$(".content-product-item__action")


stars.forEach((star, index) => {
    star.onclick = function (event) {
        console.log(star)
        const likes = $$(' .star');
        likes.forEach((like) => {

            like.onclick = function () {
                console.log([like])
                this.classList.toggle('like_product');
                $('.content-product-item__rating > span').innerText = `(${$$('.like_product').length})  `;
            }
        })
        event.preventDefault()
    };
})
//format gia ban
var giaban1 = document.querySelectorAll('.cost-item');
    for (var i = 0; i < giaban1.length; i++)
        giaban1[i].innerHTML = (new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(parseFloat(giaban1[i].innerHTML)));