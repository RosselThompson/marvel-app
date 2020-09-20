import React from 'react'
import { Grid } from "@material-ui/core";
import { Loader } from "../../helpers/Loader";
import { TitleScreen, ListScreen } from "./components";

export const Presentation = (props) => {
    const { status, data, page, handlePagination, handleSort, filters } = props;
	return (
		<>
			{status === "loading" ? (
				<Loader />
			) : (
				<Grid container>
					<TitleScreen data={data} handleSort={handleSort} filters={filters} />
					
					<ListScreen
						data={data}
						page={page}
						handlePagination={handlePagination}
					/>
				</Grid>
			)}
		</>
	);
}

