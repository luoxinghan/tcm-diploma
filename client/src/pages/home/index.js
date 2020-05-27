import React, {Component} from "react";
import {Button, Carousel, Col, Divider, Icon, Row} from "antd";
import {
    CarouselItem,
    DynamicAnnounceWrapper,
    DynamicArea,
    HomeCarouselWrapper,
    HomeContent,
    HomeMapWrapper,
    HomeVideoWrapper,
    HomeWrapper,
    MapContactInfo,
    MapContainer,
    MedicalIcon,
    MedicalItem,
    MedicalTitle,
    MedicalWayContent,
    MedicalWayList,
    MomentContent,
    MomentImage,
    MomentItem,
    TuinaArea,
    TuinaIntro,
    TuinaWrapper,
} from './style';
import "video-react/dist/video-react.css";
import {Link, withRouter} from "react-router-dom";
import {Map, Placemark, YMaps} from 'react-yandex-maps';
import {connect} from "react-redux";
import {actionCreators} from "./store";
import {actionCreators as headAC} from "../../common/header/store";
import {FormattedMessage} from "react-intl";
import Pediatric from "../../statics/picture/pediatric.jpg";
import YouTube from "react-youtube";

const opts = {
    width: '100%',
    height: '630',
    playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0,
        iv_load_policy: 3,
        loop: 1
    }
};

let totalPage = 0;
let momentsTemp;

let pagination = function(pageSize, currentPage, arr) {
    let skipNum = (currentPage - 1) * pageSize;
    return (skipNum + pageSize >= arr.length) ? arr.slice(skipNum, arr.length) : arr.slice(skipNum, skipNum + pageSize);
};

class Home extends Component {
    state = {
        pageSize: 3,
        currentPage: 1,
    };
    nextPage = () => {
        this.setState({currentPage: this.state.currentPage + 1});
    };
    prePage = () => {
        this.setState({currentPage: this.state.currentPage - 1});
    };

