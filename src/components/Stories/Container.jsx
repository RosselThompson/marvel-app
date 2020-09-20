import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { Presentation } from "./Presentation";
import { createURL, marvelAPI } from "../../services/marvelAPI";
import { HandleAPI } from "../../utils/handleAPI";

const initFilters = {
	order: "id",
	offset: "0"
};

const Container = () => {
	const { enqueueSnackbar } = useSnackbar();

	const [status, setStatus] = useState("ready");
	const [filters, setFilters] = useState(initFilters);
	const [data, setData] = useState({});
	const [page, setPage] = useState(1);
	
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() =>  getData() , [filters]);

	const createFilterString = () => {
		let URL = "";
		if (!!filters.order) URL += `&orderBy=${filters.order}`;
		if (!!filters.offset) URL += `&offset=${filters.offset}`;
		return URL;
	};

	const searchFavorite = (id)=>{
		const favoriteArray = localStorage.getItem('favorite');
		if(!favoriteArray){return false}
		else{
			const array = JSON.parse(favoriteArray);
			if(array.filter(e=> e.id === id).length > 0) {
				return true
			}else{
				return false
			}
		}
	}

	const getData = () => {
		const request = createURL("/stories", createFilterString());
		setStatus("loading");
		marvelAPI
			.get(request)
			.then(({ data: { data } }) => {
				setData( {...data, results: data.results.map(e=>({...e,  type:'stories' , isFavorite: searchFavorite(e.id) })) } );
				setStatus("ready");
			})
			.catch((error) => {
				HandleAPI(enqueueSnackbar, error.response);
			});
	};

	const handlePagination = (event, value) => {
		const size = (value - 1) * 20;
		setPage(value);
		setFilters({ ...filters, offset: size });
	};

	const handleSort = () =>{
		setFilters({ ...filters, order: filters.order === 'id' ? '-id' : 'id' })
	}

	return (
		<Presentation
			status={status}
			data={data}
			page={page}
			handlePagination={handlePagination}
			handleSort={handleSort}
			filters={filters}
		/>
	);
};

export default Container;