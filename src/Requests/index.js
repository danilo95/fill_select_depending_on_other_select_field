import axios from 'axios';

const url = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com/',
});

export const getUsers = (body) => {
	let result = url
		.get('/users')
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error;
		});

	return result;
};

export const getUsersPosts = (id) => {
	let result = url
		.get(`/posts?userId=${id}`)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error;
		});

	return result;
};

export const getUsersComments = (id) => {
	let result = url
		.get(`/comments?postId=${id}`)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			return error;
		});

	return result;
};
