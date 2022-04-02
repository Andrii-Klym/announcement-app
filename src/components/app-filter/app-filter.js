import './app-filter.css';

const AppFilter = (props) => {
    const buttonsData = [
        {name: 'similar', label: 'Similar announcement'},
        {name: 'rise', label: 'Rise'}
    ];

    const buttons = buttonsData.map(({label, name}) => {
        const active = props.filter === name;
        const clazz = active ? 'btn-light' : 'btn-outline-light';
        return (
            <button className={`btn ${clazz}`}
                    type="button"
                    onClick={() => props.onFilterSelect(name)}
                    key={name}>
                        {label}
            </button>
        )
    })

    return (
        <div className="btn-group">
            {buttons}
        </div>
    )
}

export default AppFilter;