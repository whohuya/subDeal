import React, { Component, Fragment, StyleSheet } from "react";
import { connect } from "dva";
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Button,
  Divider,
  Comment,
  Form,
  Input,
  List,
  message,
  Switch,
  BackTop,
  Popconfirm,
  Modal,
  Avatar,
} from "antd";
import { Link } from "dva/router";
import moment from "moment";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import { Parse } from "../../utils/leancloud";

const TextArea = Input.TextArea;
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
);
@connect()
export default class Details extends Component {
  state = {
    item: "",
    query: {},
    show: true,
    user: "",
    comments: [],
    submitting: false,
    value: "",
    visible: false
  };

  async componentWillMount() {
    const { query } = this.props.location;
    const user = await Parse.User.current();
    this.setState({
      user: user.attributes,
      query
    });
    this.isStar(query.id, user.id);
  }

  async componentDidMount() {
    const { query } = this.props.location;
    const user = await Parse.User.current();
    this.onLoadDetail(query);
    this.isStar(query.id, user.id);
    this.onLoadComments(query.id);
  }

  onLoadComments = async id => {
    await this.props.dispatch({
      type: "dashboard/comment/findAll",
      payload: {
        id
      },
      callback: res => {
        this.setState({
          comments: res
        });
      }
    });
  };
  onAddComments = async () => {
    const { query } = this.props.location;
    const { user, value } = this.state;
    const id = Parse.User.current();
    await this.props.dispatch({
      type: "dashboard/comment/add",
      payload: {
        id: query.id,
        author: user.name,
        content: value,
        name: id.id
      },
      callback: res => {
        this.setState({
          submitting: false,
          value: "",
          comments: [res, ...this.state.comments]
        });
      }
    });
  };
  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true
    });
    setTimeout(() => {
      this.onAddComments();
    }, 1000);
  };
  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  isStar = (goods, user) => {
    this.props.dispatch({
      type: "dashboard/star/isStar",
      payload: {
        id: goods,
        user: user
      },
      callback: res => {
        this.setState({
          currentUserIsStar: res
        });
      }
    });
  };
  addStar = async () => {
    const { query } = this.props.location;
    const user = await Parse.User.current();
    this.props.dispatch({
      type: "dashboard/star/add",
      payload: {
        id: query.id,
        user: user.id
      },
      callback: res => {
        res === "ok"
          ? message.success("收藏成功！")
          : message.error("收藏失败");
      }
    });
  };
  cancelStar = async () => {
    const { query } = this.props.location;
    const user = await Parse.User.current();
    this.props.dispatch({
      type: "dashboard/star/cancel",
      payload: {
        id: query.id,
        user: user.id
      },
      callback: res => {
        res === "ok"
          ? message.success("已取消收藏！")
          : message.error("取消失败");
      }
    });
  };
  onLoadDetail = query => {
    this.props.dispatch({
      type: "dashboard/dashboard/queryById",
      payload: {
        id: query.id
      },
      callback: res => {
        this.setState({
          item: res
        });
      }
    });
  };
  onStarGoods = checked => {
    if (checked === true) {
      this.addStar();
    } else {
      this.cancelStar();
    }
  };
  confirm = () => {
    this.setState({
      visible: true
    });
  };
  cancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const {
      item,
      comments,
      user,
      currentUserIsStar,
      visible,
      submitting,
      value
    } = this.state;
    const TabPane = Tabs.TabPane;
    return (
      <PageHeaderLayout title="商品详情">
        {item && (
          <div>
            <BackTop />
            <Modal
              title="卖家联系方式"
              visible={visible}
              onOk={this.cancel}
              onCancel={this.cancel}
            >
              <p>电话：{item.sellName.phone}</p>
              <p>
                微信：
                {item.sellName.weChat === undefined
                  ? "该卖家没有留微信，电话联系吧"
                  : item.sellName.weChat}
              </p>
              <p>赶紧联系卖家进行线下交易吧！</p>
            </Modal>
            <Card>
              <Row>
                <Col span={12}>
                  <div style={{ maxHeight: 800, overflow: "hidden" }}>
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={item.img.url}
                    />
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ marginLeft: 16 }}>
                    <h1>{item.title}</h1>
                    <h3>
                      转 卖 价 ：
                      <span style={{ color: "#999999", fontSize: 32 }}>￥</span>
                      <span style={{ color: "#EA5428", fontSize: 32 }}>
                        {item.price}
                      </span>
                    </h3>
                    <Divider>
                      {item.isDiscuss && (
                        <span style={{ color: "#F9DA61" }}>
                          <Icon type="bulb" />
                          该商品拒绝讲价！
                        </span>
                      )}
                    </Divider>
                    <h3 style={{ marginBottom: 16 }}>
                      成&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色 ：{item.wear}
                    </h3>
                    <h3 style={{ marginBottom: 16 }}>
                      所 在 地 ：{item.place}
                    </h3>
                    <h3 style={{ marginBottom: 16 }}>
                      联系方式：
                      <span style={{ color: "#999999" }}>确认购买可见</span>
                    </h3>
                    <h3 style={{ marginBottom: 16 }}>
                      交易方式：
                      <span style={{ color: "#999999" }}>暂只支持线下交易</span>
                    </h3>
                    <h3 style={{ marginBottom: 16 }}>
                      收&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;藏：
                      <Switch
                        onChange={this.onStarGoods}
                        checkedChildren="已收藏"
                        unCheckedChildren="未收藏"
                        defaultChecked={currentUserIsStar}
                      />
                    </h3>
                    <Popconfirm
                      title="确认需要购买吗?"
                      onConfirm={this.confirm}
                      onCancel={this.cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        style={{ width: "50%", marginBottom: 16 }}
                        type="primary"
                        size={"large"}
                      >
                        确认购买
                      </Button>
                    </Popconfirm>
                  </div>
                </Col>
              </Row>
            </Card>
            <Card style={{ marginTop: 16 }}>
              <Tabs defaultActiveKey="1">
                <TabPane tab="宝贝描述" key="1">
                  <h3>
                    {item.describe === undefined
                      ? "该卖家没有添加对该宝贝的描述"
                      : item.describe}
                  </h3>
                </TabPane>
                <TabPane tab="留言" key="2">
                  <div>
                    {comments.length > 0 && <CommentList comments={comments} />}
                    <Comment
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor: "#1585FF",
                            verticalAlign: "middle",
                            marginTop: 8
                          }}
                          size={"large"}
                        >
                          {user.name}
                        </Avatar>
                      }
                      content={
                        <Editor
                          onChange={this.handleChange}
                          onSubmit={this.handleSubmit}
                          submitting={submitting}
                          value={value}
                        />
                      }
                    />
                  </div>
                </TabPane>
              </Tabs>
            </Card>
          </div>
        )}
      </PageHeaderLayout>
    );
  }
}
