// Mobile navigation
const navToggler = document.getElementById("nav-toggler");
const nav = document.getElementById("mobile-nav");
const header = document.getElementById("header");
let animation = false;

navToggler.addEventListener("click", () => {
    if (animation) return;
    animation = true;
    header.classList.toggle("open");
    setTimeout(() => {
        animation = false;
    }, 300);
});

// Desktop navigation

function onScroll(e) {
    const scrollPos = e.target.scrollingElement.scrollTop;
    navItems.forEach(navItem => {
        const refElement = document.getElementById(navItem.getAttribute("href").replace("#", ""));
        if (refElement.offsetTop <= scrollPos && refElement.scrollHeight + refElement.offsetTop > scrollPos) {
            navItem.classList.add("selected");
        } else {
            navItem.classList.remove("selected");
        }
    });
}

document.addEventListener("scroll", onScroll);

function scroll(offset) {
    const fixedOffset = offset.toFixed();
    const onAutoScroll = function () {
        if (window.pageYOffset.toFixed() === fixedOffset) {
            window.removeEventListener('scroll', onAutoScroll);
            document.addEventListener("scroll", onScroll);
        }
    }

    document.removeEventListener("scroll", onScroll);
    window.addEventListener('scroll', onAutoScroll);
    onAutoScroll();
    window.scrollTo({
        top: offset
    });
}

const navItems = Array.from(document.getElementsByClassName("nav-item"));
navItems.forEach(navItem => {
    navItem.addEventListener("click", (e) => {
        const refElement = document.getElementById(navItem.getAttribute("href").replace("#", ""));
        e.preventDefault();
        scroll(refElement.offsetTop);
        const prevLink = Array.from(document.getElementsByClassName("selected"));
        prevLink.forEach(anchor => {
            anchor.classList.remove("selected");
        });
        navItem.classList.add("selected");
    });
});
