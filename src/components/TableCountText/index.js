import React from 'react'
import styles from './index.less'

export default ({children}) => <p className={styles.countText}>共搜索到 {children} 条数据</p>
