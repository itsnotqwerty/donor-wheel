function changePuppy() {
  var p = document.getElementById('puppy');
  p.src = '/puppy2.jpg';
  setTimeout(() => {
    p.src = '/puppy.jpg';
  }, 500)
}

function countPet() {
  var p = document.getElementById('pet-count');
  var count = parseInt(p.innerText, 10);
  count += 1;
  p.innerText = count;
}