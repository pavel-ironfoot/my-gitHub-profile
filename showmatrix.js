function showMatrixText(str,doc){
    const arr = str.split('')
    let i = 0;
    let text1 = ''
    let str1Print = setInterval(() => { 
        text1 += arr[i];
        doc.innerHTML = text1;
        i++;
        if(i===arr.length) clearInterval(str1Print);
    }, 100);
}
