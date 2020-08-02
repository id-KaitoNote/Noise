
const canvas = document.getElementById('canvas');
const main = document.getElementById("main");
const width = document.getElementById("main").clientWidth;
const height = document.getElementById("main").clientHeight;


//アプリケーションを作成
const app = new PIXI.Application({
    view: canvas,
    width: width, //canvas横幅
    height: height,  //canvas縦幅
    backgroundColor: 0X000000, //背景色
    autoResize: true,//リサイズ処理
    transparent: true,
});

//画像の読み込み
const texture = PIXI.Texture.fromImage("../dest/assets/images/01.jpg");
//読み込んだ画像からスプライト(画像)を生成
const img = new PIXI.Sprite(texture);

// //スプライトの位置を設定する
img.x = app.screen.width / 2;
img.y = app.screen.height / 2;
//アンカーポイントを中央に設定する
img.anchor.x = 0.5;
img.anchor.y = 0.5;
// img.anchor.set(0.5);//アンカーポイントのx,yを中央に設定する
//スプライトの大きさを調整する
img.scale.x = 0.5;
img.scale.y = 0.5;

//画像をステージに追加
app.stage.addChild(img);

// ノイズフィルターをかける
const noiseFilter = new PIXI.filters.NoiseFilter();

noiseFilter.noise = 0.3;


//フィルターの配列をimgに追加
app.stage.filters = [noiseFilter];
// app.stage.filters = [noiseFilter];

//imgのインタラクションをオン
img.interactive = true;

//マウスオーバーしたら1秒かけてノイズを0にする
img.on('mouseover', function () {

    TweenMax.to(
        noiseFilter,
        1,
        { noise: 0, ease: Quad.easeOut });

});

// マウスアウトしたら1秒かけてノイズを0.3に戻す
img.on('mouseout', function () {

    TweenMax.to(
        noiseFilter,
        1,
        { noise: 0.3, ease: Quad.easeOut });

});


app.ticker.add(animate);

function animate() {

    //ノイズの大きさを0.01増やしていく

    noiseFilter.seed += 0.01;

}