import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { Presentation } from "./Presentation";
import { createURL, marvelAPI } from "../../services/marvelAPI";
import { HandleAPI } from "../../utils/handleAPI";

const initFilters = {
	order: "issueNumber",
	offset: "0",
	format: null,
	title: null,
	issueNumber: null,
};

const formatData = [
	{ id: 0, name: "none" },
	{ id: 1, name: "comic" },
	{ id: 2, name: "magazine" },
	{ id: 3, name: "trade paperback" },
	{ id: 4, name: "hardcover" },
	{ id: 5, name: "digest" },
	{ id: 6, name: "graphic novel" },
	{ id: 7, name: "digital comic" },
	{ id: 8, name: "infinite comic" },
];

const Container = () => {
	const { enqueueSnackbar } = useSnackbar();

	const [status, setStatus] = useState("ready");
	const [open, setOpen] = useState(false);
	const [filters, setFilters] = useState(initFilters);
	const [formValues, setformValues] = useState({
		format: formatData[0],
		title: "",
		issueNumber: "",
	});
	const [data, setData] = useState({});
	const [page, setPage] = useState(1);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => getData(), [filters]);

	const createFilterString = () => {
		let URL = "";
		if (!!filters.order) URL += `&orderBy=${filters.order}`;
		if (!!filters.offset) URL += `&offset=${filters.offset}`;
		if (!!filters.format) URL += `&format=${filters.format}`;
		if (!!filters.title) URL += `&titleStartsWith=${filters.title}`;
		if (!!filters.issueNumber) URL += `&issueNumber=${filters.issueNumber}`;
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
		const request = createURL("/comics", createFilterString());
		setStatus("loading");
		marvelAPI
			.get(request)
			.then(({ data: { data } }) => {
				setData( {...data, results: data.results.map(e=>({...e,  type:'comics' ,isFavorite: searchFavorite(e.id) })) } );
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

	const handleSort = () => {
		setFilters({
			...filters,
			order: filters.order === "issueNumber" ? "-issueNumber" : "issueNumber",
		});
	};

	const handleInputChange = (e) => {
		setformValues({ ...formValues, [e.target.name]: e.target.value });
	};

	const applyFilter = () => {
		const format = formValues.format.id !== 0 ? encodeURI(formValues.format.name) : null;
		const title = formValues.title || null;
		const issueNumber = formValues.issueNumber || null;

		setOpen(false);
		setFilters({
			...filters,
			format: format,
			title: title,
			issueNumber: issueNumber,
		});
	};

	return (
		<Presentation
			status={status}
			data={data}
			page={page}
			handlePagination={handlePagination}
			handleSort={handleSort}
			filters={filters}
			open={open}
			setOpen={() => setOpen(!open)}
			handleInputChange={handleInputChange}
			formValues={formValues}
			applyFilter={applyFilter}
			formatData={formatData}
		/>
	);
};

export default Container;
