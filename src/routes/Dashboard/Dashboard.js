import React, { Component, Fragment } from "react";
import { connect } from "dva";
import {
  Row,
  Col,
  Icon,
  Card,
  Tabs,
  Table,
  Button,
  Radio,
  DatePicker,
  Carousel,
  BackTop,
  Avatar,
  Tooltip,
  Menu,
  Dropdown
} from "antd";
import { Link } from "dva/router";

import { getTimeDistance } from "../../utils/utils";
import PageHeaderLayout from "../../layouts/PageHeaderLayout";
import styles from "./Analysis.less";

@connect()
export default class Dashboard extends Component {
  state = {
    url: "",
    goodsList: [],
    productClass: "全部"
  };

  async componentDidMount() {
    await this.onLoadCarousel();
    await this.onLoadAllGoods();
  }

  onLoadAllGoods = () => {
    this.props.dispatch({
      type: "dashboard/dashboard/findAllGoods",
      callback: res => {
        this.setState({
          goodsList: res
        });
        console.log(res);
      }
    });
  };
  onLoadCarousel = () => {
    this.props.dispatch({
      type: "dashboard/dashboard/findCarousel",
      callback: res => {
        this.setState({
          url: res
        });
      }
    });
  };

  componentWillUnmount() {}

  onChangeListType = a => {
    this.setState({
      productClass: a.target.name
    });
    this.props.dispatch({
      type: "dashboard/dashboard/findGoodsByType",
      payload: {
        type: a.target.name
      },
      callback: res => {
        console.log(res);
        this.setState({
          goodsList: res
        });
      }
    });
  };

  render() {
    const { url, productClass, goodsList } = this.state;

    const goodsItem = item => {
      return (

        <Col
          xs={12}
          sm={8}
          md={8}
          xl={6}
          key={item.id}
          style={{
            marginBottom: 8
          }}
        ><Link to={{pathname:'/GoodsDetails',query:{id:item.id}}}>
          <div
            style={{
              width: 200,
              height: "100%",
              border: "1px solid #e9e9e9",
              borderBottomLeftRadius: "15px",
              borderBottomRightRadius: "15px",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
              overflow: "hidden",
              padding: "4px"
            }}
          >
            <table>
              <tbody>
                <tr>
                  <td height={240}>
                    <img
                      src={item.img.url}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </td>
                </tr>
                <tr>
                  <td height={45}>
                    <span>{item.title}</span>
                  </td>
                </tr>
                <tr style={{ borderBottom: "1px solid #969696" }}>
                  <td>
                    <span
                      style={{
                        color: "#FF4D4E",
                        fontSize: "24px",
                        fontWeight: 900
                      }}
                    >
                      ￥{item.price}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Avatar
                      style={{
                        backgroundColor: "#1585FF",
                        verticalAlign: "middle",
                        marginTop: 8
                      }}
                    >
                      {item.sellName.name}
                    </Avatar>
                    <span
                      style={{
                        marginLeft: 8,
                        verticalAlign: "bottom",
                        paddingTop: 8
                      }}
                    >
                      {item.sellName.name}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Link>
        </Col>

      );
    };

    return (
      <PageHeaderLayout title="交易首页">
        <BackTop />
        <Card bordered={false}>
          <Row>
            <Col span={24}>
              <Carousel autoplay style={{}}>
                {url &&
                  url.map(item => (
                    <div key={item.name}>
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src={item.url}
                      />
                    </div>
                  ))}
              </Carousel>
            </Col>
          </Row>
          <Row />
        </Card>
        <Card bordered={false} style={{ marginTop: 24 }}>
          <Row>
            <Col span={4}>
              <span>商家分类：</span>
            </Col>
            <Col span={20}>
              <Row gutter={48}>
                <Col span={3}>
                  <a
                    onClick={this.onLoadAllGoods}
                    name={"全部"}
                    style={{ color: "#5F5F63" }}
                  >
                    全部
                  </a>
                </Col>
                <Col span={3}>
                  <a
                    onClick={this.onChangeListType}
                    name={"关注"}
                    style={{ color: "#5F5F63" }}
                  >
                    关注
                  </a>
                </Col>
                <Col span={3}>
                  <a
                    onClick={this.onChangeListType}
                    name={"手机"}
                    style={{ color: "#5F5F63" }}
                  >
                    手机
                  </a>
                </Col>
                <Col span={3}>
                  <a
                    onClick={this.onChangeListType}
                    name={"数码"}
                    style={{ color: "#5F5F63" }}
                  >
                    数码
                  </a>
                </Col>
                <Col span={3}>
                  <a
                    onClick={this.onChangeListType}
                    name={"服装"}
                    style={{ color: "#5F5F63" }}
                  >
                    服装
                  </a>
                </Col>
                <Col span={3}>
                  <a
                    onClick={this.onChangeListType}
                    name={"居家"}
                    style={{ color: "#5F5F63" }}
                  >
                    居家
                  </a>
                </Col>
                <Col span={3}>
                  <a
                    onClick={this.onChangeListType}
                    name={"美妆"}
                    style={{ color: "#5F5F63" }}
                  >
                    美妆
                  </a>
                </Col>
                <Col span={3}>
                  <a
                    onClick={this.onChangeListType}
                    name={"运动"}
                    style={{ color: "#5F5F63" }}
                  >
                    运动
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Card style={{ marginTop: 24 }}>
          <h2>{productClass}列表</h2>
          <Row
            gutter={40}
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: 12
              // justifyContent:'space-between'
            }}
          >
            {goodsList && goodsList.map(item => goodsItem(item))}
          </Row>
        </Card>
      </PageHeaderLayout>
    );
  }
}
