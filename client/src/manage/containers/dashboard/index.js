import React, {Component} from 'react';
import {DashboardWrapper, Image, ImageWrapper,ImageItem} from "./style";

class Dashboard extends Component {
    render() {
        const images = [{
            fileId: 5,
            fileType: 3,
            filePath: "https://i.loli.net/2019/11/26/LuAv9rtz1g3Xq8C.jpg",
            order: 1
        },{
            fileId: 1,
            fileType: 3,
            filePath: "https://i.loli.net/2019/11/26/F5qSHxIVdnagleK.jpg",
            order: 2
        },{
            fileId: 2,
            fileType: 3,
            filePath: "https://i.loli.net/2019/11/26/wEGsTnyfhKjoxLv.jpg",
            order: 66
        }];

        return (
            <DashboardWrapper>
                <ImageWrapper>

                        {images.map((image)=>{
                            return <ImageItem><Image key={image.fileId} alt={image.fileId} src={image.filePath}/></ImageItem>
                        })}

                </ImageWrapper>
            </DashboardWrapper>
        )
    }
}

export default Dashboard;