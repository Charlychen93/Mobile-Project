function normalData(data) {
    let obj = { hot: [] }
    for (let index = 0; index < data.length; index++) {
        let { Findex, Fother_name, Fsinger_mid, Fsinger_name } = data[index];
        let avator = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${Fsinger_mid}.jpg?max_age=2592000`;
        let singerItem = { Findex, Fother_name, Fsinger_mid, Fsinger_name, avator };
        if (index < 10) {
            obj.hot.push(singerItem)
        }

        if (!obj[Findex]) {
            obj[Findex] = [singerItem]
        } else {
            obj[Findex].push(singerItem);
        }
    }
    let hot = [];
    let other = [];
    for (const key in obj) {
        if (key === 'hot') {
            hot.push({ Findex: key, list: obj[key] })
        } else if (key != 9) {
            other.push({ Findex: key, list: obj[key] })
        }
    }

    other.sort((a, b) => {
        return a.Findex.charCodeAt() - b.Findex.charCodeAt()
    })
    let result = hot.concat(other)
    return result
    console.log(result);
}
export { normalData }