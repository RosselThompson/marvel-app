import React from "react";
import { Grid } from "@material-ui/core";
import { Loader } from "../../helpers/Loader";
import { TitleScreen, ListScreen, FilterForm } from "./components";

export const Presentation = (props) => {
	const {
		status,
		data,
		page,
		handlePagination,
		handleSort,
		filters,
		open,
		setOpen,
		handleInputChange,
		formValues,
		applyFilter,
		formatData
	} = props;
	return (
		<>
			{status === "loading" ? (
				<Loader />
			) : (
				<Grid container>
					<TitleScreen data={data} handleSort={handleSort} filters={filters} setOpen={setOpen} />

					<ListScreen
						data={data}
						page={page}
						handlePagination={handlePagination}
					/>

					<FilterForm
						open={open}
						setOpen={setOpen}
						handleInputChange={handleInputChange}
						formValues={formValues}
						applyFilter={applyFilter}
						formatData={formatData}
					/>
				</Grid>
			)}
		</>
	);
};
