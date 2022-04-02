import { Component } from 'react/cjs/react.development';

import './app-add-form.css';

class AppAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            date: ''
        }
    }

    onValueChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.name.length < 3 || !this.state.description || !this.state.date) return;
        this.props.onAdd(this.state.name, this.state.description, this.state.date, this.state.similar);
        this.setState({
            name: '',
            description: '',
            date: ''
        })
    }
    
    render() {
        const {name, description, date} = this.state;
        
        return (
            <div className="app-add-form">
                <h3>Add new announcement</h3>
                <form
                    className="add-form d-flex"
                    onSubmit = {this.onSubmit}>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Add title"
                        name="name"
                        value={name}
                        onChange={this.onValueChange}/>
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Add description"
                        name="description"
                        value={description} 
                        onChange={this.onValueChange}/>
                    <input type="date"
                        className="form-control new-post-label"
                        placeholder="Add date"
                        name="date"
                        value={date} 
                        onChange={this.onValueChange}/>
                    <button type="submit"
                            className="btn btn-outline-light">Add</button>
                </form>
            </div>
        )
    }
}

export default AppAddForm;