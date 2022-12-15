const preloader = document.querySelector('.preloader');
const preloaderText1 = document.querySelector('.preloader-text-1');
const preloaderText2 = document.querySelector('.preloader-text-2');
const preloaderText3 = document.querySelector('.preloader-text-3');
const preloaderText4 = document.querySelector('.preloader-text-4');
const whiteRabbit = document.querySelector('.img-rabbit');

const str1 = 'Wake up, Neo...';
const str2 = 'The Matrix has you...';
const str3 = 'Click on white rabbit to watch "My gitHUB Profile"...';
const str4 = 'knock knock...';

setTimeout(()=>{
    showMatrixText(str1,preloaderText1);
    setTimeout(()=>{
        showMatrixText(str2,preloaderText2);
        setTimeout(()=>{
            showMatrixText(str3,preloaderText3);
            setTimeout(()=>{
                showMatrixText(str4,preloaderText4);
                setTimeout(()=>{
                    showWhiteRabbit();
                },1500);
            },6000);
        },3000);
    },2000);
},1000);


function showWhiteRabbit(){
    whiteRabbit.style.display = 'block';
}
whiteRabbit.addEventListener('click',()=>{
    preloader.remove();
});



