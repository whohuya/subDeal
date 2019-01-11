/**
 * User: Coul Turing
 * Date: 2018/10/26
 * @flow
 */

import React from "react";
import { Card } from "antd";

const ExplainCard = props => {
  const { explain } = props;
  return (
    <Card style={{ marginTop: 24 }} bordered={false}>
      {explain.title && <h4>{explain.title} </h4>}
      {explain.content && explain.content.length > 0 ? (
        explain.content.map((item, index) => <p key={index}>{item}</p>)
      ) : (
        <p>暂无说明文档</p>
      )}
    </Card>
  );
};
export default ExplainCard;
