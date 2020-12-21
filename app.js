class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nom: '',
            prenom: '',
            newsletter: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const name = e.target.name
        const type = e.target.type
        const value = type === 'checkbox' ? e.target.checked : e.target.value
        this.setState({
            [name]: value
        })
    }

    render() {
        return <div>
            <div>
                <label htmlFor="nom">nom</label>
                <input type="text" id="nom" name="nom" value={this.state.nom} onChange={this.handleChange}/>
            </div>
            <div>
                <label htmlFor="prenom">Prenom</label>
                <input type="text" id="prenom" name="prenom" value={this.state.prenom} onChange={this.handleChange}/>
            </div>
            <div>
                <label htmlFor="newsletter">S'abonner a la newsletter</label>
                <input type="checkbox" checked={this.state.newsletter} value={this.state.newsletter}
                       onChange={this.handleChange} id="newsletter" name="newsletter"/>
            </div>
            <div>
                <input type="text" defaultValue={undefined}/>
            </div>
            {JSON.stringify(this.state)}
        </div>
    }
}

ReactDOM.render(<Home/>, document.querySelector('#app'))