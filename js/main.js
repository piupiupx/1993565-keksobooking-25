function getRandom(min, max) {
     if (min > 0 && max >0) {
      if (min > max) {
      c = max;
      max = min;
      min = c; }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
  return "Числа должны быть натуральными";

}

function getDot(min, max) {
     if (min > 0 && max >0) {
      if (min > max) {
      c = max;
      max = min;
      min = c; }
  return (Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
  return "Числа должны быть натуральными";

}
