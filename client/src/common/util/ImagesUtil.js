export function getPediatricImages(images) {
    let formatImages=[];
    images.map((image) => {
        let url = image.filePath;
        let img = new Image();
        img.src = url;

        //新增一个image
        let newImage={src: "", width: 1, height: 1};
        newImage.src = url;

        // 判断是否有缓存
        if (img.complete) {
            // 打印
            /*console.log('from:complete : width:' + img.width + ',height:' + img.height)*/
            let r = gcd (img.width, img.height);
            newImage.width = img.width / r;
            newImage.height = img.height / r;
        } else {
            // 加载完成执行
            img.onload = function () {
                // 打印
                /*console.log(index, 'width:' + img.width + ',height:' + img.height);*/
                let r = gcd (img.width, img.height);
                newImage.width = img.width / r;
                newImage.height = img.height / r;
            }
        }
        formatImages.push(newImage);
        return url;
    });
    return formatImages;
}

//算出最大公约数
function gcd (a, b) {
    return (b === 0) ? a : gcd (b, a%b);
}