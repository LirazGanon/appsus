import homePage from './views/app-home.cmp.js'
import aboutPage from './views/app-about.cmp.js'

import noteApp from './views/note-app.cmp.js'
import mailApp from './apps/mail/pages/mail-app.cmp.js'
import mailDetails from './apps/mail/pages/mail-details.cmp.js'
import noteEdit from './apps/keep/pages/note-details.cmp.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: homePage,
			children: [
				{
					path: '/about',
					component: aboutPage
				}
			]
		},
		{
			path: '/note',
			component: noteApp,
			children: [
				{
					path: '/note/edit/:id',
					component: noteEdit
				}
				,
			]
		},
		{
			path: '/mail',
			component: mailApp,
			children: [
				{
					path: '/mail/:id',
					component: mailDetails
				}
			]
		},
		// {
		// 	path: '/mail/:id',
		// 	component: mailDetails
		// }

	],
}

export const router = createRouter(routerOptions)
