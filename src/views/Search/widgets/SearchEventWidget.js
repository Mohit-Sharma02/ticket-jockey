import React, { useState } from "react"
import {
  Col,
  FormGroup,
  Input,
  Label,
  Card,
  CardBody,
  CardHeader
} from "reactstrap"
import styled from "styled-components"

import { VIP, PARKING, TOUR, PRACTICE } from "../../../constants/events"

const WidgetSearchCard = styled(Card)`
  width: 80%;
`

const SearchEventWidget = ({ saveFiltersChange }) => {
  const handleFilterChange = evt => {
    saveFiltersChange({
      [evt.target.name]: evt.target.checked
    })
  }

  return (
    <WidgetSearchCard>
      <CardHeader>
        <b>Search Events</b>
      </CardHeader>
      <CardBody>
        <Col className="col-6 mb-3">
          <Input
            type="text"
            autoFocus
            value={keyword}
            onChange={evt => setKeyword(evt.target.value)}
            onKeyPress={evt => {
              if (evt.key === "Enter") {
                if (!keyword) {
                  return appReceiveAlert({
                    message: "Please Input Event Keyword"
                  })
                }

                fetchEventsByKeywordClear()
                fetchEventsByKeywordRequest({ keyword })
              }
            }}
            placeholder="Find millions of live experiences"
          />
        </Col>
        <FormGroup row className="col-12">
          <Col md="1">
            <Label>Filter:</Label>
          </Col>
          <Col md="11">
            <FormGroup check inline>
              <Input
                className="form-check-input"
                type="checkbox"
                id="inline-checkbox1"
                name={PARKING}
                checked={searchEventFilters[PARKING]}
                onChange={evt => handleFilterChange(evt)}
              />
              <Label
                className="form-check-label"
                check
                htmlFor="inline-checkbox1"
              >
                Parking
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Input
                className="form-check-input"
                type="checkbox"
                id="inline-checkbox4"
                name={PRACTICE}
                checked={searchEventFilters[PRACTICE]}
                onChange={evt => handleFilterChange(evt)}
              />
              <Label
                className="form-check-label"
                check
                htmlFor="inline-checkbox4"
              >
                Practice
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Input
                className="form-check-input"
                type="checkbox"
                id="inline-checkbox2"
                name={TOUR}
                checked={searchEventFilters[TOUR]}
                onChange={evt => handleFilterChange(evt)}
              />
              <Label
                className="form-check-label"
                check
                htmlFor="inline-checkbox2"
              >
                Tour
              </Label>
            </FormGroup>
            <FormGroup check inline>
              <Input
                className="form-check-input"
                type="checkbox"
                id="inline-checkbox3"
                name={VIP}
                checked={searchEventFilters[VIP]}
                onChange={evt => handleFilterChange(evt)}
              />
              <Label
                className="form-check-label"
                check
                htmlFor="inline-checkbox3"
              >
                Vip
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>
      </CardBody>
    </WidgetSearchCard>
  )
}

export default SearchEventWidget
