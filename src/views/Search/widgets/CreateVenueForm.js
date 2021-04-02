import React, { useState, useEffect } from "react"
import styled from "styled-components"
import {
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Form,
  Pagination
} from "react-bootstrap"

// React DateRangePicker
import "react-dates/initialize"
import { DateRangePicker } from "react-dates"
import "react-dates/lib/css/_datepicker.css"
import "./react_dates_overrides.css"

import { stockTypes } from "../../../constants"

const CreateVenueForm = ({
  setSkyBoxVenueId,
  skyBoxVenueId,
  setTMasterVenueId,
  tMasterVenueId,
  firstSearchEvent: {
    venueId,
    eventDate,
    eventAddress,
    eventId,
    timeZone,
    eventName,
    VenueName,
    VenueAddress,
    VenueCity,
    VenueState,
    VenueCityState,
    VenuePostalCode
  },
  handleCreate,
  searchSkyboxVenueIdRequest
}) => {
  // const [dateRange, setDateRange] = useState({
  //   startDate: null,
  //   endDate: null,
  //   focusedInput: null
  // })

  const [stockType, setStockType] = useState(stockTypes[2])

  useEffect(() => {
    if (eventId) {
      searchSkyboxVenueIdRequest({
        events: {
          eventInfo: [
            {
              venueId,
              eventDate,
              eventAddress,
              eventId,
              timeZone,
              eventName,
              VenueName,
              VenueAddress,
              VenueCity,
              VenueState,
              VenueCityState,
              VenuePostalCode
            }
          ]
        }
      })
    }
  }, [eventId])

  return (
    <div className="white_box mrgbtm50 bx_min_HH">
      <div className="cm_ttl">
        <h2>Create Managed Venue</h2>
      </div>
      <div className="inner_box_body">
        <Form>
          <Form.Group>
            <Form.Label>TMaster Venue Id:</Form.Label>
            <Form.Control
              name="tMasterVenueId"
              id="tMasterVenueId"
              value={tMasterVenueId || venueId}
              onChange={evt => setTMasterVenueId(evt.target.value)}
              type="text"
              placeholder=""
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>SkyBox Venue Id:</Form.Label>
            <Form.Control
              name="skyBoxVenueId"
              id="skyBoxVenueId"
              value={skyBoxVenueId}
              onChange={evt => setSkyBoxVenueId(evt.target.value)}
              type="text"
              placeholder=""
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Stock Type:</Form.Label>
            <Form.Control
              as="select"
              name="stockType"
              id="stockType"
              defaultValue="MOBILE_SCREENCAP"
              onChange={evt => setStockType(evt.target.value)}
            >
              {stockTypes.map(type => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="text-center">
            <Button
              className="big_btn"
              variant="primary"
              onClick={() =>
                handleCreate({
                  // startDate: dateRange.startDate,
                  // endDate: dateRange.endDate,
                  tMasterVenueId: tMasterVenueId || venueId,
                  skyboxVenueId: skyBoxVenueId, //the shape api expect
                  stockType
                })
              }
            >
              Create
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  )
}

export default CreateVenueForm
