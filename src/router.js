import { Router } from 'itty-router';

const router = Router();

// GET collection index
router.get('/api', (request) => {
	const {
		interest,
		firstName,
		lastName,
		phone,
		email,
		timeframe,
		customerComments,
		vehicleComments,
		newUsedStatus,
		yearLower,
		yearUpper,
		year,
		bodyStyle,
		make,
		model,
		trim,
		transmission,
		vendor,
		created,
	} = request.query;
	const yearQuery = buildYearString(yearLower, yearUpper, year)
	const createQuery = created && decodeURIComponent(created) || new Date().toISOString()
	return new Response(`<?XML VERSION "1.0"?>
<?ADF VERSION "1.0"?>
<adf>
	<prospect>
		<requestdate>${createQuery}</requestdate>
		<vehicle${interest ? ` interest="${interest}"` : ''}${newUsedStatus ? ` status="${newUsedStatus}"` : ''}>{${yearQuery ? (`
			<year>${yearQuery}</year>`) : ''}${make ? (`
			<make>${decodeURIComponent(make)}</make>`) : ''}${model ? (`
			<model>${decodeURIComponent(model)}</model>`) : ''}${trim ? (`
			<trim>${decodeURIComponent(trim)}</trim>`) : ''}${bodyStyle ? (`
			<bodystyle>${decodeURIComponent(bodyStyle)}</bodystyle>`) : ''}${transmission ? (`
			<transmission>${decodeURIComponent(transmission)}</transmission>`) : ''}${vehicleComments ? (`
			<comments>${decodeURIComponent(vehicleComments)}</comments>`) : ''}
		</vehicle>
		<customer>
			<contact>${firstName ? (`
				<name part="first">${decodeURIComponent(firstName)}</name>`) : ''}${lastName ? (`
				<name part="last">${decodeURIComponent(lastName)}</name>`) : ''}${phone ? (`
				<phone>${decodeURIComponent(phone)}</phone>`) : ''}${email ? (`
				<email>${decodeURIComponent(email)}</email>`) : ''}${timeframe ? (`
				<timeframe>
					<description>${decodeURIComponent(timeframe)}</description>
				</timeframe>`) : ''}${customerComments ? (`
				<comments>${decodeURIComponent(customerComments)}</comments>`) : ''}
			</contact>
		</customer>
		<vendor>
			<contact>
				<name part="full">${vendor && decodeURIComponent(vendor) || 'Cloud Motors'}</name>
			</contact>
		</vendor>
	</prospect>
</adf>`, {
		headers: {
			'Content-Type': 'application/x-adf+xml',
			'Content-Disposition': `inline; filename="${createQuery.replace(/:/g, '_')}_${firstName || 'first'}_${lastName || 'last'}.adf"`
		}
	});
});

// POST to the collection (we'll use async here)
router.post('/api', async (request) => {
	const content = await request.text();

	return new Response(content, {
		headers: {
			'Content-Type': 'application/x-adf+xml',
		}
	});
});

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }));

function buildYearString(yearLower, yearUpper, year) {
	return !yearLower && !yearUpper ? decodeURIComponent(year) :
		yearLower === yearUpper ? decodeURIComponent(yearLower) :
			`${decodeURIComponent(yearLower)}-${decodeURIComponent(yearUpper)}`
}

export default router;
