import React, { Component, Fragment, StyleSheet } from 'react'
import { connect } from 'dva'
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
  Tooltip,
  Menu,
  Dropdown
} from 'antd'
import { Link } from 'dva/router'
import moment from 'moment'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import { Parse } from '../../utils/leancloud'

const Column = Table.Column
@connect()
export default class Star extends Component {
  state = {
    star: [],
    GoodsDetail: {},
    GoodsId: null,
    loading:false,
    render: <div>暂无数据</div>
  }

  async componentWillMount () {

  }

  async componentDidMount () {
    this.onLoadStar()
  }

  onLoadStar = () => {
    const user = Parse.User.current()
    this.setState({
      loading:true
    })
    this.props.dispatch({
      type: 'dashboard/star/fetchByUserId',
      payload: {
        id: user.id
      },
      callback: res => {
        this.setState({
          star: res,
          loading:false
        })
      }
    })
  }

  onCancelStar = async (item) => {

    const user = await Parse.User.current();

    this.props.dispatch({
      type: "dashboard/star/cancel",
      payload: {
        id:item.Goods,
        user: user.id
      },
      callback: res => {
        res === "ok"
          ? message.success("已取消收藏！")
          : message.error("取消失败");
        this.onLoadStar()
      }

    });

  };

  onLoadGoods = async (id) => {
    await this.props.dispatch({
      type: 'dashboard/dashboard/queryById',
      payload: {
        id,
      },
      callback: (res) => {
        this.setState({
          GoodsId: res.id,
          render: <div key={res.key}>
            <p>卖家：{res.sellName.name}</p>
            <p>商品描述：{res.describe === undefined ? `无相关具体描述` : `${res.describe}`}</p>
          </div>
        })
      }
    })

  }

  rowRender = () => {
    const {render} = this.state
    return render
  }
  handleOnExpand = async (expanded, record) => {
    if (expanded) {
      await this.props.dispatch({
        type: 'dashboard/dashboard/queryById',
        payload: {
          id:record.Goods,
        },
        callback: (res) => {
           this.setState({
            GoodsId: record.id,
            render: <div key={res.key}>
              <p>类型：{res.type}</p>
              <p>卖家：{res.sellName.name}</p>
              <p>商品描述：{res.describe === undefined ? `无相关具体描述` : `${res.describe}`}</p>
            </div>
          })
        }
      })
    } else if (!expanded) {
      this.setState({
        GoodsId: null,
        render: null
      })
    }
  }

  render () {
    const {star, GoodsId,loading} = this.state
    return (

      <PageHeaderLayout title="我的收藏">
        <Card>
          <Table
            dataSource={star}
            rowKey="id"
            loading={loading}
            onChange={this.onLoadStar}
            onExpand={this.handleOnExpand}
             expandedRowKeys={[GoodsId]}
            expandedRowRender={() => this.rowRender()}
          >
            <Column
              title="图片"
              dataIndex="starGoods.img"
              key="img"
              render={(text, item) => (
                <div><img style={{width: 60, height: 60}} src={text.attributes.url}/></div>
              )}
            />
            <Column
              title="标题"
              dataIndex="starGoods.title"
              key="title"
            />
            <Column
              title="价格（￥）"
              dataIndex="starGoods.price"
              key="price"
            />
            <Column
              title="上传时间"
              dataIndex="CreateAt"
              render={(text, item) => (
                <div>{moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>
              )}
            />
            <Column
              title="操作"
              render={(text, item) => (
                <div>
                  <Link to={{pathname: '/GoodsDetails', query: {id: item.Goods}}}>
                    查看详情
                  </Link>
                  <span className='ant-divider' />
                  <Popconfirm
                    title="确定要取消收藏吗？"
                    onConfirm={() => this.onCancelStar(item)}
                  >
                    <a href="#">取消收藏</a>
                  </Popconfirm>
                </div>
              )}
            />
          </Table>
        </Card>
      </PageHeaderLayout>
    )
  }
}
