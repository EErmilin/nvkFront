document.addEventListener('DOMContentLoaded', function() {

    //Размытие подложки в ленте.

    var blocks_feeds = document.querySelectorAll('.feed-item__img');
    blocks_feeds.forEach(function(block_feed) {
        var img = block_feed.querySelector('img');
        var imgUrl = img.getAttribute('src');
        var overlay = document.createElement('div');
        var distanceFromLeft = img.offsetLeft;
        var counter_element = block_feed.querySelector('.feed-img__counter');
        if (img.width < img.height) {
            overlay.style.position = 'absolute';
            overlay.style.top = '-8px';
            overlay.style.left = '-8px';
            overlay.style.width = 'calc(100% + 16px)';
            overlay.style.height = 'calc(100% + 16px)';
            overlay.style.backgroundImage = 'url(' + imgUrl + ')';
            overlay.style.filter = 'blur(8px)';
            block_feed.appendChild(overlay);
            img.parentElement.classList.add("vertical-orientation");
            counter_element.style.left = distanceFromLeft + 25 + 'px';
        }else{
            img.parentElement.classList.add("horizontal-orientation");
        }
    });

});