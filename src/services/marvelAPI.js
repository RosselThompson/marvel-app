import axios from "axios";

const HASH = "27b0750043dd4e7e3e7936605acacaa7";
const BASE_URL = "https://gateway.marvel.com:443/v1/public";
const PUBLIC_KEY = "5397938ec144494bc378c4aa812fccae";
const TS = "1";

export const createURL = (path, filters = '') => `${BASE_URL}${path}?apikey=${PUBLIC_KEY}&hash=${HASH}&ts=${TS}${filters}`;

export const marvelAPI =
	axios.create({
		headers: { "Content-Type": "application/json" },
	});
