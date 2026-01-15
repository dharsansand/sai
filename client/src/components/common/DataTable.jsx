import React from "react";
import { Table, Button, Popconfirm } from "antd";


const DataTable = ({ data, columns }) => {
  return (
    <div className="table-responsive">
      <Table
        rowKey="_id"         
        dataSource={data}   
        columns={columns}    
        bordered
        pagination={{
          pageSize: 5,       
          showSizeChanger: true,
        }}
      />
    </div>
  );
};

export default DataTable;
