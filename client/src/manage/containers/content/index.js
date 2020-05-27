import React from "react";
import {Button, Divider, Form, Input, Modal, Popconfirm, Table, Icon, Upload, Cascader} from "antd";
import {connect} from "react-redux";
import {actionCreators} from "./store";
import {LinkDelete, LinkHidden, LinkShow} from "../../index/style";

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

let options = [];

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        onChange = value=> {
          //console.log(value)
        };
        normFile = e => {
            let fileList = [...e.fileList];
            fileList = fileList.slice(-1);//截取fileList最后一个元素
            return fileList;
        };
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            let op = JSON.parse(JSON.stringify(options).replace(/menuCode/g, "value"));
            op = JSON.parse(JSON.stringify(op).replace(/menuName/g, "label"));
            op = JSON.parse(JSON.stringify(op).replace(/submenu/g, "children"));
            return (
                <Modal
                    visible={visible}
                    title="新增目录"
                    okText="保存"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="目录名称">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入目录名称!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="选择它所属目录">
                            {getFieldDecorator('residence', {
                                rules: [
                                    { type: 'array', required: true, message: '请务必选择一个目录' },
                                ],
                            })(<Cascader options={op} onChange={this.onChange} changeOnSelect/>)}
                        </Form.Item>
                        <Form.Item label="上传目录图" extra="请上传 .jpg 或 .png格式的照片">
                            {getFieldDecorator('upload', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                            })(<Upload
                                action='/api/upload/picture'
                                listType='picture'
                            >
                                <Button>
                                    <Icon type="upload" /> Upload
                                </Button>
                            </Upload>)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);

