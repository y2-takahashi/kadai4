// 実行　cardsに初期配列を入れる
let cards = [
  "A","2","3","4","5","6","7","8","9","X","J","Q","K",
  "A","2","3","4","5","6","7","8","9","X","J","Q","K",
];
//実行　経過時間表示する
let count = 0;
let timer2 = setInterval(()=>{
  $("#clock").text("経過時間:"+(++count))
},1000);
//関数 min-maxまでの整数乱数を作る関数
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//実行　シャッフルのアルゴリズムを実行する
for(let i   = cards.length-1; i>0; i--){
  let r     = rand(0,i);
  let tmp   = cards[i];
  cards[i]  = cards[r];
  cards[r]  = tmp;
}
//実行　カードを生成する
const field = document.getElementById("field");
for (let n = 0; n<cards.length; n++){
  let elm = document.createElement("div");
  elm.className = "card";
  elm.innerHTML = "";//cards[n];
  elm.index     = n;
  elm.onclick   = click;
  field.appendChild(elm);
}
// 関数 チート
// 弱をクリック
let tenho = JSON.parse(localStorage.getItem(1));
let zyaku = 0;
$("#zyaku").on("click",()=>{
  // 現在のfieldを削除
  const cardlist = document.getElementsByClassName("card");  
  for(let index=0; index<cards.length; index++)
  field.removeChild(cardlist[0]);
  // ローカルストレージから配列を取得
  // カードを表示する
  for (let i=0;i<tenho.length;i++){
    let elm = document.createElement("div");
    elm.className = "card";
    elm.innerHTML = ""//tenho[i];
    elm.index = i;
    elm.onclick = click;
    field.appendChild(elm);
    }
  zyaku++;
});
// 神をクリック
let kami = 0;
$("#kami").on("click",()=>{
  kami++;
});
//関数 カードがクリックされた時の処理
let first  =null;
let second =null;
let  timer =null;
function click(e){
  if(timer){
    clearTimeout(timer);
    judge();
  }
  let elm = e.target;
  // 神モード
  if(kami>0){
    if(!first){
      elm.innerHTML = cards[elm.index];
      cheat = cards[elm.index];
      first = elm;
    }else if (first.index == elm.index){
      return;
      // 2枚目だった場合
      }else{
        elm.innerHTML = cheat;
        second = elm;
      timer = setTimeout(judge,1000);
    }
  }else if(zyaku>0){
    // 弱モード
    elm.innerHTML = tenho[elm.index];
    if(!first){
      first = elm;
    }else if (first.index == elm.index){
      return;
    }else{
      second = elm;
      timer = setTimeout(judge,1000);
    }
    // 通常モード
  }else{
    elm.innerHTML = cards[elm.index];
    if(!first){
      first = elm;
    }else if (first.index == elm.index){
      return;
    }else{
      second = elm;
      timer = setTimeout(judge,1000);
    }
  }
}
// 関数 ジャッジする関数
let mekuri = 0;
function judge(){
  if(first.innerHTML == second.innerHTML){
    first.style.visibility="hidden";
    second.style.visibility="hidden";
    mekuri+=2;
    if(mekuri == cards.length)clearInterval(timer2);
  }else{
    first.innerHTML = "";
    second.innerHTML = "";
  }
  first = null;
  second = null;
  timer=null;
}