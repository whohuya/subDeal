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
  Select,
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
const FormItem = Form.Item
const Option = Select.Option

@connect()
class GoodsList extends Component {
  state = {
    GoodsList: [],
    replayList: [],
    GoodsDetail: {},
    GoodsId: null,
    updateId:null,
    modalVisible: false,
    loading: false,
    render: <div>暂无数据</div>
  }

  async componentWillMount () {

  }

  async componentDidMount () {
    this.onLoadGoodsList()
    this.onLoadReplay()
  }

  onLoadGoodsList = () => {
    const user = Parse.User.current()
    this.setState({
      loading: true
    })
    this.props.dispatch({
      type: 'dashboard/goods/fetchBySellName',
      payload: {
        id: user.id
      },
      callback: res => {
        this.setState({
          GoodsList: res,
          loading: false
        })
      }
    })
  }
  onLoadReplay = () => {
    const user = Parse.User.current()
    this.setState({
      loading: true
    })
    this.props.dispatch({
      type: 'dashboard/goods/fetchByReplay',
      payload: {
        id: user.id
      },
      callback: res => {
        this.setState({
          replayList: res,
          loading: false
        })
      }
    })
  }

  onCancelGoodsList = (item) => {
    this.props.dispatch({
      type: 'dashboard/goods/sell',
      payload: {
        id: item.id,
      },
      callback: res => {
        res === 'ok'
          ? message.success('已下架！')
          : message.error('下架失败')
        this.onLoadReplay()
        this.onLoadGoodsList()
      }
    })

  }
  handleAgainUpload = (item) => {
    this.props.dispatch({
      type: 'dashboard/goods/replay',
      payload: {
        id: item.id,
      },
      callback: res => {
        res === 'ok'
          ? message.success('上架成功！')
          : message.error('上架失败！')
        this.onLoadReplay()
        this.onLoadGoodsList()
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
          id: record.id,
        },
        callback: (res) => {
          this.setState({
            GoodsId: record.id,
            render: <div key={res.key}>
              <p>类型：{res.type}</p>
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
  showModal = (item) => {
    this.setState({
      modalVisible: true,
      updateId:item.id,

    })
    this.props.form.setFieldsValue({
      title: item.title,
      price: item.price,
      wear: item.wear,
      describe: item.describe,
    })
  }

  handleOk = (e) => {
    e.preventDefault()

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: "dashboard/goods/update",
          payload: {
            ...values,
            id:this.state.updateId
          },
          callback:(res)=>{
            res === 'ok'
              ? message.success('修改成功！')
              : message.error('修改失败！')
            this.setState({
              updateId:null
            })
            this.onLoadReplay()
          }

        });
      }
    })
    this.setState({
      modalVisible: false,
    })
  }

  handleCancel = (e) => {
    this.setState({
      modalVisible: false,
    })
  }

  render () {
    const {GoodsList, GoodsId, loading, replayList, modalVisible} = this.state
    const {getFieldDecorator} = this.props.form
    return (
      <PageHeaderLayout title="已发布的商品">
        <BackTop/>
        <Modal
          title="修改相关内容"
          visible={modalVisible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form onSubmit={this.handleOk}>
            <FormItem label='商品名称'>
              {getFieldDecorator('title', {

                rules: [
                  {required: true, message: '不能为空！'}
                ]
              })(
                <Input
                  prefix={
                    <Icon type="shopping-cart" style={{color: 'rgba(0,0,0,.25)'}}/>
                  }
                  placeholder="商品名称"
                />
              )}
            </FormItem>
            <FormItem label='商品价格'>
              {getFieldDecorator('price', {

                rules: [
                  {required: true, message: '价格!'}
                ]
              })(
                <Input
                  prefix={
                    <Icon type="wallet" style={{color: 'rgba(0,0,0,.25)'}}/>
                  }
                  placeholder="价格"
                />
              )}
            </FormItem>
            <FormItem label={'商品成色'}>
              {getFieldDecorator('wear', {
                rules: [
                  {required: true, message: '不能为空!'}
                ]
              })(
                <Select>
                  <Option value={'五成新'}>五成新</Option>
                  <Option value={'六成新'}>六成新</Option>
                  <Option value={'七成新'}>七成新</Option>
                  <Option value={'八成新'}>八成新</Option>
                  <Option value={'九成新'}>九成新</Option>
                  <Option value={'全新'}>全新</Option>
                </Select>
              )}
            </FormItem>
            <FormItem label={'详细描述'}>
              {getFieldDecorator('describe', {
              })(
                <Input.TextArea
                  rows={4}
                  prefix={
                    <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>
                  }
                  placeholder="描述"
                />
              )}
            </FormItem>
            <FormItem style={{}}>
              <Button
                style={{width: '100%'}}
                size="large"
                type="primary"
                htmlType="submit"
              >
                确 认 修 改
              </Button>

            </FormItem>
          </Form>
        </Modal>
        <Card>
          <Table
            dataSource={GoodsList}
            rowKey="id"
            loading={loading}
            onChange={this.onLoadGoodsList}
            onExpand={this.handleOnExpand}
            expandedRowKeys={[GoodsId]}
            expandedRowRender={() => this.rowRender()}
          >
            <Column
              title="图片"
              dataIndex="starGoods.img"
              key="img"
              render={(text, item) => (
                <div><img style={{width: 60, height: 60}} src={item.img.url}/></div>
              )}
            />
            <Column
              title="标题"
              dataIndex="title"
              key="title"
            />
            <Column
              title="价格（￥）"
              dataIndex="price"
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
                  <Link to={{pathname: '/GoodsDetails', query: {id: item.id}}}>
                    查看详情
                  </Link>
                  <span className='ant-divider'/>
                  <Popconfirm
                    title="确定要下架？"
                    onConfirm={() => this.onCancelGoodsList(item)}
                  >
                    <a href="#">下架商品</a>
                  </Popconfirm>
                </div>
              )}
            />
          </Table>
        </Card>
        <Card style={{marginTop: 32}}>
          <h2>已下架商品</h2>
          <Table
            dataSource={replayList}
            rowKey="id"
            loading={loading}
            onChange={this.onLoadGoodsList}
            onExpand={this.handleOnExpand}
            expandedRowKeys={[GoodsId]}
            expandedRowRender={() => this.rowRender()}
          >
            <Column
              title="图片"
              dataIndex="starGoods.img"
              key="img"
              render={(text, item) => (
                <div><img style={{width: 60, height: 60}} src={item.img.url}/></div>
              )}
            />
            <Column
              title="标题"
              dataIndex="title"
              key="title"
            />
            <Column
              title="价格（￥）"
              dataIndex="price"
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
                  <a onClick={() => this.showModal(item)}>
                    修改
                  </a>
                  <span className='ant-divider'/>
                  <Popconfirm
                    title="确定要重新上架？"
                    onConfirm={() => this.handleAgainUpload(item)}
                  >
                    <a href="#">重新上架</a>
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

const GoodsPage = Form.create()(GoodsList)

export default GoodsPage
