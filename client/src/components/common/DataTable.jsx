import React from "react";
import { Table } from "antd";

const DataTable = ({ data = [], columns = [] }) => {
  return (
    <div className="table-responsive">
      <Table
        rowKey={(record) => record._id}   // ✅ stable key
        dataSource={Array.isArray(data) ? data : []}
        columns={columns}
        bordered
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
        }}
      />
    </div>
  );
};

export default DataTable;
