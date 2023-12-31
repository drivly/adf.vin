import { Router } from 'itty-router';

const router = Router();

// GET collection index
router.get('/api', (request) => {
	const {
		id, // The internal ID of the lead
		idSource, // The source of the lead ID
		interest, // The type of interest the customer has (buy, sell, trade-in, lease, test drive)
		firstName, // The customer's first name
		lastName, // The customer's last name
		phone, // The customer's phone number
		email, // The customer's email address
		timeframe, // The customer's timeframe for purchase
		customerComments, // Any comments the customer has
		newUsedStatus, // The status of the vehicle (new, used)
		yearLower, // The lower bound of the vehicle's year
		yearUpper, // The upper bound of the vehicle's year
		year, // The vehicle's year
		bodyStyle, // The vehicle's body style
		make, // The vehicle's make
		model, // The vehicle's model
		trim, // The vehicle's trim level
		transmission, // The vehicle's transmission type (usually A for automatic or M for manual)
		vehicleComments, // Any comments about the vehicle
		vendor, // The name of the vendor
		created, // The date the lead was created in ISO 8601 format
	} = request.query;
	const yearQuery = buildYearString(yearLower, yearUpper, year);
	const createQuery = decode(created) || new Date().toISOString();
	return new Response(
		`<?XML VERSION "1.0"?>
<?ADF VERSION "1.0"?>
<adf>
	<prospect>${id ? `
		<id sequence="1"${idSource ? ` source="${sanitize(idSource)}"` : ''}>${sanitize(id)}</id>` : ''}
		<requestdate>${createQuery}</requestdate>
		<vehicle${interest ? ` interest="${sanitize(interest)}"` : ''}${newUsedStatus ? ` status="${sanitize(newUsedStatus)}"` : ''}>${yearQuery ? `
			<year>${yearQuery}</year>` : ''}${make ? `
			<make>${sanitize(make)}</make>` : ''}${model ? `
			<model>${sanitize(model)}</model>` : ''}${trim ? `
			<trim>${sanitize(trim)}</trim>` : ''}${bodyStyle ? `
			<bodystyle>${sanitize(bodyStyle)}</bodystyle>` : ''}${transmission ? `
			<transmission>${sanitize(transmission)}</transmission>` : ''}${vehicleComments ? `
			<comments>${sanitize(vehicleComments)}</comments>` : ''}
		</vehicle>
		<customer>
			<contact>${firstName ? `
				<name part="first">${sanitize(firstName)}</name>` : ''}${lastName ? `
				<name part="last">${sanitize(lastName)}</name>` : ''}${phone ? `
				<phone>${sanitize(phone)}</phone>` : ''}${email ? `
				<email>${sanitize(email)}</email>` : ''}
			</contact>${timeframe ? `
			<timeframe>
				<description>${sanitize(timeframe)}</description>
			</timeframe>` : ''}${customerComments ? `
			<comments>${sanitize(customerComments)}</comments>` : ''}
		</customer>
		<vendor>
			<contact>
				<name part="full">${decode(vendor) || 'Cloud Motors'}</name>
			</contact>
		</vendor>
	</prospect>
</adf>`,
		{
			headers: {
				'Content-Type': 'application/x-adf+xml',
				'Content-Disposition': `inline; filename="${createQuery.replace(/:/g, '_')}_${firstName || 'first'}_${lastName || 'last'}.adf"`,
			},
		},
	);
});

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }));

function buildYearString(yearLower, yearUpper, year) {
	return !yearLower && !yearUpper ? decode(year) : yearLower === yearUpper ? decodeURIComponent(yearLower) : `${decode(yearLower)}-${decode(yearUpper)}`;
}

function decode(s) {
	return s ? sanitize(s) : undefined;
}

function sanitize(str) {
	return str ? String(decodeURIComponent(str)).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') : undefined
}

export default router;
