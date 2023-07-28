import { Router } from 'itty-router';

// now let's create a router (note the lack of "new")
const router = Router();

// GET collection index
router.get('/api', (request) => {
	const {
		yearLower,
		yearUpper,
		year,
		make,
		model,
		firstName,
		lastName,
		phone,
		created,
	} = request.query;
	return new Response(`<?XML VERSION "1.0"?>
	<?ADF VERSION "1.0"?>
	<adf>
		<prospect>
			<requestdate>${created}</requestdate>
			<vehicle>
				<year>${buildYearString(yearLower, yearUpper, year)}</year>
				<make>${make}</make>
				<model>${model}</model>
			</vehicle>
			<customer>
				<contact>
					<name part="full">${firstName} ${lastName}</name>
					<phone>${phone}</phone>
				</contact>
			</customer>
			<vendor>
				<contact>
					<name part="full">Drivly, Inc.</name>
				</contact>
			</vendor>
		</prospect>
	</adf>`, { headers: { 'Content-Type': 'application/x-adf+xml' } });
});

// POST to the collection (we'll use async here)
router.post('/api', async (request) => {
	const content = await request.text();

	return new Response(content, { headers: { 'Content-Type': 'application/x-adf+xml' } });
});

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }));

function buildYearString(yearLower, yearUpper, year) {
	return !yearLower && !yearUpper ? year?.toString() :
		yearLower === yearUpper ? yearLower?.toString() :
			`${yearLower}-${yearUpper}`
}

export default router;
