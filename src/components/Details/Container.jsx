import React, { useState, useEffect } from "react";
import { Presentation } from "./Presentation";
import { useSnackbar } from "notistack";
import { useParams, useLocation } from "react-router-dom";
import { createURL, marvelAPI } from "../../services/marvelAPI";
import { HandleAPI } from "../../utils/handleAPI";

const Container = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { pathname } = useLocation();
	const { id } = useParams();
	const type = pathname.split("/")[1];

	const infoType =
		type === "characters"
			? ["comics", "stories"]
			: type === "comics"
			? ["characters", "stories"]
			: ["characters", "comics"];

	const [status, setStatus] = useState("ready");
	const [data, setData] = useState({});
	const [dataItem1, setDataItem1] = useState({})
	const [dataItem2, setDataItem2] = useState({})


	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => getData(), []);

	const getData = () => {
		const request = createURL(`/${type}/${id}`, "");
		setStatus("loading");
		marvelAPI
			.get(request)
			.then(({ data: { data } }) => {
				setData(data);
				marvelAPI.get( createURL(`/${type}/${id}/${infoType[0]}`, "") )
				.then( ({data:{data}}) =>{
					setDataItem1(data);
					marvelAPI.get( createURL(`/${type}/${id}/${infoType[1]}`, "") )
					.then( ({data:{data}}) =>{
						setDataItem2(data);
						setStatus("ready");
					})
					.catch((error) => {
						HandleAPI(enqueueSnackbar, error.response);
					});
				} )
				.catch((error) => {
					HandleAPI(enqueueSnackbar, error.response);
				});
			})
			.catch((error) => {
				HandleAPI(enqueueSnackbar, error.response);
			});
	};

	return <Presentation status={status} data={data} dataItem1={dataItem1} dataItem2={dataItem2} type={type} infoType={infoType} />;
};

export default Container;
