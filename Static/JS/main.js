    
    let welcomeText = document.getElementById("welcome-text");
    let text = "Hi, I am Giovanni Ciaramella";
    var i = 0;
    var speed = 70;

function typeWriter(){
    
    if(i < text.length){
        welcomeText.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }else{
        welcomeText.style.border = "none";
        setTimeout(typeWriterSubtitle, 500);
        
    }
}

    let welcomeTextSubtitle = document.getElementById("welcome-text-subtitle");
    let subText = "nice to meet you!";
    var j = 0;
    var speed = 70;

function typeWriterSubtitle(){
    if(j < text.length){
        welcomeTextSubtitle.innerHTML += subText.charAt(j);
        j++;
        setTimeout(typeWriterSubtitle, speed);
    }
}


var navBar = document.getElementById("header");
var sticky = navBar.offsetTop;

function stickyMenu(){

    if(window.pageYOffset >= sticky){
        navBar.classList.add("sticky");
    }else{
        navBar.classList.remove("sticky");
    }  

}

var showContactSection = document.getElementById("form-to-hide");
var textToChange = document.getElementById('btn-show');

function contactSection(){

    if (showContactSection.style.display === 'none'){
        showContactSection.style.display = 'block';  
        textToChange.innerHTML = "Click here to close"      
    }else{
        showContactSection.style.display = 'none';
        textToChange.innerHTML = "Click here to contact me"    
    }
}

var acc = document.getElementsByClassName("accordion");

function accordions(){
    
    var i;

    for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
        panel.style.display = "none";
        } else {
        panel.style.display = "block";
        }
    });
    }
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const elementHeight = element.offsetHeight;
    const elementWidth = element.offsetWidth;
    return (rect.top >= -elementHeight
        && rect.left >= -elementWidth
        && rect.right <= (window.innerWidth || document.documentElement.clientWidth) + elementWidth
        && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + elementHeight
    );
}
function setCookie(name, value, expireDays) {
    const d = new Date();
    d.setTime(d.getTime() + (expireDays*24*60*60*1000));

    const expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
function getCookie(name) {
    const cookieString = decodeURIComponent(document.cookie);
    const cookies = cookieString.split('; ');

    let i = 0;
    while (i < cookies.length && !cookies[i].startsWith(name+'=')) {
        i++;
    }

    if(i < cookies.length) {
        return cookies[i].substr(name.length+1);
    } else {
        return '';
    }
}

function openPopup(agreeFunction, rejectFunction) {
    document.getElementById("privacy-policy-popup").style.display = "block";

    let actions = document.getElementById("privacy-policy-popup-actions");
    if (agreeFunction && rejectFunction) {
        actions.style.display = "flex";

        document.getElementById("policy-accepted").addEventListener("click", agreeFunction);
        document.getElementById("policy-not-accepted").addEventListener("click", rejectFunction);
    } else {
        actions.style.display = "none";
    }
}
function closePopup() {
    document.getElementById("privacy-policy-popup").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {

    typeWriter();
    accordions();
    window.onscroll = stickyMenu();

    var showContactBtn = document.getElementById("show-form");
    showContactBtn.addEventListener('click', contactSection, false);

    document.getElementById("close-popup").addEventListener("click", function(event) {
        closePopup();
    });

    const cookieConsentBar = document.getElementById("cookie-consent-bar");
    const cookieAgreeContent = getCookie('cookieAgree');
    setTimeout(function() {
        if (cookieAgreeContent !== "yes") {
            cookieConsentBar.style.display = "flex";

            const cookieConsentButton = document.getElementById("cookie-consent-button");
            cookieConsentButton.addEventListener("click", function () {
                cookieConsentBar.style.display = "none";
                setCookie('cookieAgree', 'yes', 30);
            });
        }
    }, 8000);


});
