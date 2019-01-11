/**
 * Created by zhaoyu on Jan 16, 2018.
 */
import React, { PureComponent } from "react";
import { connect } from "dva";

import {
  Card,
  Spin,
  Popconfirm,
  Table,
  Button,
  Icon,
  Dropdown,
  Menu,
  Input,
  Modal,
  message
} from "antd";
import PageHeaderLayout from "../../../layouts/PageHeaderLayout";

import BasicForm from "./Form";
import TableCountText from "../../../components/TableCountText";
import Separator16 from "../../../components/Separator16";
import commonHelper from "../../../helpers/commonHelper";
import ExplainCard from "../../../components/ExplainCard";
import { explainValue } from "../../../constants/explainValue";

const Column = Table.Column;
@connect(state => ({
  loading: state["basic/basic"].loading,
  list: state["basic/basic"].data.list,
  pagination: state["basic/basic"].data.pagination
}))
export default class Basics extends PureComponent {
  state = {
    basic: null,
    sorter: null,
    filters: null,
    filterVisible: false,
    filtered: false,
    searchText: "",
    modalTitle: "",
    modalContent: null,
    modalFooter: null,
    submitButtonText: "",
    modalVisible: false,
    submitting: false
  };

  componentDidMount() {
    console.warn(this.props.state);
    this.fetchBasics();
  }

  fetchBasics = (payload = null) => {
    const { dispatch, pagination } = this.props;
    const { sorter, filters, searchText } = this.state;
    console.warn("in fetchBasics ");
    if (!payload) {
      dispatch({
        type: "basic/basic/fetch",
        payload: {
          search: searchText,
          pagination,
          sorter,
          ...filters
        }
      });
    } else {
      dispatch({ type: "basic/basic/fetch", payload });
    }
    console.warn("fetchBasics Ends");
  };

  onInputChange = e => {
    this.setState({ searchText: e.target.value });
  };

  onBasicSearch = async () => {
    const { pagination } = this.props;
    const { sorter, filters, searchText } = this.state;
    this.fetchBasics({
      search: searchText,
      pagination: {
        ...pagination,
        current: 1
      },
      sorter,
      ...filters
    });
    // set data
    this.setState({
      filterVisible: false,
      filtered: !!searchText
    });
  };

  handleTableChange = async (pagination, filters, sorter) => {
    const { searchText } = this.state;
    // const sorter = (sorter.order === 'ascend') ? `${sorter.field}` : `-${sorter.field}`
    this.setState({
      sorter,
      filters
    });
    this.fetchBasics({
      search: searchText,
      pagination,
      sorter,
      ...filters
    });
  };

  editBasic = async (basic: ?Object = null) => {
    const { submitting } = this.state;
    const [title, buttonText] =
      basic === null ? ["创建基础信息", "创建"] : ["编辑基础信息", "编辑"];
    await this.setState({
      basic:
        basic === null
          ? {
              id: null
            }
          : basic
    });
    await this.setState({
      modalTitle: title,
      modalContent: (
        <BasicForm
          basic={basic}
          title={title}
          submitButtonText={buttonText}
          onSubmit={this.onSubmit}
          submitting={submitting}
        />
      ),
      submitButtonText: buttonText,
      modalVisible: true
    });
  };

  deleteBasic = async basic => {
    const { dispatch } = this.props;
    dispatch({
      type: "basic/basic/remove",
      payload: { basic },
      callback: this.deleteBasicCallback
    });
  };

  deleteBasicCallback = () => {
    message.success(`成功删除该基础信息。`);
    this.fetchBasics();
  };

  handleCancel = async () => {
    await this.setState({
      modalVisible: false,
      modalContent: null,
      basic: null
    });
  };

  onSubmit = values => {
    const { dispatch } = this.props;
    const { basic } = this.state;
    console.warn(values);
    console.warn(basic);
    try {
      this.setState({ submitting: true });
      const newBasic = {
        ...values,
        serial: values["serial"] ? parseFloat(values["serial"]) : 0
      };
      if (!!basic && !!basic["id"]) {
        console.warn(basic);
        // update a basic
        dispatch({
          type: "basic/basic/update",
          payload: { basic: newBasic },
          callback: () => this.fetchBasics()
        });
      } else {
        // add a new basic
        dispatch({
          type: "basic/basic/add",
          payload: { basic: newBasic },
          callback: () => this.fetchBasics()
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ submitting: false });
    }
    // finish submit
    this.setState({
      modalVisible: false,
      modalContent: null,
      basic: null
    });
  };

  render() {
    const { list, pagination, loading } = this.props;
    const {
      filtered,
      filterVisible,
      modalTitle,
      modalVisible,
      modalContent,
      modalFooter
    } = this.state;
    return (
      <PageHeaderLayout title="基础信息列表">
        <Card bordered={false}>
          <Modal
            title={modalTitle}
            visible={modalVisible}
            onCancel={this.handleCancel}
            footer={modalFooter}
          >
            {modalContent || <Spin spinning={loading} />}
          </Modal>
          <Separator16 />
          <Table
            dataSource={list && list.map(commonHelper.parseObjectToObject)}
            loading={loading}
            rowKey="id"
            onChange={this.handleTableChange}
          >
            <Column title="管理平台链接" dataIndex="manager" />
            <Column title="许可链接" dataIndex="license" />
            <Column title="关于我们链接" dataIndex="aboutUs" />
            <Column
              title="默认值"
              dataIndex="add"
              render={(text, basic) => (
                <div>
                  {basic.add.map((item, index) => (
                    <p key={index}>
                      {index}、 名称：{item.name} 值：{item.value}
                    </p>
                  ))}
                </div>
              )}
            />
            <Column
              title="操作"
              render={(text, basic) => (
                <div>
                  <a onClick={() => this.editBasic(basic)}>编辑</a>
                </div>
              )}
            />
          </Table>
        </Card>
        <ExplainCard explain={explainValue.basic} />
      </PageHeaderLayout>
    );
  }
}