const TitlePicCreateForm = Form.create({ name: 'form_in_pic_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        normFile = e => {
            let fileList = [...e.fileList];
            fileList = fileList.slice(-1);//截取fileList最后一个元素
            return fileList;
        };
        render() {
            const { visible, onCancel, onCreate, form, currentMenu } = this.props;
            const { getFieldDecorator } = form;
            let fl = [];
            if(currentMenu !== null) {
                if (typeof (currentMenu.imgUrl) !== "undefined" && currentMenu.imgUrl !== null) {
                    fl = [
                        {
                            uid: '-1',
                            name: currentMenu.imgUrl,
                            status: 'done',
                            url: currentMenu.imgUrl,
                            thumbUrl: currentMenu.imgUrl,
                        }
                    ];
                }
            }
            return (
                <Modal
                    visible={visible}
                    title="题图修改"
                    okText="保存"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item
                            label="上传目录图"
                            extra={
                                <span>请上传 .jpg 或 .png格式的照片<br/>
                                <span style={{color: "red"}}>注意：上传第二张图片会覆盖第一张图片，请谨慎保存！</span>
                                </span>}
                        >
                            {getFieldDecorator('upload', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                                initialValue: fl
                            })(<Upload
                                action='/api/upload/picture'
                                listType='picture'
                            >
                                <Button>
                                    <Icon type="upload" /> Upload
                                </Button>
                            </Upload>)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);


class EditableCell extends React.Component {
    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = e => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} 必须填写。`,
                        },
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{ paddingRight: 24 }}
                onClick={this.toggleEdit}
            >
                {children}
            </div>
        );
    };

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                    children
                )}
            </td>
        );
    }
}

class ContentManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            picVisible: false,
            currentMenu: null,
        };
        this.columns = [
            {
                title: '目录名称',
                dataIndex: 'menuName',
                width: '30%',
                editable: true,
            },
            {
                title: '目录等级',
                dataIndex: 'level',
                width: '20%',
                editable: true,
            },
            {
                title: '是否展示',
                dataIndex: 'isShow',
                width: '15%',
                render: (text, record) =>
                    this.props.content.length >= 1 ? (
                        record.isShow === 1 ? <span>显示</span> : <span>隐藏</span>
                    ) : null,
            },{
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.props.content.length >= 1 ? (
                        <span>
                    <Popconfirm title="确认隐藏吗?隐藏后该目录所有文章将隐藏！" onConfirm={() => this.handleChangeShow(record.menuCode, record.isShow === 1)}>
                        <LinkHidden disabled={record.isShow !== 1}>隐藏</LinkHidden>
                    </Popconfirm>
                    <Divider type="vertical" />
                    <Popconfirm title="确认显示吗?显示后该目录所有文章将展示！" onConfirm={() => this.handleChangeShow(record.menuCode, record.isShow === 1)}>
                        <LinkShow disabled={record.isShow === 1}>显示</LinkShow>
                    </Popconfirm>
                    <Divider type="vertical" />
                    <Popconfirm title="确认删除吗?删除会导致该目录和子目录全部删除！如无特殊情况可以选择隐藏或修改！" onConfirm={() => this.handleDelete(record.menuCode)}>
                        <LinkDelete disabled={record.isModify === 0}>删除</LinkDelete>
                    </Popconfirm>
                    <Divider type="vertical" />
                    <Button size="small" type={(typeof(record.imgUrl) === "undefined" || record.imgUrl === null) ? "primary" : null} onClick={()=>this.handleShow(record)}>{(typeof(record.imgUrl) === "undefined" || record.imgUrl === null) ? "添加题图" : "修改题图"}</Button>
                </span>
                    ) : null,
            }
        ];
    }
    handleSave = row => {
        delete row.submenu;
        const {updateContent} = this.props;
        updateContent(row);
    };

    handleDelete = menuCode => {
        const {deleteContent} = this.props;
        deleteContent(menuCode);
    };

    handleChangeShow = (menuCode, isShow) => {
        const {changeShowState} = this.props;
        changeShowState(menuCode, !isShow);
    };

    handleShow = row => {
        this.showPicModal();
        this.setState({currentMenu: row});
    };

    //新增
    showModal = () => {
        this.setState({ visible: true , picVisible: false});
    };

    showPicModal = () => {
        this.setState({ visible: false , picVisible: true});
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const { form } = this.formRef.props;
        const { addContent } = this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let url = null;
            if (typeof values.upload !== "undefined"){
                if((typeof values.upload[0].response) === "undefined"){
                    url = values.upload[0].url;
                } else {
                    url = values.upload[0].response.data.url;
                }
                values.imgUrl = url;
                delete values.upload;
            }
            values.residence = values.residence[values.residence.length - 1];
            delete values.upload;
            addContent(values);
            form.resetFields();
            this.setState({ visible: false });
        });
    };

    handlePicCancel = () => {
        this.setState({ picVisible: false });
    };

    handlePicCreate = () => {
        const { form } = this.picFormRef.props;
        const { updateContent } = this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            let url = null;
            if (values.upload.length === 0){
                return;
            } else {
                if((typeof values.upload[0].response) === "undefined"){
                    url = values.upload[0].url;
                } else {
                    url = values.upload[0].response.data.url;
                }
            }
            let current = this.state.currentMenu;
            current.imgUrl = url;
            delete current.submenu;
            //console.log("currentMenu", current);
            updateContent(current);
            form.resetFields();
            this.setState({ picVisible: false });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    savePicFormRef = picFormRef => {
        this.picFormRef = picFormRef;
    };

    componentDidMount() {
        const { getAllContent } = this.props;
        getAllContent();
    }

    render(){
        const { content } = this.props;
        options = (content === null || typeof content === "undefined") ? null : content;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                {console.log("渲染测试",content)}
                <Button onClick={this.showModal} type="primary" style={{ marginBottom: 5 }}>
                    新增目录
                </Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />

                <TitlePicCreateForm
                    wrappedComponentRef={this.savePicFormRef}
                    visible={this.state.picVisible}
                    onCancel={this.handlePicCancel}
                    onCreate={this.handlePicCreate}
                    currentMenu={this.state.currentMenu}
                />
                {this.state.loading ? "Loading" : <Table
                    bordered
                    columns={columns}
                    components={components}
                    childrenColumnName="submenu"
                    dataSource={(content === null || typeof content === "undefined") ? null : Array.from(content)}
                    rowKey="menuCode"
                />
                }
            </div>
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
            dispatch(actionCreators.getContent());
        },
        changeShowState(menuCode, isShow){
            dispatch(actionCreators.changeIsShow(menuCode, isShow));
        },
        updateContent(content){
            dispatch(actionCreators.updateContent(content));
        },
        deleteContent(menuCode){
            dispatch(actionCreators.deleteContent(menuCode));
        },
        addContent(content){
            dispatch(actionCreators.addContent(content));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentManage);