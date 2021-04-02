import React, { useState } from "react"
import { Card, CardHeader, CardBody, Row, Button } from "reactstrap"

import Spinner from "../Spinner"

const DataTableWithCollapseAndFetching = ({
  Table,
  title,
  data,
  enableCollapse = false,
  shown = true,
  renderCustomHeader,
  ...rest
}) => {
  const [collapse, setCollapse] = useState(true)
  const isNotEmpty = Array.isArray(data)
    ? data.length
    : Object.keys(data).length

  if (!shown) return <> </>

  return (
    <Card>
      <CardHeader>
        <b>{title}</b>
        {enableCollapse && (
          <Button
            color="primary"
            className="btn-pill btn-sm"
            onClick={() => setCollapse(!collapse)}
          >
            {collapse ? "Expand" : "Collapse"}
          </Button>
        )}
        {renderCustomHeader && renderCustomHeader()}
      </CardHeader>
      <CardBody>
        <Row className="justify-content-center">
          {isNotEmpty ? (
            !enableCollapse ? (
              <Table data={data} {...rest} />
            ) : (
              !collapse && <Table data={data} {...rest} />
            )
          ) : (
            <Spinner />
          )}
        </Row>
      </CardBody>
    </Card>
  )
}

export default DataTableWithCollapseAndFetching
