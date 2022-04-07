import React from 'react'
import {useParams} from 'react-router-dom'
import SearchComponent from './SearchComponent'

function Search(props) {
	let {id} = useParams();
	return (
		<SearchComponent searchTerm={id} />
	)
}

export default Search