import React, {Component} from "react";
import {connect} from "react-redux";
import {actionCreators} from "./store";
import {Button, Divider, Form, Icon, Input, Popconfirm, Table, Upload, Modal} from "antd";
import {Link} from "react-router-dom";
import {LinkDelete, LinkHidden, LinkShow} from "../../index/style";
import Highlighter from "react-highlight-words";
import {PediatricHelpInfo, PediatricWrapper} from "./style";
import {CarouselImage, ImageDetail} from "../carousel/style";
import {getCurrentDate} from "../../../common/util/Date";

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
                    title="新增轮播图"
                    okText="保存"
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="上传图片">
                            {getFieldDecorator('upload', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                                rules: [{required: true, message: '请上传图片!'}]
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

function countDown(filePath) {
    Modal.info({
        icon: null,
        width: 700,
        centered: true,
        content: <ImageDetail><img src={filePath} alt="theDetail"/></ImageDetail>,
        cancelText: "好的"
    });
}

class PediatricMassageManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            modalIsOpen: false,
            visible: false
        };
        this.columns = [
            {
                title: '标题',
                dataIndex: 'title',
                width: '20%',
                ...this.getColumnSearchProps('title'),
                render: (text,record) =>
                    <span>
                        <Link to={`/pediatric/courses/detail/${record.courseId}`} target="_blank">{text}</Link>
                    </span>
            },
            {
                title: '上课时间',
                dataIndex: 'lectureTime',
                width: '18%'
            },
            {
                title: '讲师',
                dataIndex: 'lecturer',
                width: '10%'
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: '18%',
                ellipsis: true
            },
            {
                title: '是否展示',
                dataIndex: 'isShow',
                width: '10%',
                render: (text, record) =>
                    this.props.courses.length >= 1 ? (
                        record.isShow === 1 ? <span>显示</span> : <span>隐藏</span>
                    ) : null,
            },{
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.props.courses.length >= 1 ? (
                        <div>
                            {record.isShow === 1 ?
                                <span>
                                <Popconfirm title="确认隐藏吗?隐藏后该课程将在前台隐藏！"
                                            onConfirm={() => this.handleChangeShow(record)}>
                                    <LinkHidden disabled={record.isShow !== 1}>隐藏</LinkHidden>
                                </Popconfirm>
                                <Divider type="vertical"/>
                            </span> :
                                <span>
                                <Popconfirm title="确认显示吗?显示后该课程将在前台展示！"
                                            onConfirm={() => this.handleChangeShow(record)}>
                                    <LinkShow disabled={record.isShow === 1}>显示</LinkShow>
                                </Popconfirm>
                                <Divider type="vertical"/>
                            </span>
                            }
                            <Popconfirm title="确认删除吗?删除会导致该课程不会恢复！如无特殊情况可以选择隐藏或修改！" onConfirm={() => this.handleCourseDelete(record.courseId)}>
                                <LinkDelete>删除</LinkDelete>
                            </Popconfirm>
                            <Divider type="vertical" />
                            <Link to={`/manage/pediatric/course/update/${record.courseId}`} target="_blank"><Icon type="edit" /></Link>
                        </div>
                    ) : null,
            }
        ];
        this.imgColumns = [
            {
                title: '图片缩略图',
                dataIndex: 'filePath',
                width: '30%',
                render: (text, record) =>
                    this.props.images.length >= 1 ? (
                        <CarouselImage onClick={()=>countDown(record.filePath)}>
                            <img src={record.filePath} alt="缩略图"/>
                        </CarouselImage>
                    ) : null,
            },
            {
                title: '上传时间',
                className: 'uploadTime',
                dataIndex: 'uploadTime',
                width: '20%'
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.props.images.length >= 1 ? (
                        <Popconfirm title="确认删除吗?" onConfirm={() => this.handleFileDelete(record.fileId)}>
                            <LinkDelete>删除</LinkDelete>
                        </Popconfirm>
                    ) : null,
            },
        ];
    }
    componentDidMount() {
        this.props.getAllCourses();
        this.props.getAllImages();
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`搜索 ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    搜索
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    重置
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    handleChangeShow = (record) => {
        record.isShow = 1 ^ record.isShow;
        this.props.changeShowState(record);
    };

    handleCourseDelete = courseId => {
        this.props.deleteCourse(courseId);
    };

    handleFileDelete = fileId => {
        this.props.deleteImage(fileId);
    };

    /* 新增函数 */
    showModal = () => {
        this.setState({ visible: true });
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
                            images.push({fileType: 2, filePath:item.response.data.url, uploadTime:getCurrentDate()});
                        return index;
                    })
                }
            }
            this.props.addImages(images);
            form.resetFields();
            this.setState({ visible: false });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        const { images, courses } = this.props;
        return (
            <PediatricWrapper>
                <Link to="/manage/pediatric/course/add" target="_blank"><Button style={{ marginBottom: 16 }} type="primary">新增课程</Button></Link>
                <Table
                    bordered
                    columns={this.columns}
                    dataSource={Array.from(courses)}
                    rowKey="courseId"
                />
                <PediatricHelpInfo>
                    小儿推拿的一些图片
                </PediatricHelpInfo>
                <Button onClick={this.showModal} type="primary" style={{ marginBottom: 16 }}>
                    添加图片
                </Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                <Table
                    rowKey="fileId"
                    bordered
                    dataSource={Array.from(images)}
                    columns={this.imgColumns}
                />
            </PediatricWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        courses: state.get("containers").get("pediatric").get("courses"),
        images: state.get("containers").get("pediatric").get("images")
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCourses(){
            dispatch(actionCreators.getAllCourses())
        },
        getAllImages(){
            dispatch(actionCreators.getAllImages())
        },
        changeShowState(course){
            dispatch(actionCreators.changeCourseIsShow(course));
        },
        deleteCourse(courseId){
            dispatch(actionCreators.deleteCourse(courseId))
        },
        addImages(files){
            dispatch(actionCreators.addImages(files))
        },
        deleteImage(fileId){
            dispatch(actionCreators.deleteImage(fileId))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PediatricMassageManagement);