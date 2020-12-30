const hoverImg = () => {
  const img = document.querySelectorAll('.command__photo');
  img.forEach(item => {
    const source = item.getAttribute('src');
    item.addEventListener('mouseover', e => {
      e.target.src = e.target.dataset.img;
    });
    item.addEventListener('mouseout', e => {
      e.target.src = source;
    });
  });
};

export default hoverImg;
