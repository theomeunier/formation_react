const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit',
}

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9
}

function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32
}

function BoilingVedict({ celsius }) {
  if (celsius >= 100) {
    return <div className="alert alert-success">l'eau bout</div>
  }
  return <div className="alert alert-info"> l'eau ne bout pas </div>
}

function tryConvert(temperature, convert) {
  const value = parseFloat(temperature)
  if (Number.isNaN(value)) {
    return ''
  }
  return ((Math.round(convert(value)) * 100) / 100).toString()
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props)
    this.handelChange = this.handelChange.bind(this)
  }

  //nous permet de changer la valeur
  handelChange(e) {
    this.props.onTemperatureChange(e.target.value)
  }

  render() {
    const { temperature } = this.props
    const name = 'scale' + this.props.scale
    const scaleName = scaleNames[this.props.scale]

    return (
      <div className="form-group">
        <label htmlFor={name}>Température (en {scaleName})</label>
        <input
          type="text"
          id={name}
          value={temperature}
          className="form-control"
          onChange={this.handelChange}
        />
      </div>
    )
  }
}

class Calculator extends React.Component {
  // on crée un construteur qui prendre les props
  constructor(props) {
    super(props)
    this.state = {
      scale: 'c',
      temperature: 20,
    }
    this.handelCelsiusChange = this.handelCelsiusChange.bind(this)
    this.handelFahrenheitChange = this.handelFahrenheitChange.bind(this)
  }

  handelCelsiusChange(temperature) {
    this.setState({
      scale: 'c',
      temperature,
    })
  }

  handelFahrenheitChange(temperature) {
    this.setState({
      scale: 'f',
      temperature,
    })
  }

  render() {
    const { temperature, scale } = this.state
    const celsius =
      scale === 'c' ? temperature : tryConvert(temperature, toCelsius)
    const fahrenheit =
      scale === 'f' ? temperature : tryConvert(temperature, toFahrenheit)

    return (
      <div>
        <BoilingVedict celsius={celsius} />
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handelCelsiusChange}
        />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handelFahrenheitChange}
        />
      </div>
    )
  }
}

ReactDOM.render(<Calculator />, document.querySelector('#convertiseur'))
