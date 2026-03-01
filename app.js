/*
  ==============================
  データ定義（data.json を直接埋め込み）
  ==============================
*/

const data = [


{ "src": "10001_0_30.png","スルー回数":"0","通常転落後見切り所要Ｇ":"30"},
{ "src": "10002_0_25.png","スルー回数":"0","通常転落後見切り所要Ｇ":"25"},
{ "src": "10003_0_20.png","スルー回数":"0","通常転落後見切り所要Ｇ":"20"},
{ "src": "10004_0_15.png","スルー回数":"0","通常転落後見切り所要Ｇ":"15"},
{ "src": "10005_0_10.png","スルー回数":"0","通常転落後見切り所要Ｇ":"10"},
{ "src": "10006_0_5.png","スルー回数":"0","通常転落後見切り所要Ｇ":"5"},
{ "src": "10007_1_30.png","スルー回数":"1","通常転落後見切り所要Ｇ":"30"},
{ "src": "10008_1_25.png","スルー回数":"1","通常転落後見切り所要Ｇ":"25"},
{ "src": "10009_1_20.png","スルー回数":"1","通常転落後見切り所要Ｇ":"20"},
{ "src": "10010_1_15.png","スルー回数":"1","通常転落後見切り所要Ｇ":"15"},
{ "src": "10011_1_10.png","スルー回数":"1","通常転落後見切り所要Ｇ":"10"},
{ "src": "10012_1_5.png","スルー回数":"1","通常転落後見切り所要Ｇ":"5"},
{ "src": "10013_2_30.png","スルー回数":"2","通常転落後見切り所要Ｇ":"30"},
{ "src": "10014_2_25.png","スルー回数":"2","通常転落後見切り所要Ｇ":"25"},
{ "src": "10015_2_20.png","スルー回数":"2","通常転落後見切り所要Ｇ":"20"},
{ "src": "10016_2_15.png","スルー回数":"2","通常転落後見切り所要Ｇ":"15"},
{ "src": "10017_2_10.png","スルー回数":"2","通常転落後見切り所要Ｇ":"10"},
{ "src": "10018_2_5.png","スルー回数":"2","通常転落後見切り所要Ｇ":"5"},
{ "src": "10019_3_30.png","スルー回数":"3","通常転落後見切り所要Ｇ":"30"},
{ "src": "10020_3_25.png","スルー回数":"3","通常転落後見切り所要Ｇ":"25"},
{ "src": "10021_3_20.png","スルー回数":"3","通常転落後見切り所要Ｇ":"20"},
{ "src": "10022_3_15.png","スルー回数":"3","通常転落後見切り所要Ｇ":"15"},
{ "src": "10023_3_10.png","スルー回数":"3","通常転落後見切り所要Ｇ":"10"},
{ "src": "10024_3_5.png","スルー回数":"3","通常転落後見切り所要Ｇ":"5"},
{ "src": "10025_4_30.png","スルー回数":"4","通常転落後見切り所要Ｇ":"30"},
{ "src": "10026_4_25.png","スルー回数":"4","通常転落後見切り所要Ｇ":"25"},
{ "src": "10027_4_20.png","スルー回数":"4","通常転落後見切り所要Ｇ":"20"},
{ "src": "10028_4_15.png","スルー回数":"4","通常転落後見切り所要Ｇ":"15"},
{ "src": "10029_4_10.png","スルー回数":"4","通常転落後見切り所要Ｇ":"10"},
{ "src": "10030_4_5.png","スルー回数":"4","通常転落後見切り所要Ｇ":"5"},






];


/*
==============================
初期化
==============================
*/

const filtersDiv = document.getElementById("filters");
const galleryDiv = document.getElementById("gallery");

// src 以外を条件キーとして取得
const conditionKeys = Object.keys(data[0]).filter(key => key !== "src");

// select要素保持
const selects = {};


/*
==============================
お気に入りUI生成
==============================
*/

const favoriteBox = document.createElement("div");
favoriteBox.id = "favoriteBox";

favoriteBox.innerHTML = `
  <input id="favName" placeholder="お気に入り名">
  <button id="saveFav">保存</button>

  <select id="favList">
    <option value="">お気に入り選択</option>
  </select>

  <button id="loadFav">読込</button>
  <button id="deleteFav">削除</button>
`;

filtersDiv.appendChild(favoriteBox);


/*
==============================
条件UI生成
==============================
*/

conditionKeys.forEach(key => {
  const group = document.createElement("div");
  group.className = "filter-group";

  const label = document.createElement("label");
  label.textContent = key + "：";

  const select = document.createElement("select");

  const values = [...new Set(data.map(item => item[key]))];

  values.forEach(value => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });

  select.addEventListener("change", update);

  group.appendChild(label);
  group.appendChild(select);
  filtersDiv.appendChild(group);

  selects[key] = select;
});


/*
==============================
お気に入り機能
==============================
*/

const STORAGE_KEY =
  "imageFilterFavorites_" + location.pathname;

function getFavorites() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
}

function saveFavorites(obj) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}

function refreshFavoriteList() {
  const favList = document.getElementById("favList");
  const favorites = getFavorites();

  favList.innerHTML =
    '<option value="">お気に入り選択</option>';

  Object.keys(favorites).forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    favList.appendChild(option);
  });
}

// 保存
document.getElementById("saveFav").onclick = () => {
  const name = document.getElementById("favName").value.trim();
  if (!name) {
    alert("名前を入力してください");
    return;
  }

  const favorites = getFavorites();

  const state = {};
  conditionKeys.forEach(key => {
    state[key] = selects[key].value;
  });

  favorites[name] = state;
  saveFavorites(favorites);
  refreshFavoriteList();

  alert("保存しました");
};

// 読込
document.getElementById("loadFav").onclick = () => {
  const name = document.getElementById("favList").value;
  if (!name) return;

  const favorites = getFavorites();
  const state = favorites[name];

  conditionKeys.forEach(key => {
    if (state[key]) {
      selects[key].value = state[key];
    }
  });

  update();
};

// 削除
document.getElementById("deleteFav").onclick = () => {
  const name = document.getElementById("favList").value;
  if (!name) return;

  if (!confirm("削除しますか？")) return;

  const favorites = getFavorites();
  delete favorites[name];

  saveFavorites(favorites);
  refreshFavoriteList();
};


/*
==============================
検索＆描画
==============================
*/

function update() {
  galleryDiv.innerHTML = "";

  const filtered = data.filter(item => {
    return conditionKeys.every(key => {
      return item[key] === selects[key].value;
    });
  });

  filtered.forEach(item => {
    const img = document.createElement("img");
    img.src = `images/${item.src}`;
    img.alt = item.src;
    galleryDiv.appendChild(img);
  });
}


/*
==============================
初期表示
==============================
*/

refreshFavoriteList();
update();

