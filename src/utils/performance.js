
let timeStart = 0;
let titleGlobal = '';

export const performanceStart = title => {
  timeStart = performance.now();
  titleGlobal = title;
}


export const performanceEnd = () => {
  let timeEnd = performance.now();

  console.log(``);
  console.log(`---Perf of ${titleGlobal} ----`);
  console.log(`--- Duration : ${Math.round((timeEnd - timeStart)*100)/100} milisecond `);
  console.log(`--- end ----`);

  timeStart = 0;
  titleGlobal = '';

}