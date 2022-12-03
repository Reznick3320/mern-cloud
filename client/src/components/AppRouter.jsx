import React, { useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Registration from './registration/Registration';
import Login from './registration/Login';
import { useDispatch, useSelector } from "react-redux";
import { auth } from './../actions/user';
import Disk from './disk/Dist';


const AppRouter = () => {
	const isAuth = useSelector(state => state.user.isAuth);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(auth())
	}, [])
	return (
		<>
			<Navbar />
			{!isAuth ?
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/registration" element={<Registration />} />
					<Route path="*" element={<Navigate to='/login' />} />
				</Routes>
				:
				<Routes>
					<Route path="/" element={<Disk />} />
					<Route path="*" element={<Navigate to='/' />} />
				</Routes>
			}
		</>

	)
}

export default AppRouter;