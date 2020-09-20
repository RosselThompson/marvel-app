import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { Presentation } from "./Presentation";
import { createURL, marvelAPI } from "../../services/marvelAPI";
import { HandleAPI } from "../../utils/handleAPI";

const initFilters = {
	order: "name",
	offset: "0",
	name: null,
	comics: null,
	stories: null,
};

const Container = () => {
	const { enqueueSnackbar } = useSnackbar();

	const [status, setStatus] = useState("ready");
	const [filters, setFilters] = useState(initFilters);
	const [formValues, setformValues] = useState({
		name: "",
		comics: [],
		stories: [],
	});
	const [data, setData] = useState({});
	const [comicsData, setComicsData] = useState({});
	const [storiesData, setStoriesData] = useState({});
	const [page, setPage] = useState(1);
	const [open, setOpen] = useState(false);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { getComics(); getStories();}, []);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => getData(), [filters]);

	const createFilterString = () => {
		let URL = "";
		if (!!filters.order) URL += `&orderBy=${filters.order}`;
		if (!!filters.offset) URL += `&offset=${filters.offset}`;
		if (!!filters.name) URL += `&nameStartsWith=${filters.name}`;
		if (!!filters.comics) URL += `&comics=${filters.comics}`;
		if (!!filters.stories) URL += `&stories=${filters.stories}`;
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
		const request = createURL("/characters", createFilterString());
		setStatus("loading");
		marvelAPI
			.get(request)
			.then(({ data: { data } }) => {
				setData( {...data, results: data.results.map(e=>({...e, type:'characters' ,isFavorite: searchFavorite(e.id) })) } );
				setStatus("ready");
			})
			.catch((error) => {
				HandleAPI(enqueueSnackbar, error.response);
			});
	};

	const getComics = () => {
		const request = createURL("/comics", "&limit=100");
		marvelAPI
			.get(request)
			.then(({ data: { data } }) => {
				setComicsData(data);
			})
			.catch((error) => {
				HandleAPI(enqueueSnackbar, error.response);
			});
	};

	const getStories = () => {
		const request = createURL("/stories", "&limit=100");
		marvelAPI
			.get(request)
			.then(({ data: { data } }) => {
				setStoriesData(data);
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

	const handleSort = () => {
		setFilters({
			...filters,
			order: filters.order === "name" ? "-name" : "name",
		});
	};

	const handleInputChange = (e) => {
		setformValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const applyFilter = () => {
		const comics = formValues.comics.map((e) => e.id);
		const stories = formValues.stories.map((e) => e.id);
		setOpen(false);
		setFilters({
			...initFilters,
			name: formValues.name || null,
			comics: String(comics.join(",")) || null,
			stories: String(stories.join(",")) || null,
		});
	};

	return (
		<Presentation
			status={status}
			data={data}
			page={page}
			handlePagination={handlePagination}
			handleSort={handleSort}
			handleInputChange={handleInputChange}
			filters={filters}
			open={open}
			setOpen={() => setOpen(!open)}
			comicsData={comicsData}
			storiesData={storiesData}
			formValues={formValues}
			applyFilter={applyFilter}
		/>
	);
};

export default Container;
