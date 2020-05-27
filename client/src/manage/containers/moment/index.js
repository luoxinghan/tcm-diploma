import React, {Component} from 'react';
import {Button, Divider, Form, Icon, Input, Modal, Popconfirm, Table, Upload} from 'antd';
import {connect} from "react-redux";
import {actionCreators} from "./store";
import {Image, ImageItem, ImageList, ImageWrapper, MomentWrapper} from "./style";
import {LinkDelete, LinkHidden, LinkShow} from "../../index/style";
import axios from "axios";
import {getCurrentDate} from "../../../common/util/Date";

const {TextArea} = Input;

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        normFile = e => {
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        };
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="新增公告"
                    okText="保存"
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="公告标题" extra="字数限制40字">
                            {getFieldDecorator('momentTitle', {
                                rules: [{ required: true, message: '请输入公告的标题!'}],
                            })(<Input maxLength={40} />)}
                        </Form.Item>
                        <Form.Item label="公告内容">
                            {getFieldDecorator('momentContent', {
                                rules: [{ required: true, message: '请输入公告的内容!'}]
                            })(<TextArea rows={4}/>)}
                        </Form.Item>
                        <Form.Item label="上传图片" extra="先上传的图片会先展示">
                            {getFieldDecorator('upload', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                            })(
                                <Upload name="logo" action="/api/upload/picture" listType="picture">
                                    <Button>
                                        <Icon type="上传" /> 点击上传
                                    </Button>
                                </Upload>,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

class MomentManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            imgVisible: false,
            images: []
        };
        this.columns = [
            {
                title: '图片',
                dataIndex: 'filePath',
                width: '8%',
                render: (text, record) =>
                    this.props.moments.length >= 1 ? (
                        <Button shape="circle" type="primary" icon="monitor" onClick={()=>this.handleGetImage(record.momentId)}/>
                    ) : null,
            },
            {
                title: '标题',
                className: 'momentTitle',
                dataIndex: 'momentTitle',
                width: '20%'
            },
            {
                title: '内容',
                className: 'momentContent',
                dataIndex: 'momentContent',
                width: '25%',
                ellipsis: true
            },
            {
                title: '发布时间',
                className: 'publishedTime',
                dataIndex: 'publishedTime',
                width: '18%'
            },
            {
                title: '是否展示',
                dataIndex: 'isShow',
                width: '10%',
                render: (text, record) =>
                    this.props.moments.length >= 1 ? (
                        record.isShow === 1 ? <span>显示</span> : <span>隐藏</span>
                    ) : null,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.props.moments.length >= 1 ? (
                        <div>
                            {record.isShow === 0 ?
                                <span>
                                    <Popconfirm title="确认显示吗?显示后该公告将在前台展示！" onConfirm={() => this.handleChangeShow(record)}>
                                        <LinkShow disabled={record.isShow !== 0}>显示</LinkShow>
                                    </Popconfirm>
                                    <Divider type="vertical" />
                                </span> :
                                <span>
                                     <Popconfirm title="确认隐藏吗?隐藏后该公告将在前台隐藏！" onConfirm={() => this.handleChangeShow(record)}>
                                        <LinkHidden disabled={record.isShow !== 1}>隐藏</LinkHidden>
                                     </Popconfirm>
                                     <Divider type="vertical" />
                                </span>}
                            <Popconfirm title="确认删除吗?" onConfirm={() => this.handleDelete(record.momentId)}>
                                <LinkDelete>删除</LinkDelete>
                            </Popconfirm>
                        </div>
                    ) : null,
            },
        ];
    }

    countDown = () => {
        Modal.info({
            icon: null,
            width: 700,
            centered: true,
            content:
                <ImageWrapper>

                    {
                        this.state.images.length === 0 ? <div>这个公告还没有图片...<Icon type="meh" /></div>
                             :
                            <ImageList>
                                {this.state.images.map((image)=>{
                                    return <ImageItem key={image.fileId}><Image alt={image.fileId} src={image.filePath}/></ImageItem>
                                })}
                            </ImageList>
                    }

                </ImageWrapper>,
            cancelText: "好的"
        });
    };

    handleGetImage = (momentId) => {
        axios.post("/api/manage/containers/moments/images", {momentId})
            .then((res)=>{
                const result = res.data.data;
                this.setState({ images: result.images }, this.countDown);
            });
    };

    handleChangeShow = (record) => {
        record.isShow = 1 ^ record.isShow;
        this.props.updateMoment(record);
    };

    handleDelete = id => {
        this.props.deleteMoment(id);
    };

    /* 新增函数 */
    showModal = () => {
        this.setState({ visible: true, imgVisible: false});
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let images = [];
            if((typeof values.upload) !== "undefined") {
                if (values.upload.length !== 0) {
                    values.upload.map((item, index)=>{
                        if (typeof item.response.data !== "undefined")
                            images.push({filePath:item.response.data.url, order:index + 1});
                        return index;
                    })
                }
            }

            const value = {
                momentTitle: values.momentTitle,
                momentContent: values.momentContent,
                publishedTime: getCurrentDate(),
                isShow: 1,
                images: images
            };
            this.props.addMoment(value);
            form.resetFields();
            this.setState({ visible: false });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    componentDidMount() {
        this.props.getAllMoments();
    }

    render() {
        const { moments } = this.props;
        return (
            <MomentWrapper>
                <Button onClick={this.showModal} type="primary" style={{ marginBottom: 16 }}>
                    添加公告
                </Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                <Table
                    rowKey="momentId"
                    bordered
                    dataSource={Array.from(moments)}
                    columns={this.columns}
                />
            </MomentWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        moments: state.get("containers").get("moment").get("moments"),
        images: state.get("containers").get("moment").get("images")
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllMoments(){
            dispatch(actionCreators.getAllMoments())
        },
        deleteMoment(id){
            dispatch(actionCreators.deleteMoment(id))
        },
        updateMoment(moment){
            dispatch(actionCreators.updateMoment(moment))
        },
        addMoment(moment){
            dispatch(actionCreators.addMoment(moment))
        }
        /*
        deleteCarousel(id){
            dispatch(actionCreators.deleteCarousel(id));
        }*/
    }
};

const EditableFormTable = Form.create()(MomentManage);
export default connect(mapStateToProps, mapDispatchToProps)(EditableFormTable);