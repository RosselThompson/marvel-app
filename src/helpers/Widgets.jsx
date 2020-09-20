import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import {
	Grid,
	Card,
	CardHeader,
	CardMedia,
	CardActionArea,
	makeStyles,
    IconButton
} from "@material-ui/core";
import { Favorite } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    header:{
        '& div':{
            '& span':{
                fontSize: '15px'
            }
        }
    },
	media: {
		height: 0,
		paddingTop: "80%", // 16:9
	},
	actionArea:{
		'&:hover':{
			transition: '0.2s ease-in',
			opacity: '0.9'
		}
	}
}));

export const Widgets = (props) => {
	const { data, type, redirect = true, favorite=true } = props;
	const classes = useStyles();
	let history = useHistory();

	const [isfavorite, setIsfavorite] = useState(data.isFavorite)



	const handleFav =(e)=>{
		const favoriteArray = localStorage.getItem('favorite');
		let newArray = !!favoriteArray ? JSON.parse(favoriteArray) : [];
	
		if(newArray.filter(i=> i.id === e.id).length > 0) {
			newArray = newArray.filter(i=> i.id !== e.id);
		}else{
			newArray= [...newArray, { ...e, title: e.title || e.name, isFavorite:true } ]
		}

		localStorage.setItem('favorite', JSON.stringify(newArray) );
		setIsfavorite(!isfavorite);
	}


	return (
		<>
				<Grid item xs={12} sm={6} lg={3} xl={2}>
					<Card>
						<CardHeader
                            className={classes.header}
							title={ type==='characters'? data.name : type === 'comics' ? data.title : data.title}
							action={
								favorite &&
								<IconButton onClick={()=>handleFav(data)}>
									<Favorite 
									style={{
										color:
											isfavorite && "var(--primary-color)"
									}}
									/>
								</IconButton>
							}
						/>
						<CardActionArea className={classes.actionArea} onClick={()=> redirect && history.push(`/${type}/${data.id}`) }>
						<CardMedia
							className={classes.media}
							image={ data.thumbnail ? `${data.thumbnail?.path}.${data.thumbnail?.extension}` : 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' }
							title={data.name}
						/>
						</CardActionArea>
					</Card>
				</Grid>
		</>
	);
};
