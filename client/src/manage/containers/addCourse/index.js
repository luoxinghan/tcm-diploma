import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import {Form, Input, Button, Upload, Icon, DatePicker} from 'antd'
import { withRouter } from "react-router-dom";
import {
    ArticleAddWrapper,
    AddInfo,
    TitleImgUpload,
    DeleteIcon
} from "./style";
import {connect} from "react-redux";
import {actionCreators} from "./store";
import {getCurrentDate} from "../../../common/util/Date";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class AddPediatricCourse extends React.Component {
    state = {
        loading: false,
        url: null
    };
    componentDidMount () {
        this.props.form.setFieldsValue({
            content: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>')
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields((error, values) => {
            if (!error) {
                const { createCourse } = this.props;
                const submitData = {
                    title: values.title,
                    content: values.content.toRAW(), // or values.content.toHTML()
                    imgUrl: this.state.url,
                    lecturer: values.lecturer,
                    address: values.address,
                    lectureTime: values.lectureTime.format('YYYY-MM-DD HH:mm:ss'),
                    publishedTime: getCurrentDate(),
                    isShow: 1
                };
                if (submitData.imgUrl === null) {
                    delete submitData.imgUrl;
                }
                createCourse(submitData, this.props);
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
                        <Form.Item label="讲师">
                            {getFieldDecorator('lecturer', {
                                rules: [{
                                    required: true,
                                    message: '请输入讲师姓名',
                                }]
                            })(
                                <Input placeholder="请输入讲师"/>
                            )}
                        </Form.Item>
                        <Form.Item label="上课时间">
                            {getFieldDecorator('lectureTime',{
                                rules: [{
                                    required: true,
                                    message: '请选择上课时间',
                                }]
                            })(<DatePicker showTime placeholder="上课时间"/>)}
                        </Form.Item>
                        <Form.Item label="上课地址">
                            {getFieldDecorator('address', {
                                rules: [{
                                    required: true,
                                    message: '请输入上课地址',
                                }]
                            })(
                                <Input placeholder="请输入上课地址"/>
                            )}
                        </Form.Item>
                        <Form.Item label="标题">
                            {getFieldDecorator('title', {
                                rules: [{
                                    required: true,
                                    message: '请输入标题',
                                }],
                            })(
                                <Input size="large" placeholder="请输入标题"/>
                            )}
                        </Form.Item>
                        <Form.Item label="正文">
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

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        createCourse(data, props){
            dispatch(actionCreators.addPediatricCourse(data, props));
        }
    }
};

const EditableFormRow = Form.create()(AddPediatricCourse);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditableFormRow));