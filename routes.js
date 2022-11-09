import homePage from './views/app-home.cmp.js'
import aboutPage from './views/app-about.cmp.js'

import noteApp from './views/note-app.cmp.js'
import emailApp from './views/app-email.cmp.js'
import emailDetails from './views/app-details.cmp.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: homePage,
		},
		{
			path: '/about',
			component: aboutPage,
		},
		{
			path: '/note',
			component: noteApp
		},
		{
			path: '/email',
			component: emailApp
		},
		{
			path: '/email/:id',
			component: emailDetails
		},

	],
}

export const router = createRouter(routerOptions)
