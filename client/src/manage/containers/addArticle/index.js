import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import {Form, Input, Button, Upload, Icon, Cascader} from 'antd'
import { withRouter } from "react-router-dom";
import {
    ArticleAddWrapper,
    AddInfo,
    TitleImgUpload,
    DeleteIcon
} from "./style";
import {connect} from "react-redux";
import {actionCreators as contentAC} from "../content/store";
import {actionCreators} from "./store";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function displayRender(label) {
    return label[label.length - 1];
}
let options = [];

class AddArticle extends React.Component {
    state = {
        loading: false,
        url: null
    };
    componentDidMount () {
        this.props.form.setFieldsValue({
            content: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>')
        });
        const { getAllContent } = this.props;
        getAllContent();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields((error, values) => {
            if (!error) {
                const { createArticle } = this.props;
                const submitData = {
                    title: values.title,
                    raw: values.content.toRAW(), // or values.content.toHTML()
                    url: this.state.url,
                    menuCode: values.residence[values.residence.length - 1]
                };
                if (submitData.url === null) {
                    delete submitData.url;
                }
                createArticle(submitData, this.props);
            }
        })
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                    url: info.file.response.data.url
                }),
            );
        }
    };

    handleDelete = () => {
        this.setState({
            imageUrl: null,
            url: null
        });
    };
    render () {
        const { getFieldDecorator } = this.props.form;
        const uploadButton = (
            <div className="upload-button">
                <Icon type={this.state.loading ? 'loading' : 'camera'} />
            </div>
        );
        const { imageUrl } = this.state;
        const { content } = this.props;
        options = content;
        let op = JSON.parse(JSON.stringify(options).replace(/menuCode/g,"value"));
        op = JSON.parse(JSON.stringify(op).replace(/menuName/g,"label"));
        op = JSON.parse(JSON.stringify(op).replace(/submenu/g,"children"));
        return (
            <ArticleAddWrapper>
                <AddInfo>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item label="上传题图">
                            <TitleImgUpload>
                                <Upload
                                    name="avatar"
                                    listType="picture"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="/api/upload/picture"
                                    onChange={this.handleChange}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                                {imageUrl ? <DeleteIcon onClick={this.handleDelete}><Icon type="delete" />删除图片</DeleteIcon> : null}
                            </TitleImgUpload>
                        </Form.Item>
                        <Form.Item label="所属目录">
                            {getFieldDecorator('residence', {
                                rules: [
                                    { type: 'array', required: true, message: '请务必选择一个目录' },
                                ],
                            })(<Cascader
                                options={op}
                                expandTrigger="hover"
                                displayRender={displayRender}
                            />,)}
                        </Form.Item>
                        <Form.Item label="文章标题">
                            {getFieldDecorator('title', {
                                rules: [{
                                    required: true,
                                    message: '请输入标题',
                                }],
                            })(
                                <Input size="large" placeholder="请输入标题"/>
                            )}
                        </Form.Item>
                        <Form.Item label="文章正文">
                            {getFieldDecorator('content', {
                                validateTrigger: 'onBlur',
                                rules: [{
                                    required: true,
                                    validator: (_, value, callback) => {
                                        if (value.isEmpty()) {
                                            callback('请输入正文内容')
                                        } else {
                                            callback()
                                        }
                                    }
                                }],
                            })(
                                <BraftEditor
                                    className="my-editor"
                                    placeholder="请输入正文内容"
                                />
                            )}
                        </Form.Item>
                        <Form.Item >
                            <Button size="large" type="primary" htmlType="submit">提交</Button>
                        </Form.Item>
                    </Form>
                </AddInfo>
            </ArticleAddWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        content: state.get("containers").get("content").get("content")
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllContent(){
            dispatch(contentAC.getContent());
        },
        createArticle(data, props){
            dispatch(actionCreators.addArticle(data, props));
        }
    }
};

const EditableFormRow = Form.create()(AddArticle);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditableFormRow));