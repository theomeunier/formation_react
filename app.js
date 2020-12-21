function WelcomeFunc({name, children}) {
    return <div>
        <h1>bonjour {name}</h1>
        <p>
            {children}
        </p>
    </div>
}

class Welcome extends React.Component {

    render() {
        return <div>
            <h1>Bonjours {this.props.name}</h1>
            <p>
                {this.props.children}
            </p>
        </div>
    }
}

class Clok extends React.Component {

    constructor(props) {
        super(props);
        this.state = {date: new Date()}
        this.timer = null
    }

    componentDidMount() {
        this.timer = window.setInterval(() => {
            this.tick.bind(this)
        }, 1000)
    }

    componentWillUnmount() {
        window.clearInterval(this.timer)
    }

    tick() {
        this.setState({date: new Date})
    }

    render() {
        const date = new Date()
        return <div>
            Il est {this.state.date.toLocaleDateString()} {this.state.date.toLocaleTimeString()}
        </div>
    }
}

class Incrementer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {n: props.start, timer: null}
        this.toggle = this.toggle.bind(this)
        this.reset = this.reset.bind(this)
    }

    componentDidMount() {
        this.play()
    }

    componentWillUnmount() {
        window.clearInterval(this.state.timer)
    }

    increment() {
        this.setState(function (state, props) {
            return {n: state.n + props.step}
        })
    }

    pause() {
        window.clearInterval(this.state.timer)
        this.setState({
            timer : null
        })
    }

    play() {
        window.clearInterval(this.state.timer)
        this.setState({
            timer : window.setInterval(this.increment.bind(this), 1000)
        })
    }

    toggle(){
        return this.state.timer ? this.pause() : this.play()
    }

    label (){
        return this.state.timer ? 'Pause' : 'Lecture'
    }

    reset(){
        this.pause()
        this.play()
        this.setState((state, props) => ({n: props.start}))
    }

    //le render est appeler tout le temps
    render() {
        return <div>
            Valeur : {this.state.n}
            <button onClick={this.toggle}>{this.label()}</button>
            <button onClick={this.reset}>Réinitialiser</button>
        </div>
    }
}

Incrementer.defaultProps = {
    start: 0,
    step: 1,
}


function Home() {
    return <div>
        <Welcome name="Jean"/>
        <Welcome name="theo"/>
        <Incrementer/>
    </div>
}

ReactDOM.render(<Home/>, document.querySelector('#app'))