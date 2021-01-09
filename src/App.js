import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getUsers, getUsersPosts, getUsersComments } from './Requests';
import {
	SelectInput,
	InputContainer,
	InputWrapper,
	Email,
	Comment,
} from './style';

function App() {
	const [user, setUsers] = useState([]);
	const [userPosts, setUsersPosts] = useState([]);
	const [comments, setComments] = useState([]);
	const [errorRequest, setErrorRequest] = useState(false);
	const { register, handleSubmit, watch } = useForm();
	let watchUser = watch('userId');
	let watchPost = watch('userPost');

	useEffect(() => {
		async function fetchInitialData() {
			const response = await getUsers();
			response.errors ? setErrorRequest(true) : setUsers(response);
		}

		fetchInitialData();
	}, []);

	useEffect(() => {
		setUsersPosts([]);
		setComments([]);
		async function fetchPosts() {
			const response = await getUsersPosts(watchUser);
			response.errors ? setErrorRequest(true) : setUsersPosts(response);
		}
		if (watchUser) {
			fetchPosts();
		}
	}, [watchUser]);

	useEffect(() => {
		async function fetchComments() {
			const response = await getUsersComments(watchPost);
			response.errors ? setErrorRequest(true) : setComments(response);
		}
		if (watchPost) {
			fetchComments();
		}
	}, [watchPost]);

	return (
		<div>
			<InputContainer>
				<InputWrapper>
					<SelectInput name="userId" ref={register()}>
						<option value="">Choose a user</option>
						{user.map((value) => (
							<option value={value.id} key={value.id}>
								{value.username}
							</option>
						))}
					</SelectInput>
				</InputWrapper>
				<InputWrapper>
					<SelectInput name="userPost" ref={register()}>
						<option value="">Choose a post</option>
						{userPosts.map((value) => (
							<option value={value.id} key={value.id}>
								{value.title}
							</option>
						))}
					</SelectInput>
				</InputWrapper>
			</InputContainer>
			<h1>Comments</h1>
			{comments.map((value) => (
				<div key={value.id}>
					<Email>{value.email}</Email>
					<Comment>{value.body}</Comment>
					<hr />
				</div>
			))}
		</div>
	);
}

export default App;
