// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(S) {
    // write your code in JavaScript (Node.js 8.9.4)
    //console.log(S);
    if(S.length>0){
    let letters = S.split("");
     var newarray = letters.map((letter)=>{
         return letter.toLowerCase();
     })
     var narr = letters.map((letter)=>{
         return letter.toLowerCase();
     })
     var letterscount = [];
    newarray.forEach((letter,index)=>{
        let n = newarray;
        n[index] = '';
        let find = n.indexOf(letter);
        if(find>-1){
            if(letterscount.indexOf(letter)<0){
                letterscount.push(letter);
            }
        }
    })
    if(letterscount.length<1){
        return 'NO';
    }
    else {
    const nletters = letters.map((letter)=>{
        if(letterscount.indexOf(letter)>-1){
            return letter;
        }
        else {
            return '';
        }
    })
      const all =  narr.map((letter)=>{
        if(letterscount.indexOf(letter)>-1){
            return letter;
        }
        else {
            return '';
        }
    })
        const rep = []; //repeated upper and lower case letters
        all.forEach((letter,index)=>{
            if(letter!='')  {
                let let2 = nletters[index];
                if(letter!=let2){
                    rep.push(letter);
                }
            }
        })
        if(rep.length<1){
            return 'NO';
        }
        else {
            var alphabets = 'abcdefghijklmnopqrstuvxyz';
            var founds = [];
            rep.forEach((letter,index)=>{
                var f = alphabets.indexOf(letter);
                founds.push(f);
            })
            var highest  = Math.max(...founds);
            var f = founds.indexOf(highest);
            return rep[f].toUpperCase();
        }
    }
    }
    else {
        return "NO";
    }