import homePage from './views/app-home.cmp.js'
import aboutPage from './views/app-about.cmp.js'

import noteApp from './views/note-app.cmp.js'
import mailApp from './apps/mail/pages/mail-app.cmp.js'
import mailDetails from './apps/mail/pages/mail-details.cmp.js'

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
			path: '/mail',
			component: mailApp
		},
		{
			path: '/mail/:id',
			component: mailDetails
		},

	],
}

export const router = createRouter(routerOptions)
