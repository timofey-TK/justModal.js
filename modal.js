// get modal elements
const overlay = document.querySelector(".js-overlay-modal"),
    closeBtns = document.querySelectorAll(".js-closeBtn-modal"),
    modalLinks = document.querySelectorAll(".js-open-modal")

let animationIn, animationOut, animationDurationIn, animationDurationOut

// add function to
function closeActiveModal() {
    let activeModal = document.querySelector('.active-modal')
    animateCSS(activeModal, animationOut).then(function () {
        activeModal.classList.remove('active-modal');
        overlay.classList.remove('active-modal');
    })
}
const animateCSS = (element, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        const node = element;
        node.classList.add(`${prefix}animated`, animationName);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, { once: true });
    });


document.addEventListener('DOMContentLoaded', function () {
    // listening for click on modal-links to open modal
    modalLinks.forEach((item) => {
        item.addEventListener('click', function () {
            if (document.querySelector('.active-modal')) {
                closeActiveModal()
            }
            let modal = document.querySelector('.modal[data-modal="' + item.getAttribute("data-modal") + '"]'),
                animIn = item.getAttribute("data-animationIn"),
                animOut = item.getAttribute("data-animationOut"),
                durationIn = item.getAttribute("data-animation-durationIn"),
                durationOut = item.getAttribute("data-animation-durationOut")
            if (animIn) {
                animationIn = animIn
            }
            else {
                animationIn = "fadeIn"
            }

            if (animOut) {
                animationOut = animOut
            }
            else {
                animationOut = "fadeOut"
            }
            if (durationIn) {
                animationDurationIn = durationIn
            }
            else {
                animationDurationIn = ".3s"
            }
            if (durationOut) {
                animationDurationOut = durationOut
            }
            else {
                animationDurationOut = ".3s"
            }
            modal.classList.add('active-modal');
            overlay.classList.add('active-modal');
            modal.style.setProperty('--animate-duration', animationDurationIn);
            animateCSS(modal, animationIn).then(function () {
                modal.style.setProperty('--animate-duration', animationDurationOut);
            })
        });
    })
    // listening for click on modal-close-btns to close active modal
    closeBtns.forEach((item) => {
        item.addEventListener('click', function () {
            closeActiveModal()
        });
    })
    // listening for press Esc to close active modal
    document.body.addEventListener('keyup', function (e) {
        if (e.code == "Escape") {
            closeActiveModal()
        };
    }, false);
    // listening for click on overlay to close active modal
    overlay.addEventListener('click', function () {
        closeActiveModal()
    });
});
