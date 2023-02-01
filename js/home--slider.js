
let indexSlide = 0;
plusSlides(1);
async function plusSlides(num) {
  let i = 0;
  let imageSlides = document.querySelectorAll('.slides');

  await slide(0);
  await resetSlide(2);
  // await wait(4995);

  await slide(1);
  await resetSlide(0);

  // await wait(4995);
  await slide(2);
  await resetSlide(1);


  // if (indexSlide<1){
  //   ++indexSlide;
    plusSlides(1);
  // }
}

async function resetSlide(a){
  let imageSlides = document.querySelectorAll('.slides');
  for(let i = 0; i<imageSlides.length; ++i){
    if (i != a)imageSlides[i].style.zIndex = '3';
  }
  imageSlides[a].style.display = 'none';
  await visible(a);
  await wait(20);
  imageSlides[a].style.display = 'block';
  // imageSlides[a].style.zIndex = '3';
}

async function visible(b){
  let imageSlides = document.querySelectorAll('.slides')
  imageSlides[b].style.right = '-80vw';
}

async function slide(num) {
  let imageSlides = document.querySelectorAll('.slides');
  imageSlides[num].style.right = '0vw';
  await wait(5000);
  imageSlides[num].style.right = '80vw';
}


// Synchronous waiter
function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(ms)
    }, ms)
  })
}
