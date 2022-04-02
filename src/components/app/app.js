import { Component } from 'react/cjs/react.development';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import AppList from '../app-list/app-list';
import AppAddForm from '../app-add-form/app-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'Title 1', description: 'lorem ipsum dolor', date: '2022-04-01', increase: false, similar: false, rise: true, id: 1},
                {name: 'Title 2', description: 'lorem ipsum dolor fati', date: '2022-04-01', increase: true, similar: false, rise: false, id: 2},
                {name: 'Title 3', description: 'lorem ipsum ', date: '2022-04-01', increase: false, similar: false, rise: false, id: 3},
            ],
            term: '',
            filter: ''
        }
        this.maxId = 4;
    }

    componentDidUpdate() {
        this.similarSentences(this.state.data)
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, description, date) => {
        const newItem = {
            name,
            description,
            date,
            increase: false,
            similar: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem]
            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    search = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    isSameSentences = (str, str2) => {
        const firstSentence = str?.split(' ');
        const secondSentence = str2?.split(' ');
    
        return firstSentence?.some(word => secondSentence?.includes(word));
    }

    similarSentences = (items) => {
        for( let i = 0; i <= items.length; i++ ) { 
            for( let x = i + 1; x <= items.length; x++) {
                const isTheSame = this.isSameSentences(items[i]?.description, items[x]?.description);
        
                if(isTheSame){
                    items[i].similar = true;
                    items[x].similar = true;
                }

            }
        }
    } 

    filterPost = (items, filter) => {
        switch(filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'similar': 
                return items.filter(item => item.similar)
            default: 
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const visibleData = this.filterPost(this.search(data, term), filter);
        
        return (
            <div className="app">
                <AppInfo/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter}
                                onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <AppList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <AppAddForm onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App;