    render() {
        const { moments, carousels, handleChangeKey } = this.props;
        if (typeof moments.length === "undefined") {
            totalPage = 1;
        } else {
            totalPage = Math.floor((moments.length + this.state.pageSize - 1) / this.state.pageSize);
        }
        momentsTemp = pagination(this.state.pageSize, this.state.currentPage, moments);
        return (
            <HomeWrapper>
                <HomeCarouselWrapper>
                    <Carousel autoplay dotPosition="right">
                        {carousels.map((item)=>{
                            return <CarouselItem key={item.fileId} imgUrl={item.filePath}><h3>{item.fileId}</h3></CarouselItem>
                        })}
                    </Carousel>
                </HomeCarouselWrapper>
                <HomeContent>
                    <MedicalWayContent>
                        <MedicalWayList>
                            <Row>
                                <Col span={4}>
                                    <MedicalItem>
                                        <MedicalIcon><span className="iconfont">&#xe656;</span></MedicalIcon>
                                        <MedicalTitle><FormattedMessage id="home.top.icon1" defaultMessage="Пальпация пульса"/></MedicalTitle>
                                    </MedicalItem>
                                </Col>
                                <Col span={4}>
                                    <MedicalItem>
                                        <MedicalIcon><span className="iconfont">&#xe65b;</span></MedicalIcon>
                                        <MedicalTitle><FormattedMessage id="home.top.icon2" defaultMessage="Иглоукалывание и прижигание"/></MedicalTitle>
                                    </MedicalItem>
                                </Col>
                                <Col span={4}>
                                    <MedicalItem>
                                        <MedicalIcon><span className="iconfont">&#xe690;</span></MedicalIcon>
                                        <MedicalTitle><FormattedMessage id="home.top.icon3" defaultMessage="Лечение банками"/></MedicalTitle>
                                    </MedicalItem>
                                </Col>
                                <Col span={4}>
                                    <MedicalItem>
                                        <MedicalIcon><span className="iconfont">&#xe749;</span></MedicalIcon>
                                        <MedicalTitle><FormattedMessage id="home.top.icon4" defaultMessage="Массаж"/></MedicalTitle>
                                    </MedicalItem>
                                </Col>
                                <Col span={4}>
                                    <MedicalItem>
                                        <MedicalIcon><span className="iconfont">&#xe83a;</span></MedicalIcon>
                                        <MedicalTitle><FormattedMessage id="home.top.icon5" defaultMessage="Лекарства китайской медицины"/></MedicalTitle>
                                    </MedicalItem>
                                </Col>
                                <Col span={4}>
                                    <MedicalItem>
                                        <MedicalIcon><span className="iconfont">&#xe60b;</span></MedicalIcon>
                                        <MedicalTitle><FormattedMessage id="home.top.icon6" defaultMessage="Китайская медицина для детей"/></MedicalTitle>
                                    </MedicalItem>
                                </Col>
                            </Row>
                        </MedicalWayList>
                    </MedicalWayContent>
                    <DynamicAnnounceWrapper>
                        {this.state.currentPage <= 1 ? <Icon type="left" style={{visibility: "hidden"}} onClick={this.prePage}/> : <Icon type="left" onClick={this.prePage}/>}
                        <DynamicArea>
                            <Row>
                                {momentsTemp.map((item)=>{
                                    return (
                                        <Col key={item.momentId} span={8}>
                                            <MomentItem>
                                                <MomentImage imgUrl={typeof item.images === 'undefined' ? "https://i.loli.net/2020/02/21/vEodNnOa2FrBUSk.jpg" : (item.images.length === 0 ? "https://i.loli.net/2020/02/21/vEodNnOa2FrBUSk.jpg" : item.images[0].filePath)}/>
                                                <MomentContent>
                                                    <h2>{item.momentTitle}</h2>
                                                    <p>{item.momentContent}</p>
                                                    <div><Link to={`/moment/detail/${item.momentId}`} target="_blank" className="home-button"><FormattedMessage id="home.moment.more" defaultMessage="Подробнее"/></Link></div>
                                                </MomentContent>
                                            </MomentItem>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </DynamicArea>
                        {this.state.currentPage >= totalPage ? <Icon type="right" style={{visibility: "hidden"}} onClick={this.nextPage}/> : <Icon type="right" onClick={this.nextPage}/>}

                    </DynamicAnnounceWrapper>
                    <HomeVideoWrapper>
                        <YouTube
                            opts={opts}
                            videoId="XzuIEQCcelE"
                        />
                    </HomeVideoWrapper>
                    <TuinaWrapper>
                        <TuinaArea>
                            <TuinaIntro>
                                <h3><FormattedMessage id="home.mid.pediatric.title" defaultMessage="Детский Массаж"/></h3>
                                <Divider/>
                                <p>
                                    <FormattedMessage id="home.mid.pediatric.content" defaultMessage="Детский массаж, как способ лечения, основывается на концепции единого целого и основных диагностических и лечебных принципах традиционной китайской медицины.  Применение детского массажа, а именно специальных методов работы на конкретных  поверхностях тела ребенка, изменяет и регулирует физиологическое состояние организма, останавливает патологические процессы, повышает иммунитет детского организма, тем самым достигая основной цели - профилактики и лечения болезней. Детский массаж относится к наружным методам лечения традиционной китайской медицины и является важным разделом мануальной терапии."/>
                                </p>
                                <Button type="primary" className="button" size="large" onClick={handleChangeKey}><Link to="/pediatric"><FormattedMessage id="home.mid.pediatric.join" defaultMessage="Подробнее"/></Link></Button>
                            </TuinaIntro>
                            <img className="pediatric-img" src={Pediatric} alt={Pediatric}/>
                        </TuinaArea>
                    </TuinaWrapper>
                    <HomeMapWrapper>
                        <YMaps>
                            <MapContainer>
                                <Map
                                    width="100%"
                                    height="100%"
                                    defaultState={{ center: [53.694199, 23.828642], zoom: 17 }} >
                                    <Placemark defaultGeometry={[53.694199, 23.828642]} />
                                </Map>
                            </MapContainer>
                            <MapContactInfo>
                                <h3><FormattedMessage id="home.contact.title" defaultMessage="Контактная Информация"/></h3>
                                <Divider/>
                                <Row type="flex" justify="space-around" align="middle" gutter={8}>
                                    <Col span={3}><span className="iconfont">&#xe625;</span></Col>
                                    <Col span={21}>
                                        <span className="title"><FormattedMessage id="home.contact.address.title" defaultMessage="Адрес:"/></span><br/>
                                        <span className="detail"><FormattedMessage id="home.contact.address.content" defaultMessage="г.Гродно ул. Даватара 23"/></span>
                                    </Col>
                                </Row>
                                <Row type="flex" justify="space-around" align="middle" gutter={8}>
                                    <Col span={3}><span className="iconfont">&#xe61b;</span></Col>
                                    <Col span={21}>
                                        <span className="title"><FormattedMessage id="home.contact.telephone.title" defaultMessage="Телефон:"/></span><br/>
                                        <span className="detail"><FormattedMessage id="home.contact.telephone.content" defaultMessage="+375 (152) 44-20-11"/></span>
                                    </Col>
                                </Row>
                                <Row type="flex" justify="space-around" align="middle" gutter={8}>
                                    <Col span={3}><span className="iconfont">&#xe600;</span></Col>
                                    <Col span={21}>
                                        <span className="title"><FormattedMessage id="home.contact.time.title" defaultMessage="Время работы:"/></span><br/>
                                        <span className="detail"><FormattedMessage id="home.contact.time.content" defaultMessage="Пн-Пт: 9:00-17:00 (13:00-14:00 - обед) сб, вс: выходной"/></span>
                                    </Col>
                                </Row>
                                <Row type="flex" justify="space-around" align="middle" gutter={8}>
                                    <Col span={3}><span className="iconfont">&#xe617;</span></Col>
                                    <Col span={21}>
                                        <span className="title"><FormattedMessage id="home.contact.email.title" defaultMessage="Электронная почта:"/></span><br/>
                                        <span className="detail"><FormattedMessage id="home.contact.email.content" defaultMessage="tcmgrodno@outlook.com"/></span>
                                    </Col>
                                </Row>
                            </MapContactInfo>
                        </YMaps>
                    </HomeMapWrapper>
                </HomeContent>
            </HomeWrapper>
        );
    }
    componentDidMount() {
        const { getAllMomentNews, getAllCarousels } = this.props;
        getAllMomentNews();
        getAllCarousels();
    }
}

const mapStateToProps = (state) => {
    return {
        moments: state.get("home").get("moments"),
        carousels: state.get("home").get("carousels")
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllMomentNews(){
            dispatch(actionCreators.getAllMomentNews());
        },
        getAllCarousels(){
            dispatch(actionCreators.getAllCarousels())
        },
        handleChangeKey(e){
            console.log(e);
            dispatch(headAC.changeTheSelectedKey(e))
        }
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));