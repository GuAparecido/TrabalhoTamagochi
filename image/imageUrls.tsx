export type ImageSkin = {
  skinId: number;
  urlImage: string;
  urlTama: string;
};

const imageUrls: Array<ImageSkin> = [];

imageUrls.push({
  skinId: 1,
  urlImage:
    "https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/874.png",
  urlTama: require("../assets/images/Canario.png"),
});
imageUrls.push({
  skinId: 2,
  urlImage:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Palmeiras_logo.svg/1200px-Palmeiras_logo.svg.png",
  urlTama: require("../assets/images/Canario.png"),
});
imageUrls.push({
  skinId: 3,
  urlImage:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Santos_Logo.png/640px-Santos_Logo.png",
  urlTama: require("../assets/images/Canario.png"),
});
imageUrls.push({
  skinId: 4,
  urlImage:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Fortaleza_EC_2018.png/1200px-Fortaleza_EC_2018.png",
  urlTama: require("../assets/images/Canario.png"),
});
imageUrls.push({
  skinId: 5,
  urlImage:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Coritiba_FBC_%282011%29_-_PR.svg/1200px-Coritiba_FBC_%282011%29_-_PR.svg.png",
  urlTama: require("../assets/images/Canario.png"),
});
imageUrls.push({
  skinId: 6,
  urlImage:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg/800px-Brasao_do_Sao_Paulo_Futebol_Clube.svg.png",
  urlTama: require("../assets/images/Canario.png"),
});

export default imageUrls;
