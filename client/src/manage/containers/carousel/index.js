import React, {Component} from 'react';
import { Table, Input, Button, Popconfirm, Form, Modal, Upload, Icon } from 'antd';
import {connect} from "react-redux";
import {actionCreators} from "./store";
import {
    CarouselWrapper,
    CarouselImage,
    ImageDetail
} from "./style";
import {LinkDelete} from "../../index/style";

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        normFile = e => {
            let fileList = [...e.fileList];
            fileList = fileList.slice(-1);//截取fileList最后一个元素
            return fileList;
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
                        <Form.Item label="上传图片" extra="轮播图是首页展示的图片。">
                            {getFieldDecorator('upload', {
                                valuePropName: 'fileList',
                                getValueFromEvent: this.normFile,
                                rules: [{required: true, message: '请上传轮播图!'}]
                            })(
                                <Upload name="logo" action="/api/upload/picture" listType="picture">
                                    <Button>
                                        <Icon type="上传" /> Click to upload
                                    </Button>
                                </Upload>,
                            )}
                        </Form.Item>
                        <Form.Item label="顺序" extra="数字越小展示的优先级越高(0-99)">
                            {getFieldDecorator('order', {
                                rules: [{ required: true, message: '请准确输入顺序!',pattern: new RegExp(/^[1-9]\d*$/, "g")}],
                            })(<Input maxLength={2} />)}
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
            if(record.order !== parseInt(values.order)) {
                handleSave({...record, ...values});
            }
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
                            message: `${title} 必须填写且为1-99。`,
                            pattern: new RegExp(/^[1-9]\d*$/, "g")
                        },
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={node => (this.input = node)} maxLength={2} onPressEnter={this.save} onBlur={this.save} />)}
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

function countDown(filePath) {
    Modal.info({
        icon: null,
        width: 700,
        centered: true,
        content: <ImageDetail><img src={filePath} alt="theDetail"/></ImageDetail>,
        cancelText: "好的"
    });
}

class CarouselManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.columns = [
            {
                title: '图片缩略图',
                dataIndex: 'filePath',
                width: '30%',
                render: (text, record) =>
                    this.props.carousels.length >= 1 ? (
                        <CarouselImage onClick={()=>countDown(record.filePath)}>
                            <img src={record.filePath} alt="缩略图"/>
                        </CarouselImage>
                    ) : null,
            },
            {
                title: '排序',
                className: 'order',
                dataIndex: 'order',
                width: '20%',
                editable: true,
                sorter: (a, b) => a.order - b.order,
            },
            {
                title: '操作',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.props.carousels.length >= 1 ? (
                        <Popconfirm title="确认删除吗?" onConfirm={() => this.handleDelete(record.fileId)}>
                            <LinkDelete>删除</LinkDelete>
                        </Popconfirm>
                    ) : null,
            },
        ];
    }


    handleDelete = id => {
        this.props.deleteCarousel(id);
    };

    handleSave = row => {
        this.props.updateCarousel(row);
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
            let url = null;
            if((typeof values.upload[0].response) === "undefined"){
                url = values.upload[0].url;
            } else {
                url = values.upload[0].response.data.url;
            }
            const value = {
                fileType: 1,
                filePath: url,
                order: values.order
            };
            this.props.addCarousel(value);
            console.log("values",value);
            form.resetFields();
            this.setState({ visible: false });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    componentDidMount() {
        this.props.getAllCarousels();
    }

    render() {
        const { carousels } = this.props;
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
            <CarouselWrapper>
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
                    components={components}
                    rowKey="fileId"
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={Array.from(carousels)}
                    columns={columns}
                />
            </CarouselWrapper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        carousels: state.get("containers").get("carousel").get("carousels")
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCarousels(){
            dispatch(actionCreators.getAllCarousels())
        },
        addCarousel(carousel){
            dispatch(actionCreators.addCarousel(carousel))
        },
        updateCarousel(carousel){
            dispatch(actionCreators.updateCarousel(carousel))
        },
        deleteCarousel(id){
            dispatch(actionCreators.deleteCarousel(id));
        }
    }
};

const EditableFormTable = Form.create()(CarouselManage);
export default connect(mapStateToProps, mapDispatchToProps)(EditableFormTable);