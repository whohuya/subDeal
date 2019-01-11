import React, { Component, Fragment,StyleSheet } from "react";
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

@connect()
export default class Details extends Component {
  state = {
    item:"",
  };

  async componentDidMount() {
    const {query}= this.props.location
     await this.setState({
      item:query.item
    })

  }

  onLoadAllGoods = () => {

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
      const {item}=this.state
    return (
      <PageHeaderLayout title="商品详情">
        <BackTop />
        <Card>
          <h1>{item.title}</h1>
          <Row>
            <Col span={12}>
              {console.log(item.img)}
              <Carousel autoplay style={{}}>
                   <div>
                     {item&&<img
                       style={{ width: "100%", height: "100%" }}
                       src={item.img.url}
                     />}
                   </div>
              </Carousel>
            </Col>
            <Col span={12}>

            </Col>
          </Row>
        </Card>

      </PageHeaderLayout>
    );
  }
}
