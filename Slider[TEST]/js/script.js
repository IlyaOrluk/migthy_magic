let slider = document.querySelectorAll('.slider'),
    slide = document.querySelectorAll('.slide'),
    prevSlide = document.querySelectorAll('.change-slide')[0],
    nextSlide = document.querySelectorAll('.change-slide')[1],
    dot = document.querySelectorAll('.dot');

    let showSlide = 1,

        show = () => {
            slide.forEach((item) => item.style.display = 'none');
            slide[showSlide-1].style.display = 'flex';
            dot.forEach((item) => item.classList.remove('selected'));
            dot[showSlide-1].classList.add('selected');
        };
        show();
    
        dot.forEach((item,i) => item.addEventListener('click', () =>{
            showSlide = (i+1);
            show();
        }));
    


    nextSlide.addEventListener('click', () => {
        if(showSlide === 4){
            showSlide = 1;
            show();
        } else {
            showSlide += 1;
            show();
        }
    });

    prevSlide.addEventListener('click', () => {
        if(showSlide === 1){
            showSlide = 4;
            show();
        } else {
            showSlide -= 1;
            show();
        }
    });

