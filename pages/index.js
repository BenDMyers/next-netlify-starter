import {useEffect, useState} from 'react';
import netlifyAuth from '../netlifyAuth';
import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
	let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated);
	let [user, setUser] = useState(null);

	useEffect(() => {
		netlifyAuth.initialize((user) => {
			setLoggedIn(!!user);
		});
	});

	let login = () => {
		netlifyAuth.authenticate((user) => {
			setLoggedIn(!!user);
			setUser(user);
		});
	}

	let logout = () => {
		netlifyAuth.signout(() => {
			setLoggedIn(false);
			setUser(null);
		});
	};

	return (
		<div className="container">
		<Head>
			<title>Next.js Starter!</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<main>
			<Header title="Welcome to my app!" />
			{loggedIn ?
				<div>Logged in!</div> :
				<button onClick={login}>Log In</button>
			}
			<p className="description">
			Get started by editing <code>pages/index.js</code>
			</p>
		</main>

		<Footer />
		</div>
	)
}
