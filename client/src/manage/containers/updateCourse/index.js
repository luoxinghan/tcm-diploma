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
import moment from "moment";
import {getCurrentDate} from "../../../common/util/Date";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class UpdatePediatricCourse extends React.Component {
    state = {
        loading: false,
        url: null,
        editorState: null
    };
    componentDidMount () {
        let id = this.props.match.params.id;
        this.props.fetchPosts(id);
    }

    handleSubmit = (event) => {
        const { imageUrl, updateCourse, course } = this.props;
        event.preventDefault();
        this.props.form.validateFields((error, values) => {
            if (!error) {
                const submitData = {
                    courseId: course.courseId,
                    title: values.title,
                    content: values.content.toRAW(), // or values.content.toHTML()
                    imgUrl: imageUrl,
                    lecturer: values.lecturer,
                    address: values.address,
                    lectureTime: values.lectureTime.format('YYYY-MM-DD HH:mm:ss'),
                    publishedTime: getCurrentDate(),
                    isShow: course.isShow
                };
                if (submitData.imgUrl === null) {
                    delete submitData.imgUrl;
                }
                updateCourse(submitData, this.props);
            }
        })
    };

    handleChange = info => {
        const { changeImageUrl } = this.props;
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false
                })
            );
            changeImageUrl(info.file.response.data.url);
        }
    };

    handleDelete = () => {
        this.props.changeImageUrl(null);
    };
    render () {
        const { getFieldDecorator } = this.props.form;
        const { course, imageUrl } = this.props;
        const uploadButton = (
            <div className="upload-button">
                <Icon type={this.state.loading ? 'loading' : 'camera'} />
            </div>
        );
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
                                initialValue: course === null ? "加载中" : course.lecturer,
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
                                initialValue: course === null ? null : moment( course.lectureTime,'YYYY-MM-DD HH:mm:ss'),
                                rules: [{
                                    required: true,
                                    message: '请选择上课时间',
                                }]
                            })(<DatePicker showTime placeholder="上课时间"/>)}
                        </Form.Item>
                        <Form.Item label="上课地址">
                            {getFieldDecorator('address', {
                                initialValue: course === null ? "加载中" : course.address,
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
                                initialValue: course === null ? "加载中" : course.title,
                                rules: [{
                                    required: true,
                                    message: '请输入标题'
                                }],

                            })(
                                <Input size="large"  placeholder="请输入标题"/>
                            )}
                        </Form.Item>
                        <Form.Item label="正文">
                            {getFieldDecorator('content', {
                                initialValue: course === null ? null : BraftEditor.createEditorState(course.content),
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
        course: state.get("containers").get("updateCourse").get("course"),
        imageUrl: state.get("containers").get("updateCourse").get("imageUrl")
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts(id){
            dispatch(actionCreators.fetchPosts(id))
        },
        changeImageUrl(url){
            dispatch(actionCreators.changeImageUrl(url))
        },
        updateCourse(data, props){
            dispatch(actionCreators.updateCourse(data, props));
        }
    }
};

const EditableFormRow = Form.create()(UpdatePediatricCourse);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditableFormRow));