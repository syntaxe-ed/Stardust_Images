import React from 'react'
import {useParams} from 'react-router-dom'
import SearchComponent from './SearchComponent'

class Search extends React.Component {
	render() {
		return (
			<SearchComponent searchTerm={this.props.match.params.id} />
		)
	}
}

export default Search