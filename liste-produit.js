const PRODUCTS = [
    { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
    { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
    { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
    { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
    { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
    { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

function ProductRow({ product }) {

    const name = product.stocked ? product.name :
        <span className="text-danger">{product.name}</span>

    return <tr>
        <td> {name}</td>
        <td> {product.price}</td>
    </tr>
}

function ProductCategoryRow({ category }) {
    return <tr>
        <th colSpan="2">{category}</th>
    </tr>
}

function ProductTable({ products, inStockOnly, filterText }) {
    const rows = []
    let lastCategory = null

    products.forEach(products => {
        if (inStockOnly && !products.stocked) {
            return
        }
        if (products.name.indexOf(filterText) === -1) {
            return
        }
        if (products.category !== lastCategory) {
            lastCategory = products.category
            rows.push(<ProductCategoryRow key={lastCategory} category={products.category} />)
        }
        rows.push(<ProductRow key={products.name} product={products} />)
    })

    return <table className="table">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Prix</th>
            </tr>
        </thead>
        <tbody>{rows}</tbody>
    </table>
}

class SearchBar extends React.PureComponent {

    constructor(props) {
        super(props);
        this.handelFilterTextChange = this.handelFilterTextChange.bind(this)
        this.handelInStockChange = this.handelInStockChange.bind(this)
    }

    handelFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value)
    }

    handelInStockChange(e) {
        this.props.onStockChange(e.target.checked)
    }

    render() {
        const { filterText, inStockOnly } = this.props
        return <div className="mb-2">
            <div className="form-group mb-0">
                <input type="text" value={filterText} className="form-control" placeholder="Rechercher"
                    onChange={this.handelFilterTextChange} />
            </div>
            <div className="form-check mt-2">
                <input type="checkbox" checked={inStockOnly} className="form-check-input" id="stock"
                    onChange={this.handelInStockChange} />
                <label htmlFor="stock" className="form-check-label">Produit en stock seulement</label>
            </div>
        </div>
    }
}

class FilterableProductTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
            inStockOnly: false
        }
        this.handelFilterTextChange = this.handelFilterTextChange.bind(this)
        this.handelInStockChange = this.handelInStockChange.bind(this)
    }

    handelFilterTextChange(filterText) {
        this.setState({ filterText })
    }

    handelInStockChange(inStockOnly) {
        this.setState({ inStockOnly })
    }

    render() {
        const { products } = this.props
        return <React.Fragment>
            <SearchBar
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
                onFilterTextChange={this.handelFilterTextChange}
                onStockChange={this.handelInStockChange}
            />
            <ProductTable
                products={products}
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
            />
        </React.Fragment>
    }
}


ReactDOM.render(
    <FilterableProductTable products={PRODUCTS} />,
    document.getElementById('list')
)