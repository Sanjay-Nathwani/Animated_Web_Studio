function init(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}

init();

var crsr = document.querySelector(".cursor")
var main = document.querySelector(".main")

document.addEventListener("mousemove" , function(dets){
    crsr.classList.add("cursor")
    crsr.style.left = dets.x + 10 + "px"
    crsr.style.top = dets.y + 10 + "px"
})

document.addEventListener("mouseover", function(e){
    if(e.target.matches(".page1-video")){
        crsr.classList.add("video-hovering");
        
    }
    else{
        crsr.classList.remove("video-hovering");
        crsr.innerHTML = ``
    }
})

var tl = gsap.timeline({
    scrollTrigger : {
        trigger: ".page1 h1",
        scroller: ".main",
        start: "top 27%",
        end: "top 0",
        scrub: 2.5
    }
})

tl.to(".page1 h1",{
    x: -110,
},"anim")

tl.to(".page1 h2" , {
    x : 110,
},"anim")

tl.to(".page1 video" ,{
    width : "90%",
},"anim")


var tl2 = gsap.timeline({
    scrollTrigger : {
        trigger: ".page1 h1",
        scroller: ".main",
        start: "top -95%",
        end: "top -120%",
        scrub: 2.5
    }
})

tl2.to(".main",{
    backgroundColor : "white"
})

var tl3 = gsap.timeline({
    scrollTrigger : {
        trigger: ".page1 h1",
        scroller: ".main",
        start: "top -510%",
        end: "top -530%",
        scrub: 2.5
    }
})

tl3.to(".main",{
    backgroundColor:"#0f0d0d",
})

var boxes = document.querySelectorAll(".box")

boxes.forEach(function(elem){
    elem.addEventListener("mouseenter", function(){
        var att = elem.getAttribute("data-image")
        crsr.style.width = "400px"
        crsr.style.height = "320px"
        crsr.style.borderRadius = "0"
        crsr.style.backgroundImage = `url(${att})`
    })

    elem.addEventListener("mouseleave", function(){
        elem.style.backgroundColor = "transperent"
        crsr.style.width = "20px"
        crsr.style.height = "20px"
        crsr.style.borderRadius = "50%"
        crsr.style.backgroundImage = `none`
    })
})

var h4 = document.querySelectorAll(".heading-pages")
var purple = document.querySelector("#purple")

h4.forEach(function(elem){
    elem.addEventListener("mouseenter" , function(){
        purple.style.display = "block"
        purple.style.opacity = "1"
    })

    elem.addEventListener("mouseleave" , function(){
        purple.style.display = "none"
        purple.style.opacity = "0"
    })
})