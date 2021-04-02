import React from "react"
import ReactDOM from "react-dom"

class Checkbox extends React.Component {
  componentDidMount() {
    this.update(this.props.checked)
  }
  componentWillReceiveProps(props) {
    this.update(props.checked)
  }
  update(checked) {
    ReactDOM.findDOMNode(this).indeterminate = checked === "indeterminate"
  }
  render() {
    return (
      <input
        className="react-bs-select-all"
        type="checkbox"
        name={"checkbox" + this.props.rowIndex}
        id={"checkbox" + this.props.rowIndex}
        checked={this.props.checked}
        onChange={this.props.onChange}
      />
    )
  }
}

class CustomMultiSelectTable extends React.Component {
  customMultiSelect() {}
  render() {
    if (this.props.rowIndex === "Header") {
      return (
        <div className="checkbox-personalized">
          <Checkbox {...this.props} />
          <label htmlFor={"checkbox" + this.props.rowIndex}>
            <div className="check"></div>
          </label>
        </div>
      )
    } else {
      return (
        <div className="checkbox-personalized">
          <input
            type={this.props.type}
            name={"checkbox" + this.props.rowIndex}
            id={"checkbox" + this.props.rowIndex}
            checked={this.props.checked}
            disabled={this.props.disabled}
            onChange={e => this.props.onChange(e, this.props.rowIndex)}
            ref={input => {
              if (input) {
                input.indeterminate = this.props.indeterminate
              }
            }}
          />
          <label htmlFor={"checkbox" + this.props.rowIndex}>
            <div className="check"></div>
          </label>
        </div>
      )
    }
  }
}

export default CustomMultiSelectTable
