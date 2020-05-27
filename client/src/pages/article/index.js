import React, {Component} from 'react';

import {connect} from "react-redux";
import {actionCreators} from "./store";
import BraftEditor from "braft-editor";
import 'braft-editor/dist/output.css'
import {ArticleDetailWrapper,DetailInfo,TitleLine,HeaderInfo} from "./style";

class ArticleDetail extends Component {
    componentDidMount() {
        const { getContent } = this.props;
        let id = this.props.match.params.id;
        getContent(id);
    }
    render() {
        const { article, menu } = this.props;
        let isNull = article === null;
        let articleImg;
        let editorState;
        if (!isNull){
            if(typeof article.articleImg === "undefined" || article.articleImg === null){
                articleImg = null;
            } else {
                articleImg = <img className="title-img" src={article.articleImg} alt="文章题图"/>;
            }
            editorState = BraftEditor.createEditorState(article.articleRow).toHTML();
        }
        return (
            <ArticleDetailWrapper>
                    {
                        isNull ? null :
                            <DetailInfo>
                                {articleImg}
                                <header>
                                    <h1>{article.articleTitle}<TitleLine/></h1>
                                    <HeaderInfo>
                                        <span className="menu-name">{menu.menuName}</span>
                                        <span className="time">{article.publishedTime}</span>
                                    </HeaderInfo>
                                </header>
                                <div className="braft-output-content" dangerouslySetInnerHTML={{__html: editorState}}/>
                            </DetailInfo>
                    }
            </ArticleDetailWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        article: state.get("article").get("article"),
        menu: state.get("article").get("menu")
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getContent(id){
            dispatch(actionCreators.getArticleById(id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);