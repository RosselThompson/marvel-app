import React, { useState, useEffect } from "react";
import { Presentation } from "./Presentation";

const Container = () => {
	const [status, setStatus] = useState("ready");
	const [data, setData] = useState([]);

	useEffect(() => {
        setStatus('loading');
		const favoriteArray = localStorage.getItem("favorite");
        if (!!favoriteArray) setData(JSON.parse(favoriteArray));
        setStatus('ready');
	}, []);

	return <Presentation status={status} data={data} />;
};

export default Container;
